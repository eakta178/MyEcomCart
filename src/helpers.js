export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "adorable",
    "beautiful",
    "clean",
    "drab",
    "elegant",
    "fancy",
    "glamorous",
    "handsome",
    "long",
    "magnificent",
    "sparkling",
    "fierce",
    "mysterious"
  ];

  const nouns = [
    "teeth",
    "feet",
    "leaves",
    "mice",
    "geese",
    "halves",
    "knives",
    "lives",
    "elves",
    "loaves",
    "potatoes",
    "tomatoes",
    "syllabuses",
    "analyses",
    "diagnoses",
    "oases",
    "theses",
    "phenomena",
    "criteria",
    "data"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
