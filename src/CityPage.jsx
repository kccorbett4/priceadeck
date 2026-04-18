import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { STATES, DECK_MATERIALS, T, Card, Ttl, Dsc, Nav, estimateSample } from "./App.jsx";
import { Breadcrumbs, FAQBlock, ArticleSchema, Byline } from "./SeoHelpers.jsx";

const CITIES = {
  houston: {
    name: "Houston", state: "TX", mult: 0.95, stateSlug: "texas",
    note: "Humid Gulf Coast climate favors composite or PVC for rot resistance. Hurricane codes may require extra footings, ledger straps, and corrosion-resistant fasteners.",
    climate: "Gulf Coast humid subtropical — 48\" annual rainfall, hurricane season June–November, 95°F+ summers. Wood deck moisture cycling is severe. Shaded areas grow mildew quickly on PT and cedar without yearly cleaning.",
    permit: "City of Houston requires a residential deck permit for any deck attached to the house or over 30\" off the ground. Permit cost is typically $175–$350 for a mid-size deck plus a $55 plan review fee. Inspections required at post-hole, framing, and final.",
    season: "Year-round build season — no frost. Peak pricing May–August (post-tax-refund demand); winter (December–February) is the best time for pricing, with some crews offering 10–15% off for scheduling flexibility.",
    neighborhoods: ["Heights", "Memorial", "Bellaire", "Katy", "Sugar Land", "Pearland", "The Woodlands"],
    tip: "Gulf Coast humidity destroys PT deck screws fast. Specify stainless or hot-dipped galvanized throughout, including joist hangers. Budget for a marine-grade sealer on the ledger board."
  },
  dallas: {
    name: "Dallas", state: "TX", mult: 0.97, stateSlug: "texas",
    note: "Expansive clay soil benefits from deeper footings or helical piles. 10-month deck season.",
    climate: "Humid subtropical with sharp hot-cold swings — 100°F+ summers, occasional hard freezes. Expansive clay soil (Blackland Prairie) shifts with wet-dry cycles, which racks undersized footings.",
    permit: "City of Dallas requires a building permit for residential decks, typically $150–$300 with a $50 plan review. Surrounding jurisdictions (Plano, Frisco, Richardson) are similar. Inspections at footing, framing, and final.",
    season: "10-month build window; avoid July/August outdoor-work scheduling — heat slows crews 20–30%. Fall (September–November) is the sweet spot for pricing and comfort.",
    neighborhoods: ["Preston Hollow", "Lakewood", "Oak Cliff", "Uptown", "Highland Park", "Plano", "Frisco"],
    tip: "Helical piles (~$400/ea installed) are often worth the upgrade over poured concrete footings here — they bypass the expansive clay layer and save in insurance claims and re-leveling over 10+ years."
  },
  phoenix: {
    name: "Phoenix", state: "AZ", mult: 1.00, stateSlug: "arizona",
    note: "Intense UV degrades wood fast — composite and PVC cost 20–40% less over a 15-year window.",
    climate: "Hot desert — 110°F+ summers, intense UV exposure, minimal rainfall. Wood deck boards check, warp, and grey within 2–3 years without aggressive annual maintenance. Dust storms abrade surfaces.",
    permit: "City of Phoenix requires a permit for attached decks and any deck 30\" or more off the ground. Fees are $150–$400; surrounding Scottsdale and Tempe trend higher.",
    season: "Build October through April — desert summer crews shut down mid-day in June–September. Shaded work areas are essential; assume 10% schedule padding for heat delays.",
    neighborhoods: ["Arcadia", "Biltmore", "North Scottsdale", "Paradise Valley", "Ahwatukee", "Chandler", "Gilbert"],
    tip: "Light-color composite or PVC is mandatory here — dark-color boards hit 170°F+ surface temperature in July sun. Plan for shade: pergolas, retractable awnings, or louvered roofs (often code-compliant as 'partial shade structure' rather than 'covered patio')."
  },
  atlanta: {
    name: "Atlanta", state: "GA", mult: 0.96, stateSlug: "georgia",
    note: "Pine-rich region keeps PT lumber cheap. Red clay soil is stable but requires decent drainage.",
    climate: "Humid subtropical — 50\" annual rainfall, short mild winters, 90°F summers. Rot and mildew are the dominant wood-deck failure modes. Strong thunderstorms drive brief but severe wind loads on railings.",
    permit: "City of Atlanta and Fulton County require permits for residential decks attached to a structure. Typical fee $150–$275. DeKalb and Cobb counties run similar.",
    season: "Year-round build season, but February–April is peak due to pre-summer demand. December–January offers the best pricing — some crews discount 8–12% for off-season scheduling.",
    neighborhoods: ["Buckhead", "Virginia-Highland", "Brookhaven", "Sandy Springs", "Decatur", "Smyrna", "Marietta"],
    tip: "Red Georgia clay holds water — drainage planning is a must. Add a gravel bed under ground-level sections, and grade the grade away from any ledger boards. Skipping this step shortens deck life 3–5 years."
  },
  charlotte: {
    name: "Charlotte", state: "NC", mult: 0.94, stateSlug: "north-carolina",
    note: "Moderate climate, affordable labor. Strong market for both PT and composite.",
    climate: "Humid subtropical — mild winters, warm humid summers, 42\" annual rainfall. Rapid growth market means deck builders are busy March–October; winter booking is easiest.",
    permit: "Mecklenburg County Code Enforcement requires a residential deck permit for any attached deck or any deck over 30\" tall. Permit fees $120–$280 plus $45 plan review.",
    season: "Year-round but constrained by winter weather. Build late February through November; early winter work sometimes pauses for 3–5 days during cold snaps.",
    neighborhoods: ["Myers Park", "Dilworth", "South End", "Ballantyne", "Huntersville", "Matthews", "Lake Norman"],
    tip: "Charlotte's rapid growth means many new-construction backyards have compacted fill where grading crews cut and filled the lot. Specify pier footings to engineered rock or undisturbed soil — skipping this leads to settlement cracks within 2–3 years."
  },
  denver: {
    name: "Denver", state: "CO", mult: 1.06, stateSlug: "colorado",
    note: "Dry climate preserves wood well. Altitude and snow load raise framing costs ~5–10%.",
    climate: "Semi-arid with intense UV — low humidity preserves wood longer than coastal climates, but altitude accelerates surface fading. Winter snow load averages 25–40 psf; deck framing is upsized vs the national standard.",
    permit: "City and County of Denver requires a building permit for decks attached to a home or over 30\" off the ground. Fees $185–$420. Frost-line footing required at 36\".",
    season: "Build season April through November. Snow load requirements and frozen ground make footing excavation impractical December–March; crews still do material prep and covered work, but full builds pause.",
    neighborhoods: ["Highland", "Washington Park", "Congress Park", "Stapleton/Central Park", "Lakewood", "Englewood", "Golden", "Boulder"],
    tip: "Snow load isn't optional here. Engineered joist spans and beam sizing must meet IRC ground-snow-load tables for 30 psf. Verify your contractor's prints have a structural stamp — inspector rejections for underbuilt framing are common."
  },
  nashville: {
    name: "Nashville", state: "TN", mult: 0.93, stateSlug: "tennessee",
    note: "Rapidly growing market. Labor is still below US average despite housing boom.",
    climate: "Humid subtropical — 48\" annual rain, warm humid summers, mild winters with occasional ice storms. Limestone bedrock close to surface in many neighborhoods — footing depth often determined by rock, not frost line.",
    permit: "Metro Nashville/Davidson County requires permits for attached decks and any deck over 30\" tall. Fees typically $150–$325 plus plan review.",
    season: "Year-round. Peak demand March–June; post-Labor Day through November offers better pricing.",
    neighborhoods: ["East Nashville", "Germantown", "12 South", "Sylvan Park", "Brentwood", "Franklin", "Hendersonville"],
    tip: "Limestone bedrock is a common surprise — contractors hit it at 18\"–24\" on many lots. Price contingency for rock drilling or helical piles: $100–$300 per pier if encountered. Have your contractor test-dig before quoting a fixed price."
  },
  columbus: {
    name: "Columbus", state: "OH", mult: 0.95, stateSlug: "ohio",
    note: "Midwest averages, with frost-line footings adding roughly 8%. Long freeze-thaw cycles favor composite.",
    climate: "Humid continental — cold winters (12\"+ snow season), hot humid summers, heavy freeze-thaw cycling. Freeze-thaw is brutal on uncapped composite and unsealed wood alike.",
    permit: "City of Columbus and Franklin County require permits for attached decks. Fees $150–$285. Frost-line footings must be 32–36\" deep, verified at inspection.",
    season: "Build April through November. Deep winter shuts down most crews — ground too frozen for footings. Early spring booking locks in better pricing.",
    neighborhoods: ["Short North", "Clintonville", "German Village", "Grandview Heights", "Upper Arlington", "Dublin", "Westerville", "New Albany"],
    tip: "Freeze-thaw cycles split PT boards at checking points. Pre-sealing every cut end with a quality end-grain sealer (CopperGreen, Anchorseal) buys you 5+ years of life on a PT deck here. Most contractors skip this step — insist on it."
  },
  minneapolis: {
    name: "Minneapolis", state: "MN", mult: 1.04, stateSlug: "minnesota",
    note: "Extreme freeze-thaw demands composite or PVC for longevity. Frost line is 48 inches — expect footings to cost 15% more.",
    climate: "Humid continental — extreme cold (below-zero stretches common), heavy snow, sharp freeze-thaw cycling. Wood decks deteriorate faster here than anywhere except Alaska and North Dakota.",
    permit: "City of Minneapolis requires a permit for attached decks and any deck 30\"+ off the ground. Fees $185–$395. Frost-line footings must be 42–48\" deep; inspector verification is strict.",
    season: "Build May through October. Deep-freeze ground November through April makes footings impractical for most residential crews. Spring bookings fill by March.",
    neighborhoods: ["Uptown", "Linden Hills", "Southwest", "Longfellow", "Edina", "St. Louis Park", "Eden Prairie", "Minnetonka"],
    tip: "Footings at 48\" depth add real cost — budget $260+ per pier for this alone. Helical piles are often competitive ($350–$450/pier installed) and perform better over 20+ years of freeze-thaw. Composite or PVC decking is strongly preferred for longevity; most PT decks here need board replacement by year 12–15."
  },
  boston: {
    name: "Boston", state: "MA", mult: 1.14, stateSlug: "massachusetts",
    note: "Highest-cost metro on this list. Historic districts often require specific materials and design review.",
    climate: "Humid continental — cold winters (10–40\"+ snow season), humid summers, nor'easters drive episodic severe wind and snow loads. Saltwater coastal exposure corrodes fasteners rapidly within 5 miles of the harbor.",
    permit: "City of Boston ISD requires permits for attached decks. Fees $225–$500. Historic districts (Beacon Hill, Back Bay, South End) require additional design review — typically adds 4–8 weeks and design-committee fees.",
    season: "Build April through November. Nor'easter risk November–March pauses most crews. Historic-district approvals compress the feasible build window further.",
    neighborhoods: ["Beacon Hill", "Back Bay", "South End", "Jamaica Plain", "Brookline", "Cambridge", "Somerville", "Newton", "Arlington"],
    tip: "If you're within a historic district, budget 4–8 weeks for design review before you can even get a permit. Materials are often restricted — some districts require real wood and prohibit vinyl/PVC/composite. Check with the Historic District Commission before you commit to a material."
  },
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

  const samples = Object.entries(DECK_MATERIALS).map(([id, m]) => ({
    id, label: m.label, life: m.life, maint: m.maint,
    total: estimateSample({ matRate: m.sqftRate, fastenerRate: m.fastenerRate, stepRate: m.stepRate, stateCode: city.state, metroMult: city.mult })
  }));

  const faqs = [
    { q: `How much does a deck cost in ${city.name}?`, a: `A standard 300 sqft deck in ${city.name} costs $${samples[0].total.toLocaleString()} for pressure-treated pine to $${samples[4].total.toLocaleString()} for ipe. Most homeowners going with mid-tier composite land near $${samples[2].total.toLocaleString()} — roughly $${Math.round(samples[2].total / 300)}/sqft installed. Metro labor runs ${Math.round(effLabor * 100)}% of the US average.` },
    { q: `Do I need a permit for a deck in ${city.name}?`, a: city.permit },
    { q: `When's the best time to build a deck in ${city.name}?`, a: city.season },
    { q: `What's the best deck material for ${city.name}'s climate?`, a: city.tip },
    { q: `How long does it take to build a deck in ${city.name}?`, a: `After permits (2–6 weeks for approval in ${city.name}), a 300 sqft deck takes 1–3 weeks of active crew time. Multi-level or wraparound designs add 1–2 weeks. Peak-demand months (spring and early summer) can push crew availability out 6–10 weeks from quote to start.` },
  ];

  const title = `${city.name} Deck Cost 2026 — Real Pricing & Local Considerations`;
  const desc = `2026 deck cost in ${city.name}, ${sd.name}. Composite, pressure-treated, PVC pricing with metro labor adjustment, permits, and climate factors.`;

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`https://priceadeck.com/city/${citySlug}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`https://priceadeck.com/city/${citySlug}`} />
      <meta property="og:image" content="https://priceadeck.com/og-image.jpg" />
    </Helmet>

    <ArticleSchema
      headline={`${city.name} Deck Cost 2026`}
      description={desc}
      slug={`/city/${citySlug}`}
      datePublished="2026-04-01"
      dateModified="2026-04-18"
    />

    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 24px 60px" }}>
      <Breadcrumbs trail={[
        { name: "Home", path: "/" },
        { name: sd.name, path: `/${city.stateSlug}` },
        { name: city.name, path: `/city/${citySlug}` },
      ]} />

      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}><Link to={`/${city.stateSlug}`} style={{ color: T.accent, textDecoration: "none" }}>{sd.name}</Link> · Metro</div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.015em" }}>Deck cost in {city.name}</h1>
      <Byline />
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.6, marginBottom: 28 }}>
        A standard 300 sqft deck in {city.name} runs about <strong style={{ color: T.accent }}>${samples[0].total.toLocaleString()}–${samples[3].total.toLocaleString()}</strong> depending on material. Effective labor rate is {Math.round(effLabor * 100)}% of the US average ({city.mult > 1 ? "+" : ""}{Math.round((city.mult - 1) * 100)}% metro adjustment on <Link to={`/${city.stateSlug}`} style={{ color: T.accent }}>{sd.name}</Link> base).
      </p>

      <Card>
        <Ttl>Cost by material — 300 sqft deck in {city.name}</Ttl>
        <Dsc>12×25 mid-height deck with composite balusters, stairs, permit, and 8% contingency.</Dsc>
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
        <Ttl>Climate & what it means for materials</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}><p>{city.climate}</p></div>
      </Card>

      <Card>
        <Ttl>Permits & inspections in {city.name}</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}><p>{city.permit}</p></div>
      </Card>

      <Card>
        <Ttl>Build season & scheduling</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}><p>{city.season}</p></div>
      </Card>

      <Card>
        <Ttl>Popular {city.name} neighborhoods</Ttl>
        <Dsc>Deck builds serving these areas use the same pricing model — small variations in metro labor and lot-specific conditions apply.</Dsc>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {city.neighborhoods.map(n => <span key={n} style={{ padding: "6px 12px", borderRadius: 999, background: T.accentLight, color: T.accent, fontSize: 12, fontWeight: 600 }}>{n}</span>)}
        </div>
      </Card>

      <Card style={{ borderColor: T.accent, background: T.accentLight }}>
        <Ttl>Local tip worth its own paragraph</Ttl>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: T.textMid }}><p>{city.tip}</p></div>
      </Card>

      <FAQBlock items={faqs} title={`${city.name} deck cost — FAQ`} />

      <Card style={{ background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)`, borderColor: T.accent }}>
        <Ttl>Get your own {city.name} estimate</Ttl>
        <Dsc>Use your ZIP code for an even tighter number — the calculator auto-detects your metro.</Dsc>
        <Link to="/" style={{ display: "inline-block", padding: "12px 24px", background: T.text, color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open the calculator →</Link>
      </Card>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontSize: 13, color: T.textMid, marginBottom: 10, fontWeight: 600 }}>Related guides</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to={`/${city.stateSlug}`} style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>{sd.name} deck cost →</Link>
          <Link to="/composite-deck-cost" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Composite deck cost →</Link>
          <Link to="/blog/deck-permits-and-codes" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Deck permits →</Link>
          <Link to="/blog/deck-cost-by-size" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>Cost by size →</Link>
        </div>
      </div>
    </div>
  </div>;
}
