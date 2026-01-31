import random
import hashlib
import time
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from typing import Dict, Optional
from dotenv import load_dotenv

# Reload env to ensure we have latest values
load_dotenv()

class OTPService:
    def __init__(self):
        # In-memory storage for OTPs (use Redis or DB in production)
        self.otp_store: Dict[str, Dict] = {}
        self.max_attempts = 3
        self.otp_expiry_minutes = 5
    
    def _get_email_config(self):
        """Get fresh email config from environment"""
        return {
            'host': os.getenv('EMAIL_HOST', 'smtp.gmail.com'),
            'port': int(os.getenv('EMAIL_PORT', '587')),
            'user': os.getenv('EMAIL_HOST_USER', ''),
            'password': os.getenv('EMAIL_HOST_PASSWORD', ''),
            'from': os.getenv('EMAIL_FROM', os.getenv('EMAIL_HOST_USER', ''))
        }
    
    def generate_otp(self) -> str:
        """Generate a 6-digit OTP"""
        return str(random.randint(100000, 999999))
    
    def hash_otp(self, otp: str) -> str:
        """Hash the OTP for secure storage"""
        return hashlib.sha256(otp.encode()).hexdigest()
    
    def send_email(self, to_email: str, otp: str) -> bool:
        """Send OTP via email"""
        try:
            # Get fresh config
            config = self._get_email_config()
            
            print(f"🔄 Attempting to send email to {to_email}")
            print(f"📧 Email config: {config['user']} @ {config['host']}:{config['port']}")
            print(f"🔑 Password length: {len(config['password']) if config['password'] else 0}")
            
            # Check configuration
            if not config['user'] or not config['password']:
                print(f"⚠️  Email not configured. OTP for {to_email}: {otp}")
                return False
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Your Lerno.ai Login OTP'
            msg['From'] = config['from']
            msg['To'] = to_email
            
            # HTML email body
            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <h2 style="color: #333; text-align: center;">Lerno.ai - Login OTP</h2>
                  <p style="color: #666; font-size: 16px;">Hello,</p>
                  <p style="color: #666; font-size: 16px;">Your One-Time Password (OTP) for logging into Lerno.ai is:</p>
                  
                  <div style="background-color: #f8f9fa; border: 2px dashed #007bff; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                    <h1 style="color: #007bff; font-size: 36px; letter-spacing: 8px; margin: 0;">{otp}</h1>
                  </div>
                  
                  <p style="color: #666; font-size: 14px;">This OTP is valid for <strong>5 minutes</strong>.</p>
                  <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
                  
                  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                  
                  <p style="color: #999; font-size: 12px; text-align: center;">
                    This is an automated email. Please do not reply.<br>
                    © 2026 Lerno.ai - AI-Powered Learning Platform
                  </p>
                </div>
              </body>
            </html>
            """
            
            # Attach HTML body
            msg.attach(MIMEText(html, 'html'))
            
            # Send email with detailed logging
            print(f"🔐 Connecting to SMTP server...")
            server = smtplib.SMTP(config['host'], config['port'], timeout=10)
            server.set_debuglevel(1)  # Enable debug output
            
            print(f"🔒 Starting TLS...")
            server.starttls()
            
            print(f"🔑 Logging in with user: {config['user'][:10]}...")
            server.login(config['user'], config['password'].strip())
            
            print(f"📤 Sending message...")
            server.send_message(msg)
            server.quit()
            
            print(f"✅ Email sent successfully to {to_email}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            print(f"❌ SMTP Authentication Failed: {str(e)}")
            print(f"   Check if app password is correct and 2-step verification is enabled")
            return False
        except smtplib.SMTPException as e:
            print(f"❌ SMTP Error: {str(e)}")
            return False
        except Exception as e:
            print(f"❌ Failed to send email: {type(e).__name__}: {str(e)}")
            import traceback
            traceback.print_exc()
            return False
    
    def send_otp(self, email: str) -> Dict:
        """Generate and store OTP for email"""
        # Check if email already has an active OTP
        if email in self.otp_store:
            existing = self.otp_store[email]
            if existing['expires_at'] > datetime.now():
                # If OTP is still valid, don't generate new one immediately
                time_left = (existing['expires_at'] - datetime.now()).seconds
                if time_left > 240:  # More than 4 minutes left
                    return {
                        "success": False,
                        "message": f"OTP already sent. Please wait {time_left} seconds before requesting again."
                    }
        
        # Generate new OTP
        otp = self.generate_otp()
        hashed_otp = self.hash_otp(otp)
        expires_at = datetime.now() + timedelta(minutes=self.otp_expiry_minutes)
        
        # Store OTP details
        self.otp_store[email] = {
            'otp_hash': hashed_otp,
            'attempts': 0,
            'expires_at': expires_at,
            'created_at': datetime.now()
        }
        
        # Send email with OTP
        email_sent = self.send_email(email, otp)
        
        return {
            "success": True,
            "message": "OTP sent successfully" if email_sent else "OTP generated (email not configured)",
            "otp": otp if not email_sent else None,  # Only return OTP if email failed (for testing)
            "expires_in": self.otp_expiry_minutes * 60,
            "email_sent": email_sent
        }
    
    def verify_otp(self, email: str, otp: str) -> Dict:
        """Verify the OTP for given email"""
        # Check if email exists in store
        if email not in self.otp_store:
            return {
                "success": False,
                "message": "No OTP found. Please request a new one."
            }
        
        stored_data = self.otp_store[email]
        
        # Check if OTP expired
        if stored_data['expires_at'] < datetime.now():
            del self.otp_store[email]
            return {
                "success": False,
                "message": "OTP expired. Please request a new one."
            }
        
        # Check max attempts
        if stored_data['attempts'] >= self.max_attempts:
            del self.otp_store[email]
            return {
                "success": False,
                "message": "Too many attempts. Please request a new OTP."
            }
        
        # Increment attempts
        stored_data['attempts'] += 1
        
        # Verify OTP
        otp_hash = self.hash_otp(otp)
        if otp_hash == stored_data['otp_hash']:
            # OTP is correct, remove from store
            del self.otp_store[email]
            return {
                "success": True,
                "message": "OTP verified successfully"
            }
        else:
            remaining_attempts = self.max_attempts - stored_data['attempts']
            return {
                "success": False,
                "message": f"Invalid OTP. {remaining_attempts} attempts remaining."
            }

# Create a single instance
otp_service = OTPService()
