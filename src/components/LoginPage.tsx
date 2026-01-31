import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../ui/sparkles";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expiresIn, setExpiresIn] = useState(0);
  const navigate = useNavigate();

  const validateCollegeEmail = (email: string) => {
    // Valid college email patterns
    const collegeEmailPatterns = [
      /@krmu\.edu\.in$/,
      /@student\.college\.edu$/,
      /@edu\.in$/,
    ];
    return collegeEmailPatterns.some((pattern) => pattern.test(email));
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!validateCollegeEmail(email)) {
      setError("Please use a valid college email (e.g., 2301201171@krmu.edu.in)");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8001/send-otp", {
        email: email.toLowerCase().trim(),
      });

      if (response.data.success) {
        setOtpSent(true);
        setExpiresIn(response.data.expires_in);
        setSuccess("OTP sent to your email. Please check your inbox.");
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8001/verify-otp", {
        email: email.toLowerCase().trim(),
        otp: otp,
      });

      if (response.data.success) {
        // Store user info
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        const derivedName = email.split("@")[0];
        localStorage.setItem("userName", derivedName);
        const defaultAvatar = `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(derivedName || email)}`;
        localStorage.setItem("userAvatar", defaultAvatar);

        // Navigate to course selection
        navigate("/courses");
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp("");
    setError("");
    setSuccess("");
    await handleSendOTP({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticles-login"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Lerno.ai</h1>
          <p className="text-gray-400">AI-Powered Learning Platform</p>
        </div>

        {!otpSent ? (
          // Email Input Form
          <form
            onSubmit={handleSendOTP}
            className="space-y-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                College Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="2301201171@krmu.edu.in"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Use your college email address to login
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          // OTP Verification Form
          <form
            onSubmit={handleVerifyOTP}
            className="space-y-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-2xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                OTP sent to {email}
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Verify & Continue
            </button>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-blue-400 hover:text-blue-300 text-sm transition"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                }}
                className="text-gray-400 hover:text-gray-300 text-sm transition"
              >
                Change Email
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-gray-500 text-xs mt-6">
          Demo: Use any email ending with @krmu.edu.in
        </p>
      </div>
    </div>
  );
}
