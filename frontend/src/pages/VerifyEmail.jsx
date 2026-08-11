import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/auth.css";
import "../styles/verifyEmail.css";


const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Email verified successfully! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleVerify} className="auth-form">
        <h2>Verify Your Email</h2>

        <p>
          We sent a 6-digit OTP to:
        </p>

        <strong>{email}</strong>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          maxLength="6"
          inputMode="numeric"
          required
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
        />

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;