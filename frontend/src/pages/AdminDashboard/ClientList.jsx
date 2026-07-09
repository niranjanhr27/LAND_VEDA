// ClientList.jsx — Shows all clients from MySQL database with status and handler management

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { STATUSES } from "../../data/constants";

const STATUS_COLORS = {
  Pending: "#e67e22",
  "In Progress": "#2980b9",
  "Document Verification": "#c9a84c",
  Completed: "#27ae60",
  "On Hold": "#e05454",
};

function ClientList() {
  const {
    loadClients,
    loadDocs,
    updateClientStatus,
    updateClientHandler,
    deleteDoc,
    ADMINS,
  } = useAuth();
  const [clients, setClients] = useState([]);
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const data = await loadClients();
    setClients(data);
    setLoading(false);
  }, [loadClients]);

  useEffect(() => {
    let active = true;
    async function load() {
      const data = await loadClients();
      if (active) {
        setClients(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [loadClients]);

  async function fetchDocs(clientId) {
    const data = await loadDocs(clientId);
    setDocs(data);
  }

  async function handleOpenDetail(client) {
    setSelectedClient(client);
    await fetchDocs(client.id);
  }

  async function handleStatusChange(id, status) {
    await updateClientStatus(id, status);
    fetchClients();
  }

  async function handleHandlerChange(id, handler) {
    await updateClientHandler(id, handler);
    fetchClients();
  }

  async function handleDeleteDoc(docId) {
    if (!confirm("Delete this document? This cannot be undone.")) return;
    await deleteDoc(docId);
    await fetchDocs(selectedClient.id);
    fetchClients();
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.service.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={cardStyle}>
      <div
        style={{
          padding: "20px 26px",
          borderBottom: "1px solid #e5ede8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.3rem",
            color: "var(--dark)",
          }}
        >
          Client Registry
        </div>
        <input
          placeholder="🔍  Search by name, mobile, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 16px",
            border: "1.5px solid #dde5e0",
            borderRadius: "8px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.88rem",
            width: "270px",
            outline: "none",
            background: "var(--cream)",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.88rem",
          }}
        >
          <thead>
            <tr style={{ background: "var(--cream)" }}>
              {[
                "#",
                "Client Name",
                "Mobile",
                "Service Requested",
                "Status",
                "Handler",
                "Detail",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "0.71rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "52px",
                    color: "var(--muted)",
                  }}
                >
                  Loading clients...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: "center",
                    padding: "52px",
                    color: "var(--muted)",
                  }}
                >
                  No clients found.
                </td>
              </tr>
            ) : (
              filtered.map((c, i) => (
                <tr key={c.id} style={{ borderTop: "1px solid #f0f5f2" }}>
                  <td style={{ padding: "14px 16px", color: "var(--muted)" }}>
                    {i + 1}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight: 700,
                      color: "var(--dark)",
                    }}
                  >
                    {c.name}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--muted)" }}>
                    {c.mobile}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      maxWidth: "160px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.service}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      style={inlineSelectStyle}
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <select
                      value={c.handler}
                      onChange={(e) =>
                        handleHandlerChange(c.id, e.target.value)
                      }
                      style={inlineSelectStyle}
                    >
                      {ADMINS.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      onClick={() => handleOpenDetail(c)}
                      style={{
                        color: "var(--gold)",
                        fontWeight: 700,
                        fontSize: "0.84rem",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      View ▸
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <div
          style={modalOverlayStyle}
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedClient(null)
          }
        >
          <div style={modalCardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.6rem",
                    color: "var(--dark)",
                  }}
                >
                  {selectedClient.name}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    marginTop: "2px",
                  }}
                >
                  {selectedClient.mobile} · {selectedClient.email || "No email"}
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {[
                ["Service", selectedClient.service],
                ["Status", selectedClient.status],
                ["Handler", selectedClient.handler],
                ["Registered", fmtDate(selectedClient.createdAt)],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: "var(--cream)",
                    borderRadius: "8px",
                    padding: "13px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "4px",
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: STATUS_COLORS[v] || "var(--dark)",
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontWeight: 700,
                color: "var(--dark)",
                marginBottom: "14px",
                fontSize: "0.95rem",
              }}
            >
              Documents ({docs.length})
            </div>

            {docs.length === 0 ? (
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                }}
              >
                No documents uploaded yet.
              </div>
            ) : (
              docs.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    border: "1px solid #e5ede8",
                    borderRadius: "8px",
                    padding: "14px 18px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        color: "var(--dark)",
                      }}
                    >
                      {doc.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--muted)",
                        marginTop: "4px",
                      }}
                    >
                      {doc.type} · {fmtDate(doc.uploadedAt)} · By{" "}
                      {doc.uploadedBy}
                    </div>
                    {doc.description && (
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--muted)",
                          marginTop: "3px",
                          fontStyle: "italic",
                        }}
                      >
                        {doc.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    style={dangerBtnStyle}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #e5ede8",
  boxShadow: "0 4px 22px rgba(0,0,0,0.06)",
  overflow: "hidden",
};
const inlineSelectStyle = {
  border: "1px solid #dde5e0",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "0.82rem",
  cursor: "pointer",
  outline: "none",
  fontFamily: "DM Sans, sans-serif",
  background: "#fff",
};
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 2000,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};
const modalCardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "36px 38px",
  maxWidth: "640px",
  width: "100%",
  maxHeight: "88vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
};
const dangerBtnStyle = {
  padding: "7px 16px",
  borderRadius: "6px",
  border: "1px solid rgba(224,84,84,0.3)",
  background: "rgba(224,84,84,0.12)",
  color: "var(--danger)",
  fontSize: "0.8rem",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "DM Sans, sans-serif",
};

export default ClientList;
