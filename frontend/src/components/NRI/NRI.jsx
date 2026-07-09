const features = [
  {
    icon: "🛡️",
    title: "Anti-Encroachment Surveillance",
    text: "Regular site visits, boundary verification, and immediate action against any unauthorized entry or occupation.",
  },
  {
    icon: "🌿",
    title: "Property Maintenance & Greening",
    text: "Upkeep of structures, landscaping, and greening initiatives that preserve and enhance property value.",
  },
  {
    icon: "📋",
    title: "Tax & Document Management",
    text: "Timely property tax payments, khata updates, mutation, and secure digital document archiving on your behalf.",
  },
  {
    icon: "⚖️",
    title: "Legal Support & Advisory",
    text: "Liaison with legal experts for dispute resolution, title verification, and compliance advisory for NRI-owned assets.",
  },
];

const checkList = [
  "Monthly physical property inspection reports with photos",
  "Annual property tax payment and receipt delivery",
  "Khata facility and transfer assistance",
  "Security and CCTV surveillance coordination",
  "Encroachment prevention and immediate alerts",
  "Real estate transaction support when you're ready to Buy/Sell or lease",
  "Revenue department and BDA/BBMP work liaison",
];

function NRI() {
  return (
    <section
      id="nri"
      style={{
        padding: "100px 60px",
        background:
          "linear-gradient(135deg, var(--dark) 0%, var(--green) 100%)",
        color: "#fff",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "2.5px",
          color: "var(--gold-light)",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        For NRIs & IT Professionals
      </div>

      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.2,
          marginBottom: "20px",
        }}
      >
        Protecting Your Property While
        <br />
        You're Far Away
      </div>

      <div
        style={{
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.6)",
          maxWidth: "600px",
          lineHeight: 1.7,
          marginBottom: "60px",
        }}
      >
        Land encroachment, unpaid taxes, decaying structures — these are the
        silent threats facing unattended properties. We eliminate them.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  minWidth: "48px",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                }}
              >
                {f.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "16px",
            padding: "48px",
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.5rem",
              marginBottom: "24px",
              color: "var(--gold-light)",
            }}
          >
            Our Remote Property Care Package Includes:
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {checkList.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: "var(--gold)",
                    fontWeight: 700,
                    minWidth: "16px",
                  }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default NRI;
