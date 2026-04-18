import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav } from "./App.jsx";

const SLUG_TO_CODE = Object.fromEntries(
  Object.entries(STATES).map(([k, s]) => [s.name.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc"), k])
);

export default function StatePage() {
  const { stateSlug } = useParams();
  const code = SLUG_TO_CODE[stateSlug];
  const sd = code ? STATES[code] : null;

  if (!sd) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", color: T.text }}>State not found</h1>
      <Link to="/" style={{ color: T.accent }}>← Back to calculator</Link>
    </div>
  </div>;

  const labor = sd.labor;
  const permit = sd.permit;

  /* Sample deck: 300 sqft, mid-height, composite railing */
  const estimate = (matRate) => {
    const sqft = 300;
    const matCost = sqft * matRate;
    const frame = sqft * 11 * 1.12 * (sd.frost ? 1.08 : 1.0);
    const footings = Math.ceil(sqft / 75) * (sd.frost ? 240 : 170);
    const railing = 44 * 65; // 44 linear ft × composite rate
    const stairs = 2000;
    const preLabor = matCost + frame + footings + railing + stairs;
    const laborC = preLabor * (0.55 * (labor - 1) + 0.55);
    const cont = (preLabor + laborC + permit) * 0.08;
    return Math.round(preLabor + laborC + permit + cont);
  };

  const samples = Object.entries(DECK_MATERIALS).map(([id, m]) => ({
    id, label: m.label, life: m.life, maint: m.maint, total: estimate(m.sqftRate)
  }));

  const title = `${sd.name} Deck Cost 2026 — How Much Does a Deck Cost in ${sd.name}?`;
  const desc = `Real 2026 deck costs for ${sd.name}. Composite, pressure-treated, and PVC pricing with state labor rates, permits, and frost-line considerations.`;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://priceadeck.com/${stateSlug}`} />
    </Helmet>

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 60px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>State Cost Guide</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>How much does a deck cost in {sd.name}?</h1>
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>
        In {sd.name}, a standard 300 sqft deck runs roughly <strong style={{ color: T.accent }}>${samples[0].total.toLocaleString()}–${samples[3].total.toLocaleString()}</strong> depending on material. Labor runs {Math.round((labor - 1) * 100)}% {labor > 1 ? "above" : "below"} the national average, and permits typically cost about ${permit}.{sd.frost ? " Frost-line footings add 8–12% to the build." : ""}
      </p>

      <Card>
        <Ttl>Cost by material — 300 sqft deck in {sd.name}</Ttl>
        <Dsc>Standard 12×25 deck, 3–5 ft off ground, composite balusters, one stair run. Includes framing, footings, railing, stairs, permit, and 8% contingency.</Dsc>
        <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
          {samples.map((s, i) => <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, padding: "14px 16px", borderBottom: i < samples.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: T.textDim, marginTop: 2 }}>{s.life} · {s.maint}</div>
            </div>
            <div style={{ fontSize: 12, color: T.textMid, textAlign: "right" }}>${Math.round(s.total / 300)}/sqft</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.accent, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${s.total.toLocaleString()}</div>
          </div>)}
        </div>
      </Card>

      <Card>
        <Ttl>What drives cost in {sd.name}</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}>
          <p><strong style={{ color: T.text }}>Labor ({Math.round(labor * 100)}% of national avg).</strong> {labor > 1.1 ? "Contractor rates are significantly above average here — expect to pay a premium for experienced deck crews." : labor < 0.9 ? "Labor is below national averages, keeping full builds affordable." : "Labor runs close to the US average."}</p>
          <p><strong style={{ color: T.text }}>Permits (~${permit}).</strong> Most {sd.name} municipalities require a building permit for any deck over 30 inches. Inspections typically happen at the footing and final stages.</p>
          {sd.frost && <p><strong style={{ color: T.text }}>Frost-line footings.</strong> {sd.name}'s frost line forces footings 36–48 inches deep, adding roughly $50–80 per pier and extra concrete volume. Budget 8–12% more than warm-climate equivalents.</p>}
          <p><strong style={{ color: T.text }}>Materials.</strong> Pressure-treated pine is the cheapest per sqft; composite (Trex, TimberTech) is 2–3× more but almost maintenance-free. Most {sd.name} homeowners picking a mid-tier build land on composite.</p>
        </div>
      </Card>

      <Card style={{ background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Ready for your own estimate?</Ttl>
        <Dsc>Adjust size, material, height, and features to fit your yard. Get a {sd.name}-specific number in under 2 minutes.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 13, color: T.textMid, marginBottom: 10 }}>Related guides</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/blog/composite-vs-wood-vs-pvc" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Composite vs Wood vs PVC →</Link>
          <Link to="/blog/deck-cost-guide" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Deck Cost Guide →</Link>
          <Link to="/blog/deck-permits-and-codes" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Deck Permits →</Link>
        </div>
      </div>
    </div>
  </div>;
}
