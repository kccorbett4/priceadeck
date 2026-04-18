import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav } from "./App.jsx";

const CITIES = {
  houston:    { name: "Houston",     state: "TX", mult: 0.95, note: "Humid coastal climate favors composite or PVC for rot resistance. Hurricane codes may require extra footings." },
  dallas:     { name: "Dallas",      state: "TX", mult: 0.97, note: "Expansive clay soil benefits from deeper footings or helical piles. 10-month deck season." },
  phoenix:    { name: "Phoenix",     state: "AZ", mult: 1.00, note: "Intense UV degrades wood fast — composite and PVC cost 20–40% less over a 15-year window." },
  atlanta:    { name: "Atlanta",     state: "GA", mult: 0.96, note: "Pine-rich region keeps PT lumber cheap. Red clay soil is stable but requires decent drainage." },
  charlotte:  { name: "Charlotte",   state: "NC", mult: 0.94, note: "Moderate climate, affordable labor. Strong market for both PT and composite." },
  denver:     { name: "Denver",      state: "CO", mult: 1.06, note: "Dry climate preserves wood well. Altitude and snow load raise framing costs ~5–10%." },
  nashville:  { name: "Nashville",   state: "TN", mult: 0.93, note: "Rapidly growing market. Labor is still below US average despite housing boom." },
  columbus:   { name: "Columbus",    state: "OH", mult: 0.95, note: "Midwest averages, with frost-line footings adding roughly 8%. Long freeze-thaw cycles favor composite." },
  minneapolis:{ name: "Minneapolis", state: "MN", mult: 1.04, note: "Extreme freeze-thaw demands composite or PVC for longevity. Frost-line is 48 inches — expect footings to cost 15% more." },
  boston:     { name: "Boston",      state: "MA", mult: 1.14, note: "Highest-cost metro on this list. Historic districts often require specific materials and design review." },
};

export default function CityPage() {
  const { citySlug } = useParams();
  const city = CITIES[citySlug];

  if (!city) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ fontFamily: "'Fraunces',Georgia,serif" }}>City not found</h1>
      <Link to="/" style={{ color: T.accent }}>← Back to calculator</Link>
    </div>
  </div>;

  const sd = STATES[city.state];
  const effLabor = sd.labor * city.mult;

  const estimate = (matRate) => {
    const sqft = 300;
    const matCost = sqft * matRate;
    const frame = sqft * 11 * 1.12 * (sd.frost ? 1.08 : 1.0);
    const footings = Math.ceil(sqft / 75) * (sd.frost ? 240 : 170);
    const railing = 44 * 65;
    const stairs = 2000;
    const preLabor = matCost + frame + footings + railing + stairs;
    const laborC = preLabor * (0.55 * (effLabor - 1) + 0.55);
    const cont = (preLabor + laborC + sd.permit) * 0.08;
    return Math.round(preLabor + laborC + sd.permit + cont);
  };

  const samples = Object.entries(DECK_MATERIALS).map(([id, m]) => ({
    id, label: m.label, total: estimate(m.sqftRate)
  }));

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{city.name} Deck Cost 2026 — Real Pricing & Local Considerations</title>
      <meta name="description" content={`2026 deck cost in ${city.name}, ${sd.name}. Composite, pressure-treated, PVC pricing with metro labor adjustment and climate factors.`} />
      <link rel="canonical" href={`https://priceadeck.com/city/${citySlug}`} />
    </Helmet>

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 60px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{sd.name} · Metro</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>Deck cost in {city.name}</h1>
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>
        A standard 300 sqft deck in {city.name} runs about <strong style={{ color: T.accent }}>${samples[0].total.toLocaleString()}–${samples[3].total.toLocaleString()}</strong> depending on material. Effective labor rate is {Math.round(effLabor * 100)}% of the US average ({city.mult > 1 ? "+" : ""}{Math.round((city.mult - 1) * 100)}% metro adjustment on {sd.name} base).
      </p>

      <Card>
        <Ttl>What's different about {city.name}</Ttl>
        <Dsc>{city.note}</Dsc>
      </Card>

      <Card>
        <Ttl>Cost by material — 300 sqft deck</Ttl>
        <Dsc>12×25 mid-height deck with composite balusters, stairs, permit, and 8% contingency.</Dsc>
        <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
          {samples.map((s, i) => <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, padding: "14px 16px", borderBottom: i < samples.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: T.textMid, textAlign: "right" }}>${Math.round(s.total / 300)}/sqft</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.accent, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${s.total.toLocaleString()}</div>
          </div>)}
        </div>
      </Card>

      <Card style={{ background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Get your own {city.name} estimate</Ttl>
        <Dsc>Use your ZIP code for an even tighter number — the calculator auto-detects your metro.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>
    </div>
  </div>;
}
