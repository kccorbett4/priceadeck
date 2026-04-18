import { useState, useMemo, useEffect, useRef } from "react";
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

/* Deck materials. sqftRate = board cost/sqft; fastenerRate = clips+screws/sqft; stepRate = $/step for stringer+tread material */
export const DECK_MATERIALS = {
  pt:       {label:"Pressure-Treated Pine",  sqftRate:5,   fastenerRate:0.50, stepRate:28,  life:"15–20 yrs", maint:"Stain every 2–3 yrs", desc:"Cheapest, workhorse lumber"},
  cedar:    {label:"Cedar / Redwood",        sqftRate:9,   fastenerRate:0.65, stepRate:42,  life:"20–25 yrs", maint:"Seal every 2–3 yrs",  desc:"Natural rot resistance, warm look"},
  composite:{label:"Composite (Trex, TimberTech)", sqftRate:14, fastenerRate:1.80, stepRate:90,  life:"25–30 yrs", maint:"Rinse yearly",   desc:"Low maintenance, fade-resistant"},
  pvc:      {label:"PVC / Cellular",         sqftRate:19,  fastenerRate:1.80, stepRate:115, life:"30+ yrs",   maint:"Rinse yearly",        desc:"Waterproof, premium durability"},
  hardwood: {label:"Ipe / Cumaru Hardwood",  sqftRate:22,  fastenerRate:2.20, stepRate:135, life:"40+ yrs",   maint:"Oil annually (optional)", desc:"Tropical dense wood, elite look"},
};

/* Shapes: sizeFactor scales footprint from L×W; framingFactor adds framing complexity overhead;
   perimeterFactor adjusts railing linear feet; wasteFactor is extra decking lost to cuts. */
export const DECK_SHAPES = {
  rectangle:  {label:"Rectangle",   sizeFactor:1.00, framingFactor:1.00, perimeterFactor:1.00, wasteFactor:0.08, desc:"Simplest build"},
  lshape:     {label:"L-Shape",     sizeFactor:1.08, framingFactor:1.10, perimeterFactor:1.20, wasteFactor:0.12, desc:"Wraps around corner"},
  wraparound: {label:"Wraparound",  sizeFactor:1.15, framingFactor:1.20, perimeterFactor:1.45, wasteFactor:0.14, desc:"Two+ sides of the house"},
  multilevel: {label:"Multi-Level", sizeFactor:1.15, framingFactor:1.35, perimeterFactor:1.15, wasteFactor:0.13, desc:"Two elevations, extra framing"},
};

/* heightInches drives stair step count (7" rise); frameMult scales joist/beam cost. */
export const HEIGHT_TIERS = {
  ground: {label:"Ground-level (0–2 ft)",   heightInches:12, frameMult:1.00, railingRequired:false, desc:"No railing required"},
  low:    {label:"Low (2–4 ft)",              heightInches:36, frameMult:1.05, railingRequired:true,  desc:"1 short stair run, railing required"},
  mid:    {label:"Mid (4–6 ft)",              heightInches:60, frameMult:1.12, railingRequired:true,  desc:"Full stair run, full railing"},
  high:   {label:"Raised (6–10 ft)",          heightInches:96, frameMult:1.25, railingRequired:true,  desc:"Long stair run, deeper footings"},
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
  {id:"demo",          label:"Remove Existing Deck",        cost:5,     icon:"🧹", laborIntensive:true, perSqft:true},
  {id:"lighting",      label:"Deck Lighting",               cost:1400,  icon:"💡", laborIntensive:false, permit:50},
  {id:"bench",         label:"Built-in Benches",            cost:1600,  icon:"🪑", laborIntensive:true},
  {id:"planter",       label:"Built-in Planters",           cost:900,   icon:"🌿", laborIntensive:true},
  {id:"pergola",       label:"Pergola (10×12)",             cost:6500,  icon:"🏛️", laborIntensive:true, permit:150},
  {id:"privacy",       label:"Privacy Screen Wall",         cost:2200,  icon:"🌳", laborIntensive:true},
  {id:"hottub",        label:"Hot Tub Cutout + Reinforce",  cost:2800,  icon:"♨️", laborIntensive:true, permit:120},
  {id:"outdoor_kit",   label:"Outdoor Kitchen Bump-Out",    cost:9500,  icon:"🍳", laborIntensive:true, permit:140},
  {id:"firetable",     label:"Gas Fire Table Rough-in",     cost:1500,  icon:"🔥", laborIntensive:true, permit:80},
  {id:"screenroom",    label:"Screened Enclosure",          cost:14000, icon:"🪟", laborIntensive:true, permit:220, requiresRoof:true},
];

/* Shared estimator used by sub-pages for 300 sqft mid-height composite samples. */
export function estimateSample({ matRate, fastenerRate = 1.5, stepRate = 90, stateCode, metroMult = 1.0, sqft = 300 }) {
  const sd = STATES[stateCode]; if (!sd) return 0;
  const labMult = sd.labor * metroMult;
  const frostMult = sd.frost ? 1.08 : 1.0;
  const matCost    = sqft * (matRate + fastenerRate) * 1.08;                  // 8% waste (rectangle)
  const frameCost  = sqft * 10.50 * 1.12 * frostMult * 1.00;                  // mid-height, rect
  const piers      = Math.max(4, Math.ceil(sqft / 60));
  const footings   = piers * (sd.frost ? 260 : 180);
  const ledgerCost = 20 * 26;                                                 // 20-ft ledger
  const stepCount  = Math.ceil(60 / 7);                                       // mid-height, ~9 steps
  const stairCost  = stepCount * (stepRate + 55) + 350;                       // 4-ft-wide stair run
  const stairRailLf = stepCount * (11/12) * 2;
  const perimRailLf = 2*(20+15) - 20;                                         // 20×15 footprint, one house-side
  const railingCost = (perimRailLf + stairRailLf) * 65;                       // composite rate
  const subtotal   = matCost + frameCost + footings + ledgerCost + stairCost + railingCost;
  const laborCost  = subtotal * (0.42 + 0.40 * (labMult - 1));
  const permit     = sd.permit + sqft * 0.50;
  return Math.round((subtotal + laborCost + permit) * 1.08);
}

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

export function Card({ children, style: sx, hover }) { return <div data-card-hover={hover ? "true" : undefined} style={{ ...S.card, ...sx }}>{children}</div>; }
export function Ttl({ children }) { return <div style={S.ttl}>{children}</div>; }
export function Dsc({ children }) { return <div style={S.dsc}>{children}</div>; }
export function Opt({ sel, onClick, children, style: sx }) { return <div data-option onClick={onClick} style={{ ...S.opt(sel), ...sx }}>{children}</div>; }
export function Chip({ on, onClick, children }) {
  return <div data-option onClick={onClick} style={S.chip(on)}>{children}<div style={{ width: 18, height: 18, borderRadius: 4, background: on ? T.accent : T.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{on ? "✓" : ""}</div></div>;
}
export function Btn({ pri, dis, children, onClick }) { return <button data-btn={pri ? "primary" : "secondary"} onClick={onClick} disabled={dis} style={S.btn(pri, dis)}>{children}</button>; }
function Slider({ label, val, setter, min, max, stp = 1, suffix = "ft" }) {
  const pct = ((val - min) / (max - min)) * 100;
  return <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.textMid }}>{label}</span>
      <span style={{ fontSize: 17, fontWeight: 800, color: T.accent, fontVariantNumeric: "tabular-nums" }}>{Math.round(val)} {suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={stp} value={val}
      onChange={e => setter(+e.target.value)} className="deck-slider" style={{ "--fill": `${pct}%` }} />
  </div>;
}

/* Animated number counter — cubic ease-out tween between renders */
function useAnimatedNumber(value, duration = 500) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const start = prev.current, end = value, t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

/* ── Nav (shared across pages) ── */
export function Nav() {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
    <Link to="/" style={{ textDecoration: "none", color: T.text, fontWeight: 800, fontSize: 18, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.015em" }}>PriceADeck<span style={{ color: T.accent }}>.com</span></Link>
    <div style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 13, flexWrap: "wrap" }}>
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

  const footprint = length * width * sh.sizeFactor;
  const perimeter = 2 * (length + width) * sh.perimeterFactor;

  /* Cost model */
  const {
    matCost, frameCost, footings, railingCost, stairCost, ledgerCost, featCost,
    subtotalBeforeLabor, laborCost, permit, contingency, total, bRows, footingsCount, totalRailLf
  } = useMemo(() => {
    const labMult = sd.labor * metro.mult;
    const frostMult = sd.frost ? 1.08 : 1.0;
    const isGround = !ht.railingRequired;

    // Material: boards + fasteners + waste
    const matCost = footprint * (mat.sqftRate + mat.fastenerRate) * (1 + sh.wasteFactor);

    // Framing: $10.50/sqft PT baseline, scaled by height/frost/shape complexity
    const frameCost = footprint * 10.50 * ht.frameMult * frostMult * sh.framingFactor;

    // Footings: ~1 pier per 60 sqft, floor of 4, +2 for raised/multi
    const footingsCount = Math.max(4, Math.ceil(footprint / 60))
      + (height === "high" ? 2 : 0)
      + (shape === "multilevel" ? 2 : 0);
    const footings = footingsCount * (sd.frost ? 260 : 180);

    // Ledger + flashing (when deck attaches to house)
    const ledgerLf = isGround ? 0 : (shape === "wraparound" ? length + width : length);
    const ledgerCost = ledgerLf * 26;

    // Stairs: per-step material + labor, scales with material + width + run count
    const stairRuns = isGround ? 0 : (shape === "multilevel" ? 2 : 1);
    const stepCount = Math.ceil(ht.heightInches / 7);
    const stairRunFt = stepCount * (11 / 12);
    const stairWidthFt = 4;
    const widthFactor = stairWidthFt / 4;
    // Multi-level's 2nd run is the step between levels — typically half the height
    const stairCost = stairRuns > 0
      ? stairRuns === 2
        ? (stepCount * (mat.stepRate + 55) * widthFactor + 350)
          + (Math.ceil(stepCount / 2) * (mat.stepRate + 55) * widthFactor + 350)
        : stepCount * (mat.stepRate + 55) * widthFactor + 350
      : 0;

    // Railing: perimeter minus house-side + stair handrails (both sides)
    const houseLf = isGround ? 0 : (shape === "wraparound" ? length + width : length);
    const perimRailLf = ht.railingRequired ? Math.max(0, perimeter - houseLf) : 0;
    const stairRailLf = stairRuns * stairRunFt * 2;
    const totalRailLf = perimRailLf + stairRailLf;
    const railingCost = totalRailLf * rail.rate;

    // Features
    let featCost = 0;
    let featurePermit = 0;
    Object.entries(features).forEach(([id, on]) => {
      if (!on) return;
      const f = DECK_FEATURES.find(x => x.id === id);
      if (!f) return;
      let c = f.cost;
      if (f.perSqft) c = Math.round(footprint * f.cost);
      featCost += f.laborIntensive ? c * (0.55 + 0.45 * labMult) : c;
      if (f.permit) featurePermit += f.permit;
    });

    const subtotalBeforeLabor = matCost + frameCost + footings + ledgerCost + stairCost + railingCost + featCost;

    // Labor: narrowed swing — 36% (MS) to 58% (HI) of subtotal. Was 42-76%.
    const laborCost = subtotalBeforeLabor * (0.42 + 0.40 * (labMult - 1));

    // Permit: base + sqft fee + feature surcharges
    const permit = sd.permit + Math.round(footprint * 0.50) + featurePermit;

    const preCont = subtotalBeforeLabor + laborCost + permit;
    const contingency = preCont * 0.08;
    const total = preCont + contingency;

    const bRows = [
      { l: `Decking (${mat.label}${sh.wasteFactor > 0 ? `, +${Math.round(sh.wasteFactor*100)}% waste` : ""})`, v: matCost, c: T.accent },
      { l: "Framing (joists, posts, beams)", v: frameCost, c: T.textMid },
      { l: `Footings (${footingsCount} piers${sd.frost ? ", frost-depth" : ""})`, v: footings, c: T.textMid },
      ...(ledgerCost > 0 ? [{ l: `Ledger & flashing (${Math.round(ledgerLf)} lf)`, v: ledgerCost, c: T.textMid }] : []),
      ...(stairCost > 0 ? [{ l: `Stairs (${stairRuns} run${stairRuns > 1 ? "s" : ""}, ${stepCount} steps)`, v: stairCost, c: T.textMid }] : []),
      ...(railingCost > 0 ? [{ l: `Railing (${rail.label}, ${Math.round(totalRailLf)} lf)`, v: railingCost, c: T.textMid }] : []),
      ...(featCost > 0 ? [{ l: "Features", v: featCost, c: T.accent }] : []),
      { l: `Labor (${sd.name}${metro.label ? `, ${metro.label}` : ""})`, v: laborCost, c: T.accentDark, h: true },
      { l: "Permits & fees", v: permit, c: T.textDim },
      { l: "Contingency (8%)", v: contingency, c: T.textDim },
    ];

    return { matCost, frameCost, footings, railingCost, stairCost, ledgerCost, featCost, subtotalBeforeLabor, laborCost, permit, contingency, total, bRows, footingsCount, totalRailLf };
  }, [footprint, perimeter, mat, ht, sh, rail, sd, metro, features, shape, height, length, width]);

  const maxR = Math.max(...bRows.map(r => r.v));
  const animTotal = useAnimatedNumber(total);

  const toggleFeature = (id) => setFeatures(f => ({ ...f, [id]: !f[id] }));

  return <div style={{ minHeight: "100vh", color: T.text }}>
    <Helmet>
      <title>Deck Cost Calculator 2026 — How Much Does a Deck Cost?</title>
      <meta name="description" content="Free 2026 deck cost calculator. Instant estimates for composite, pressure-treated, cedar, PVC, and hardwood decks adjusted for your state and build." />
      <link rel="canonical" href="https://priceadeck.com/" />
    </Helmet>

    {/* Nav */}
    <div style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}><Nav /></div>

    {/* Hero */}
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px 40px", textAlign: "center" }}>
      <img src="/og-image.jpg" alt="PriceADeck — deck cost calculator" style={{ width: "min(340px, 80vw)", height: "auto", display: "block", margin: "0 auto 18px", borderRadius: 12 }} />
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
          <strong style={{ color: T.accent }}>{Math.round(footprint)} sqft</strong> · {Math.round(perimeter)} linear ft perimeter
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
              <div style={{ fontSize: 10, color: T.textDim }}>+{fmt(f.perSqft ? Math.round(footprint * f.cost) : f.cost)}</div>
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
      <Card style={{ background: `linear-gradient(140deg, ${T.accent} 0%, ${T.accentDark} 100%)`, border: "none", color: "#fff", borderRadius: 16 }} data-print-section="estimate" data-estimate-card>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85, marginBottom: 6 }}>Your Estimate</div>
        <div style={{ fontSize: "clamp(38px, 7.5vw, 62px)", fontWeight: 800, fontFamily: "'Fraunces',Georgia,serif", letterSpacing: "-0.025em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{fmt(animTotal)}</div>
        <div style={{ fontSize: 14, opacity: 0.9, marginTop: 10 }}>Range: {fmt(total * 0.87)} – {fmt(total * 1.18)}</div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>≈ {fmt(total / footprint)} per sqft installed · {mat.label} · {Math.round(footprint)} sqft</div>
        <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }} className="no-print">
          <button onClick={() => window.print()} style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>💾 Save / Print Estimate</button>
          <button onClick={() => { if (navigator.share) navigator.share({ title: "My deck estimate", text: `My ${mat.label} deck estimate: ${fmt(total)} (${Math.round(footprint)} sqft in ${sd.name})`, url: window.location.href }); else { navigator.clipboard?.writeText(window.location.href); } }} style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>📤 Share Estimate</button>
        </div>
      </Card>

      {/* Lead capture */}
      <Card style={{ borderColor: T.accent, background: `linear-gradient(135deg, ${T.accentLight}, #f0f9ff)` }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 4 }}>🏗️ Get 3 Free Quotes from {sd.name} Deck Builders</div>
        <div style={{ fontSize: 11, color: T.textMid, lineHeight: 1.6, marginBottom: 12 }}>We'll match you with top-rated contractors in your area who build {mat.label.toLowerCase()} decks. No obligation, no spam.</div>
        {!leadSubmitted ? <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input value={leadEmail} onChange={e => setLeadEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ flex: "1 1 200px", padding: "11px 14px", borderRadius: 9, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          <button onClick={() => {
            if (!leadEmail.includes("@")) return;
            setLeadSubmitted(true);
            if (typeof window.gtag === "function") window.gtag("event", "lead_submitted", { state: st, material, estimate: Math.round(total) });
            fetch("https://script.google.com/macros/s/AKfycbzPpHWMgtvWn9ZxV-URWZw4OTLYA7t97FkWHLYsULdIZGU0xuGYHzgQVDCSnRxch0RE/exec", {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                site: "priceadeck",
                email: leadEmail,
                state: sd.name,
                zip: zip || "—",
                metro: metro.label || "—",
                material: mat.label,
                shape: sh.label,
                length,
                width,
                footprint: Math.round(footprint),
                height: ht.label,
                railing: rail.label,
                features: Object.entries(features).filter(([,v]) => v).map(([k]) => DECK_FEATURES.find(f => f.id === k)?.label || k).join(", ") || "None",
                estimateLow: fmt(total * 0.87),
                estimate: fmt(total),
                estimateHigh: fmt(total * 1.18),
                perSqft: fmt(total / footprint),
              }),
            }).catch(() => {});
          }} style={{ padding: "13px 24px", borderRadius: 10, border: "none", fontWeight: 600, fontSize: 14, background: T.text, color: "#fff", cursor: "pointer" }}>Get Free Quotes →</button>
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
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 32px rgba(15,76,92,0.15)", aspectRatio: "16 / 9", background: T.bg2 }}>
          <img src="/hero-deck.jpg" alt="Modern composite deck at golden hour with family and string lights" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
    <div style={{ borderTop: `1px solid ${T.border}`, padding: "28px 24px", textAlign: "center", color: T.textDim, fontSize: 12, lineHeight: 1.8 }}>
      Estimates based on 2026 national averages adjusted for state, metro area, and scope. Actual costs vary by contractor, site, and materials. Always get 3+ written bids.<br />
      © 2026 PriceADeck.com ·<Link to="/deck-cost-by-state" style={{ color: T.textDim }}>By State</Link> · <Link to="/blog/composite-vs-wood-vs-pvc" style={{ color: T.textDim }}>Materials Guide</Link>
    </div>
  </div>;
}
