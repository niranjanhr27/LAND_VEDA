import { useState } from "react";
import { SERVICES, STATUSES } from "../../data/constants";
import { useAuth } from "../../context/AuthContext";
import {
  errorStyle,
  fgStyle,
  goldBtnStyle,
  inputStyle,
  labelStyle,
} from "../../styles/formStyles";

function AddClient({ onDone }) {
  const { registerClient, ADMINS } = useAuth();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    status: "Pending",
    handler: "Niranjan",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleAdd() {
    if (!form.name || !form.mobile || !form.service) {
      setError("Name, Mobile and Service are required.");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setError("");
    setLoading(true);
    const result = await registerClient({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      password: "Client@123",
      service: form.service,
      status: form.status,
      handler: form.handler,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Failed to add client.");
      return;
    }
    onDone();
  }

  return (
    <div style={cardStyle}>
      <div style={{ padding: "28px 32px" }}>
        <div style={headingStyle}>Add New Client</div>

        <div style={infoBannerStyle}>
          Default login password will be <strong>Client@123</strong>. The client
          should change it after first login.
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={twoColumnStyle}>
          <div style={fgStyle}>
            <label style={labelStyle}>Full Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Client full name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={fgStyle}>
            <label style={labelStyle}>Mobile *</label>
            <input
              id="mobile"
              type="tel"
              placeholder="10-digit number"
              value={form.mobile}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Email</label>
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
          <label style={labelStyle}>Service Requested *</label>
          <select
            id="service"
            value={form.service}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="" disabled>
              Select service
            </option>
            {SERVICES.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>

        <div style={twoColumnStyle}>
          <div style={fgStyle}>
            <label style={labelStyle}>Initial Status</label>
            <select
              id="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
          <div style={fgStyle}>
            <label style={labelStyle}>Assign Handler</label>
            <select
              id="handler"
              value={form.handler}
              onChange={handleChange}
              style={inputStyle}
            >
              {ADMINS.map((admin) => (
                <option key={admin.id} value={admin.name}>
                  {admin.name} - {admin.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleAdd} disabled={loading} style={goldBtnStyle}>
          {loading ? "Adding Client..." : "Add Client to Registry"}
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #e5ede8",
  boxShadow: "0 4px 22px rgba(0,0,0,0.06)",
  maxWidth: "580px",
};

const headingStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "1.3rem",
  color: "var(--dark)",
  marginBottom: "20px",
};

const twoColumnStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const infoBannerStyle = {
  background: "rgba(41,128,185,0.1)",
  border: "1px solid rgba(41,128,185,0.3)",
  color: "var(--info)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  marginBottom: "18px",
};

export default AddClient;
