import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav, estimateSample } from "./App.jsx";
import { Breadcrumbs, FAQBlock, ArticleSchema, Byline } from "./SeoHelpers.jsx";

const M = {
  composite: {
    slug: "composite-deck-cost",
    matId: "composite",
    brandLabel: "Composite (Trex, TimberTech)",
    h1: "Composite Deck Cost 2026",
    kicker: "Composite Decking",
    intro: "Composite decking (Trex, TimberTech, Fiberon) combines recycled wood fibers and plastic into a cap-stocked board. In 2026, installed pricing runs $35–$60 per square foot — roughly 2× pressure-treated pine but with 25–30 years of life and almost no maintenance.",
    paragraphs: [
      { h: "What composite actually costs", p: "A 300 sqft composite deck runs about $12,000–$18,000 installed for a mid-tier board (Trex Enhance, TimberTech TERRAIN). Premium lines — Trex Transcend, TimberTech AZEK Vintage — push to $50–$70/sqft or $15,000–$21,000 for the same deck. The board itself is only $4–$9 per linear foot; framing, footings, railing, stairs, permit, and labor make up the rest of the installed number." },
      { h: "Why it's worth the premium over wood", p: "Composite doesn't need stain, seal, or sanding. A $9,000 pressure-treated deck costs $200–$400 a year in maintenance — $4,000–$8,000 over 20 years. A $16,000 composite deck costs about $50/yr in cleaning. 20-year total cost-of-ownership: PT wood ≈ $15,000, composite ≈ $17,000 — and the composite still looks new at year 20." },
      { h: "Brand pricing at a glance", p: "Trex Enhance Basics: $35–$42/sqft installed. Trex Transcend: $50–$60/sqft. TimberTech EDGE: $38–$45/sqft. TimberTech AZEK (PVC-capped composite): $55–$70/sqft. Fiberon Sanctuary: $35–$45/sqft. Deckorators Vault (mineral-based): $40–$50/sqft." },
      { h: "What raises or lowers the install price", p: "Shape complexity (wraparound, multi-level) adds 10–25%. Height over 4 ft adds stair runs and deeper footings. Frost-line states (MN, ND, VT, NH, ME) push footings 36–48 inches and add 8–12%. High-labor metros (Boston, SF Bay, NYC) run 15–30% above a national baseline." },
    ],
    faqs: [
      { q: "How much is a 12x16 composite deck?", a: "About $6,700–$11,500 installed in 2026 for a 192 sqft composite deck at typical mid-height, including railing, one stair run, permit, and 8% contingency. The lower end assumes mid-tier Trex Enhance or TimberTech EDGE in an average-labor state; the upper end assumes Trex Transcend or AZEK in a high-labor metro." },
      { q: "Is Trex cheaper than TimberTech?", a: "At the entry tier they're nearly identical: Trex Enhance Basics runs $35–$42/sqft installed, and TimberTech EDGE runs $38–$45/sqft. At premium: Trex Transcend ($50–$60) and AZEK Vintage ($55–$70) are the top lines — AZEK is all-PVC so it costs slightly more but doesn't absorb moisture." },
      { q: "Does composite decking get hot in the sun?", a: "Mid-tier and premium capped composites run 10–15°F hotter than pressure-treated pine in direct sun. Light colors (beige, driftwood) stay cooler than dark (espresso, black). PVC-capped premium boards (Trex Transcend, AZEK) run coolest of the composite family." },
      { q: "How long does composite decking last?", a: "Modern capped composite carries a 25–30 year limited residential warranty against fade and stain. In practice, installs from 2010 onward are still performing well — expect a 25+ year functional life before any significant refinishing is needed." },
      { q: "Is composite worth it over wood?", a: "Yes if you plan to stay 10+ years. The break-even between a $9,000 PT deck and a $16,000 composite deck is around year 12–15 once annual maintenance is accounted for. If you plan to sell within 5 years, PT often makes more financial sense." },
    ],
    relatedMaterial: ["pressure-treated-deck-cost", "pvc-deck-cost", "cedar-deck-cost"],
  },
  "pressure-treated": {
    slug: "pressure-treated-deck-cost",
    matId: "pt",
    brandLabel: "Pressure-Treated Pine",
    h1: "Pressure-Treated Deck Cost 2026",
    kicker: "Pressure-Treated Wood",
    intro: "Pressure-treated pine is the cheapest real-wood deck material in 2026. Installed pricing runs $15–$30 per square foot — roughly half the cost of composite — but requires staining every 2–3 years and typically lasts 15–20 years before board replacement starts.",
    paragraphs: [
      { h: "What a PT deck really costs", p: "A 300 sqft pressure-treated deck runs about $4,500–$9,000 installed in 2026. The boards themselves are $1.50–$3.00 per linear foot, but labor, framing, footings, stairs, and railing dominate the total. A small 10×10 deck can come in under $3,000; a multilevel 500 sqft build pushes $15,000–$20,000." },
      { h: "The real long-term math", p: "Upfront PT is half the cost of composite, but maintenance eats the savings. A $9,000 PT deck needs $200–$400/yr in stain, sealer, screws, and occasional board replacement. Over 20 years that's $4,000–$8,000. Composite is $50/yr in cleaning. 20-year all-in: PT $13,000–$17,000 vs composite $17,000–$18,000. PT still wins if you sell within 8–10 years." },
      { h: "Where PT still wins", p: "Large surface areas, budget builds, tight timelines, and hardwood-country regions (Southeast, Midwest) where PT lumber is cheap and skilled wood framers are abundant. Ground-level platforms and pool surrounds are also fine candidates — the board swap every 15–20 years is easier when the deck is low." },
      { h: "Maintenance schedule", p: "Year 1: let it dry 6 months, then stain. Year 2–3: re-stain with semi-transparent penetrating oil. Year 5: tighten loose fasteners, check joist hangers. Year 10–12: first serious board replacement on high-traffic areas. Year 15–20: full rebuild or deck top re-skin over existing framing." },
    ],
    faqs: [
      { q: "How much does a 12x16 pressure-treated deck cost?", a: "About $2,900–$5,800 installed for a 192 sqft PT deck with composite-style balusters, one stair run, permit, and 8% contingency. DIY material-only costs are $1,600–$2,400; the rest is labor, permits, and footings." },
      { q: "What lasts longer, pressure-treated or cedar?", a: "Cedar and PT last about the same structurally (15–25 years) but cedar is more rot-resistant in wet climates and stays straighter. PT has better ground-contact rating and costs 30–50% less per sqft. If you stain both on schedule, they reach the end of life at similar times." },
      { q: "Can I build a PT deck myself?", a: "Yes — PT is the most DIY-friendly material because it cuts, screws, and nails like any softwood. Expect a 12×16 to take two weekends with two people once footings are set. Framing and ledger attachment are the riskiest steps; most jurisdictions require an inspection before you deck over." },
      { q: "Do I need to stain a new PT deck right away?", a: "No — PT lumber is kiln-dried with water-borne preservatives and is still wet when delivered. Wait 3–6 months before first stain. A board that still beads water is too wet to stain. Use a semi-transparent penetrating oil stain the first time." },
      { q: "Is pressure-treated wood safe?", a: "Yes for residential use. Since 2004, consumer PT lumber uses copper-based preservatives (ACQ, MCA) rather than the older chromated copper arsenate. Use stainless or hot-dipped galvanized fasteners — standard steel corrodes fast in ACQ." },
    ],
    relatedMaterial: ["composite-deck-cost", "cedar-deck-cost", "pvc-deck-cost"],
  },
  cedar: {
    slug: "cedar-deck-cost",
    matId: "cedar",
    brandLabel: "Cedar / Redwood",
    h1: "Cedar Deck Cost 2026",
    kicker: "Cedar & Redwood",
    intro: "Western red cedar and redwood sit between pressure-treated pine and composite on price. Installed pricing is $25–$40 per square foot in 2026. Cedar's natural rot resistance, warm color, and dimensional stability make it a favorite for visible, walkable surfaces where PT feels too green and composite feels too plastic.",
    paragraphs: [
      { h: "What cedar costs installed", p: "A 300 sqft cedar deck runs $7,500–$12,000 in 2026. Cedar boards are $3–$5 per linear foot — twice PT but half composite. Cedar framing is usually not recommended; most installers use PT joists and ledgers with cedar decking and rails on top, since PT handles ground contact better." },
      { h: "Cedar vs redwood", p: "Western red cedar is the common choice east of the Rockies and in the Upper Midwest. Redwood (heart-grade) is slightly more rot-resistant but mostly available on the West Coast; old-growth redwood is now scarce and plantation redwood is the typical commodity. Both cost roughly the same installed." },
      { h: "Why cedar costs what it does", p: "Cedar is lighter, softer, and more forgiving to cut than PT — so labor hours are slightly less. But the material itself is 2× PT, and grade matters: select-knotty runs $3/lf, clear (knot-free) cedar runs $6–$9/lf. Premium tight-knot ends up similar-priced to mid-tier composite by the time you finish and seal." },
      { h: "Maintenance reality", p: "Cedar greys to silver within 12 months if unsealed. To hold color you need semi-transparent oil stain every 2–3 years. Skip a round and you'll see end-grain checking on the highest-sun boards. Proper annual care gets you 20–25 years; neglect drops that to 12–15." },
    ],
    faqs: [
      { q: "How much does a 12x16 cedar deck cost?", a: "About $4,800–$7,700 installed for a 192 sqft cedar deck with composite or cedar balusters, one stair run, permit, and contingency. Higher end applies to clear-grade cedar in frost-line states where PT framing has to go 4 feet down." },
      { q: "Is cedar worth it over pressure-treated?", a: "Cedar is worth the 50–70% premium over PT if the deck is a visible focal point of the yard, if the climate is wet (Pacific Northwest, Southeast coast), or if you dislike the green tint PT takes the first year. For hidden ground-level platforms, PT is better value." },
      { q: "Do I need to seal cedar right away?", a: "Yes — cedar has less moisture than PT at delivery and can accept stain within 30 days. Unsealed cedar greys within 6–12 months; if you want the warm brown or red tones preserved, seal the first season." },
      { q: "How long does a cedar deck last?", a: "20–25 years with yearly or biennial staining. Cedar left unsealed will structurally last 12–18 years but look weathered by year 5. Heart cedar (from the center of the tree) lasts significantly longer than sapwood cuts at big-box stores — ask for heartwood if available." },
      { q: "Can cedar be used for framing?", a: "Technically yes, but not recommended. PT joists cost 40% less than cedar joists and handle ground contact much better. Most installers use PT framing under cedar decking. Verify with local code — some jurisdictions require ground-contact-rated lumber for any joist within 18 inches of soil." },
    ],
    relatedMaterial: ["pressure-treated-deck-cost", "composite-deck-cost", "ipe-deck-cost"],
  },
  pvc: {
    slug: "pvc-deck-cost",
    matId: "pvc",
    brandLabel: "PVC / Cellular",
    h1: "PVC Deck Cost 2026",
    kicker: "PVC Decking",
    intro: "PVC (or cellular PVC) decking is 100% plastic — no wood fibers. Brands like AZEK, Wolf, and Deckorators Vault dominate this tier. Installed pricing runs $45–$75 per square foot in 2026 — the most expensive mainstream decking, but waterproof, hot-day-stable, and the longest-lasting category short of tropical hardwood.",
    paragraphs: [
      { h: "Why PVC costs more than composite", p: "PVC uses 100% virgin or recycled plastic — no wood filler. That means zero moisture absorption, zero mold risk, and virtually zero fade. The board material itself runs $6–$10/linear foot (vs $4–$9 for composite), but the bigger driver is fastener-specific hardware (hidden clips that grip PVC don't grip composite) and installer skill — fewer crews are certified for PVC." },
      { h: "AZEK vs Trex (the two category leaders)", p: "AZEK is pure PVC, owned by the TimberTech parent company. Trex Transcend is composite with a PVC cap — so only the outer 1/16\" is PVC. In practice: AZEK runs 5–10°F cooler in sun, holds color slightly better past year 15, and survives pool-side splash-out indefinitely. Trex wins on installed cost by $5–10/sqft." },
      { h: "Where PVC shines", p: "Pool surrounds, coastal installs, shaded wet decks, and hot climates (AZ, TX, FL) where composite gets uncomfortably warm underfoot. PVC is also lighter than composite, so it's the right choice for second-story or roof-deck builds where weight matters." },
      { h: "Limits to watch for", p: "PVC expands and contracts more with temperature than composite — installers have to leave slightly larger gaps on board-ends. Dropped heavy objects can crack the cellular foam core (rare, but visible when it happens). Color selection is narrower than premium composite." },
    ],
    faqs: [
      { q: "How much is a PVC deck per square foot?", a: "Installed: $45–$75 per square foot in 2026. Board-only: $6–$10 per linear foot for a 12-foot board. Labor runs 45–55% of the installed total — similar to composite, slightly more than PT." },
      { q: "Is PVC decking worth the money over composite?", a: "Yes in three scenarios: pool and water-adjacent decks (PVC is waterproof, composite absorbs minor moisture through the exposed bottom), hot-sun decks where temperature matters, and installs you want to fully forget for 30 years. Everywhere else, premium composite (Trex Transcend) gets 90% of the benefit at 80% of the cost." },
      { q: "Does PVC decking get hot?", a: "Less than most composite. In direct summer sun, light-color PVC runs 5–10°F cooler than equivalent composite and 15–20°F cooler than dark PT stained black. Still warm to barefoot touch on 90°F+ days, but workable." },
      { q: "Does PVC decking fade?", a: "Less than any other material. AZEK and Wolf carry 50-year limited fade-and-stain warranties. Expect near-zero visible fade through year 15 and slight lightening after year 20 on south-facing installs." },
      { q: "Can PVC decking be used for stairs and railings?", a: "Yes — most PVC systems include matched stair-tread and railing components. Stair treads are premium priced ($15–$22 each); most installs combine PVC decking with powder-coated aluminum railing to keep railing cost in check." },
    ],
    relatedMaterial: ["composite-deck-cost", "ipe-deck-cost", "cedar-deck-cost"],
  },
  ipe: {
    slug: "ipe-deck-cost",
    matId: "hardwood",
    brandLabel: "Ipe / Cumaru Hardwood",
    h1: "Ipe Deck Cost 2026",
    kicker: "Tropical Hardwoods",
    intro: "Ipe (pronounced ee-pay), cumaru, and tigerwood are dense South American hardwoods with Class A fire ratings and 40+ year service lives. Installed pricing runs $50–$90 per square foot in 2026 — the upper end of any mainstream decking material, but a true generational build if the client has the budget.",
    paragraphs: [
      { h: "Why ipe is so expensive", p: "Ipe has a Janka hardness of 3,510 — over 3× harder than oak. That means every cut needs a carbide blade, every screw needs a pre-drilled pilot hole, and framing has to be upgraded to handle the weight (ipe is ~70 lb/cu ft vs PT at 40). A skilled installer takes 50–70% longer to deck an ipe project than PT. Board-only: $7–$14 per linear foot, up to $18 for 1x6 premium." },
      { h: "Longevity", p: "Ipe untreated lasts 40+ years in outdoor ground-contact. In protected deck applications, there are still functional ipe decks from the 1970s boardwalks of Coney Island and Atlantic City. The wood is so dense it resists rot, termites, and fire. With annual oil treatment, color holds — without, it greys evenly to a driftwood silver." },
      { h: "Ipe vs cumaru vs tigerwood", p: "Ipe is the benchmark — hardest, most stable, most expensive. Cumaru is 80% as hard at 75% of the price and slightly more prone to checking. Tigerwood (goncalo alves) has the most dramatic grain pattern but can move more with seasonal moisture. For most buyers, cumaru is the sweet spot if ipe is out of budget." },
      { h: "Practical considerations", p: "Ipe is heavy — framing spans have to be reduced. Pre-drilling is mandatory; stainless fasteners required. Ipe's dense surface doesn't absorb water, so it shouldn't be caulked or painted. Source FSC-certified ipe to avoid illegally-logged stock — reputable suppliers publish chain-of-custody documentation." },
    ],
    faqs: [
      { q: "How much does an ipe deck cost in 2026?", a: "$50–$90 per square foot installed. A 300 sqft ipe deck runs $15,000–$27,000 depending on region, framing height, and railing spec. Coastal metros with union labor push the upper end; Southeast and mountain-west builds come in near the bottom of that range." },
      { q: "Is ipe worth it over composite?", a: "Yes for a permanent-feel installation and for clients who want natural wood. Ipe lasts 40+ years vs composite's 25–30 and has zero plastic aesthetic. The downside is 50–80% higher upfront cost and more installer skill needed — get a contractor with verified ipe experience." },
      { q: "Does ipe need to be sealed?", a: "Not for structural longevity — ipe is naturally resistant to rot and insects. For color preservation, apply a UV-blocking hardwood oil (like Penofin, Cabot Australian Timber Oil, Ipe Oil Plus) once a year for the first two years, then every 18–24 months. Unsealed ipe greys to silver within 18 months but remains structurally perfect." },
      { q: "Can I use regular deck screws on ipe?", a: "No. Ipe is dense enough that standard screws will strip or snap. Use stainless-steel trim-head screws in pre-drilled pilot holes, or hidden fastener clips with stainless hardware. Pre-drilling is non-negotiable." },
      { q: "How long does ipe decking last?", a: "40+ years untreated, 50+ with annual oil. The wood is rated Class A fire and has the highest natural rot resistance of any mainstream deck material. Existing ipe installations from the early 2000s remain in excellent condition." },
    ],
    relatedMaterial: ["pvc-deck-cost", "composite-deck-cost", "cedar-deck-cost"],
  },
  trex: {
    slug: "trex-deck-cost",
    matId: "composite",
    brandLabel: "Trex",
    h1: "Trex Deck Cost 2026",
    kicker: "Trex Composite",
    intro: "Trex is the best-known composite decking brand in the US, with three tiers: Enhance (entry), Select (mid), and Transcend (premium). Installed pricing runs $35–$60 per square foot in 2026. Trex itself is a composite — wood fibers bonded in a polyethylene matrix with a PVC-based protective cap.",
    paragraphs: [
      { h: "Trex tier pricing", p: "Trex Enhance Basics: $35–$42/sqft installed ($3.50–$4.50/lf board). Trex Enhance Naturals: $40–$48/sqft. Trex Select: $42–$50/sqft. Trex Transcend: $50–$60/sqft ($7–$9/lf board) — the flagship line with the most advanced cap and the widest color palette. Trex Signature (launched 2024): $55–$65/sqft." },
      { h: "Where Trex sits vs TimberTech", p: "At every tier they're within $3/sqft installed of TimberTech's equivalent. Trex is composite-core across the line; TimberTech splits into EDGE/PRIME (composite) and AZEK (pure PVC). If a job spec calls for warranty-backed composite at mainstream price, Trex and TimberTech are effectively interchangeable." },
      { h: "What the number covers", p: "A $50/sqft Trex Transcend number on a 300 sqft deck covers: board ($2,100), hidden fasteners, PT framing ($800), footings ($900), railing ($1,900 for composite rail w/ aluminum balusters), one stair run ($700), permit ($250), labor ($6,500), and 8% contingency. Total: $15,000–$16,000 for an average-labor state." },
      { h: "Reading a Trex contractor quote", p: "Verify the board line — Enhance Basics vs Transcend is a $4,000 difference on a 300 sqft deck. Verify the fastener system — hidden clips are $1/sqft more than face-screws. Verify the railing line — Trex Signature or Trex Transcend rail doubles basic rail cost. Trex warranty transfers to the next homeowner, so save the receipt." },
    ],
    faqs: [
      { q: "How much does a Trex deck cost per square foot?", a: "Installed: $35–$60 per square foot in 2026. Entry-tier Enhance Basics: $35–$42. Mid-tier Select: $42–$50. Premium Transcend: $50–$60. Board-only: $3.50 to $9 per linear foot depending on line and color." },
      { q: "Is Trex Transcend worth the upgrade?", a: "Yes for high-visibility builds. Transcend has a thicker cap, deeper grain, wider color options (14 vs 4 for Enhance Basics), and the most robust 25-year warranty. The $5–$10/sqft premium over Select pays back in curb appeal and resale differentiation." },
      { q: "Does Trex fade in the sun?", a: "Enhance lightens slightly (5–8% color shift) over the first 6 months then stabilizes. Select and Transcend are rated for minimal fade under normal UV exposure; the 25-year limited warranty covers fade beyond rated thresholds. South-facing dark colors show the most fade; light colors almost none." },
      { q: "How long does a Trex deck last?", a: "Residential installations carry a 25-year limited fade-and-stain warranty and a 25-year limited residential warranty against rot and structural failure. In practice, Trex installs from 2010 onward remain functional and on-warranty." },
      { q: "Can I install Trex myself?", a: "Yes, with care. Trex cuts with standard carbide blades and installs with hidden fastener clips (Trex Hideaway) or face screws. The harder parts are corner miters, picture-frame borders, and fascia — these are where weekend warriors make expensive mistakes. For a 12×16 rectangular deck, DIY is realistic; for multilevel, hire a Trex Pro." },
    ],
    relatedMaterial: ["composite-deck-cost", "pvc-deck-cost", "pressure-treated-deck-cost"],
  },
};

export const MATERIAL_KEYS = Object.keys(M);

const SLUG_TO_KEY = Object.fromEntries(Object.entries(M).map(([k, v]) => [v.slug, k]));

export default function MaterialPage() {
  const materialSlug = useLocation().pathname.replace(/^\//, "").replace(/\/$/, "");
  const key = SLUG_TO_KEY[materialSlug];
  const data = key ? M[key] : null;

  if (!data) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", color: T.text }}>Material not found</h1>
      <Link to="/" style={{ color: T.accent }}>← Back to calculator</Link>
    </div>
  </div>;

  const mat = DECK_MATERIALS[data.matId];
  const statesForTable = ["TX", "CA", "NY", "FL", "CO", "MN", "MA", "GA", "OH", "AZ"];
  const rows = statesForTable.map(code => ({
    state: STATES[code].name,
    code,
    total: estimateSample({ matRate: mat.sqftRate, fastenerRate: mat.fastenerRate, stepRate: mat.stepRate, stateCode: code }),
  }));

  const title = `${data.h1} — Installed Pricing & State Breakdown`;
  const desc = `2026 ${data.brandLabel.toLowerCase()} deck cost: installed per-sqft pricing, 10-state comparison table, and honest break-even math vs other materials.`;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://priceadeck.com/${data.slug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`https://priceadeck.com/${data.slug}`} />
      <meta property="og:image" content="https://priceadeck.com/og-image.jpg" />
    </Helmet>

    <ArticleSchema
      headline={data.h1}
      description={desc}
      slug={`/${data.slug}`}
      datePublished="2026-04-01"
      dateModified="2026-04-18"
    />

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 24px 60px" }}>
      <Breadcrumbs trail={[
        { name: "Home", path: "/" },
        { name: "Materials", path: "/deck-cost-data" },
        { name: data.kicker, path: `/${data.slug}` },
      ]} />

      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{data.kicker}</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>{data.h1}</h1>
      <Byline />
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>{data.intro}</p>

      {data.paragraphs.map((p, i) => <Card key={i}>
        <Ttl>{p.h}</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}>{p.p}</div>
      </Card>)}

      <Card>
        <Ttl>{data.brandLabel} deck cost by state — 300 sqft build</Ttl>
        <Dsc>Standard 12×25 deck, 3–5 ft off ground, composite balusters, one stair run. Includes framing, footings, railing, stairs, permit, and 8% contingency.</Dsc>
        <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden" }}>
          {rows.map((r, i) => <div key={r.code} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, padding: "12px 16px", borderBottom: i < rows.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "center" }}>
            <Link to={`/${r.state.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc")}`} style={{ fontWeight: 600, fontSize: 14, color: T.text, textDecoration: "none" }}>{r.state}</Link>
            <div style={{ fontSize: 12, color: T.textMid, textAlign: "right" }}>${Math.round(r.total / 300)}/sqft</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${r.total.toLocaleString()}</div>
          </div>)}
        </div>
      </Card>

      <FAQBlock items={data.faqs} title={`${data.kicker} — FAQ`} />

      <Card style={{ background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Price your own {data.brandLabel.toLowerCase()} deck</Ttl>
        <Dsc>Adjust size, height, shape, and features for a specific number in your state.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 13, color: T.textMid, marginBottom: 10, fontWeight: 600 }}>Compare other materials</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {data.relatedMaterial.map(slug => <Link key={slug} to={`/${slug}`} style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>{M[SLUG_TO_KEY[slug]]?.kicker || slug} →</Link>)}
        </div>
      </div>
    </div>
  </div>;
}
