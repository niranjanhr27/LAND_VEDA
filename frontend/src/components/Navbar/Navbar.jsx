// ✅ Navbar.jsx — LandVeda top navigation bar
// This is the exact navbar from your original HTML file converted to React

import { useState } from "react";
// ✅ useState hook lets us track if login dropdown is open or closed

function Navbar({ onAdminLogin, onClientLogin }) {
  // ✅ These two props come from App.jsx — they open the login modals

  // ✅ This state tracks if the login dropdown is open (true) or closed (false)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    // ✅ The main nav bar — fixed at top, dark green background
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        background: "rgba(15, 26, 18, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
      }}
    >
      {/* ✅ Logo — LandVeda brand name */}
      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "var(--gold)",
          letterSpacing: "1px",
        }}
      >
        Land<span style={{ color: "#fff" }}>Veda</span>
      </div>

      {/* ✅ Nav links — right side of navbar */}
      <div
        style={{
          display: "flex",
          gap: "36px",
          alignItems: "center",
        }}
      >
        {/* ✅ Each nav link scrolls to the section on the page */}
        <a href="#services" style={navLinkStyle}>
          Services
        </a>
        <a href="#nri" style={navLinkStyle}>
          NRI & IT
        </a>
        <a href="#agri" style={navLinkStyle}>
          Rural Land
        </a>
        <a href="#govt" style={navLinkStyle}>
          Govt Services
        </a>

        {/* ✅ Contact Us button — gold background */}
        <a
          href="#contact"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            cursor: "pointer",
            background: "var(--gold)",
            color: "var(--dark)",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            fontFamily: "DM Sans, sans-serif",
            padding: "10px 22px",
            borderRadius: "8px",
            border: "none",
            display: "inline-block",
          }}
        >
          Contact Us
        </a>

        {/* ✅ Login dropdown wrapper */}
        <div style={{ position: "relative" }}>
          {/* ✅ Login button — toggles dropdown open/close */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={loginBtnStyle}
          >
            🔐 Login
            {/* ✅ Arrow rotates when dropdown is open */}
            <span
              style={{
                fontSize: "0.65rem",
                transition: "transform 0.2s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              ▼
            </span>
          </button>

          {/* ✅ Dropdown menu — only shows when dropdownOpen is true */}
          {dropdownOpen && (
            <div style={dropdownStyle}>
              {/* ✅ Admin Login option */}
              <button
                onClick={() => {
                  onAdminLogin(); // open admin login modal
                  setDropdownOpen(false); // close dropdown
                }}
                style={dropdownItemStyle}
              >
                <div style={{ ...ddIconStyle, background: "var(--dark)" }}>
                  🔐
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Admin Login</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Founder & Team Portal
                  </div>
                </div>
              </button>

              {/* ✅ Divider line between options */}
              <div style={{ height: "1px", background: "#e5ede8" }} />

              {/* ✅ Client Login option */}
              <button
                onClick={() => {
                  onClientLogin(); // open client login modal
                  setDropdownOpen(false); // close dropdown
                }}
                style={dropdownItemStyle}
              >
                <div style={{ ...ddIconStyle, background: "var(--gold)" }}>
                  🏡
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Client Login</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    Property Document Vault
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ✅ Style objects — kept outside component to avoid re-creating on every render */

const navLinkStyle = {
  textDecoration: "none",
  // color: "rgba(255,255,255,0.75)",
  background: "var(--gold)",
  color: "var(--dark)",
  padding: "10px 24px",
  borderRadius: "4px",
  fontSize: "0.88rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  transition: "color 0.3s",
};
const loginBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  background: "transparent",
  border: "1.5px solid rgba(201,168,76,0.5)",
  color: "var(--gold)",
  padding: "9px 20px",
  borderRadius: "6px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.88rem",
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "0.5px",
};

const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  background: "#fff",
  border: "1px solid #e5ede8",
  borderRadius: "10px",
  boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
  minWidth: "200px",
  overflow: "hidden",
  zIndex: 200,
};

const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px 20px",
  fontSize: "0.9rem",
  color: "var(--text)",
  cursor: "pointer",
  border: "none",
  background: "none",
  width: "100%",
  fontFamily: "DM Sans, sans-serif",
  textAlign: "left",
};

const ddIconStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
};

// ✅ Export so App.jsx can import and use this component
export default Navbar;
