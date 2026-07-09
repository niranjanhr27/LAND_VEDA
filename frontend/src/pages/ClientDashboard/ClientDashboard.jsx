// ClientDashboard.jsx — Client's private document vault using real MySQL data via Spring Boot API

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { documentAPI } from "../../data/api";

const DOC_ICONS = {
  "Sale Deed": "📄",
  "Khata Certificate": "🏛️",
  "Encumbrance Certificate": "📋",
  "RTC Record": "🌾",
  "Mutation Record": "🔄",
  "Building Plan": "🏗️",
  "Property Tax Receipt": "💰",
  "Survey Report": "📐",
  "Gift Deed": "🎁",
  "Partition Deed": "⚖️",
  "DC Order": "🔁",
  "Legal Notice": "⚠️",
  Other: "📁",
};

const STATUS_COLORS = {
  Pending: "#e67e22",
  "In Progress": "#2980b9",
  "Document Verification": "#c9a84c",
  Completed: "#27ae60",
  "On Hold": "#e05454",
};

function ClientDashboard({ onLogout }) {
  const { currentClient, loadDocs } = useAuth();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      const data = await loadDocs(currentClient?.id);
      setDocs(data);
      setLoading(false);
    }
    fetchDocs();
  }, [currentClient?.id, loadDocs]);

  function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  async function viewDocInfo(doc) {
    try {
      const res = await documentAPI.getDownloadUrl(doc.id);
      window.open(res.data, "_blank");
    } catch {
      alert("Failed to get download link. Please try again.");
    }
  }

  const statusColor = STATUS_COLORS[currentClient?.status] || "#c9a84c";

  const summaryCards = [
    { icon: "🏡", lbl: "Your Service", val: currentClient?.service },
    {
      icon: "📊",
      lbl: "Project Status",
      val: currentClient?.status,
      color: statusColor,
    },
    { icon: "👤", lbl: "Your Handler", val: currentClient?.handler },
    { icon: "📁", lbl: "Total Documents", val: `${docs.length} files` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f1", width: "100%" }}>
      <div
        style={{
          background: "var(--dark)",
          padding: "15px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.35rem",
            color: "var(--gold)",
          }}
        >
          Land<span style={{ color: "#fff" }}>Veda</span>
          <small
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginLeft: "10px",
            }}
          >
            PDBMS · Document Vault
          </small>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
              {currentClient?.name}
            </div>
            <div
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}
            >
              Client · {currentClient?.mobile}
            </div>
          </div>
          <button onClick={onLogout} style={outlineBtnStyle}>
            Logout
          </button>
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "34px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          {summaryCards.map((s) => (
            <div key={s.lbl} style={statCardStyle}>
              <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "4px",
                }}
              >
                {s.lbl}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: s.color || "var(--dark)",
                  fontSize: "0.97rem",
                }}
              >
                {s.val}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.65rem",
              color: "var(--dark)",
            }}
          >
            📂 My Property Document Vault
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginTop: "4px",
            }}
          >
            🔒 Documents are private — only visible to you after OTP
            verification.
          </div>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px",
              color: "var(--muted)",
            }}
          >
            Loading your documents...
          </div>
        ) : docs.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              border: "1px solid #e5ede8",
              textAlign: "center",
              padding: "70px 40px",
            }}
          >
            <div
              style={{ fontSize: "4rem", marginBottom: "18px", opacity: 0.35 }}
            >
              📂
            </div>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.4rem",
                color: "var(--dark)",
                marginBottom: "10px",
              }}
            >
              Your Vault is Empty
            </div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                maxWidth: "380px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Documents uploaded by the LandVeda team will appear here securely.
              <br />
              Please contact your handler{" "}
              <strong>{currentClient?.handler}</strong> for updates.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "18px",
            }}
          >
            {docs.map((doc) => (
              <div key={doc.id} style={docCardStyle}>
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      minWidth: "38px",
                      marginTop: "2px",
                    }}
                  >
                    {DOC_ICONS[doc.type] || "📁"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.97rem",
                        color: "var(--dark)",
                        marginBottom: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      {doc.name}
                    </div>
                    <span style={badgeStyle}>{doc.type}</span>
                    <div
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--muted)",
                        marginTop: "10px",
                        lineHeight: 1.7,
                      }}
                    >
                      Uploaded: {fmtDate(doc.uploadedAt)}
                      <br />
                      By: {doc.uploadedBy}
                    </div>
                    {doc.description && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--muted)",
                          marginTop: "6px",
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        {doc.description}
                      </div>
                    )}
                    <button
                      onClick={() => viewDocInfo(doc)}
                      style={viewBtnStyle}
                    >
                      📥 View / Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "48px",
            textAlign: "center",
            fontSize: "0.78rem",
            color: "var(--muted)",
          }}
        >
          Contact: <strong>+91 87925 78028</strong> · niranjanhr79@gmail.com ·
          LandVeda, No 93/4, Vidhyapeeta Main Road, Kengeri, Bengaluru – 560060
        </div>
      </div>
    </div>
  );
}

const statCardStyle = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px 22px",
  textAlign: "left",
  border: "1px solid #e5ede8",
  boxShadow: "0 3px 14px rgba(0,0,0,0.05)",
};
const docCardStyle = {
  border: "1px solid #e5ede8",
  borderRadius: "12px",
  padding: "22px 24px",
  background: "#fff",
};
const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 11px",
  borderRadius: "20px",
  fontSize: "0.73rem",
  fontWeight: 700,
  background: "#2c5f3e22",
  color: "#2c5f3e",
  border: "1px solid #2c5f3e44",
};
const viewBtnStyle = {
  marginTop: "14px",
  background: "rgba(201,168,76,0.15)",
  color: "var(--gold)",
  border: "1px solid rgba(201,168,76,0.4)",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "0.78rem",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "DM Sans, sans-serif",
};
const outlineBtnStyle = {
  padding: "7px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.8rem",
  fontWeight: 700,
  background: "transparent",
  border: "1.5px solid var(--gold)",
  color: "var(--gold)",
};

export default ClientDashboard;
