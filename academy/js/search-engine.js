/* Doofinder Layer simulation used on the live Doostride store — NLP-ish
   typo tolerance + synonym recognition over STORE_PRODUCTS, echoing the
   "how it works" claims from Lesson 1. Not a real search index. */

const STORE_SYNONYMS = {
  sneaker: "shoes",
  sneakers: "shoes",
  trainer: "shoes",
  trainers: "shoes",
  kicks: "shoes",
  chuck: "converse",
  chucks: "converse"
};

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function doofinderSearch(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return STORE_PRODUCTS
    .map(p => {
      const haystack = (p.title + " " + p.brand + " " + p.category + " " + p.color + " " + p.size).toLowerCase();
      const tokens = haystack.split(/\s+/);
      let matched = 0;
      words.forEach(w => {
        const resolved = STORE_SYNONYMS[w] || w;
        const substrHit = haystack.includes(resolved);
        const typoHit = resolved.length >= 4 && tokens.some(t => t.length >= 4 && levenshtein(t, resolved) <= 1);
        if (substrHit || typoHit) matched++;
      });
      return { product: p, matched };
    })
    .filter(r => r.matched > 0)
    .sort((a, b) => b.matched - a.matched)
    .slice(0, 6)
    .map(r => r.product);
}
