const steps = [
  {
    num: "1",
    title: "Free Consultation",
    text: "Tell us about your property, your concerns, and your goals. We listen first.",
  },
  {
    num: "2",
    title: "Detailed Assessment",
    text: "We conduct a thorough review of your property status, documents, and requirements.",
  },
  {
    num: "3",
    title: "Custom Action Plan",
    text: "A clear roadmap with timelines, responsibilities, and transparent pricing — no surprises.",
  },
  {
    num: "4",
    title: "Execution & Updates",
    text: "We execute on your behalf and keep you updated at every milestone with documentation.",
  },
];

function Process() {
  return (
    <section
      style={{
        padding: "100px 60px",
        background: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
          How It Works
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
          Simple. Transparent. Reliable.
        </div>

        <div
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Our four-step process ensures your property matters are handled
          efficiently from start to finish.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(to right, var(--gold), var(--gold-light), var(--gold))",
            zIndex: 0,
          }}
        />

        {steps.map((step) => (
          <div
            key={step.num}
            style={{
              flex: 1,
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              padding: "0 20px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "var(--dark)",
                color: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Playfair Display, serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                margin: "0 auto 20px",
                border: "3px solid var(--gold)",
              }}
            >
              {step.num}
            </div>

            <h4
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--dark)",
                marginBottom: "8px",
              }}
            >
              {step.title}
            </h4>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
