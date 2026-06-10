// Force programmatic scrolling to be instant so screenshots are deterministic.
//
// Some composites scroll on mount with `{ behavior: 'smooth' }` (e.g.
// `MaterialStyling` scrolls its code panel via `infoRef.scroll(...)`). An
// explicit `behavior: 'smooth'` overrides CSS `scroll-behavior` per the CSSOM
// spec, and Playwright's `animations: 'disabled'` screenshot option doesn't
// stop an in-flight JS scroll — so the panel can be captured mid-scroll at a
// different offset every run, churning the Argos baseline.
//
// Patch the scroll APIs to coerce a `{ behavior }` option to `'auto'`
// (instant). The positional `(x, y)` overloads pass through untouched.
// Imported before the fixtures so every composite sees the patched methods.

function coerceInstant(args: IArguments | unknown[]): void {
  const first = args[0];
  if (first && typeof first === 'object' && 'behavior' in first) {
    (first as { behavior?: ScrollBehavior }).behavior = 'auto';
  }
}

const proto = Element.prototype;
const elementScroll = proto.scroll;
const elementScrollTo = proto.scrollTo;
const elementScrollBy = proto.scrollBy;
const elementScrollIntoView = proto.scrollIntoView;

proto.scroll = function scroll(this: Element, ...args: unknown[]) {
  coerceInstant(args);
  return (elementScroll as (...a: unknown[]) => void).apply(this, args);
};
proto.scrollTo = function scrollTo(this: Element, ...args: unknown[]) {
  coerceInstant(args);
  return (elementScrollTo as (...a: unknown[]) => void).apply(this, args);
};
proto.scrollBy = function scrollBy(this: Element, ...args: unknown[]) {
  coerceInstant(args);
  return (elementScrollBy as (...a: unknown[]) => void).apply(this, args);
};
proto.scrollIntoView = function scrollIntoView(this: Element, ...args: unknown[]) {
  coerceInstant(args);
  return (elementScrollIntoView as (...a: unknown[]) => void).apply(this, args);
};

export {};
