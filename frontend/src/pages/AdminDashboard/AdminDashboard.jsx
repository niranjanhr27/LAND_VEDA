// AdminDashboard.jsx — Admin portal with Enquiries tab added

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import ClientList from "./ClientList";
import UploadDoc from "./UploadDoc";
import AddClient from "./AddClient";
import TeamGrid from "./TeamGrid";
import EnquiryList from "./EnquiryList";
import { enquiryAPI } from "../../data/api";

function AdminDashboard({ onLogout }) {
  const { currentAdmin, loadClients, loadDocs } = useAuth();
  const [activeTab, setActiveTab] = useState("clients");
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    pending: 0,
    completed: 0,
    docs: 0,
  });
  const [newEnquiries, setNewEnquiries] = useState(0);

  const fetchStats = useCallback(async () => {
    const clients = await loadClients();
    const allDocs = await Promise.all(clients.map((c) => loadDocs(c.id)));
    const totalDocs = allDocs.reduce((sum, docs) => sum + docs.length, 0);
    setStats({
      total: clients.length,
      inProgress: clients.filter((c) => c.status === "In Progress").length,
      pending: clients.filter((c) => c.status === "Pending").length,
      completed: clients.filter((c) => c.status === "Completed").length,
      docs: totalDocs,
    });
  }, [loadClients, loadDocs]);

  const fetchEnquiryCount = useCallback(async () => {
    try {
      const res = await enquiryAPI.getCount();
      setNewEnquiries(res.data);
    } catch (err) {
      console.error(err);
      setNewEnquiries(0);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
    fetchEnquiryCount();
  }, [fetchStats, fetchEnquiryCount]);

  const statCards = [
    { icon: "👥", val: stats.total, lbl: "Total Clients" },
    { icon: "⚡", val: stats.inProgress, lbl: "In Progress" },
    { icon: "⏳", val: stats.pending, lbl: "Pending" },
    { icon: "✅", val: stats.completed, lbl: "Completed" },
    { icon: "📁", val: stats.docs, lbl: "Total Documents" },
    { icon: "📩", val: newEnquiries, lbl: "New Enquiries" },
  ];

  const tabs = [
    { key: "clients", label: "👥 Client List" },
    { key: "upload", label: "📤 Upload Document" },
    { key: "addclient", label: "➕ Add Client" },
    {
      key: "enquiries",
      label: `📩 Enquiries${newEnquiries > 0 ? ` (${newEnquiries})` : ""}`,
    },
    { key: "team", label: "🏆 Team" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f1", width: "100%" }}>
      {/* Navbar */}
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
            PDBMS · Admin
          </small>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
              {currentAdmin?.name}
            </div>
            <div style={{ color: "var(--gold)", fontSize: "0.72rem" }}>
              {currentAdmin?.role}
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
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          {statCards.map((s) => (
            <div key={s.lbl} style={statCardStyle}>
              <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color:
                    s.lbl === "New Enquiries" && s.val > 0
                      ? "#e74c3c"
                      : "var(--dark)",
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
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "24px",
            background: "#fff",
            padding: "5px",
            borderRadius: "10px",
            border: "1px solid #e5ede8",
            width: "fit-content",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (tab.key === "enquiries") fetchEnquiryCount();
              }}
              style={{
                padding: "9px 20px",
                borderRadius: "7px",
                border: "none",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  activeTab === tab.key ? "var(--dark)" : "transparent",
                color: activeTab === tab.key ? "var(--gold)" : "var(--muted)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "clients" && <ClientList onRefreshStats={fetchStats} />}
        {activeTab === "upload" && <UploadDoc />}
        {activeTab === "addclient" && (
          <AddClient
            onDone={() => {
              setActiveTab("clients");
              fetchStats();
            }}
          />
        )}
        {activeTab === "enquiries" && <EnquiryList />}
        {activeTab === "team" && <TeamGrid />}
      </div>
    </div>
  );
}

const statCardStyle = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px 22px",
  textAlign: "center",
  border: "1px solid #e5ede8",
  boxShadow: "0 3px 14px rgba(0,0,0,0.05)",
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

export default AdminDashboard;
