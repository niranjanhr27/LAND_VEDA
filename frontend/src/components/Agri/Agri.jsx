const agriCards = [
  {
    icon: "🌾",
    title: "Land Lease Arrangement",
    text: "We lease your land and manage it fully — cultivation, labour, inputs. You earn a fixed return without lifting a finger.",
  },
  {
    icon: "🤝",
    title: "Crop Share Model",
    text: "Prefer a performance-based arrangement? You receive 30% of the crop yield as your share — no upfront investment needed from you.",
  },
  {
    icon: "📄",
    title: "Document Recovery Services",
    text: "Missing RTC, mutation records, or survey documents? We arrange all missing paperwork through Revenue Department, Taluk, and court channels.",
  },
  {
    icon: "🗂️",
    title: "Full Land Title Assistance",
    text: "From land conversion and revenue records to khata formation and EC — we handle every step of formalising your land ownership.",
  },
];

function Agri() {
  return (
    <section
      id="agri"
      style={{
        padding: "100px 60px",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              color: "var(--gold)",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Rural & Agricultural Land
          </div>

          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "var(--dark)",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            Your Native Land Deserves
            <br />
            More Than Neglect
          </div>

          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.75,
              marginBottom: "24px",
            }}
          >
            Thousands of families own fertile land in Karnataka's rural
            districts but have no way to actively cultivate or oversee it.
            LandVeda changes that — we put your land to work and share the
            rewards with you.
          </p>

          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.75,
              marginBottom: "24px",
            }}
          >
            If you own land but lack the documents to prove it, we handle the
            complete A–Z documentation process through proper revenue and legal
            channels, restoring your rightful ownership on paper.
          </p>

          <a
            href="#contact-form"
            style={{
              display: "inline-block",
              background: "var(--gold)",
              color: "var(--dark)",
              padding: "16px 36px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            Talk to Our Land Expert
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {agriCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "var(--cream)",
                borderRadius: "10px",
                padding: "24px 28px",
                borderLeft: "3px solid var(--gold)",
              }}
            >
              <h5
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--dark)",
                  marginBottom: "6px",
                }}
              >
                {card.icon} {card.title}
              </h5>
              <p
                style={{
                  fontSize: "0.87rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Agri;
