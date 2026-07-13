// Pure helpers for the playground's mapping-input value language, shared by the
// page (theme apply path) and KnobInput (per-keystroke feedback).

export const SCALE_KEYS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export const isDensityKey = (t: string) => (SCALE_KEYS as readonly string[]).includes(t);

// `-<key>` = negated step (the sugar the presets' negative pulls emit as
// `calc(var(--mui-density-<key>) * -1)`, e.g. CardHeader action margins).
const NEG_KEY_RE = /^-(xxs|xs|sm|md|lg|xl|xxl)$/;
const NEG_CALC_RE = /calc\(var\(--mui-density-(\w+)\) \* -1\)/g;

export const tokenize = (input: string) => input.trim().split(/\s+/).filter(Boolean);

// A mapping input is ANY valid CSS value. A density key (`xxs`…`xxl`) is sugar
// for `var(--mui-density-<key>)`, a negated key (`-xs`) for
// `calc(var(--mui-density-xs) * -1)`; anything else passes through verbatim as
// raw CSS (`12px`, `2rem`, `auto`). Multi-token inputs follow the CSS
// shorthand of the target prop (`xs md`, `0px 12px 12px`).
export const resolveValue = (input: string) =>
  tokenize(input)
    .map((t) => {
      if (isDensityKey(t)) {
        return `var(--mui-density-${t})`;
      }
      const neg = NEG_KEY_RE.exec(t);
      return neg ? `calc(var(--mui-density-${neg[1]}) * -1)` : t;
    })
    .join(' ');

// Empty = inert (no override). Anything else is trusted verbatim — every token
// resolves independently and CSS shorthands take 1–4 values (`0px 12px 12px`),
// so the input is never rejected.
export function parseMapping(input: string): { state: 'empty' | 'ok' } {
  return tokenize(input).length === 0 ? { state: 'empty' } : { state: 'ok' };
}

// Helper-text rule: always a concrete CSS value, never a raw var() string —
// typed keys AND emitted `var(--mui-density-<step>)` refs resolve to their px
// off the active scale (step name when no scale); everything else echoes as typed.
export const previewText = (input: string, scalePx: Record<string, string> | null) =>
  tokenize(input.replace(NEG_CALC_RE, '-$1'))
    .map((t) => {
      if (isDensityKey(t)) {
        return scalePx?.[t] ?? t;
      }
      const neg = NEG_KEY_RE.exec(t);
      if (neg) {
        return scalePx?.[neg[1]] ? `-${scalePx[neg[1]]}` : t;
      }
      const densityVar = /^var\(--mui-density-(\w+)\)$/.exec(t);
      return densityVar ? (scalePx?.[densityVar[1]] ?? densityVar[1]) : t;
    })
    .join(' ');

// Placeholder rule: emitted `var(--mui-density-<step>)` refs shorten to the bare
// step name (`var(--mui-density-xs) var(--mui-density-lg)` → `xs lg`) and the
// negated-calc form to `-<step>` — the placeholder mirrors what you'd TYPE; the
// helper shows what it RESOLVES to.
export const shortenDensityVars = (value: string) =>
  value.replace(NEG_CALC_RE, '-$1').replace(/var\(--mui-density-(\w+)\)/g, '$1');
