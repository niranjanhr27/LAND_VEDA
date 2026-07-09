import { TEAM_MEMBERS } from "../../data/constants";
import { useAuth } from "../../context/AuthContext";

function TeamGrid() {
  const { currentAdmin } = useAuth();

  return (
    <div>
      <div style={titleStyle}>LandVeda Team</div>
      <div style={subtitleStyle}>7 expert property professionals serving Karnataka</div>

      <div style={gridStyle}>
        {TEAM_MEMBERS.map((member) => {
          const isCurrentAdmin = currentAdmin?.username === member.username;
          return (
            <div
              key={member.username}
              style={{
                ...cardStyle,
                border: isCurrentAdmin
                  ? "2px solid var(--gold)"
                  : "1px solid #e5ede8",
              }}
            >
              {isCurrentAdmin && <div style={youBadgeStyle}>YOU</div>}

              <div style={avatarStyle}>{member.avatar}</div>
              <div style={nameStyle}>{member.displayName}</div>
              <div style={roleStyle}>{member.role}</div>

              <div style={handlerStyle}>
                Handler: <strong style={{ color: "var(--dark)" }}>@{member.username}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const titleStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "1.3rem",
  color: "var(--dark)",
  marginBottom: "6px",
};

const subtitleStyle = {
  fontSize: "0.85rem",
  color: "var(--muted)",
  marginBottom: "24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "28px 22px",
  textAlign: "center",
  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  position: "relative",
};

const youBadgeStyle = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "var(--gold)",
  color: "var(--dark)",
  fontSize: "0.65rem",
  fontWeight: 700,
  padding: "3px 8px",
  borderRadius: "8px",
  letterSpacing: "1px",
};

const avatarStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  background: "var(--dark)",
  color: "var(--gold)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "DM Sans, sans-serif",
  fontWeight: 700,
  fontSize: "1rem",
  margin: "0 auto 14px",
  border: "2px solid var(--gold)",
};

const nameStyle = {
  fontFamily: "Playfair Display, serif",
  fontSize: "1rem",
  fontWeight: 700,
  color: "var(--dark)",
  marginBottom: "4px",
};

const roleStyle = {
  fontSize: "0.78rem",
  color: "var(--gold)",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "12px",
};

const handlerStyle = {
  background: "var(--cream)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "0.8rem",
  color: "var(--muted)",
};

export default TeamGrid;
