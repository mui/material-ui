import { styleSheetsToString } from '@mui/system/cssVars';

// Breakpoint-dependent component CSS cannot live in static .module.css files
// because it must use the live theme breakpoints. Components register small
// descriptors here; static CSS generation and provider paths serialize them
// with the current theme.
export interface BreakpointStyleTheme {
  breakpoints?:
    | {
        up: (key: any) => string;
      }
    | undefined;
  rootSelector?: string | undefined;
  spacing?: ((value: number) => string) | undefined;
}

export interface ResolvedBreakpointStyleTheme extends BreakpointStyleTheme {
  breakpoints: {
    up: (key: any) => string;
  };
  spacing: (value: number) => string;
}

export type BreakpointStyleSheets = Array<Record<string, any>>;

// Returns styleSheetsToString-compatible objects, usually keyed by @media.
export type BreakpointStylesDescriptor = (
  theme: ResolvedBreakpointStyleTheme,
) => BreakpointStyleSheets;

// Immutable snapshot for useSyncExternalStore. The object identity changes when
// registrations change, so React memos can depend on it without dummy deps.
export interface BreakpointStylesSnapshot {
  version: number;
  descriptors: ReadonlyArray<BreakpointStylesDescriptor>;
}

const registry = new Map<string, BreakpointStylesDescriptor>();
const listeners = new Set<() => void>();
let version = 0;
let snapshot: BreakpointStylesSnapshot = {
  version,
  descriptors: [],
};
let notifyScheduled = false;

function notify() {
  notifyScheduled = false;
  listeners.forEach((listener) => {
    listener();
  });
}

function scheduleNotify() {
  if (notifyScheduled) {
    return;
  }

  notifyScheduled = true;

  if (typeof queueMicrotask === 'function') {
    queueMicrotask(notify);
  } else {
    Promise.resolve().then(notify);
  }
}

// Components register at module import time; batch those imports into one update.
// Name-keying dedupes repeated imports/HMR for the same component.
export function registerBreakpointStyles(name: string, descriptor: BreakpointStylesDescriptor) {
  if (registry.get(name) === descriptor) {
    return;
  }

  registry.set(name, descriptor);
  version += 1;
  snapshot = {
    version,
    descriptors: Array.from(registry.values()),
  };
  scheduleNotify();
}

export function subscribeBreakpointStyles(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getBreakpointStylesSnapshot() {
  return snapshot;
}

export function getBreakpointStylesServerSnapshot() {
  return snapshot;
}

function getScopedSelector(rootSelector: string | undefined, selector: string) {
  if (!rootSelector || rootSelector === ':root') {
    return selector;
  }

  return selector
    .split(',')
    .map((part) => `${rootSelector} ${part.trim()}`)
    .join(', ');
}

// Nested scoped themes need generated component rules scoped just like vars.
function scopeStyleSheets(theme: BreakpointStyleTheme, sheets: BreakpointStyleSheets) {
  return sheets.map((sheet) => {
    const scopedSheet: Record<string, any> = {};

    Object.entries(sheet).forEach(([key, value]) => {
      if (key.startsWith('@')) {
        scopedSheet[key] = {};
        Object.entries(value as Record<string, any>).forEach(([selector, styles]) => {
          scopedSheet[key][getScopedSelector(theme.rootSelector, selector)] = styles;
        });
      } else {
        scopedSheet[getScopedSelector(theme.rootSelector, key)] = value;
      }
    });

    return scopedSheet;
  });
}

// Generate media rules from the theme, then scope them for nested theme roots.
// The layer matches static component CSS; descriptors should usually write CSS
// vars so later static CSS can consume the generated responsive values.
export function generateBreakpointStyleSheets(
  theme: BreakpointStyleTheme,
  breakpointStyles: BreakpointStylesSnapshot,
) {
  if (
    breakpointStyles.descriptors.length === 0 ||
    !theme.breakpoints ||
    typeof theme.spacing !== 'function'
  ) {
    return '';
  }

  const sheets: BreakpointStyleSheets = [];
  breakpointStyles.descriptors.forEach((descriptor) => {
    sheets.push(...descriptor(theme as ResolvedBreakpointStyleTheme));
  });

  const css = styleSheetsToString(scopeStyleSheets(theme, sheets));

  return css ? `@layer mui.components {\n${css}}\n` : '';
}
