// Pure helpers for the playground's mapping-input value language, shared by the
// page (theme apply path) and KnobInput (per-keystroke feedback).

export const SCALE_KEYS = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const;

export const isDensityKey = (t: string) => (SCALE_KEYS as readonly string[]).includes(t);

// `-<key>` = negated step (the sugar the presets' negative pulls emit as
// `calc(var(--mui-density-<key>) * -1)`, e.g. CardHeader action margins).
const NEG_KEY_RE = /^-(xx-small|x-small|small|medium|large|x-large|xx-large)$/;
const NEG_CALC_RE = /calc\(var\(--mui-density-([\w-]+)\) \* -1\)/g;

export const tokenize = (input: string) => input.trim().split(/\s+/).filter(Boolean);

// Density keys EMBEDDED in composite tokens — `calc(xx-small + 2px)` — matched
// longest-first ('xx-small' before 'x-small'; '-' is a non-word char so \b sits
// inside dashed names, but the literal alternation disambiguates). Tokens that
// already carry a `var(` are skipped: the key text inside `--mui-density-x-small`
// must not double-expand.
const KEY_ANYWHERE_RE = /\b(xx-small|xx-large|x-small|x-large|small|medium|large)\b/g;

// A mapping input is ANY valid CSS value. A density key (`xx-small`…`xx-large`)
// is sugar for `var(--mui-density-<key>)`, a negated key (`-x-small`) for
// `calc(var(--mui-density-x-small) * -1)` — whole-token OR embedded in a calc
// (`calc(xx-small + 2px)`, what the placeholder shows for calc-emitting rows);
// anything else passes through verbatim as raw CSS (`12px`, `2rem`, `auto`).
// Multi-token inputs follow the CSS shorthand of the target prop
// (`x-small medium`, `0px 12px 12px`).
export const resolveValue = (input: string) =>
  tokenize(input)
    .map((t) => {
      if (isDensityKey(t)) {
        return `var(--mui-density-${t})`;
      }
      const neg = NEG_KEY_RE.exec(t);
      if (neg) {
        return `calc(var(--mui-density-${neg[1]}) * -1)`;
      }
      if (t.includes('var(')) {
        return t;
      }
      return t.replace(KEY_ANYWHERE_RE, 'var(--mui-density-$1)');
    })
    .join(' ');

// Empty = inert (no override). Anything else is trusted verbatim — every token
// resolves independently and CSS shorthands take 1–4 values (`0px 12px 12px`),
// so the input is never rejected.
export function parseMapping(input: string): { state: 'empty' | 'ok' } {
  return tokenize(input).length === 0 ? { state: 'empty' } : { state: 'ok' };
}

// Flat calc arithmetic → one px value (`calc(4px + 2px)` → `6px`). Handles the
// only shapes the presets emit: no nesting, px terms with + −, unitless factors
// with * / (CSS precedence: * / bind first). Anything it can't prove returns
// unchanged, so unresolvable expressions still echo.
const evaluateCalc = (value: string): string => {
  const inner = /^calc\(([^()]+)\)$/.exec(value.trim());
  if (!inner) {
    return value;
  }
  const tokens = inner[1].trim().split(/\s+/);
  interface Term {
    n: number;
    px: boolean;
  }
  const parseTerm = (t: string): Term | null => {
    const m = /^(-?(?:\d+\.?\d*|\.\d+))(px)?$/.exec(t);
    return m ? { n: parseFloat(m[1]), px: Boolean(m[2]) } : null;
  };
  // Pass 1: fold * and / into their left neighbour (px × unitless or unitless × px).
  const folded: (Term | string)[] = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const left = folded.pop();
      const right = parseTerm(tokens[i + 1] ?? '');
      if (!left || typeof left === 'string' || !right) {
        return value;
      }
      if (t === '*' ? left.px && right.px : right.px || right.n === 0) {
        return value; // px×px or divide-by-px/zero — not a length
      }
      folded.push({ n: t === '*' ? left.n * right.n : left.n / right.n, px: left.px || right.px });
      i += 2;
    } else if (t === '+' || t === '-') {
      folded.push(t);
      i += 1;
    } else {
      const term = parseTerm(t);
      if (!term) {
        return value;
      }
      folded.push(term);
      i += 1;
    }
  }
  // Pass 2: + and − over px terms, left to right.
  let acc: number | null = null;
  let op: string | null = null;
  for (const item of folded) {
    if (typeof item === 'string') {
      if (op !== null || acc === null) {
        return value;
      }
      op = item;
    } else {
      if (!item.px && item.n !== 0) {
        return value; // adding a unitless length is not resolvable
      }
      if (acc === null) {
        acc = item.n;
      } else if (op === '+') {
        acc += item.n;
      } else if (op === '-') {
        acc -= item.n;
      } else {
        return value; // two terms with no operator
      }
      op = null;
    }
  }
  if (acc === null || op !== null) {
    return value;
  }
  return `${Math.round(acc * 1000) / 1000}px`;
};

// Helper-text rule: always a concrete CSS value, never a raw var() string —
// typed keys AND emitted `var(--mui-density-<step>)` refs resolve to their px
// off the active scale (step name when no scale), including INSIDE calc
// expressions, and flat calc arithmetic collapses to one px value
// (`calc(xx-small + 2px)` → `6px`); everything else echoes as typed.
export const previewText = (input: string, scalePx: Record<string, string> | null) => {
  const resolved = tokenize(input.replace(NEG_CALC_RE, '-$1'))
    .map((t) => {
      if (isDensityKey(t)) {
        return scalePx?.[t] ?? t;
      }
      const neg = NEG_KEY_RE.exec(t);
      if (neg) {
        return scalePx?.[neg[1]] ? `-${scalePx[neg[1]]}` : t;
      }
      const densityVar = /^var\(--mui-density-([\w-]+)\)$/.exec(t);
      if (densityVar) {
        return scalePx?.[densityVar[1]] ?? densityVar[1];
      }
      // Embedded refs/keys inside composite tokens (calc chunks).
      let out = t.replace(/var\(--mui-density-([\w-]+)\)/g, (m, k) => scalePx?.[k] ?? m);
      if (!t.includes('var(')) {
        out = out.replace(KEY_ANYWHERE_RE, (m, k) => scalePx?.[k] ?? m);
      }
      return out;
    })
    .join(' ');
  return evaluateCalc(resolved);
};

// Placeholder rule: emitted `var(--mui-density-<step>)` refs shorten to the bare
// step name (`var(--mui-density-x-small) var(--mui-density-large)` →
// `x-small large`) and the negated-calc form to `-<step>` — the placeholder
// mirrors what you'd TYPE; the helper shows what it RESOLVES to.
export const shortenDensityVars = (value: string) =>
  value.replace(NEG_CALC_RE, '-$1').replace(/var\(--mui-density-([\w-]+)\)/g, '$1');

// Emotion parity for bare numbers: presets emit numeric leaves (`minWidth: 32`)
// and emotion appends `px`, but a knob edit travels as a STRING, which emotion
// passes through verbatim — so `24` rendered as invalid `min-width: 24`. Mirror
// emotion's rule at the edit layer: a pure-numeric token gains `px`, except on
// unitless CSS props and the EXPLICIT unitless custom props below. Every other
// custom property in this system (`--_caret`, `--_arrowSize`, the pad vars,
// `--TreeView-itemHeight`) is a length consumed inside calc()/var() where a
// bare number is invalid — so those DO get the sugar.
const UNITLESS_PROPS = new Set([
  'lineHeight',
  'fontWeight',
  'opacity',
  'zIndex',
  'flex',
  'flexGrow',
  'flexShrink',
  '--DataGrid-cellOffsetMultiplier',
]);
const NUMERIC_TOKEN_RE = /^-?(\d+\.?\d*|\.\d+)$/;
export const appendPxToNumeric = (value: string, prop?: string) => {
  if (prop && UNITLESS_PROPS.has(prop)) {
    return value;
  }
  return tokenize(value)
    .map((t) => (NUMERIC_TOKEN_RE.test(t) ? `${t}px` : t))
    .join(' ');
};
