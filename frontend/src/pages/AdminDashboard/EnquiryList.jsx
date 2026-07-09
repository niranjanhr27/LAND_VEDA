import { useState, useEffect } from "react";
import { enquiryAPI } from "../../data/api";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "In Progress",
  "Converted",
  "Closed",
];

function getStatusBg(s) {
  if (s === "New") return "rgba(231,76,60,0.12)";
  if (s === "Contacted") return "rgba(41,128,185,0.12)";
  if (s === "In Progress") return "rgba(243,156,18,0.12)";
  if (s === "Converted") return "rgba(39,174,96,0.12)";
  return "rgba(127,140,141,0.12)";
}

function getStatusColor(s) {
  if (s === "New") return "#c0392b";
  if (s === "Contacted") return "#2980b9";
  if (s === "In Progress") return "#e67e22";
  if (s === "Converted") return "#27ae60";
  return "#7f8c8d";
}

function getStatusBorder(s) {
  if (s === "New") return "rgba(231,76,60,0.3)";
  if (s === "Contacted") return "rgba(41,128,185,0.3)";
  if (s === "In Progress") return "rgba(243,156,18,0.3)";
  if (s === "Converted") return "rgba(39,174,96,0.3)";
  return "rgba(127,140,141,0.3)";
}

function formatDate(dt) {
  if (!dt) return "N/A";
  return new Date(dt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(function () {
    fetchEnquiries();
  }, []);

  function fetchEnquiries() {
    setLoading(true);
    enquiryAPI
      .getAll()
      .then(function (res) {
        setEnquiries(res.data);
        setLoading(false);
      })
      .catch(function (err) {
        console.error("Failed to load enquiries", err);
        setLoading(false);
      });
  }

  function handleStatusChange(id, status) {
    enquiryAPI
      .updateStatus(id, status)
      .then(function () {
        setEnquiries(function (prev) {
          return prev.map(function (e) {
            return e.id === id ? Object.assign({}, e, { status: status }) : e;
          });
        });
        if (selected && selected.id === id) {
          setSelected(function (prev) {
            return Object.assign({}, prev, { status: status });
          });
        }
      })
      .catch(function () {
        alert("Failed to update status.");
      });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this enquiry?")) return;
    enquiryAPI
      .delete(id)
      .then(function () {
        setEnquiries(function (prev) {
          return prev.filter(function (e) {
            return e.id !== id;
          });
        });
        if (selected && selected.id === id) setSelected(null);
      })
      .catch(function () {
        alert("Failed to delete enquiry.");
      });
  }

  var filtered = enquiries.filter(function (e) {
    var q = search.toLowerCase();
    var matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.mobile.includes(q) ||
      e.service.toLowerCase().includes(q);
    var matchFilter = filter === "All" || e.status === filter;
    return matchSearch && matchFilter;
  });

  var totalAll = enquiries.length;
  var totalNew = enquiries.filter(function (e) {
    return e.status === "New";
  }).length;
  var totalContacted = enquiries.filter(function (e) {
    return e.status === "Contacted";
  }).length;
  var totalProgress = enquiries.filter(function (e) {
    return e.status === "In Progress";
  }).length;
  var totalConverted = enquiries.filter(function (e) {
    return e.status === "Converted";
  }).length;
  var totalClosed = enquiries.filter(function (e) {
    return e.status === "Closed";
  }).length;

  var statItems = [
    { label: "Total", val: totalAll, color: "var(--dark)" },
    { label: "New", val: totalNew, color: "#e74c3c" },
    { label: "Contacted", val: totalContacted, color: "#2980b9" },
    { label: "In Progress", val: totalProgress, color: "#e67e22" },
    { label: "Converted", val: totalConverted, color: "#27ae60" },
    { label: "Closed", val: totalClosed, color: "#7f8c8d" },
  ];

  var countOf = {
    All: totalAll,
    New: totalNew,
    Contacted: totalContacted,
    "In Progress": totalProgress,
    Converted: totalConverted,
    Closed: totalClosed,
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {statItems.map(function (s) {
          return (
            <div
              key={s.label}
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "14px 16px",
                textAlign: "center",
                border: "1px solid #e5ede8",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: s.color,
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search by name, mobile, service..."
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 14px",
            border: "1.5px solid #dde5e0",
            borderRadius: "8px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            background: "var(--cream)",
            outline: "none",
          }}
        />
        <select
          value={filter}
          onChange={function (e) {
            setFilter(e.target.value);
          }}
          style={{
            padding: "10px 14px",
            border: "1.5px solid #dde5e0",
            borderRadius: "8px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.9rem",
            background: "var(--cream)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="All">All ({totalAll})</option>
          {STATUS_OPTIONS.map(function (s) {
            return (
              <option key={s} value={s}>
                {s} ({countOf[s]})
              </option>
            );
          })}
        </select>
        <button
          onClick={fetchEnquiries}
          style={{
            padding: "10px 18px",
            background: "var(--dark)",
            color: "var(--gold)",
            border: "none",
            borderRadius: "8px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--muted)",
          }}
        >
          Loading enquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "var(--muted)",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5ede8",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📭</div>
          <div style={{ fontSize: "1rem", fontWeight: 600 }}>
            No enquiries found
          </div>
          <div style={{ fontSize: "0.85rem", marginTop: "6px" }}>
            Customer enquiries from contact form will appear here
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5ede8",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--dark)" }}>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Mobile
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Service
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function (enq, i) {
                var rowBg = i % 2 === 0 ? "#fff" : "var(--cream)";
                var td = {
                  padding: "12px 14px",
                  fontSize: "0.88rem",
                  color: "var(--text)",
                  borderBottom: "1px solid #f0f4f1",
                };
                var selectStyle = {
                  padding: "5px 8px",
                  borderRadius: "6px",
                  border: "1px solid " + getStatusBorder(enq.status),
                  background: getStatusBg(enq.status),
                  color: getStatusColor(enq.status),
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none",
                };
                return (
                  <tr
                    key={enq.id}
                    style={{ background: rowBg, cursor: "pointer" }}
                    onClick={function () {
                      setSelected(enq);
                    }}
                  >
                    <td style={td}>{enq.id}</td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "var(--dark)",
                        borderBottom: "1px solid #f0f4f1",
                      }}
                    >
                      {enq.name}
                    </td>
                    <td style={td}>
                      <a
                        href={"tel:" + enq.mobile}
                        onClick={function (e) {
                          e.stopPropagation();
                        }}
                        style={{
                          color: "var(--gold)",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        {enq.mobile}
                      </a>
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "0.82rem",
                        color: "var(--muted)",
                        borderBottom: "1px solid #f0f4f1",
                      }}
                    >
                      {enq.service}
                    </td>
                    <td
                      style={td}
                      onClick={function (e) {
                        e.stopPropagation();
                      }}
                    >
                      <select
                        value={enq.status}
                        onChange={function (e) {
                          handleStatusChange(enq.id, e.target.value);
                        }}
                        style={selectStyle}
                      >
                        {STATUS_OPTIONS.map(function (s) {
                          return (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        borderBottom: "1px solid #f0f4f1",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(enq.createdAt)}
                    </td>
                    <td
                      style={td}
                      onClick={function (e) {
                        e.stopPropagation();
                      }}
                    >
                      <button
                        onClick={function () {
                          setSelected(enq);
                        }}
                        style={{
                          padding: "5px 10px",
                          background: "rgba(26,58,37,0.08)",
                          color: "var(--dark)",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          marginRight: "6px",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={function () {
                          handleDelete(enq.id);
                        }}
                        style={{
                          padding: "5px 10px",
                          background: "rgba(224,84,84,0.08)",
                          color: "#e05454",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          onClick={function () {
            setSelected(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10,18,12,0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={function (e) {
              e.stopPropagation();
            }}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.3rem",
                  color: "var(--dark)",
                  fontWeight: 700,
                }}
              >
                Enquiry Details
              </div>
              <button
                onClick={function () {
                  setSelected(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "var(--muted)",
                }}
              >
                X
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Customer Name
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {selected.name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Mobile Number
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {selected.mobile}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Email Address
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {selected.email ? selected.email : "Not provided"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Service Needed
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {selected.service}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Current Status
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {selected.status}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                Submitted On
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "var(--dark)",
                  fontWeight: 600,
                }}
              >
                {formatDate(selected.createdAt)}
              </span>
            </div>

            {selected.message ? (
              <div style={{ marginTop: "16px" }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Message
                </div>
                <div
                  style={{
                    background: "var(--cream)",
                    padding: "14px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: "var(--dark)",
                    lineHeight: 1.7,
                  }}
                >
                  {selected.message}
                </div>
              </div>
            ) : null}

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <a
                href={"tel:" + selected.mobile}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "var(--dark)",
                  color: "var(--gold)",
                  borderRadius: "8px",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Call Customer
              </a>
              <a
                href={"https://wa.me/91" + selected.mobile}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: "8px",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                WhatsApp
              </a>
              <button
                onClick={function () {
                  handleDelete(selected.id);
                }}
                style={{
                  padding: "11px 16px",
                  background: "rgba(224,84,84,0.1)",
                  color: "#e05454",
                  border: "1px solid rgba(224,84,84,0.3)",
                  borderRadius: "8px",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiryList;
