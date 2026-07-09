const govtItems = [
  { icon: "🏛️", title: "BDA Works & Approvals" },
  { icon: "🏙️", title: "BBMP / GBA Services" },
  { icon: "📋", title: "Khata Facility & Transfer" },
  { icon: "💰", title: "Online Property Tax Payment" },
  { icon: "📝", title: "Property Registration" },
  { icon: "🏗️", title: "Building Plan Sanction" },
  { icon: "🗂️", title: "Revenue Department Works" },
  { icon: "🔍", title: "Encumbrance Certificate (EC)" },
  { icon: "📊", title: "RTC & Mutation Records" },
  { icon: "🔄", title: "Land Conversion (DC Order)" },
  { icon: "📌", title: "Survey & Boundary Marking" },
  { icon: "⚡", title: "Khata Bifurcation & Amalgamation" },
];

function GovtServices() {
  return (
    <section
      id="govt"
      style={{
        padding: "100px 60px",
        background: "var(--cream)",
      }}
    >
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
        Government & Online Services
      </div>

      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 700,
          color: "var(--dark)",
          lineHeight: 1.2,
          marginBottom: "20px",
        }}
      >
        We Handle the Red Tape. You Relax.
      </div>

      <div
        style={{
          fontSize: "1.05rem",
          color: "var(--muted)",
          maxWidth: "600px",
          lineHeight: 1.7,
          marginBottom: "60px",
        }}
      >
        Navigating government offices can be time-consuming and confusing. Our
        team manages every official procedure on your behalf.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {govtItems.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "28px 24px",
              textAlign: "center",
              border: "1px solid #e5ede8",
              transition: "all 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5ede8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "14px" }}>
              {item.icon}
            </div>
            <h5
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--dark)",
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GovtServices;
