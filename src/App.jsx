import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./index.css";

/* ═══════════════ DATA ═══════════════ */
export const STATES = {
  AL:{name:"Alabama",labor:0.82,permit:180,frost:false},
  AK:{name:"Alaska",labor:1.35,permit:450,frost:true},
  AZ:{name:"Arizona",labor:1.02,permit:260,frost:false},
  AR:{name:"Arkansas",labor:0.78,permit:150,frost:false},
  CA:{name:"California",labor:1.38,permit:550,frost:false},
  CO:{name:"Colorado",labor:1.10,permit:340,frost:true},
  CT:{name:"Connecticut",labor:1.25,permit:420,frost:true},
  DE:{name:"Delaware",labor:1.08,permit:280,frost:true},
  FL:{name:"Florida",labor:0.92,permit:220,frost:false},
  GA:{name:"Georgia",labor:0.88,permit:200,frost:false},
  HI:{name:"Hawaii",labor:1.40,permit:600,frost:false},
  ID:{name:"Idaho",labor:0.98,permit:250,frost:true},
  IL:{name:"Illinois",labor:1.05,permit:300,frost:true},
  IN:{name:"Indiana",labor:0.90,permit:220,frost:true},
  IA:{name:"Iowa",labor:0.88,permit:200,frost:true},
  KS:{name:"Kansas",labor:0.84,permit:180,frost:true},
  KY:{name:"Kentucky",labor:0.83,permit:180,frost:true},
  LA:{name:"Louisiana",labor:0.80,permit:170,frost:false},
  ME:{name:"Maine",labor:1.12,permit:320,frost:true},
  MD:{name:"Maryland",labor:1.15,permit:360,frost:true},
  MA:{name:"Massachusetts",labor:1.30,permit:450,frost:true},
  MI:{name:"Michigan",labor:0.95,permit:260,frost:true},
  MN:{name:"Minnesota",labor:1.02,permit:280,frost:true},
  MS:{name:"Mississippi",labor:0.76,permit:150,frost:false},
  MO:{name:"Missouri",labor:0.84,permit:180,frost:true},
  MT:{name:"Montana",labor:1.00,permit:250,frost:true},
  NE:{name:"Nebraska",labor:0.86,permit:190,frost:true},
  NV:{name:"Nevada",labor:1.05,permit:280,frost:false},
  NH:{name:"New Hampshire",labor:1.15,permit:340,frost:true},
  NJ:{name:"New Jersey",labor:1.28,permit:460,frost:true},
  NM:{name:"New Mexico",labor:0.90,permit:220,frost:false},
  NY:{name:"New York",labor:1.35,permit:520,frost:true},
  NC:{name:"North Carolina",labor:0.87,permit:200,frost:false},
  ND:{name:"North Dakota",labor:0.95,permit:240,frost:true},
  OH:{name:"Ohio",labor:0.92,permit:240,frost:true},
  OK:{name:"Oklahoma",labor:0.80,permit:170,frost:false},
  OR:{name:"Oregon",labor:1.12,permit:330,frost:true},
  PA:{name:"Pennsylvania",labor:1.10,permit:340,frost:true},
  RI:{name:"Rhode Island",labor:1.22,permit:400,frost:true},
  SC:{name:"South Carolina",labor:0.85,permit:190,frost:false},
  SD:{name:"South Dakota",labor:0.88,permit:210,frost:true},
  TN:{name:"Tennessee",labor:0.83,permit:180,frost:false},
  TX:{name:"Texas",labor:0.88,permit:200,frost:false},
  UT:{name:"Utah",labor:1.05,permit:300,frost:true},
  VT:{name:"Vermont",labor:1.15,permit:340,frost:true},
  VA:{name:"Virginia",labor:1.02,permit:280,frost:true},
  WA:{name:"Washington",labor:1.18,permit:360,frost:true},
  WV:{name:"West Virginia",labor:0.82,permit:170,frost:true},
  WI:{name:"Wisconsin",labor:0.95,permit:240,frost:true},
  WY:{name:"Wyoming",labor:1.00,permit:240,frost:true},
  DC:{name:"Washington D.C.",labor:1.30,permit:480,frost:true},
};

const METRO_PREFIXES = {
  "100":"nyc","101":"nyc","102":"nyc","103":"nyc","104":"nyc","110":"nyc","111":"nyc","112":"nyc","113":"nyc","114":"nyc","116":"nyc",
  "900":"la","902":"la","905":"la","906":"la","907":"la","908":"la","910":"la","911":"la","913":"la","914":"la","915":"la","916":"la","917":"la","918":"la",
  "941":"sf","940":"sf","944":"sf","945":"sf","946":"sf","947":"sf","948":"sf","949":"sf","950":"sf",
  "600":"chi","601":"chi","602":"chi","603":"chi","604":"chi","605":"chi","606":"chi",
  "200":"dc","201":"dc","202":"dc","205":"dc","206":"dc","207":"dc","208":"dc","209":"dc",
  "021":"bos","022":"bos","023":"bos","024":"bos",
  "981":"sea","980":"sea","982":"sea","983":"sea",
  "330":"mia","331":"mia","332":"mia","333":"mia","334":"mia",
  "750":"dal","751":"dal","752":"dal","753":"dal","760":"dal","761":"dal",
  "770":"hou","771":"hou","772":"hou","773":"hou","774":"hou","775":"hou",
  "850":"phx","851":"phx","852":"phx","853":"phx",
  "300":"atl","301":"atl","302":"atl","303":"atl",
  "800":"den","801":"den","802":"den","803":"den","804":"den",
  "282":"clt","281":"clt","280":"clt",
  "372":"nas","370":"nas","371":"nas",
  "191":"phi","190":"phi","193":"phi","194":"phi",
  "551":"nj_metro","070":"nj_metro","071":"nj_metro","072":"nj_metro","073":"nj_metro","074":"nj_metro","076":"nj_metro","077":"nj_metro","078":"nj_metro","079":"nj_metro",
  "432":"col","431":"col","433":"col",
  "554":"msp","553":"msp","555":"msp",
};
const METRO_MULT = {
  nyc:1.18,la:1.12,sf:1.20,chi:1.05,dc:1.12,bos:1.14,sea:1.12,mia:1.04,dal:0.97,hou:0.95,phx:1.00,atl:0.96,den:1.06,clt:0.94,nas:0.93,phi:1.08,nj_metro:1.15,col:0.95,msp:1.04,
};
function getMetroMult(zip) {
  if (!zip || zip.length < 3) return { mult: 1.0, label: null };
  const prefix = zip.substring(0, 3);
  const metro = METRO_PREFIXES[prefix];
  if (!metro) return { mult: 1.0, label: null };
  const labels = { nyc:"New York Metro",la:"Los Angeles Metro",sf:"SF Bay Area",chi:"Chicago Metro",dc:"DC Metro",bos:"Boston Metro",sea:"Seattle Metro",mia:"Miami Metro",dal:"Dallas–Fort Worth",hou:"Houston Metro",phx:"Phoenix Metro",atl:"Atlanta Metro",den:"Denver Metro",clt:"Charlotte Metro",nas:"Nashville Metro",phi:"Philadelphia Metro",nj_metro:"Northern NJ Metro",col:"Columbus Metro",msp:"Minneapolis–St. Paul" };
  return { mult: METRO_MULT[metro] || 1.0, label: labels[metro] || metro };
}

/* Deck materials — per-sqft rate is the MATERIAL cost only (boards + hardware). Labor/framing computed separately. */
export const DECK_MATERIALS = {
  pt:       {label:"Pressure-Treated Pine",  sqftRate:5,   life:"15–20 yrs", maint:"Stain every 2–3 yrs", desc:"Cheapest, workhorse lumber"},
  cedar:    {label:"Cedar / Redwood",        sqftRate:9,   life:"20–25 yrs", maint:"Seal every 2–3 yrs",  desc:"Natural rot resistance, warm look"},
  composite:{label:"Composite (Trex, TimberTech)", sqftRate:14, life:"25–30 yrs", maint:"Rinse yearly",   desc:"Low maintenance, fade-resistant"},
  pvc:      {label:"PVC / Cellular",         sqftRate:19,  life:"30+ yrs",   maint:"Rinse yearly",        desc:"Waterproof, premium durability"},
  hardwood: {label:"Ipe / Cumaru Hardwood",  sqftRate:22,  life:"40+ yrs",   maint:"Oil annually (optional)", desc:"Tropical dense wood, elite look"},
};

export const DECK_SHAPES = {
  rectangle:  {label:"Rectangle",   factor:1.00, desc:"Simplest build"},
  lshape:     {label:"L-Shape",     factor:1.08, desc:"Wraps around corner"},
  wraparound: {label:"Wraparound",  factor:1.15, desc:"Two+ sides of the house"},
  multilevel: {label:"Multi-Level", factor:1.28, desc:"Two elevations, extra framing"},
};

export const HEIGHT_TIERS = {
  ground: {label:"Ground-level (0–2 ft)", stairAdder:0,     frameMult:1.00, railingRequired:false, desc:"No railing required"},
  low:    {label:"Low (2–4 ft)",            stairAdder:900,   frameMult:1.05, railingRequired:true,  desc:"1 short stair run, railing required"},
  mid:    {label:"Mid (4–6 ft)",            stairAdder:2000,  frameMult:1.12, railingRequired:true,  desc:"Full stair run, full railing"},
  high:   {label:"Raised (6–10 ft)",        stairAdder:3800,  frameMult:1.22, railingRequired:true,  desc:"Long stair run, deeper footings"},
};

export const RAILING_TYPES = {
  none:      {label:"None (ground-level)",   rate:0,   desc:"Allowed under 30 inches"},
  wood:      {label:"Wood Balusters",        rate:45,  desc:"PT or cedar balusters"},
  composite: {label:"Composite Balusters",   rate:65,  desc:"Matches composite decking"},
  aluminum:  {label:"Aluminum Balusters",    rate:80,  desc:"Low-maintenance, powder-coated"},
  cable:     {label:"Stainless Cable",       rate:130, desc:"Open views, modern look"},
  glass:     {label:"Glass Panel",           rate:230, desc:"Premium, maximum view"},
};

export const DECK_FEATURES = [
  {id:"lighting",      label:"Deck Lighting",               cost:1400, icon:"💡", laborIntensive:false},
  {id:"hiddenfast",    label:"Hidden Fasteners",            cost:1200, icon:"🔩", laborIntensive:false, perSqft:true},
  {id:"bench",         label:"Built-in Benches",            cost:1600, icon:"🪑", laborIntensive:true},
  {id:"planter",       label:"Built-in Planters",           cost:900,  icon:"🌿", laborIntensive:true},
  {id:"pergola",       label:"Pergola (10×12)",             cost:6500, icon:"🏛️", laborIntensive:true},
  {id:"privacy",       label:"Privacy Screen Wall",         cost:2200, icon:"🌳", laborIntensive:true},
  {id:"hottub",        label:"Hot Tub Cutout + Reinforce",  cost:2800, icon:"♨️", laborIntensive:true},
  {id:"outdoor_kit",   label:"Outdoor Kitchen Bump-Out",    cost:9500, icon:"🍳", laborIntensive:true},
  {id:"firetable",     label:"Gas Fire Table Rough-in",     cost:1500, icon:"🔥", laborIntensive:true},
  {id:"screenroom",    label:"Screened Enclosure",          cost:14000,icon:"🪟", laborIntensive:true, requiresRoof:true},
];

/* Labor: fraction of TOTAL is labor. We back out labor from materials using a multiplier. */
/* Simpler: total = (matCost + frame + footings + railing + stairs + features) × (1 + laborAdder × stateLaborMult) */
/* Framing rate: ~$12/sqft of deck for PT framing + footings. Scales with height + shape complexity. */

const fmt = n => "$" + Math.round(n).toLocaleString();

/* ── Theme: "Editorial Depth" — warm paper + deep teal + ink ── */
export const T = {
  bg: "#FAF8F3", bg2: "#F2EFE7", card: "#FFFFFF", cardAlt: "#FAF8F3",
  border: "#E8E3D7", borderLight: "#EFEBE0",
  accent: "#0F4C5C", accentLight: "#E6EEF0", accentDark: "#0A3440",
  text: "#0A0A0A", textMid: "#3D3D3D", textDim: "#8A8A8A",
  danger: "#991B1B", dangerBg: "#FDF2F2", dangerBorder: "#F4CCCC",
  warn: "#92400E", warnBg: "#FFFBEB", warnBorder: "#F5E4BC",
  success: "#166534", successBg: "#F0FDF4", successBorder: "#BBF7D0",
};

const S = {
  card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)" },
  ttl: { fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 4, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.01em" },
  dsc: { fontSize: 13, color: T.textMid, marginBottom: 18, lineHeight: 1.55 },
  chip: (on) => ({ display: "flex", alignItems: "center", gap: 7, padding: "9px 11px", borderRadius: 9, border: on ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, background: on ? T.accentLight : T.cardAlt, cursor: "pointer", transition: "all .15s" }),
  opt: (sel) => ({ background: sel ? T.accentLight : T.cardAlt, border: sel ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, borderRadius: 10, padding: "11px 13px", cursor: "pointer", transition: "all .15s" }),
  btn: (pri, dis) => ({ padding: "13px 28px", borderRadius: 10, border: pri ? "none" : `1px solid ${T.border}`, fontWeight: 600, fontSize: 14, cursor: dis ? "not-allowed" : "pointer", background: pri ? (dis ? "#D4D0C7" : T.text) : "transparent", color: pri ? "#FFFFFF" : T.text, transition: "all .18s", boxShadow: pri && !dis ? "0 1px 2px rgba(10,10,10,0.08), 0 4px 16px rgba(10,10,10,0.08)" : "none" }),
};

export function Card({ children, style: sx }) { return <div style={{ ...S.card, ...sx }}>{children}</div>; }
export function Ttl({ children }) { return <div style={S.ttl}>{children}</div>; }
export function Dsc({ children }) { return <div style={S.dsc}>{children}</div>; }
export function Opt({ sel, onClick, children, style: sx }) { return <div onClick={onClick} style={{ ...S.opt(sel), ...sx }}>{children}</div>; }
export function Chip({ on, onClick, children }) {
  return <div onClick={onClick} style={S.chip(on)}>{children}<div style={{ width: 18, height: 18, borderRadius: 4, background: on ? T.accent : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{on ? "✓" : ""}</div></div>;
}
export function Btn({ pri, dis, children, onClick }) { return <button onClick={onClick} disabled={dis} style={S.btn(pri, dis)}>{children}</button>; }
function Slider({ label, val, setter, min, max, stp = 1, suffix = "ft" }) {
  return <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.textMid }}>{label}</span>
      <span style={{ fontSize: 17, fontWeight: 800, color: T.accent, fontVariantNumeric: "tabular-nums" }}>{Math.round(val)} {suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={stp} value={val}
      onChange={e => setter(+e.target.value)} className="deck-slider" />
  </div>;
}

/* ── Nav (shared across pages) ── */
export function Nav() {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
    <Link to="/" style={{ textDecoration: "none", color: T.text, fontWeight: 800, fontSize: 18, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.015em" }}>PriceADeck<span style={{ color: T.accent }}>.com</span></Link>
    <div style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 13 }}>
      <Link to="/deck-cost-by-state" style={{ color: T.textMid, textDecoration: "none", fontWeight: 600 }}>By State</Link>
      <Link to="/blog/composite-vs-wood-vs-pvc" style={{ color: T.textMid, textDecoration: "none", fontWeight: 600 }}>Guides</Link>
      <Link to="/deck-cost-data" style={{ color: T.textMid, textDecoration: "none", fontWeight: 600 }}>Cost Data</Link>
    </div>
  </div>;
}

/* ── Financing Banner ── */
function FinancingBanner({ total }) {
  const rates = [
    { label: "Home Equity Loan", rate: 0.075, years: 10 },
    { label: "Unsecured Home Improvement", rate: 0.099, years: 7 },
    { label: "HELOC (variable)", rate: 0.085, years: 10 },
  ];
  const calcPayment = (p, r, y) => { const m = r / 12, n = y * 12; return p * (m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1); };
  const [sel, setSel] = useState(0);
  const r = rates[sel];
  const monthly = calcPayment(total, r.rate, r.years);
  return <Card style={{ borderColor: T.accentLight }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>💰 Monthly Payment Estimate</div>
    <Dsc>Most homeowners finance decks. Here's what {fmt(total)} looks like monthly.</Dsc>
    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      {rates.map((rt, i) => <div key={i} onClick={() => setSel(i)} style={{ padding: "7px 12px", borderRadius: 8, border: sel === i ? `2px solid ${T.accent}` : `2px solid ${T.borderLight}`, background: sel === i ? T.accentLight : T.cardAlt, cursor: "pointer", fontSize: 11, fontWeight: 600, color: sel === i ? T.accent : T.textMid }}>{rt.label}</div>)}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, color: T.accent }}>{fmt(monthly)}</span>
      <span style={{ fontSize: 13, color: T.textMid, fontWeight: 600 }}>/mo</span>
    </div>
    <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6 }}>
      {(r.rate * 100).toFixed(1)}% APR · {r.years} years · {fmt(monthly * r.years * 12)} total · {fmt(monthly * r.years * 12 - total)} interest
    </div>
  </Card>;
}

/* ── Shape Icon ── */
function ShapeIcon({ shape, active }) {
  const col = active ? T.accent : T.textMid;
  const fill = active ? T.accentLight : "transparent";
  return <svg viewBox="0 0 32 20" style={{ width: 36, height: 22 }}>
    {shape === "rectangle" && <rect x="2" y="3" width="28" height="14" rx="1" fill={fill} stroke={col} strokeWidth="1.8" />}
    {shape === "lshape" && <path d="M2,3 L20,3 L20,11 L30,11 L30,17 L2,17 Z" fill={fill} stroke={col} strokeWidth="1.8" strokeLinejoin="round" />}
    {shape === "wraparound" && <path d="M2,3 L14,3 L14,8 L24,8 L24,3 L30,3 L30,17 L2,17 Z" fill={fill} stroke={col} strokeWidth="1.8" strokeLinejoin="round" />}
    {shape === "multilevel" && <><rect x="2" y="3" width="16" height="9" fill={fill} stroke={col} strokeWidth="1.8" /><rect x="10" y="10" width="20" height="7" fill={fill} stroke={col} strokeWidth="1.8" /></>}
  </svg>;
}

/* ═══════════════ MAIN APP ═══════════════ */
export default function App() {
  const [st, setSt] = useState("TX");
  const [zip, setZip] = useState("");
  const [material, setMaterial] = useState("composite");
  const [shape, setShape] = useState("rectangle");
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(14);
  const [height, setHeight] = useState("low");
  const [railing, setRailing] = useState("composite");
  const [features, setFeatures] = useState({});
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const sd = STATES[st];
  const metro = getMetroMult(zip);
  const mat = DECK_MATERIALS[material];
  const sh = DECK_SHAPES[shape];
  const ht = HEIGHT_TIERS[height];
  const rail = RAILING_TYPES[railing];

  const sqft = length * width * sh.factor;
  const perimeter = 2 * (length + width);
  const railingLinearFt = ht.railingRequired ? Math.max(perimeter - length * 0.3, 0) : 0;

  /* Cost model */
  const {
    matCost, frameCost, footings, railingCost, stairs, featCost,
    subtotalBeforeLabor, laborCost, permit, contingency, total, bRows
  } = useMemo(() => {
    const labMult = sd.labor * metro.mult;
    const frostMult = sd.frost ? 1.08 : 1.0;

    const matCost = sqft * mat.sqftRate;
    const frameCost = sqft * 11 * ht.frameMult * frostMult * sh.factor;
    const footingsCount = Math.ceil(sqft / 75) + (ht.frameMult > 1.1 ? 2 : 0);
    const footings = footingsCount * (sd.frost ? 240 : 170);
    const railingCost = railingLinearFt * rail.rate;
    const stairs = ht.stairAdder;

    let featCost = 0;
    Object.entries(features).forEach(([id, on]) => {
      if (!on) return;
      const f = DECK_FEATURES.find(x => x.id === id);
      if (!f) return;
      let c = f.cost;
      if (f.perSqft) c = Math.round(sqft * 3);
      featCost += f.laborIntensive ? c * (0.55 + 0.45 * labMult) : c;
    });

    const subtotalBeforeLabor = matCost + frameCost + footings + railingCost + stairs + featCost;
    const laborCost = subtotalBeforeLabor * (0.55 * (labMult - 1) + 0.55);
    const permit = sd.permit;
    const preCont = subtotalBeforeLabor + laborCost + permit;
    const contingency = preCont * 0.08;
    const total = preCont + contingency;

    const bRows = [
      { l: `Decking material (${mat.label})`, v: matCost, c: T.accent },
      { l: "Framing (joists, posts, beams)", v: frameCost, c: T.textMid },
      { l: `Footings (${footingsCount} piers${sd.frost ? ", frost-depth" : ""})`, v: footings, c: T.textMid },
      ...(railingCost > 0 ? [{ l: `Railing (${rail.label}, ${Math.round(railingLinearFt)} lf)`, v: railingCost, c: T.textMid }] : []),
      ...(stairs > 0 ? [{ l: "Stairs", v: stairs, c: T.textMid }] : []),
      ...(featCost > 0 ? [{ l: "Features", v: featCost, c: T.accent }] : []),
      { l: `Labor (${sd.name}${metro.label ? `, ${metro.label}` : ""})`, v: laborCost, c: T.accentDark, h: true },
      { l: "Permit", v: permit, c: T.textDim },
      { l: "Contingency (8%)", v: contingency, c: T.textDim },
    ];

    return { matCost, frameCost, footings, railingCost, stairs, featCost, subtotalBeforeLabor, laborCost, permit, contingency, total, bRows };
  }, [sqft, mat, ht, sh, rail, railingLinearFt, sd, metro, features]);

  const maxR = Math.max(...bRows.map(r => r.v));

  const toggleFeature = (id) => setFeatures(f => ({ ...f, [id]: !f[id] }));

  return <div style={{ minHeight: "100vh", background: T.bg, color: T.text }}>
    <Helmet>
      <title>Deck Cost Calculator 2026 — How Much Does a Deck Cost?</title>
      <meta name="description" content="Free 2026 deck cost calculator. Instant estimates for composite, pressure-treated, cedar, PVC, and hardwood decks adjusted for your state and build." />
      <link rel="canonical" href="https://priceadeck.com/" />
    </Helmet>

    {/* Nav */}
    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    {/* Hero */}
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 40px", textAlign: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>2026 Deck Cost Calculator</div>
      <h1 style={{ fontSize: "clamp(34px, 6vw, 56px)", fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 18px" }}>How much will your new deck cost?</h1>
      <p style={{ fontSize: 17, color: T.textMid, lineHeight: 1.55, maxWidth: 580, margin: "0 auto" }}>An honest estimate in under two minutes — priced against 2026 lumber, composite, and labor rates in your state and metro.</p>
    </div>

    {/* Calculator */}
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px 32px" }}>
      <Card>
        <Ttl>Your Build</Ttl>
        <Dsc>Start with size and material. Change anything — total updates live below.</Dsc>

        {/* Material */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Decking Material</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 20 }}>
          {Object.entries(DECK_MATERIALS).map(([id, m]) => <Opt key={id} sel={material === id} onClick={() => setMaterial(id)}>
            <div style={{ fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.4 }}>{m.desc}</div>
            <div style={{ fontSize: 10, color: T.accent, fontWeight: 700, marginTop: 4 }}>{m.life} · {m.maint}</div>
          </Opt>)}
        </div>

        {/* Shape */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Deck Shape</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: 20 }}>
          {Object.entries(DECK_SHAPES).map(([id, s]) => <Opt key={id} sel={shape === id} onClick={() => setShape(id)}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <ShapeIcon shape={id} active={shape === id} />
              <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 11, color: T.textDim }}>{s.desc}</div>
          </Opt>)}
        </div>

        {/* Size */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Size</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
          <Slider label="Length" val={length} setter={setLength} min={8} max={40} />
          <Slider label="Width" val={width} setter={setWidth} min={6} max={24} />
        </div>
        <div style={{ fontSize: 12, color: T.textMid, marginBottom: 20, textAlign: "center", padding: "8px 12px", background: T.cardAlt, borderRadius: 8 }}>
          <strong style={{ color: T.accent }}>{Math.round(sqft)} sqft</strong> · {Math.round(perimeter)} linear ft perimeter
        </div>

        {/* Height */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Height Off Ground</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 20 }}>
          {Object.entries(HEIGHT_TIERS).map(([id, h]) => <Opt key={id} sel={height === id} onClick={() => setHeight(id)}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{h.label}</div>
            <div style={{ fontSize: 11, color: T.textDim }}>{h.desc}</div>
          </Opt>)}
        </div>

        {/* Railing */}
        {ht.railingRequired && <>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Railing Style</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 20 }}>
            {Object.entries(RAILING_TYPES).filter(([id]) => id !== "none").map(([id, r]) => <Opt key={id} sel={railing === id} onClick={() => setRailing(id)}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: T.textDim }}>{r.desc}</div>
              <div style={{ fontSize: 10, color: T.accent, fontWeight: 700, marginTop: 4 }}>${r.rate}/linear ft</div>
            </Opt>)}
          </div>
        </>}

        {/* Features */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Features & Add-ons</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, marginBottom: 20 }}>
          {DECK_FEATURES.map(f => <Chip key={f.id} on={!!features[f.id]} onClick={() => toggleFeature(f.id)}>
            <span style={{ fontSize: 16 }}>{f.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: T.text }}>{f.label}</div>
              <div style={{ fontSize: 10, color: T.textDim }}>+{fmt(f.perSqft ? Math.round(sqft * 3) : f.cost)}</div>
            </div>
          </Chip>)}
        </div>

        {/* Location */}
        <div style={{ fontSize: 12, fontWeight: 700, color: T.textMid, marginBottom: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>Location</div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 4 }}>
          <select value={st} onChange={e => setSt(e.target.value)} style={{ padding: "11px 12px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none" }}>
            {Object.entries(STATES).map(([k, s]) => <option key={k} value={k}>{s.name}</option>)}
          </select>
          <input value={zip} onChange={e => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="ZIP (optional)" style={{ padding: "11px 12px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none" }} />
        </div>
        {metro.label && <div style={{ fontSize: 11, color: T.accent, marginTop: 6 }}>📍 Detected: {metro.label} ({metro.mult > 1 ? `+${Math.round((metro.mult - 1) * 100)}%` : `${Math.round((metro.mult - 1) * 100)}%`} adjustment)</div>}
      </Card>

      {/* Headline result */}
      <Card style={{ background: `linear-gradient(140deg, ${T.accent} 0%, ${T.accentDark} 100%)`, border: "none", color: "#fff" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 6 }}>Your Estimate</div>
        <div style={{ fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 900, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.02em", lineHeight: 1 }}>{fmt(total)}</div>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 8 }}>Range: {fmt(total * 0.87)} – {fmt(total * 1.18)}</div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>≈ {fmt(total / sqft)} per sqft installed · {mat.label} · {Math.round(sqft)} sqft</div>
      </Card>

      {/* Lead capture */}
      <Card style={{ borderColor: T.accent, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)` }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>🏗️ Get 3 Free Quotes from {sd.name} Deck Builders</div>
        <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6, marginBottom: 12 }}>We'll match you with top-rated contractors in your area who build {mat.label.toLowerCase()} decks. No obligation, no spam.</div>
        {!leadSubmitted ? <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ flex: "1 1 200px", padding: "11px 14px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          <button onClick={() => { if (leadEmail.includes("@")) setLeadSubmitted(true); }} style={{ padding: "13px 24px", borderRadius: 10, border: "none", fontWeight: 600, fontSize: 14, background: T.text, color: "#fff", cursor: "pointer" }}>Get Free Quotes →</button>
        </div> : <div style={{ padding: "12px 16px", background: T.successBg, border: `1px solid ${T.successBorder}`, borderRadius: 9, fontSize: 13, fontWeight: 700, color: T.success }}>✓ We'll be in touch within 24 hours with quotes from {sd.name} builders.</div>}
      </Card>

      {/* Breakdown */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Ttl>Cost Breakdown</Ttl>
          <button onClick={() => setShowBreakdown(!showBreakdown)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.cardAlt, color: T.textMid, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>{showBreakdown ? "Collapse" : "Expand"}</button>
        </div>
        {showBreakdown && bRows.map((r, i) => <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.borderLight}`, gap: 8 }}>
          <div style={{ flex: 1, fontSize: 12, color: r.h ? T.accentDark : T.textMid, fontWeight: r.h ? 700 : 500 }}>{r.l}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontVariantNumeric: "tabular-nums" }}>{fmt(r.v)}</div>
          <div style={{ width: 80, height: 5, borderRadius: 3, background: T.bg2 }}><div style={{ width: `${Math.min((r.v / maxR) * 100, 100)}%`, height: "100%", borderRadius: 3, background: r.c, transition: "width .3s" }} /></div>
        </div>)}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: `2px solid ${T.text}` }}>
          <strong style={{ fontSize: 14, color: T.text }}>Total Installed</strong>
          <strong style={{ fontSize: 18, color: T.accent, fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</strong>
        </div>
      </Card>

      {/* Financing */}
      <FinancingBanner total={total} />
    </div>

    {/* Hero photo below calculator */}
    <div style={{ maxWidth: 1080, margin: "40px auto 8px", padding: "0 16px" }}>
      <figure style={{ margin: 0 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 32px rgba(15,76,92,0.15)", aspectRatio: "16 / 9", background: T.bg2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ padding: 40, textAlign: "center", color: T.textDim, fontSize: 14 }}>Featured deck photo</div>
        </div>
        <figcaption style={{ fontSize: 12, color: T.textDim, marginTop: 10, textAlign: "center", fontStyle: "italic" }}>A thoughtful estimate now. A real deck, later.</figcaption>
      </figure>
    </div>

    {/* Browse footer */}
    <div style={{ maxWidth: 1080, margin: "40px auto", padding: "0 16px" }}>
      <Card>
        <Ttl>Browse deck costs by state</Ttl>
        <Dsc>Deep-dive cost data for every US state.</Dsc>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          {Object.entries(STATES).slice(0, 12).map(([k, s]) => <Link key={k} to={`/${s.name.toLowerCase().replace(/[.\s]/g, "-").replace("washington-d-c", "washington-dc")}`} style={{ padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, color: T.textMid, textDecoration: "none", fontSize: 13, fontWeight: 500 }}>{s.name} →</Link>)}
        </div>
        <div style={{ marginTop: 12 }}><Link to="/deck-cost-by-state" style={{ color: T.accent, fontSize: 13, fontWeight: 600 }}>See all 50 states →</Link></div>
      </Card>
    </div>

    {/* Footer */}
    <div style={{ borderTop: `1px solid ${T.border}`, padding: "28px 24px", textAlign: "center", color: T.textDim, fontSize: 12 }}>
      © 2026 PriceADeck.com · <Link to="/deck-cost-by-state" style={{ color: T.textDim }}>Deck Cost by State</Link> · <Link to="/blog/composite-vs-wood-vs-pvc" style={{ color: T.textDim }}>Materials Guide</Link>
    </div>
  </div>;
}
