import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, T, Card, Ttl, Dsc, Nav } from "./App.jsx";

const slugify = (name) => name.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc");

export default function HubPage() {
  const groups = {
    "Warm-Climate States": ["FL","TX","CA","AZ","GA","NC","SC","LA","MS","AL","NV","HI","NM","OK","TN"],
    "Northeast": ["NY","NJ","CT","MA","RI","NH","VT","ME","PA"],
    "Midwest": ["IL","IN","OH","MI","WI","MN","IA","MO","KS","NE","ND","SD"],
    "Mountain West / Pacific NW": ["CO","UT","ID","MT","WY","WA","OR","AK"],
    "Other": ["VA","MD","DC","DE","WV","KY","AR"],
  };

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>Deck Cost by State 2026 — Every US State</title>
      <meta name="description" content="Deck cost data for every US state. Real 2026 pricing for composite, pressure-treated, cedar, and PVC decks with state-level labor and permit detail." />
      <link rel="canonical" href="https://priceadeck.com/deck-cost-by-state" />
    </Helmet>

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 60px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>State Directory</div>
      <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Deck cost by state</h1>
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.55, maxWidth: 640, marginBottom: 36 }}>Pick your state for 2026 deck cost data: material-by-material pricing, state labor adjustments, permit costs, and frost-line considerations where they apply.</p>

      {Object.entries(groups).map(([group, codes]) => <div key={group} style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10 }}>{group}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
          {codes.map(c => STATES[c] && <Link key={c} to={`/${slugify(STATES[c].name)}`} style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.borderLight}`, background: T.card, color: T.text, textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{STATES[c].name}</span>
            <span style={{ fontSize: 10, color: T.textDim, fontWeight: 500 }}>{Math.round(STATES[c].labor * 100)}%</span>
          </Link>)}
        </div>
      </div>)}

      <Card style={{ marginTop: 36, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Get your own estimate</Ttl>
        <Dsc>Adjust size, material, and features — the calculator factors in your state automatically.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open calculator →</Link>
      </Card>
    </div>
  </div>;
}
