# 📧 Email OTP Setup Guide

## Gmail SMTP Setup (Recommended for Testing)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security**
3. Enable **2-Step Verification**

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Other (Custom name)**
3. Enter name: "Lerno.ai OTP"
4. Click **Generate**
5. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Open `backend/.env` and update:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=abcdefghijklmnop  # App password (no spaces)
EMAIL_FROM=your-email@gmail.com
```

### Step 4: Restart Backend Server
```bash
# Kill existing server
pkill -f "uvicorn main:app"

# Start server
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### Step 5: Test OTP
1. Go to http://localhost:5173/login
2. Enter your email: `2301201171@krmu.edu.in`
3. Click "Send OTP"
4. Check your email inbox! 📧

---

## Alternative: SendGrid (For Production)

1. Sign up at https://sendgrid.com/
2. Get API key
3. Update `otp_service.py` to use SendGrid API

---

## Troubleshooting

### OTP not receiving?
- ✅ Check spam/junk folder
- ✅ Verify app password is correct (no spaces)
- ✅ Check backend logs for errors
- ✅ Make sure 2FA is enabled on Gmail

### "Username and Password not accepted" error?
- ❌ Don't use your Gmail password
- ✅ Use the 16-character app password
- ✅ Remove all spaces from app password

---

## Testing Without Email (Demo Mode)

If email is not configured, OTP will show in:
- Browser alert popup
- Backend console logs

This is useful for development/testing!
