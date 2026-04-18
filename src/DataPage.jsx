import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav, estimateSample } from "./App.jsx";

const slugify = (name) => name.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc");

export default function DataPage() {
  const sample = (code, id) => {
    const m = DECK_MATERIALS[id];
    return estimateSample({ matRate: m.sqftRate, fastenerRate: m.fastenerRate, stepRate: m.stepRate, stateCode: code });
  };

  const rows = Object.entries(STATES).map(([k, s]) => ({
    code: k,
    name: s.name,
    slug: slugify(s.name),
    pt: sample(k, "pt"),
    composite: sample(k, "composite"),
    pvc: sample(k, "pvc"),
    labor: Math.round(s.labor * 100),
    frost: s.frost,
  })).sort((a, b) => a.name.localeCompare(b.name));

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>Deck Cost Data 2026 — 300 sqft Deck Pricing Across All 50 States</title>
      <meta name="description" content="2026 deck cost dataset. 300 sqft deck pricing in every US state for pressure-treated, composite, and PVC materials." />
      <link rel="canonical" href="https://priceadeck.com/deck-cost-data" />
    </Helmet>

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 60px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>National Dataset</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>Deck cost data — all 50 states</h1>
      <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>Standard 12×25 (300 sqft) mid-height deck with composite balusters, one stair run, permit, and 8% contingency. Figures include framing, footings, labor, and finish.</p>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 0.7fr", padding: "14px 18px", background: T.cardAlt, borderBottom: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <div>State</div>
          <div style={{ textAlign: "right" }}>PT Pine</div>
          <div style={{ textAlign: "right" }}>Composite</div>
          <div style={{ textAlign: "right" }}>PVC</div>
          <div style={{ textAlign: "right" }}>Labor</div>
        </div>
        {rows.map((r, i) => <Link key={r.code} to={`/${r.slug}`} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 0.7fr", padding: "12px 18px", borderBottom: i < rows.length - 1 ? `1px solid ${T.borderLight}` : "none", textDecoration: "none", color: T.text, fontSize: 13, alignItems: "center" }}>
          <div style={{ fontWeight: 600 }}>{r.name} {r.frost && <span title="Frost-line footings required" style={{ fontSize: 10, color: T.textDim, marginLeft: 4 }}>❄️</span>}</div>
          <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${r.pt.toLocaleString()}</div>
          <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600, color: T.accent }}>${r.composite.toLocaleString()}</div>
          <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${r.pvc.toLocaleString()}</div>
          <div style={{ textAlign: "right", fontSize: 11, color: T.textDim }}>{r.labor}%</div>
        </Link>)}
      </Card>

      <div style={{ fontSize: 11, color: T.textDim, marginTop: 14, lineHeight: 1.6 }}>
        Methodology: Board material + fasteners + 8% waste, all scaled by sqft. $10.50/sqft framing baseline × mid-height × frost multiplier. Footings (~1 per 60 sqft, min 4) × $180 ($260 frost). 20 ft ledger × $26. Composite stair run scaled by material. Composite railing at $65/lf. State labor multiplier applied at 42% + 40% × (multiplier − 1) of subtotal. Base permit + $0.50/sqft. 8% contingency. Labor column = state wage index relative to US average (100%).
      </div>
    </div>
  </div>;
}
