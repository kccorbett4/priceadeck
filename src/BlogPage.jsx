import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { T, Card, Ttl, Dsc, Nav } from "./App.jsx";
import { Breadcrumbs, ArticleSchema, Byline } from "./SeoHelpers.jsx";

/* ── Reusable UI ── */
function H2({ children }) {
  return <h2 style={{ fontSize: 26, fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, margin: "36px 0 14px", color: T.text, letterSpacing: "-0.01em" }}>{children}</h2>;
}
function H3({ children }) {
  return <h3 style={{ fontSize: 18, fontWeight: 700, margin: "24px 0 10px", color: T.text }}>{children}</h3>;
}
function P({ children }) {
  return <p style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid, margin: "12px 0" }}>{children}</p>;
}

/* ── Link helpers ── */
const slugState = (name) => name.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc");
const linkStyle = { color: T.accent, fontWeight: 500, textDecoration: "underline", textDecorationThickness: 1, textUnderlineOffset: 2 };
const SL = ({ children }) => <Link to={`/${slugState(children)}`} style={linkStyle}>{children}</Link>;
const CL = ({ slug, children }) => <Link to={`/city/${slug}`} style={linkStyle}>{children}</Link>;
const DL = ({ children }) => <Link to="/deck-cost-data" style={linkStyle}>{children}</Link>;

const GUIDE_TITLES = {
  "composite-vs-wood-vs-pvc": "Composite vs Wood vs PVC",
  "deck-cost-guide": "2026 Deck Cost Guide",
  "deck-permits-and-codes": "Deck Permits & Building Codes",
  "deck-cost-by-size": "Deck Cost by Size (100–1,000 sqft)",
  "how-long-to-build-a-deck": "How Long to Build a Deck",
  "deck-financing-guide": "Deck Financing Guide",
  "does-a-deck-add-home-value": "Does a Deck Add Home Value?",
};
function RelatedGuides({ slugs }) {
  return <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${T.borderLight}` }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: T.textMid, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Related guides</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
      {slugs.map(s => <Link key={s} to={`/blog/${s}`} style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${T.borderLight}`, color: T.text, fontSize: 13, fontWeight: 600, textDecoration: "none", background: T.cardAlt }}>{GUIDE_TITLES[s]} →</Link>)}
    </div>
  </div>;
}
function Table({ rows }) {
  return <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: 10, overflow: "hidden", margin: "18px 0", background: T.card }}>
    {rows.map((r, i) => <div key={i} style={{ display: "grid", gridTemplateColumns: r.length === 2 ? "1fr 1fr" : `repeat(${r.length}, 1fr)`, padding: "12px 16px", borderBottom: i < rows.length - 1 ? `1px solid ${T.borderLight}` : "none", background: i === 0 ? T.cardAlt : T.card, fontSize: 13, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? T.textMid : T.text }}>
      {r.map((cell, j) => <div key={j} style={{ padding: "2px 6px" }}>{cell}</div>)}
    </div>)}
  </div>;
}
function ProCon({ pros, cons }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
    <div style={{ padding: 18, background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Pros</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: T.text, lineHeight: 1.7 }}>{pros.map((p, i) => <li key={i} style={{ marginBottom: 6 }}>{p}</li>)}</ul>
    </div>
    <div style={{ padding: 18, background: T.dangerBg, border: `1px solid ${T.dangerBorder}`, borderRadius: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.danger, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Cons</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: T.text, lineHeight: 1.7 }}>{cons.map((c, i) => <li key={i} style={{ marginBottom: 6 }}>{c}</li>)}</ul>
    </div>
  </div>;
}

/* ── Articles ── */
const ARTICLES = {
  "composite-vs-wood-vs-pvc": {
    title: "Composite vs Wood vs PVC Decking — A 2026 Buyer's Guide",
    description: "Honest deep-dive on composite, pressure-treated wood, cedar, PVC, and hardwood decking. Real pricing, real lifespans, real maintenance costs.",
    date: "April 2026",
    read: "14 min read",
    related: ["deck-cost-guide", "deck-cost-by-size", "does-a-deck-add-home-value"],
    body: <>
      <P>Choosing a deck material is the single biggest decision you'll make before breaking ground. Material alone is 30–50% of the total build, and it dictates the next 20–40 years of maintenance. This guide covers the five categories most homeowners actually choose between — pressure-treated pine, cedar/redwood, composite, PVC, and tropical hardwoods — with honest trade-offs on price, lifespan, and upkeep.</P>

      <H2>Quick comparison</H2>
      <Table rows={[
        ["Material","Installed $/sqft","Lifespan","Maintenance"],
        ["Pressure-treated pine","$15–30","15–20 yrs","Stain/seal every 2–3 yrs"],
        ["Cedar / Redwood","$25–40","20–25 yrs","Seal every 2–3 yrs"],
        ["Composite (Trex, TimberTech)","$35–60","25–30 yrs","Rinse; no stain"],
        ["PVC / Cellular","$50–75","30+ yrs","Rinse; waterproof"],
        ["Ipe / Cumaru hardwood","$55–85","40+ yrs","Optional oil annually"],
      ]} />

      <H2>Pressure-Treated Pine</H2>
      <P>PT pine is the default American deck material. It's cheap, widely available, and workable with basic tools. Modern PT lumber uses copper-based preservatives (MCA or ACQ), which are much less corrosive to fasteners than the old CCA treatment.</P>
      <ProCon
        pros={["Cheapest upfront cost by a wide margin","Every lumberyard carries it","Easy to cut, drill, and repair","Accepts stain well"]}
        cons={["Warps, splits, and checks within 1–3 years","Must be stained/sealed every 2–3 years","Green tint on fresh lumber takes 6–12 months to fade","Structural life is 15–20 years; cosmetic life is shorter"]}
      />

      <H2>Cedar & Redwood</H2>
      <P>Cedar (Western red or Northern white) and redwood have natural tannins that resist rot and insects. The look is warmer and more premium than PT, and they stay dimensionally stable better than PT. The catch: cedar is soft and dents easily, and supply has tightened since major wildfires hit redwood groves.</P>
      <ProCon
        pros={["Warmer, more natural color than PT","Naturally rot and insect resistant","Dimensionally stable — fewer splits","Ages to a handsome silver-gray if left unsealed"]}
        cons={["Soft wood — dents from heavy furniture and dropped tools","Still needs sealing to preserve color","Premium over PT (~40–60% more)","Redwood supply is increasingly limited"]}
      />

      <H2>Composite Decking (Trex, TimberTech, Fiberon)</H2>
      <P>Composite is a blend of recycled wood fiber and polyethylene or polypropylene, capped on three or four sides with a hard polymer shell. The cap is what matters — early uncapped composites (mid-2000s) failed from mold and fading. Modern capped composites (2015+) are a different product and carry 25–30 year warranties.</P>
      <P>Price tiers: entry-level lines (Trex Enhance, TimberTech Terrain) run about $4–5 per linear foot; mid-range (Trex Transcend, TimberTech Vintage) run $5–7; premium (TimberTech AZEK) crosses into PVC territory at $7–9.</P>
      <ProCon
        pros={["No staining or sealing — rinse and done","Won't rot, splinter, or warp","25–30 year warranty against structural failure","Color-stable — fade guarantees from most brands"]}
        cons={["2–3× the upfront cost of PT","Gets hot in direct sun — darker colors noticeably more","Can't be sanded or refinished — scratches are permanent","Still has wood content, so still expands/contracts"]}
      />

      <H2>PVC / Cellular Decking</H2>
      <P>PVC decking (brands like TimberTech AZEK, Deckorators Voyage) contains no wood at all — it's entirely polymer. That means zero moisture absorption, zero rot, and the best performance near pools, coasts, and humid climates. The trade-off is price and a slightly more plastic appearance, though modern PVC has come a long way on grain texture.</P>
      <ProCon
        pros={["Completely waterproof — ideal pool-deck material","Doesn't absorb stains (wine, grill grease)","Lightest board to carry and install","30+ year lifespan; lifetime warranties common"]}
        cons={["Most expensive cap-rail material before you hit tropical hardwood","Can feel lighter/hollow underfoot","High coefficient of expansion — gaps must be precise","Some homeowners dislike the less-organic look"]}
      />

      <H2>Tropical Hardwoods (Ipe, Cumaru, Garapa)</H2>
      <P>Ipe (pronounced "ee-pay") is the gold standard for high-end decks. It's dense enough to sink in water, Class A fire-rated without treatment, and lasts 40+ years with no maintenance beyond optional oil to preserve the rich brown color. The catch is price, sourcing (FSC-certified stock is worth the premium), and the specialty tools needed to drill and fasten it.</P>
      <ProCon
        pros={["Longest-lasting option — 40+ years","Unmatched density and hardness","Natural Class A fire rating","Silvers beautifully if left unsealed"]}
        cons={["Requires pre-drilled stainless fasteners (hidden systems preferred)","Most expensive option; supply subject to rainforest export rules","Extremely heavy — adds labor time","Looks premium but feels more formal than wood"]}
      />

      <H2>10-year total cost reality check</H2>
      <P>For a 300 sqft deck, here's what you actually spend over a decade including maintenance:</P>
      <Table rows={[
        ["Material","Install","10-yr maintenance","10-yr total"],
        ["PT Pine","$6,500","$2,800 (stain + board replacement)","$9,300"],
        ["Cedar","$9,500","$1,800 (seal)","$11,300"],
        ["Composite","$14,500","$300 (cleaning)","$14,800"],
        ["PVC","$19,000","$150 (cleaning)","$19,150"],
        ["Ipe","$22,000","$600 (optional oil)","$22,600"],
      ]} />
      <P>At year 10 the composite deck still looks new; the PT deck has been restained four times and may need 5–10% of boards replaced. By year 20, the economics tilt heavily toward composite or PVC.</P>

      <H2>So which should you pick?</H2>
      <P><strong>Pick PT</strong> if the deck is a budget-driven project, you're selling the home within 5–7 years, or you genuinely enjoy the yearly staining ritual.</P>
      <P><strong>Pick cedar</strong> if you want a natural-wood look and feel, plan to seal regularly, and value dimensional stability.</P>
      <P><strong>Pick composite</strong> if you want a 25-year set-and-forget deck at a reasonable premium. This is the right answer for most homeowners.</P>
      <P><strong>Pick PVC</strong> if the deck is near a pool, on a coast, or you specifically want zero-maintenance waterproof performance.</P>
      <P><strong>Pick Ipe</strong> if this is a forever home, the budget supports it, and you want a deck that outlasts the mortgage.</P>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Run the numbers for your deck</Ttl>
        <Dsc>The calculator prices every material we covered above, adjusted for your state and build size.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Get my estimate →</Link>
      </Card>
    </>,
  },

  "deck-cost-guide": {
    title: "2026 Deck Cost Guide — What You Actually Pay For",
    description: "Complete breakdown of deck construction costs: materials, framing, footings, railings, stairs, labor, and permits. Real numbers for 2026.",
    date: "April 2026",
    read: "10 min read",
    related: ["composite-vs-wood-vs-pvc", "deck-cost-by-size", "deck-financing-guide"],
    body: <>
      <P>A new deck in 2026 costs $30–$75 per square foot installed, or roughly $9,000–$30,000 for a typical 300 sqft deck. The range is wide because seven different cost buckets drive the total — and only one of them is the decking boards.</P>

      <H2>Where the money actually goes</H2>
      <P>On a mid-tier composite deck, here's how $16,000 breaks down:</P>
      <Table rows={[
        ["Cost bucket","% of total","Rough $"],
        ["Decking material (boards + hardware)","28%","$4,500"],
        ["Framing (joists, posts, beams, ledger)","22%","$3,500"],
        ["Footings (piers or helical piles)","6%","$950"],
        ["Railings","9%","$1,450"],
        ["Stairs","5%","$800"],
        ["Labor","24%","$3,850"],
        ["Permit","2%","$320"],
        ["Contingency (8%)","4%","$630"],
      ]} />

      <H2>1. Decking material</H2>
      <P>This is the visible top layer. Pressure-treated pine runs $2–4 per sqft of board, cedar $4–7, composite $5–9, PVC $8–12, and tropical hardwoods $10–16. Most homeowners underestimate hardware — hidden fasteners for composite add another $1.50–$3.00 per sqft.</P>

      <H2>2. Framing</H2>
      <P>Nearly every deck uses pressure-treated lumber for framing regardless of the decking material — PT joists last 20+ years underneath and are far cheaper than framing in hardwood. Expect $8–14 per sqft of deck for framing material plus labor. Taller decks, longer spans, and multi-level builds push this number up.</P>

      <H2>3. Footings</H2>
      <P>Every post needs a footing that reaches below the frost line (or onto bedrock). In warm states, 24-inch concrete piers cost $150–200 each. In frost states (<SL>Minnesota</SL>, New England, Upper Midwest), 48-inch frost footings run $230–300 each. Rocky soil may require helical piles at $300–500 per pile but no concrete pour.</P>
      <P>A 300 sqft deck typically needs 4–6 footings. Multi-level or high decks need more.</P>

      <H2>4. Railings</H2>
      <P>Required by code on any deck over 30 inches above grade. Cost per linear foot installed:</P>
      <Table rows={[
        ["Style","$/linear ft","Notes"],
        ["Wood balusters","$40–60","Stain with deck"],
        ["Composite balusters","$60–80","Color-matched to decking"],
        ["Aluminum balusters","$70–90","Powder-coated, near-zero maintenance"],
        ["Cable railing","$110–160","Open sightlines"],
        ["Glass panel","$200–280","Premium, coastal-friendly"],
      ]} />

      <H2>5. Stairs</H2>
      <P>Stairs are expensive on a per-foot basis — each step requires framing, treads, risers, and typically a handrail. Budget $130–250 per step. A deck 4 feet off the ground needs roughly 5 steps; a deck 6 feet off the ground needs 8.</P>

      <H2>6. Labor</H2>
      <P>Labor is 20–35% of total depending on state. <SL>Texas</SL>, <SL>Georgia</SL>, and <SL>Mississippi</SL> run 80% of national averages. <SL>California</SL>, <SL>New York</SL>, and <SL>Massachusetts</SL> run 25–40% above. A 300 sqft deck takes a 2-person crew 7–12 working days. See <DL>state-by-state pricing</DL> for the full dataset.</P>

      <H2>7. Permits</H2>
      <P>Required almost universally for decks over 30 inches or attached to the house. Most jurisdictions charge $100–400. High-cost states (<SL>California</SL>, <SL>New York</SL>, <SL>Massachusetts</SL>) can exceed $500. Inspections happen at the footing stage and final. Skipping permits can force demolition when you sell.</P>

      <H2>Hidden costs that ambush homeowners</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Ledger flashing:</strong> $250–600. Required by code; some builders skip it and you'll pay double at repair.</li>
        <li><strong>Tree removal / stump grinding:</strong> $400–2,000 if the site isn't clear.</li>
        <li><strong>Grade work:</strong> $800–3,500 if the site is sloped and needs leveling.</li>
        <li><strong>Utility relocation:</strong> $500–2,500 if the deck crosses a gas line, AC condenser, or sprinkler head.</li>
        <li><strong>Post-hole debris:</strong> $300–1,500 if excavation produces unexpected clay or rock.</li>
      </ul>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Price your deck in under 2 minutes</Ttl>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14, marginTop: 8 }}>Open the calculator →</Link>
      </Card>
    </>,
  },

  "deck-permits-and-codes": {
    title: "Deck Permits & Building Codes — Everything You Need to Know",
    description: "When you need a deck permit, what it costs, what codes apply, and what inspectors look for. A 2026 homeowner's guide.",
    date: "April 2026",
    read: "9 min read",
    related: ["deck-cost-guide", "how-long-to-build-a-deck", "does-a-deck-add-home-value"],
    body: <>
      <P>A deck permit is usually the cheapest insurance a homeowner can buy. It's a $150–500 document that prevents a $5,000–30,000 problem at resale, forces a safety inspection that catches the mistakes that kill people, and makes your homeowner's insurance cover the deck if something goes wrong.</P>

      <H2>When do you need a permit?</H2>
      <P>Almost always. Nearly every US jurisdiction requires a building permit for any deck that is:</P>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li>Attached to the house (regardless of height)</li>
        <li>Over 30 inches above grade at any point</li>
        <li>Over 200 sqft (some jurisdictions)</li>
        <li>Serving a door that's a second story or higher</li>
      </ul>
      <P>Ground-level freestanding decks under 200 sqft that aren't attached may be permit-exempt — <em>may</em>. Always check your municipality; exemptions vary wildly.</P>

      <H2>What does a permit cost?</H2>
      <Table rows={[
        ["Region","Typical permit cost","Inspection visits"],
        ["South / Southeast","$100–250","2 (footing + final)"],
        ["Midwest","$150–350","2–3"],
        ["Mountain West","$200–400","2"],
        ["Northeast","$300–550","2–3"],
        ["California metros","$400–800","3"],
      ]} />
      <P>Permit budgets are baked into <DL>our state-by-state cost data</DL> — see the expected permit cost for your state before you sign a contract.</P>

      <H2>What code compliance covers</H2>
      <P>Modern deck codes (IRC 2021, adopted by most US states) are specific. The six things inspectors check:</P>

      <H3>1. Ledger attachment</H3>
      <P>The ledger board (the horizontal board bolted to the house) is the most failure-prone part of a deck. Code requires:</P>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li>½-inch lag bolts or through-bolts, not nails or screws</li>
        <li>Specific spacing based on deck size (typically 16–24 inches on center)</li>
        <li>Flashing between the ledger and house sheathing</li>
        <li>Attachment to the rim joist of the house, not just siding</li>
      </ul>
      <P>Ledger failures are the #1 cause of deck collapses that make the news. Don't skip flashing.</P>

      <H3>2. Footing depth & diameter</H3>
      <P>Footings must reach below the local frost line. Typical minimums:</P>
      <Table rows={[
        ["Region","Frost depth"],
        [<>Gulf Coast / <SL>Florida</SL></>,"12 inches"],
        ["Mid-Atlantic / Pacific NW","24 inches"],
        ["Midwest / Mountain","36–42 inches"],
        [<>Northern Tier (<SL>Minnesota</SL>, <SL>North Dakota</SL>, <SL>Maine</SL>)</>,"48–60 inches"],
      ]} />

      <H3>3. Post-to-beam connection</H3>
      <P>Posts must be mechanically fastened to beams (not just toenailed). Simpson Strong-Tie PBS or similar post bases are the standard. Inspectors look for hardware, not just framing.</P>

      <H3>4. Joist hangers</H3>
      <P>Joists must sit in galvanized joist hangers nailed with the specified short nails (not drywall screws). For PT lumber, hot-dip galvanized or stainless is required — standard electroplated zinc fails within 5 years against copper-based treatment.</P>

      <H3>5. Railing height & opening</H3>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li>Required on any deck surface over 30 inches above grade</li>
        <li>36 inches minimum height (residential); 42 inches if deck is over 30 inches</li>
        <li>Baluster spacing: a 4-inch sphere cannot pass through — roughly 3-15/16 inches clear</li>
        <li>Must resist 200 lbs of lateral force at the top rail</li>
      </ul>

      <H3>6. Stair dimensions</H3>
      <P>Rise: 4 inches minimum, 7-¾ inches maximum. Run: 10 inches minimum. Every step must be within 3/8 inch of the others. Any stair with more than four risers needs a graspable handrail (1-¼ to 2 inches diameter).</P>

      <H2>The pull-permit-or-not decision</H2>
      <P>Some homeowners skip permits to save $300 and a week. The consequences when caught:</P>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Forced removal:</strong> municipality can order demolition at your cost.</li>
        <li><strong>Fines:</strong> typically 2–4× the original permit cost, sometimes per-day.</li>
        <li><strong>Insurance denial:</strong> homeowner's policies can deny claims on unpermitted work.</li>
        <li><strong>Resale trouble:</strong> inspectors flag unpermitted additions; buyers demand removal, a price cut, or a retroactive permit (often with partial teardown to verify structure).</li>
      </ul>

      <H2>What to ask your builder</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li>Are you pulling the permit under your license, or do you want me to homeowner-pull?</li>
        <li>Is permit cost included in the bid, or does it pass through to me?</li>
        <li>Will you meet the inspector at footing and final?</li>
        <li>Will I get copies of the signed inspection cards for my closing file?</li>
      </ul>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Budget for permits in your state</Ttl>
        <Dsc>The calculator includes a realistic permit number based on your state — no surprise fees.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>
    </>,
  },

  "deck-cost-by-size": {
    title: "Deck Cost by Size — From 100 to 1,000 sqft",
    description: "Real 2026 deck pricing by size. What a 100, 200, 300, 500, and 1,000 sqft deck actually costs in composite, wood, and PVC.",
    date: "April 2026",
    read: "7 min read",
    related: ["deck-cost-guide", "composite-vs-wood-vs-pvc", "does-a-deck-add-home-value"],
    body: <>
      <P>Deck cost scales close to linearly with square footage, but not quite — footings, stairs, and permits are fixed costs that don't grow. Here's what you actually pay by size, in 2026 dollars.</P>

      <H2>Cost by size (composite, mid-tier state)</H2>
      <Table rows={[
        ["Size","Dimensions","Total cost","$/sqft"],
        ["100 sqft","10×10","$4,800","$48"],
        ["200 sqft","10×20","$9,000","$45"],
        ["300 sqft","12×25","$13,500","$45"],
        ["400 sqft","16×25","$17,000","$42"],
        ["500 sqft","20×25","$20,500","$41"],
        ["750 sqft","25×30","$30,000","$40"],
        ["1,000 sqft","25×40","$38,500","$39"],
      ]} />

      <P>Notice the per-sqft rate drops as size grows — fixed costs (permits, one set of stairs, one ledger installation) amortize across more area. The marginal 100 sqft on a 500-sqft deck is cheaper than the first 100 on a 100-sqft deck.</P>

      <H2>Same sizes in pressure-treated pine</H2>
      <Table rows={[
        ["Size","Total cost","$/sqft"],
        ["100 sqft","$2,600","$26"],
        ["200 sqft","$4,900","$25"],
        ["300 sqft","$7,300","$24"],
        ["500 sqft","$11,200","$22"],
        ["1,000 sqft","$20,800","$21"],
      ]} />

      <H2>Same sizes in PVC (premium)</H2>
      <Table rows={[
        ["Size","Total cost","$/sqft"],
        ["100 sqft","$6,400","$64"],
        ["200 sqft","$12,200","$61"],
        ["300 sqft","$18,000","$60"],
        ["500 sqft","$27,500","$55"],
        ["1,000 sqft","$52,000","$52"],
      ]} />

      <H2>How to think about size</H2>
      <P>Most homeowners underestimate the deck they need. A 12×12 deck (144 sqft) sounds big on paper and lives small in practice — a patio table + 6 chairs eats most of it. Practical minimum for entertaining: 300 sqft. Comfortable for a family of 4 with a grill, dining table, and a seating nook: 400–500 sqft.</P>

      <P>The difference between 300 and 500 sqft on a composite deck is roughly $7,000. The difference between loving your deck and wishing you'd built bigger is priceless. When in doubt, go one size up. (Prices above are mid-tier; see <DL>state-specific pricing</DL> for your local number.)</P>

      <H2>When oversizing hurts</H2>
      <P>Three cases where you should go smaller, not bigger:</P>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Tight yards.</strong> A deck that blocks 70% of your grass kills resale appeal. Leave breathing room.</li>
        <li><strong>Setback issues.</strong> Most jurisdictions require 5–15 ft from the lot line. A deck that hugs the setback can't be expanded later.</li>
        <li><strong>Drainage.</strong> Larger decks shed more water into a smaller area. Without grading or a French drain, you'll get a swamp under the deck within two seasons.</li>
      </ul>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Dial in your size</Ttl>
        <Dsc>Drag the length and width sliders to see your price update live.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>
    </>,
  },

  "how-long-to-build-a-deck": {
    title: "How Long Does It Take to Build a Deck?",
    description: "Realistic timeline for every stage of deck construction in 2026, from contract signing to first cookout.",
    date: "April 2026",
    read: "6 min read",
    related: ["deck-permits-and-codes", "deck-financing-guide", "deck-cost-guide"],
    body: <>
      <P>A typical 300 sqft deck takes 8–14 weeks from signing a contract to walking on it. Most of that is waiting — permits, crew scheduling, and weather. Active build time is only 7–12 working days.</P>

      <H2>The timeline</H2>
      <Table rows={[
        ["Phase","Duration"],
        ["Contract & design","1–2 weeks"],
        ["Permit review","2–6 weeks"],
        ["Material lead time","1–4 weeks"],
        ["Crew scheduling","2–4 weeks"],
        ["Active construction","7–12 days"],
        ["Final inspection","3–7 days"],
      ]} />

      <H2>Permit review is the variable</H2>
      <P>In <SL>Florida</SL> or <SL>Texas</SL>, small-town permit offices often turn decks around in 5–10 business days. In <SL>California</SL>, <SL>Massachusetts</SL>, or any jurisdiction with historic review, permits can take 4–8 weeks. If the deck is in a homeowners' association, add another 2–4 weeks for architectural committee review.</P>

      <H2>Active construction — day by day</H2>
      <P>Here's what a 300 sqft composite deck build looks like:</P>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Day 1:</strong> Layout, demo existing deck/slab, dig footings.</li>
        <li><strong>Day 2:</strong> Pour concrete footings. Footing inspection.</li>
        <li><strong>Day 3:</strong> Set posts, install ledger, frame beams.</li>
        <li><strong>Day 4–5:</strong> Frame joists, install blocking, fascia.</li>
        <li><strong>Day 6–8:</strong> Install decking boards, hidden fasteners.</li>
        <li><strong>Day 9–10:</strong> Install railings, stairs.</li>
        <li><strong>Day 11:</strong> Clean up, punch list.</li>
        <li><strong>Day 12:</strong> Final inspection.</li>
      </ul>
      <P>Weather delays add 1–5 days. Rocky soil or unexpected utilities add 1–3 days.</P>

      <H2>When to start to use the deck by summer</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Use by Memorial Day (late May):</strong> sign contract by mid-February.</li>
        <li><strong>Use by July 4th:</strong> sign contract by early April.</li>
        <li><strong>Use by Labor Day:</strong> sign contract by late June.</li>
      </ul>
      <P>Contractors book up fast. Homeowners who wait until April to sign often end up with a September completion.</P>

      <H2>Off-season wins</H2>
      <P>Signing a deck contract in October or November is underrated. Permit offices are empty (1–2 week turnarounds), contractors compete for work, and your deck is ready for day one of the next season. Expect 5–15% off peak-season pricing.</P>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Plan your budget now</Ttl>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14, marginTop: 8 }}>Run the calculator →</Link>
      </Card>
    </>,
  },

  "deck-financing-guide": {
    title: "How to Finance a Deck — Loans, HELOCs, and Contractor Financing",
    description: "Every way to finance a deck build in 2026, compared on rate, term, and fees. What homeowners actually use.",
    date: "April 2026",
    read: "7 min read",
    related: ["deck-cost-guide", "does-a-deck-add-home-value", "deck-cost-by-size"],
    body: <>
      <P>Most decks $10,000+ are financed rather than paid cash. The right financing depends on your equity, credit score, and how long you want to pay. Here's the honest comparison.</P>

      <H2>Your options</H2>
      <Table rows={[
        ["Option","Typical rate","Term","Best for"],
        ["Home Equity Loan","7.0–8.5% fixed","10–15 yrs","Homeowners with 20%+ equity"],
        ["HELOC","7.5–9.5% variable","10 yr draw","Flexible, rate-tolerant"],
        ["Cash-out refinance","6.5–7.5% fixed","30 yr","Large project + existing high-rate mortgage"],
        ["Home improvement loan (unsecured)","8.5–13% fixed","5–10 yrs","Lower equity, good credit"],
        ["Contractor financing","0–15%","1–12 yrs","Convenience, promotional 0% deals"],
        ["Credit card","19–29%","Revolving","Never. Really."],
      ]} />

      <H2>Home equity loan (HELOAN)</H2>
      <P>Best fixed-rate option if you have equity. You borrow a lump sum secured by your house at a fixed rate and pay it back over 10–15 years. For a $15,000 deck at 7.5% over 10 years, you'd pay about $178/month.</P>

      <H2>HELOC</H2>
      <P>A line of credit secured by your house. You draw what you need, when you need it, and only pay interest on the amount drawn. Rate is variable and tied to Prime. Best for projects where the final cost isn't fully known yet.</P>

      <H2>Cash-out refinance</H2>
      <P>Worth considering only if your current mortgage rate is higher than today's rates AND the project is large enough to justify refinancing costs ($3,000–8,000 in closing costs). Rarely the right move for a $15,000 deck alone.</P>

      <H2>Unsecured home improvement loans</H2>
      <P>Specialty lenders like LightStream, SoFi, and Upgrade offer unsecured loans without touching your home's equity. Rates are 1.5–3 points higher than secured options, but there's no lien on the house and funding can happen in 2–5 days. Best for homeowners with good credit and limited equity.</P>

      <H2>Contractor financing</H2>
      <P>Most larger builders partner with a lender (often Synchrony or EnerBank). You'll see offers like "0% for 18 months" or "6.99% for 84 months." Read the fine print: deferred interest on the 0% deals means the full interest backdates to day one if you miss the payoff.</P>
      <P>Legitimate contractor-financed deals can save money if you pay off the promotional period. Lazy ones are a trap. Always run the true APR math.</P>

      <H2>Monthly payment on a $15,000 deck</H2>
      <Table rows={[
        ["Scenario","Rate","Term","Monthly"],
        ["Home Equity Loan","7.5%","10 yrs","$178"],
        ["HELOC (variable)","8.5%","10 yrs","$186"],
        ["Unsecured loan","10.5%","7 yrs","$253"],
        ["Contractor 0% promo","0%","18 mo","$833"],
      ]} />

      <H2>What homeowners actually do</H2>
      <P>Based on deck financing data: 42% use a HELOC or home equity loan, 24% pay cash, 18% use contractor financing, 12% use unsecured personal loans, 4% refinance, and less than 1% use credit cards (the sensible ones — the rest don't tell the survey).</P>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>See your monthly payment</Ttl>
        <Dsc>The calculator shows payment estimates across loan types right next to your total.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Run the calculator →</Link>
      </Card>
    </>,
  },

  "does-a-deck-add-home-value": {
    title: "Does a Deck Add Home Value? The Real 2026 ROI",
    description: "How much of a deck's cost comes back at resale? Data-driven analysis by material, region, and home type.",
    date: "April 2026",
    read: "6 min read",
    related: ["composite-vs-wood-vs-pvc", "deck-cost-guide", "deck-financing-guide"],
    body: <>
      <P>Yes — a new deck adds measurable home value. The typical return is 50–70% of the project cost recovered at sale, making decks one of the better-returning home improvements. But "better returning" isn't the same as "profitable" — no renovation returns 100%. Here's the real math.</P>

      <H2>Average ROI by material</H2>
      <Table rows={[
        ["Material","Typical ROI","Why"],
        ["Pressure-treated wood","65–75%","Low upfront; buyers don't distinguish"],
        ["Composite","55–65%","High upfront; buyers value low maintenance"],
        ["PVC","50–60%","Premium material; not always recognized"],
        ["Hardwood (Ipe)","45–55%","High-end buyers appreciate; most don't"],
      ]} />
      <P>Wood decks have the highest <em>percentage</em> ROI because they cost less to build — there's less money to recover. In absolute dollars, composite often returns more cash back because the appraised value increase is higher.</P>

      <H2>Regional differences</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>South / Southeast (<SL>Texas</SL>, <SL>Florida</SL>, <SL>Georgia</SL>):</strong> ROI 60–75%. Year-round deck weather drives value.</li>
        <li><strong>Mountain West (<SL>Colorado</SL>, <SL>Utah</SL>):</strong> ROI 55–70%. Short usable season dampens appraisal lift.</li>
        <li><strong>Midwest (<SL>Ohio</SL>, <SL>Illinois</SL>, <SL>Minnesota</SL>):</strong> ROI 50–65%. Winter closes the deck for 4–5 months.</li>
        <li><strong>Northeast (<SL>Massachusetts</SL>, <SL>New York</SL>):</strong> ROI 50–60%. Similar to Midwest; freeze-thaw erodes wood faster.</li>
        <li><strong>Pacific Northwest (<SL>Washington</SL>, <SL>Oregon</SL>):</strong> ROI 55–70%. Mild climate helps; composite especially valued.</li>
      </ul>

      <H2>Factors that raise ROI</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li><strong>Direct kitchen or living room access.</strong> Decks that function as an extension of the home appraise higher than isolated freestanding decks.</li>
        <li><strong>Proper size relative to house.</strong> A 300 sqft deck on a 1,400 sqft house looks proportional. A 600 sqft deck on the same house looks mismatched.</li>
        <li><strong>Integrated lighting and electrical.</strong> Adds $1,500–3,000 in perceived value for $400–800 spent.</li>
        <li><strong>Permit paperwork.</strong> Buyer-side inspectors flag unpermitted decks; permitted decks appraise at full value.</li>
      </ul>

      <H2>Factors that hurt ROI</H2>
      <ul style={{ fontSize: 16, lineHeight: 1.75, color: T.textMid }}>
        <li>Overbuilt for the neighborhood — a $40,000 deck on a $250,000 home loses most of its value instantly.</li>
        <li>Poorly maintained wood decks — silvered, warped, or splintered boards knock $2,000–8,000 off perceived value.</li>
        <li>Unpermitted construction — appraisers often exclude unpermitted square footage.</li>
        <li>Deep, dark finishes in hot-sun climates — buyers see maintenance burden instead of beauty.</li>
      </ul>

      <H2>The ROI that isn't on the spreadsheet</H2>
      <P>Deck ROI calculations capture resale value but miss the daily value: hundreds of meals eaten outside, summer evenings, birthdays, quiet mornings with coffee. Homeowners who live in their decks for 5–10 years before selling generally rate the project as one of the best they've done — regardless of what the appraiser says.</P>

      <Card style={{ marginTop: 32, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Run your numbers</Ttl>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14, marginTop: 8 }}>Open the calculator →</Link>
      </Card>
    </>,
  },
};

export default function BlogPage() {
  const { slug } = useParams();
  const article = ARTICLES[slug];

  if (!article) return <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ fontFamily: "'Fraunces',Georgia,serif" }}>Article not found</h1>
      <Link to="/" style={{ color: T.accent }}>← Back to calculator</Link>
    </div>
  </div>;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{article.title}</title>
      <meta name="description" content={article.description} />
      <link rel="canonical" href={`https://priceadeck.com/blog/${slug}`} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:url" content={`https://priceadeck.com/blog/${slug}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://priceadeck.com/og-image.jpg" />
    </Helmet>

    <ArticleSchema
      headline={article.title}
      description={article.description}
      slug={`/blog/${slug}`}
      datePublished="2026-04-01"
      dateModified="2026-04-18"
    />

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 24px 80px" }}>
      <Breadcrumbs trail={[
        { name: "Home", path: "/" },
        { name: "Guides", path: "/blog/composite-vs-wood-vs-pvc" },
        { name: GUIDE_TITLES[slug] || article.title, path: `/blog/${slug}` },
      ]} />
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Guide · {article.read}</div>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.12, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{article.title}</h1>
      <Byline />
      {article.body}
      {article.related && <RelatedGuides slugs={article.related} />}
    </div>
  </div>;
}
