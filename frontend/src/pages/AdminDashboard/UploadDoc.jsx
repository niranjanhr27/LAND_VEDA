import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const DOC_TYPES = [
  "Sale Deed",
  "Khata Certificate",
  "Encumbrance Certificate",
  "RTC Record",
  "Mutation Record",
  "Building Plan",
  "Property Tax Receipt",
  "Survey Report",
  "Gift Deed",
  "Partition Deed",
  "DC Order",
  "Legal Notice",
  "Other",
];

function UploadDoc() {
  const { loadClients, currentAdmin } = useAuth();
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const data = await loadClients();
      setClients(data);
    }
    fetchClients();
  }, [loadClients]);

  const selectedClient = clients.find((c) => c.id === Number(selectedClientId));

  async function handleUpload() {
    if (!selectedClientId || !docName || !file) {
      setError(
        "Please select a client, enter document name and choose a file.",
      );
      setSuccess("");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", selectedClientId);
      formData.append("name", docName);
      formData.append("type", docType);
      formData.append("description", desc);
      formData.append("uploadedBy", currentAdmin?.name || "Admin");



      // this is through localhost

      await axios.post("http://localhost:8080/api/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Document uploaded to client vault successfully!");
      setDocName("");
      setDesc("");
      setFile(null);
      setSelectedClientId("");
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={cardStyle}>
      <div style={{ padding: "28px 32px" }}>
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.3rem",
            color: "var(--dark)",
            marginBottom: "20px",
          }}
        >
          Upload Document for Client
        </div>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}

        <div style={fgStyle}>
          <label style={labelStyle}>Select Client *</label>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled>
              Choose a client
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.mobile}
              </option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <div style={infoStyle}>
            Uploading for: <strong>{selectedClient.name}</strong> ·{" "}
            {selectedClient.service}
          </div>
        )}

        <div style={fgStyle}>
          <label style={labelStyle}>Document Name *</label>
          <input
            type="text"

            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Document Type *</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            style={inputStyle}
          >
            {DOC_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Description / Notes</label>
          <textarea
            placeholder="Any notes about this document"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: "82px",
              resize: "vertical",
              lineHeight: 1.6,
            }}
          />
        </div>

        <div style={fgStyle}>
          <label style={labelStyle}>Choose File * (PDF / Image)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ ...inputStyle, padding: "8px" }}
          />
          {file && (
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--success)",
                marginTop: "4px",
              }}
            >
              ✅ Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>



        <button onClick={handleUpload} disabled={loading} style={goldBtnStyle}>
          {loading
            ? "Uploading to AWS S3..."
            : "📤 Upload Document to Client Vault"}
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "14px",
  border: "1px solid #e5ede8",
  boxShadow: "0 4px 22px rgba(0,0,0,0.06)",
  maxWidth: "580px",
};
const fgStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px",
};
const labelStyle = {
  fontSize: "0.75rem",
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
  color: "var(--danger)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "16px",
};
const successStyle = {
  background: "rgba(39,174,96,0.1)",
  border: "1px solid rgba(39,174,96,0.3)",
  color: "var(--success)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "16px",
};
const infoStyle = {
  background: "rgba(39,174,96,0.1)",
  border: "1px solid rgba(39,174,96,0.3)",
  color: "var(--success)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "14px",
};
const infoBannerStyle = {
  background: "rgba(41,128,185,0.1)",
  border: "1px solid rgba(41,128,185,0.3)",
  color: "var(--info)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  marginBottom: "20px",
};
const goldBtnStyle = {
  width: "100%",
  padding: "13px",
  border: "none",
  borderRadius: "8px",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.95rem",
  fontWeight: 700,
  cursor: "pointer",
  background: "var(--gold)",
  color: "var(--dark)",
};

export default UploadDoc;
