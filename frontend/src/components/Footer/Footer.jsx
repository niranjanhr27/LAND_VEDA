function Footer() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--green) 0%, var(--dark) 100%)",
          textAlign: "center",
          padding: "100px 60px",
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
            textAlign: "center",
          }}
        >
          Get Started Today
        </div>

        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Your Property, In Safe Hands.
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.1rem",
            maxWidth: "560px",
            margin: "0 auto 44px",
            lineHeight: 1.7,
          }}
        >
          Whether you own a flat in Bengaluru, land in your native village, or a
          commercial property — LandVeda is your single trusted partner for all
          things property.
        </p>

        <a
          href="tel:+918792578028"
          style={{
            background: "var(--gold)",
            color: "var(--dark)",
            padding: "16px 36px",
            borderRadius: "4px",
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
            letterSpacing: "0.5px",
          }}
        >
          📞 Call Us for Free Consultation
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            marginTop: "60px",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            paddingTop: "48px",
          }}
        >
          {[
            {
              label: "Phone / WhatsApp",
              value: "+91 8792578028 / 9980534077 / 9844710892",
            },
            { label: "Email", value: "niranjanhr79@gmail.com" },
            {
              label: "Office Address",
              value:
                "No 93/4, Vidhyapeeta Main Road, Kengeri, Bengaluru – 560060",
            },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "6px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--gold-light)",
                  fontWeight: 500,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          background: "var(--dark)",
          padding: "40px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--gold)",
            letterSpacing: "1px",
          }}
        >
          Land<span style={{ color: "#fff" }}>Veda</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}>
          © 2025 LandVeda. All rights reserved. | Your Property, Our
          Responsibility.
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
          Bengaluru · Karnataka · India
        </p>
      </footer>
    </>
  );
}

export default Footer;
