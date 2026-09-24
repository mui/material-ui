// Semantic ranking for the icon search, backed by the static embedding index built by
// docs/scripts/buildIconSearchIndex.mjs. The query vector is the average of the vectors of the
// query's words, and icons are ranked by cosine similarity to it.

// Number of nearest icons added to the keyword matches, so that searches with no keyword match
// ("rubbish", "puppy") still return results.
const SEMANTIC_NEIGHBORS = 60;

function queryWords(query) {
  return (query.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) ?? []).map((word) =>
    word.toLowerCase(),
  );
}

export function createSemanticIndex(meta, buffer) {
  const { dims, words, icons } = meta;
  const wordScales = new Float32Array(buffer, 0, words.length);
  const iconScales = new Float32Array(buffer, words.length * 4, icons.length);
  const wordValues = new Int8Array(
    buffer,
    (words.length + icons.length) * 4,
    words.length * dims,
  );
  const iconValues = new Int8Array(
    buffer,
    (words.length + icons.length) * 4 + words.length * dims,
    icons.length * dims,
  );
  const wordIds = new Map(words.map((word, i) => [word, i]));

  const iconVectors = new Float32Array(icons.length * dims);
  for (let row = 0; row < icons.length; row += 1) {
    for (let i = 0; i < dims; i += 1) {
      iconVectors[row * dims + i] = iconValues[row * dims + i] * iconScales[row];
    }
  }

  /**
   * Returns a Map of icon name to similarity score, or null when none of the query's words are
   * in the index.
   */
  function score(query) {
    const ids = queryWords(query)
      .map((word) => wordIds.get(word))
      .filter((id) => id !== undefined);
    if (ids.length === 0) {
      return null;
    }
    const vector = new Float32Array(dims);
    for (const id of ids) {
      for (let i = 0; i < dims; i += 1) {
        vector[i] += wordValues[id * dims + i] * wordScales[id];
      }
    }
    const scores = new Map();
    for (let row = 0; row < icons.length; row += 1) {
      let dot = 0;
      for (let i = 0; i < dims; i += 1) {
        dot += vector[i] * iconVectors[row * dims + i];
      }
      scores.set(icons[row], dot);
    }
    return scores;
  }

  return { score };
}

let indexPromise = null;

export function loadSemanticIndex() {
  if (!indexPromise) {
    indexPromise = Promise.all([
      fetch('/static/material-icons/search-index.json').then((response) =>
        response.json(),
      ),
      fetch('/static/material-icons/search-index.bin').then((response) =>
        response.arrayBuffer(),
      ),
    ])
      .then(([meta, buffer]) => createSemanticIndex(meta, buffer))
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }
  return indexPromise;
}

/**
 * Orders icon names (without theme suffix) for a query.
 * `keywordMatches` are the names flexsearch found, in its order.
 */
export function rankIcons(query, keywordMatches, index) {
  const scores = index?.score(query);
  if (!scores) {
    return keywordMatches;
  }
  const compactQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  const words = queryWords(query);
  const byScore = [...scores.keys()].sort((a, b) => scores.get(b) - scores.get(a));
  const candidates = new Set([
    ...keywordMatches,
    ...byScore.slice(0, SEMANTIC_NEIGHBORS),
  ]);
  const keywordMatched = new Set(keywordMatches);
  // Icons whose name is the query or contains every query word come first, then keyword
  // matches, then icons that are only semantically close. Each group is ordered by similarity.
  const group = (name) => {
    const nameParts = queryWords(name);
    if (
      name.toLowerCase() === compactQuery ||
      words.every((word) => nameParts.includes(word))
    ) {
      return 0;
    }
    return keywordMatched.has(name) ? 1 : 2;
  };
  return [...candidates].sort(
    (a, b) => group(a) - group(b) || scores.get(b) - scores.get(a),
  );
}
