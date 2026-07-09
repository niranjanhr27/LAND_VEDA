function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--dark) 0%, var(--green) 60%, #1e4d30 100%)",
        display: "flex",
        alignItems: "center",
        padding: "120px 60px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "700px", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "var(--gold-light)",
            fontSize: "0.78rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "20px",
            marginBottom: "28px",
          }}
        >
          🏡 Karnataka Trusted Property Partner
        </div>

        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "24px",
          }}
        >
          Your Property.
          <br />
          <em style={{ color: "var(--gold)", fontStyle: "normal" }}>
            Our Responsibility.
          </em>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "560px",
            marginBottom: "44px",
          }}
        >
          End-to-end property management, real estate transactions, government
          services, and rural land care — all under one trusted roof. Whether
          you're in Bengaluru, Bangalore Rural, or across the world, we've got
          your property covered.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#contact-form"
            style={{
              background: "var(--gold)",
              color: "var(--dark)",
              padding: "16px 36px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
            }}
          >
            Get Free Consultation
          </a>
          <a
            href="#services"
            style={{
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "#fff",
              padding: "16px 36px",
              borderRadius: "4px",
              fontWeight: 500,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            Explore Services
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "60px",
          bottom: "80px",
          display: "flex",
          gap: "48px",
        }}
      >
        {[
          { num: "500+", label: "Properties Managed" },
          { num: "100%", label: "Transparency" },
          { num: "A–Z", label: "Services Covered" },
        ].map((stat) => (
          <div key={stat.label}>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "2.4rem",
                fontWeight: 700,
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {stat.num}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.5)",
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
