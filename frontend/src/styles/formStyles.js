export const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  background: "rgba(10,18,12,0.82)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

export const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #e5ede8",
  boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  padding: "44px 42px",
  width: "100%",
  maxHeight: "94vh",
  overflowY: "auto",
};

export const backBtnStyle = {
  background: "none",
  border: "none",
  color: "var(--muted)",
  fontFamily: "DM Sans, sans-serif",
  fontSize: "0.83rem",
  cursor: "pointer",
  padding: 0,
  marginBottom: "26px",
  display: "block",
};

export const titleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "1.85rem",
  fontWeight: 700,
  color: "var(--dark)",
  marginBottom: "4px",
};

export const subStyle = {
  fontSize: "0.85rem",
  color: "var(--muted)",
  marginBottom: "28px",
};

export const errorStyle = {
  background: "rgba(224,84,84,0.1)",
  border: "1px solid rgba(224,84,84,0.3)",
  color: "var(--danger)",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginBottom: "16px",
};

export const fgStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px",
};

export const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--text)",
};

export const inputStyle = {
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

export const goldBtnStyle = {
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
  marginTop: "6px",
};
