const servicesList = [
  {
    num: "01",
    title: "Property Buying Assistance",
    text: "Expert guidance on site selection, price negotiation, due diligence, and finalising your ideal property — residential, commercial, or agricultural.",
  },
  {
    num: "02",
    title: "Property Selling Services",
    text: "End-to-end selling support: valuation, buyer outreach, documentation, and deal closure at the best market value.",
  },
  {
    num: "03",
    title: "Real Estate Consultation",
    text: "Strategic advice on investment decisions, market trends, portfolio management, and legal compliance for your property assets.",
  },
  {
    num: "04",
    title: "Property Management",
    text: "Comprehensive management including inspection, maintenance, security, tenant coordination, and periodic reporting to property owners.",
  },
  {
    num: "05",
    title: "Property Inspection & Surveillance",
    text: "Regular physical inspections and security monitoring to prevent encroachment, damage, and unauthorized occupation of your property.",
  },
  {
    num: "06",
    title: "Document Recovery & Arrangement",
    text: "Your land, your right. We help arrange missing or incomplete property documents — from scratch, through proper legal and revenue channels.",
  },
  {
    num: "07",
    title: "Building Plan Sanction",
    text: "Full support for building plan approvals from BDA, BBMP (GBA), and local planning authorities — from preparation to final sanction.",
  },
  {
    num: "08",
    title: "Property Registration",
    text: "Seamless handling of sale deed registration, gift deeds, partition deeds, and all sub-registrar office procedures.",
  },
  {
    num: "09",
    title: "Agricultural Land Services",
    text: "We take idle land on lease or offer a crop-share arrangement — converting your unproductive native or rural land into an earning asset.",
  },
];

function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "100px 60px",
        background: "var(--cream)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "60px",
          flexWrap: "wrap",
          gap: "24px",
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
            What We Do
          </div>
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "var(--dark)",
              lineHeight: 1.2,
            }}
          >
            Complete Property Services
            <br />
            from Transaction to Care
          </div>
        </div>
        <div
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: "360px",
            lineHeight: 1.7,
          }}
        >
          Every service you need for your property — under one roof, delivered
          by one trusted team.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          background: "#d4dcda",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {servicesList.map((svc) => (
          <div
            key={svc.num}
            style={{
              background: "#fff",
              padding: "40px 36px",
              cursor: "default",
            }}
            // if we mouseover it shows green color

            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--smoke white)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--gold)",
                fontWeight: 700,
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              {svc.num}
            </div>
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--dark)",
                marginBottom: "12px",
              }}
            >
              {svc.title}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              {svc.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
