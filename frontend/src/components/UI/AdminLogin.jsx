import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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

function AdminLogin({ onClose, onSuccess }) {
  const { loginAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      setError("Please fill both fields.");
      return;
    }

    setLoading(true);
    const result = await loginAdmin(username, password);
    setLoading(false);

    if (!result.success) {
      setError("Invalid username or password.");
      return;
    }
    onSuccess();
  }

  return (
    <div
      style={overlayStyle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ ...cardStyle, maxWidth: "460px" }}>
        <button onClick={onClose} style={backBtnStyle}>
          Back to Website
        </button>
        <div style={titleStyle}>Admin Login</div>
        <div style={subStyle}>LandVeda Team Portal - Secure Access</div>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={fgStyle}>
          <label style={labelStyle}>Username *</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Password *</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPass((value) => !value)}
              style={passwordToggleStyle}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} disabled={loading} style={goldBtnStyle}>
          {loading ? "Signing in..." : "Login to Admin Portal"}
        </button>
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

export default AdminLogin;
