export const STATE_SLUGS = [
  "alabama","alaska","arizona","arkansas","california","colorado","connecticut",
  "delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa",
  "kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan",
  "minnesota","mississippi","missouri","montana","nebraska","nevada",
  "new-hampshire","new-jersey","new-mexico","new-york","north-carolina",
  "north-dakota","ohio","oklahoma","oregon","pennsylvania","rhode-island",
  "south-carolina","south-dakota","tennessee","texas","utah","vermont",
  "virginia","washington","west-virginia","wisconsin","wyoming","washington-dc"
];

export const BLOG_SLUGS = [
  "composite-vs-wood-vs-pvc",
  "deck-cost-guide",
  "deck-permits-and-codes",
  "deck-cost-by-size",
  "how-long-to-build-a-deck",
  "deck-financing-guide",
  "does-a-deck-add-home-value",
];

export const CITY_SLUGS = [
  "houston","dallas","phoenix","atlanta","charlotte",
  "denver","nashville","columbus","minneapolis","boston"
];

export const MATERIAL_SLUGS = [
  "composite-deck-cost",
  "trex-deck-cost",
  "pressure-treated-deck-cost",
  "cedar-deck-cost",
  "pvc-deck-cost",
  "ipe-deck-cost",
];

export const SIZE_SLUGS = [
  "deck-cost-10x10",
  "deck-cost-10x12",
  "deck-cost-12x12",
  "deck-cost-12x16",
  "deck-cost-12x20",
  "deck-cost-14x16",
  "deck-cost-14x20",
  "deck-cost-16x16",
  "deck-cost-16x20",
  "deck-cost-20x20",
];

export function getAllPaths() {
  return [
    '/',
    '/deck-cost-by-state',
    '/deck-cost-data',
    ...STATE_SLUGS.map(s => `/${s}`),
    ...BLOG_SLUGS.map(s => `/blog/${s}`),
    ...CITY_SLUGS.map(s => `/city/${s}`),
    ...MATERIAL_SLUGS.map(s => `/${s}`),
    ...SIZE_SLUGS.map(s => `/${s}`),
  ];
}
