// ContactForm.jsx — Customer enquiry form that saves to MySQL database

import { useState } from "react";
import { enquiryAPI } from "../../data/api";
import { SERVICES } from "../../data/constants";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!form.name || !form.mobile || !form.service) {
      setError("Please fill Name, Mobile and Service fields.");
      setSuccess("");
      return;
    }
    if (form.mobile.length !== 10 || isNaN(form.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await enquiryAPI.save(form);
      setSuccess(
        "Thank you! Your enquiry has been received. Our team will contact you within 24 hours.",
      );
      setForm({ name: "", mobile: "", email: "", service: "", message: "" });
    } catch {
      setError(
        "Something went wrong. Please call us directly on +91 87925 78028.",
      );
    }
    setLoading(false);
  }

  return (
    <section style={sectionStyle} id="contact">
      <div style={containerStyle}>
        <div style={leftStyle}>
          <div style={tagStyle}>GET IN TOUCH</div>
          <h2 style={headingStyle}>
            Ready to Secure
            <br />
            <span style={{ color: "var(--gold)" }}>Your Property?</span>
          </h2>
          <p style={descStyle}>
            Fill the form and our team will contact you within 24 hours. Free
            consultation — no obligation.
          </p>

          <div style={contactCardsStyle}>
            {[
              {
                icon: "📞",
                label: "Call / WhatsApp",
                value: "+91 87925 78028",
              },
              { icon: "📞", label: "Alternate", value: "+91 99805 34077" },
              { icon: "✉️", label: "Email", value: "niranjanhr79@gmail.com" },
              {
                icon: "📍",
                label: "Office",
                value: "Kengeri, Bengaluru – 560060",
              },
              { icon: "🕐", label: "Hours", value: "Mon–Sat: 9 AM – 7 PM" },
            ].map((c) => (
              <div key={c.label} style={contactRowStyle}>
                <span style={iconStyle}>{c.icon}</span>
                <div>
                  <div style={cLabelStyle}>{c.label}</div>
                  <div style={cValueStyle}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={rightStyle}>
          <div style={formCardStyle}>
            <div style={formTitleStyle}>Request Free Consultation</div>
            <div style={formSubStyle}>All fields marked * are required</div>

            {error && <div style={errorStyle}>{error}</div>}
            {success && <div style={successStyle}>{success}</div>}

            <div style={fgStyle}>
              <label style={labelStyle}>Full Name *</label>
              <input
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <div style={fgStyle}>
                <label style={labelStyle}>Mobile Number *</label>
                <input
                  name="mobile"
                  type="tel"
                  placeholder="10-digit mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  style={inputStyle}
                  maxLength={10}
                />
              </div>
              <div style={fgStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={fgStyle}>
              <label style={labelStyle}>Service Required *</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div style={fgStyle}>
              <label style={labelStyle}>Message / Property Details</label>
              <textarea
                name="message"
                placeholder="Tell us about your property and requirements (location, size, issue, etc.)"
                value={form.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={goldBtnStyle}
            >
              {loading
                ? "Submitting..."
                : "📩 Submit Enquiry — Free Consultation"}
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "12px",
                fontSize: "0.8rem",
                color: "var(--muted)",
              }}
            >
              🔒 Your details are 100% secure and confidential
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle = { background: "var(--dark)", padding: "80px 24px" };
const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "start",
};
const leftStyle = { color: "#fff" };
const tagStyle = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "2px",
  color: "var(--gold)",
  textTransform: "uppercase",
  marginBottom: "12px",
};
const headingStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "2.2rem",
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1.3,
  marginBottom: "16px",
};
const descStyle = {
  fontSize: "0.95rem",
  color: "rgba(255,255,255,0.6)",
  lineHeight: 1.7,
  marginBottom: "32px",
};
const contactCardsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};
const contactRowStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "14px",
};
const iconStyle = { fontSize: "1.3rem", marginTop: "2px" };
const cLabelStyle = {
  fontSize: "0.72rem",
  color: "var(--gold)",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
};
const cValueStyle = { fontSize: "0.92rem", color: "#fff", marginTop: "2px" };
const rightStyle = {};
const formCardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "36px 32px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
};
const formTitleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "var(--dark)",
  marginBottom: "4px",
};
const formSubStyle = {
  fontSize: "0.8rem",
  color: "var(--muted)",
  marginBottom: "24px",
};
const fgStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px",
};
const labelStyle = {
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--text)",
};
const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid #dde5e0",
  borderRadius: "8px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.93rem",
  color: "var(--text)",
  background: "var(--cream)",
  outline: "none",
  boxSizing: "border-box",
};
const errorStyle = {
  background: "rgba(224,84,84,0.1)",
  border: "1px solid rgba(224,84,84,0.3)",
  color: "var(--danger,#e05454)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "16px",
};
const successStyle = {
  background: "rgba(39,174,96,0.1)",
  border: "1px solid rgba(39,174,96,0.3)",
  color: "var(--success,#27ae60)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "16px",
};
const goldBtnStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.95rem",
  fontWeight: 700,
  cursor: "pointer",
  background: "var(--gold)",
  color: "var(--dark)",
  marginTop: "4px",
};

export default ContactForm;
