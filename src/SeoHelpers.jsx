import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { T } from "./App.jsx";

const HOST = "https://priceadeck.com";

export function JsonLd({ data }) {
  return <Helmet><script type="application/ld+json">{JSON.stringify(data)}</script></Helmet>;
}

export function Breadcrumbs({ trail }) {
  const itemListElement = trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${HOST}${t.path}`,
  }));
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement }} />
    <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: T.textMid, marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
      {trail.map((t, i) => <span key={t.path} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        {i < trail.length - 1
          ? <Link to={t.path} style={{ color: T.textMid, textDecoration: "none", fontWeight: 500 }}>{t.name}</Link>
          : <span style={{ color: T.text, fontWeight: 600 }} aria-current="page">{t.name}</span>}
        {i < trail.length - 1 && <span style={{ color: T.textDim }}>›</span>}
      </span>)}
    </nav>
  </>;
}

export function FAQBlock({ items, title = "Frequently asked questions" }) {
  if (!items || !items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(i => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: typeof i.a === "string" ? i.a : i.aText || "" },
    })),
  };
  return <>
    <JsonLd data={schema} />
    <div style={{ marginTop: 28, marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, color: T.text, margin: "0 0 14px", letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, background: T.card, overflow: "hidden" }}>
        {items.map((item, i) => <details key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
          <summary style={{ padding: "16px 18px", fontSize: 15, fontWeight: 600, color: T.text, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <span>{item.q}</span>
            <span style={{ color: T.accent, fontSize: 18, fontWeight: 700, flexShrink: 0 }}>+</span>
          </summary>
          <div style={{ padding: "0 18px 18px", fontSize: 14, lineHeight: 1.7, color: T.textMid }}>
            {typeof item.a === "string" ? <p style={{ margin: 0 }}>{item.a}</p> : item.a}
          </div>
        </details>)}
      </div>
    </div>
  </>;
}

export function ArticleSchema({ headline, description, slug, datePublished, dateModified, image = `${HOST}/og-image.jpg` }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: "PriceADeck Editorial", url: HOST },
    publisher: {
      "@type": "Organization",
      name: "PriceADeck",
      logo: { "@type": "ImageObject", url: `${HOST}/og-image.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${HOST}${slug}` },
  };
  return <JsonLd data={data} />;
}

export function Byline({ date = "Updated April 18, 2026", author = "PriceADeck Editorial" }) {
  return <div style={{ fontSize: 12, color: T.textDim, marginBottom: 22, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <span style={{ fontWeight: 600, color: T.textMid }}>{author}</span>
    <span>·</span>
    <span>{date}</span>
  </div>;
}
