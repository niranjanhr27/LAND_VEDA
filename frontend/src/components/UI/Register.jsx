import { useState } from "react";
import { SERVICES } from "../../data/constants";
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

function Register({ onClose, onLoginClick }) {
  const { registerClient } = useAuth();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleRegister() {
    if (!form.name || !form.mobile || !form.service) {
      setError("Please fill all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    const result = await registerClient({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      password: "OTP_ONLY",
      service: form.service,
      status: "Pending",
      handler: "Niranjan",
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Registration failed. Please try again.");
      return;
    }
    onLoginClick();
  }

  return (
    <div
      style={overlayStyle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ ...cardStyle, maxWidth: "540px", maxHeight: "96vh" }}>
        <button onClick={onLoginClick} style={backBtnStyle}>
          Back to Login
        </button>
        <div style={titleStyle}>Client Registration</div>
        <div style={subStyle}>Create your secure LandVeda property account</div>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={twoColumnStyle}>
          <div style={fgStyle}>
            <label style={labelStyle}>Full Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={fgStyle}>
            <label style={labelStyle}>Mobile Number *</label>
            <input
              id="mobile"
              type="tel"
              placeholder="10-digit mobile"
              value={form.mobile}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Optional"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Service Needed *</label>
          <select
            id="service"
            value={form.service}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select the service you need
            </option>
            {SERVICES.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Password fields removed as login is OTP-only */}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={goldBtnStyle}
        >
          {loading ? "Creating Account..." : "Create My Account"}
        </button>
      </div>
    </div>
  );
}

const twoColumnStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

export default Register;
