// Pure helpers for the playground's mapping-input value language, shared by the
// page (theme apply path) and KnobInput (per-keystroke feedback).

export const SCALE_KEYS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

export const isDensityKey = (t: string) => (SCALE_KEYS as readonly string[]).includes(t);

export const tokenize = (input: string) => input.trim().split(/\s+/).filter(Boolean);

// A mapping input is ANY valid CSS value. A density key (`xxs`…`xxl`) is sugar
// for `var(--mui-density-<key>)`; anything else passes through verbatim as raw
// CSS (`12px`, `2rem`, `auto`). 1 token → all sides; 2 → `block inline`.
export const resolveValue = (input: string) =>
  tokenize(input)
    .map((t) => (isDensityKey(t) ? `var(--mui-density-${t})` : t))
    .join(' ');

// Empty = inert (no override, no error). >2 tokens = error. Otherwise ok — raw
// values are first-class, never rejected as "not a density key".
export function parseMapping(input: string): { state: 'empty' | 'ok' | 'error'; error?: string } {
  const tokens = tokenize(input);
  if (tokens.length === 0) {
    return { state: 'empty' };
  }
  if (tokens.length > 2) {
    return { state: 'error', error: 'max 2 values (block inline)' };
  }
  return { state: 'ok' };
}

// Helper-text rule: always a concrete CSS value, never a raw var() string —
// typed keys AND emitted `var(--mui-density-<step>)` refs resolve to their px
// off the active scale (step name when no scale); everything else echoes as typed.
export const previewText = (input: string, scalePx: Record<string, string> | null) =>
  tokenize(input)
    .map((t) => {
      if (isDensityKey(t)) {
        return scalePx?.[t] ?? t;
      }
      const densityVar = /^var\(--mui-density-(\w+)\)$/.exec(t);
      return densityVar ? (scalePx?.[densityVar[1]] ?? densityVar[1]) : t;
    })
    .join(' ');

// Placeholder rule: emitted `var(--mui-density-<step>)` refs shorten to the bare
// step name (`var(--mui-density-xs) var(--mui-density-lg)` → `xs lg`) — the
// placeholder mirrors what you'd TYPE; the helper shows what it RESOLVES to.
export const shortenDensityVars = (value: string) =>
  value.replace(/var\(--mui-density-(\w+)\)/g, '$1');
