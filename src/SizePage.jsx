import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav, estimateSample } from "./App.jsx";
import { Breadcrumbs, FAQBlock, ArticleSchema, Byline } from "./SeoHelpers.jsx";

const SIZES = [
  { slug: "deck-cost-10x10", L: 10, W: 10 },
  { slug: "deck-cost-10x12", L: 10, W: 12 },
  { slug: "deck-cost-12x12", L: 12, W: 12 },
  { slug: "deck-cost-12x16", L: 12, W: 16 },
  { slug: "deck-cost-12x20", L: 12, W: 20 },
  { slug: "deck-cost-14x16", L: 14, W: 16 },
  { slug: "deck-cost-14x20", L: 14, W: 20 },
  { slug: "deck-cost-16x16", L: 16, W: 16 },
  { slug: "deck-cost-16x20", L: 16, W: 20 },
  { slug: "deck-cost-20x20", L: 20, W: 20 },
];

export const SIZE_SLUGS = SIZES.map(s => s.slug);
const SLUG_TO_SIZE = Object.fromEntries(SIZES.map(s => [s.slug, s]));

const describeUse = (sqft) => {
  if (sqft <= 120) return "a 2–4 person conversation area, small grill, and two chairs — common for second-story walkouts and starter decks";
  if (sqft <= 200) return "a 4–6 person dining table plus a grill, or a lounge area with two loveseats";
  if (sqft <= 300) return "a dining table for 6, a separate lounge zone, and a grill area — the most common build size in the US";
  if (sqft <= 400) return "a large dining set, full lounge, a grill area, and room for a hot tub or fire table";
  return "a multi-zone entertaining deck: dining, lounging, cooking, and a hot tub or fire feature with room to move";
};

export default function SizePage() {
  const sizeSlug = useLocation().pathname.replace(/^\//, "").replace(/\/$/, "");
  const size = SLUG_TO_SIZE[sizeSlug];

  if (!size) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", color: T.text }}>Size not found</h1>
      <Link to="/" style={{ color: T.accent }}>← Back to calculator</Link>
    </div>
  </div>;

  const sqft = size.L * size.W;
  const dims = `${size.L}x${size.W}`;
  const dimsPretty = `${size.L}×${size.W}`;

  // US average: avg labor ~1.0, avg permit ~$250, no metro mult
  const materials = Object.entries(DECK_MATERIALS).map(([id, m]) => ({
    id,
    label: m.label,
    life: m.life,
    maint: m.maint,
    total: estimateSample({ matRate: m.sqftRate, fastenerRate: m.fastenerRate, stepRate: m.stepRate, stateCode: "TX", sqft }),
  }));

  const statesForTable = ["TX", "CA", "NY", "FL", "CO", "MN", "MA", "GA", "OH", "AZ"];
  const stateRows = statesForTable.map(code => ({
    state: STATES[code].name,
    code,
    total: estimateSample({ matRate: DECK_MATERIALS.composite.sqftRate, fastenerRate: DECK_MATERIALS.composite.fastenerRate, stepRate: DECK_MATERIALS.composite.stepRate, stateCode: code, sqft }),
  }));

  const low = materials[0].total; // PT
  const high = materials[4].total; // ipe

  const title = `${dimsPretty} Deck Cost 2026 — How Much for a ${dimsPretty} Deck?`;
  const desc = `Real 2026 installed cost for a ${dimsPretty} (${sqft} sqft) deck — priced by material, by state, with honest labor and permit breakdowns.`;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://priceadeck.com/${size.slug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`https://priceadeck.com/${size.slug}`} />
      <meta property="og:image" content="https://priceadeck.com/og-image.jpg" />
    </Helmet>

    <ArticleSchema
      headline={`${dimsPretty} Deck Cost 2026`}
      description={desc}
      slug={`/${size.slug}`}
      datePublished="2026-04-01"
      dateModified="2026-04-18"
    />

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 24px 60px" }}>
      <Breadcrumbs trail={[
        { name: "Home", path: "/" },
        { name: "Cost by Size", path: "/blog/deck-cost-by-size" },
        { name: `${dimsPretty} Deck`, path: `/${size.slug}` },
      ]} />

      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{sqft} sqft · {dimsPretty} ft</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>How much does a {dimsPretty} deck cost?</h1>
      <Byline />
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>
        A <strong>{dimsPretty} ({sqft} sqft) deck costs <span style={{ color: T.accent }}>${low.toLocaleString()}–${high.toLocaleString()}</span></strong> installed in 2026, depending on material and state. The lower end is pressure-treated pine in an average-labor state; the upper end is premium hardwood in a high-labor metro. Most homeowners picking a mid-tier composite land at <strong>${materials[2].total.toLocaleString()}</strong>.
      </p>

      <Card>
        <Ttl>What a {dimsPretty} deck fits</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}>
          <p>At {sqft} square feet, a {dimsPretty} deck comfortably holds {describeUse(sqft)}.</p>
          <p style={{ marginTop: 10 }}>For perspective: a 4-person round dining table needs about 80 sqft clear space. A standard outdoor couch plus coffee table needs 50–70 sqft. A built-in grill station needs 20–30 sqft plus clearance. Add 6 feet of circulation paths on active sides.</p>
        </div>
      </Card>

      <Card>
        <Ttl>Cost by material — {dimsPretty} deck (US average)</Ttl>
        <Dsc>Mid-height ({sqft < 200 ? "3–5" : "4–6"} ft) build, composite balusters, one stair run, permit, 8% contingency. Baseline uses a national average labor rate.</Dsc>
        <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
          {materials.map((m, i) => <div key={m.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, padding: "14px 16px", borderBottom: i < materials.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: T.textDim, marginTop: 2 }}>{m.life} · {m.maint}</div>
            </div>
            <div style={{ fontSize: 12, color: T.textMid, textAlign: "right" }}>${Math.round(m.total / sqft)}/sqft</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: T.accent, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${m.total.toLocaleString()}</div>
          </div>)}
        </div>
      </Card>

      <Card>
        <Ttl>{dimsPretty} composite deck cost by state</Ttl>
        <Dsc>Same {sqft} sqft composite build, state-by-state. Metro labor can shift these another ±5–15%.</Dsc>
        <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
          {stateRows.map((r, i) => <div key={r.code} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, padding: "12px 16px", borderBottom: i < stateRows.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}>
            <Link to={`/${r.state.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc")}`} style={{ fontWeight: 600, fontSize: 14, color: T.text, textDecoration: "none" }}>{r.state}</Link>
            <div style={{ fontSize: 12, color: T.textMid, textAlign: "right" }}>${Math.round(r.total / sqft)}/sqft</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${r.total.toLocaleString()}</div>
          </div>)}
        </div>
      </Card>

      <FAQBlock
        title={`${dimsPretty} deck cost — FAQ`}
        items={[
          { q: `How much does a ${dimsPretty} deck cost?`, a: `A ${dimsPretty} (${sqft} sqft) deck costs $${low.toLocaleString()}–$${high.toLocaleString()} installed in 2026. Pressure-treated pine is the cheapest at ~$${Math.round(low/sqft)}/sqft; composite (Trex, TimberTech) runs ~$${Math.round(materials[2].total/sqft)}/sqft; premium hardwood (ipe) runs up to ~$${Math.round(high/sqft)}/sqft. Labor is 40–55% of the total.` },
          { q: `Can I build a ${dimsPretty} deck myself?`, a: `${sqft <= 200 ? `Yes — a ${dimsPretty} deck is within reach for an experienced DIYer over 2–3 weekends, especially in pressure-treated pine.` : `Possibly, but a ${dimsPretty} deck at ${sqft} sqft is on the larger side for DIY. Framing, ledger attachment, and stair construction are code-critical steps many jurisdictions require to be inspected.`} Expect to save 40–55% on labor if you're capable; add 10–15% to material budget for wasted cuts and mistakes.` },
          { q: `Do I need a permit for a ${dimsPretty} deck?`, a: `Yes in nearly all US jurisdictions. Decks over 30 inches off the ground or attached to the house require a building permit and at least a footing and final inspection. Permit costs typically run $100–$500; a ${sqft} sqft deck lands in the middle of that range.` },
          { q: `How long does a ${dimsPretty} deck take to build?`, a: `${sqft <= 200 ? "1–2 weeks" : sqft <= 300 ? "2–3 weeks" : "3–4 weeks"} of active build time for a crew of 2–3 once permits are approved. Permit approval itself adds 2–6 weeks upfront. Composite and PVC installs run slightly faster than wood; multi-level or wraparound designs add another 1–2 weeks.` },
          { q: `What shape should a ${dimsPretty} deck be?`, a: `Rectangle is the cheapest and fastest to build. L-shape adds 10–15% cost but wraps around corners well. For footprints where ${dimsPretty} is the bounding box, check what fits inside — an L-shape or wraparound at a ${dimsPretty} envelope will have less actual deck surface than a solid ${sqft} sqft rectangle.` },
        ]}
      />

      <Card style={{ background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Price your own {dimsPretty} deck</Ttl>
        <Dsc>Use the calculator to adjust material, shape, height, railing, and features for your state.</Dsc>
        <Link to={`/?l=${size.L}&w=${size.W}`} style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 13, color: T.textMid, marginBottom: 10, fontWeight: 600 }}>Compare other sizes</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {SIZES.filter(s => s.slug !== size.slug).slice(0, 6).map(s => <Link key={s.slug} to={`/${s.slug}`} style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>{s.L}×{s.W} →</Link>)}
        </div>
      </div>
    </div>
  </div>;
}
