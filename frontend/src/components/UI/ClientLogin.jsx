import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { otpAPI } from "../../data/api";
import {
  backBtnStyle,
  cardStyle,
  errorStyle,
  fgStyle,
  goldBtnStyle,
  inputStyle,
  labelStyle,
  overlayStyle,
  subStyle,
  titleStyle,
} from "../../styles/formStyles";

function ClientLogin({ onClose, onSuccess, onRegister }) {
  const { sendClientLoginOtp, verifyClientLoginOtp, completeClientLogin } = useAuth();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleLogin() {
    if (!mobile) {
      setError("Please enter your mobile number.");
      return;
    }

    setLoading(true);
    const result = await sendClientLoginOtp(mobile);
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Mobile number not registered.");
      return;
    }

    setStep(2);
    setError("");
  }

  async function sendOtp() {
    setSending(true);
    const result = await sendClientLoginOtp(mobile);
    setSending(false);
    if (result.success) {
      setOtp("");
      setError("");
    } else {
      setError(result.message || "Failed to resend OTP.");
    }
  }

  async function handleVerifyOtp() {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    const result = await verifyClientLoginOtp(mobile, otp);
    setLoading(false);

    if (result.success) {
      completeClientLogin(result.client);
      onSuccess();
    } else {
      setError(result.message || "Invalid or expired OTP.");
    }
  }

  return (
    <div
      style={overlayStyle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ ...cardStyle, maxWidth: "460px" }}>
        <button onClick={onClose} style={backBtnStyle}>
          Back to HomePage
        </button>
        <div style={titleStyle}>Client Login</div>
        <div style={subStyle}>Access your secure property document vault</div>

        {error && <div style={errorStyle}>{error}</div>}

        {step === 1 && (
          <>
            <div style={fgStyle}>
              <label style={labelStyle}>Registered Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={goldBtnStyle}
            >
              {loading ? "Please wait..." : "Send OTP"}
            </button>

            <div style={registerPromptStyle}>
              New client?{" "}
              <button type="button" onClick={onRegister} style={linkButtonStyle}>
                Register here
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={subStyle}>
              OTP sent to <strong>+91 {mobile}</strong> via SMS
            </div>

            <div style={otpBoxStyle}>
              <div style={otpTitleStyle}>Check your mobile for OTP SMS</div>
              <div style={otpHelpStyle}>
                A 6-digit OTP has been sent to your registered mobile number
              </div>
            </div>

            <div style={fgStyle}>
              <label style={labelStyle}>Enter 6-Digit OTP *</label>
              <input
                type="text"
                placeholder="_ _ _ _ _ _"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={otpInputStyle}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              style={goldBtnStyle}
            >
              {loading ? "Verifying..." : "Verify OTP and Enter Vault"}
            </button>

            <div style={otpActionsStyle}>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
                style={mutedButtonStyle}
              >
                Change mobile
              </button>
              <button type="button" onClick={sendOtp} style={linkButtonStyle}>
                {sending ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const passwordToggleStyle = {
  position: "absolute",
  right: "13px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  fontSize: "0.75rem",
  color: "var(--muted)",
  cursor: "pointer",
};

const registerPromptStyle = {
  textAlign: "center",
  marginTop: "18px",
  fontSize: "0.85rem",
  color: "var(--muted)",
};

const linkButtonStyle = {
  border: "none",
  background: "transparent",
  color: "var(--gold)",
  cursor: "pointer",
  fontWeight: 700,
  padding: 0,
};

const mutedButtonStyle = {
  ...linkButtonStyle,
  color: "var(--muted)",
};

const otpBoxStyle = {
  background: "rgba(201,168,76,0.1)",
  border: "2px dashed var(--gold)",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  marginBottom: "24px",
};

const otpTitleStyle = {
  fontSize: "0.72rem",
  color: "var(--gold)",
  fontWeight: 700,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
};

const otpHelpStyle = {
  fontSize: "0.85rem",
  color: "var(--muted)",
  marginTop: "8px",
};

const otpInputStyle = {
  ...inputStyle,
  textAlign: "center",
  fontSize: "1.6rem",
  letterSpacing: "10px",
  fontWeight: 700,
};

const otpActionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "14px",
};

export default ClientLogin;
