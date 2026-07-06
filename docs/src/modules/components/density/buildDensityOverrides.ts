import type { DensityEmitRow, DensityEmitTarget } from './emitTable.generated';

/**
 * Turns user edits into theme `styleOverrides` in the exact shape enhance*Density
 * emits — variant matchers, portal slots, nested selectors, private vars — then
 * appends them onto the preset theme as a trailing layer, so they win by order
 * (mirroring the preset's own `addRootOverride([prev, overrides])` re-assert).
 * Replaces the old class-selector GlobalStyles path.
 */

export type StyleLayer = Record<string, any>;
export type Overrides = Record<string, { styleOverrides: Record<string, StyleLayer> }>;

export interface DensityEdit {
  row: DensityEmitRow;
  /** resolved CSS value, e.g. 'var(--mui-density-xs)' or '10px' */
  value: string;
}

const emittedProp = (t: DensityEmitTarget): string => t.cssProp ?? t.privateVar!;

// Recursive plain-object merge (for base fields sharing a nested selector).
function deepMerge(target: StyleLayer, source: StyleLayer): void {
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      target[k] = target[k] && typeof target[k] === 'object' ? target[k] : {};
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
}

function addFieldToLayer(layer: StyleLayer, target: DensityEmitTarget, value: string): void {
  const prop = emittedProp(target);
  const style: StyleLayer = target.nested
    ? { [target.nested]: { [prop]: value } }
    : { [prop]: value };
  if (target.props === null) {
    deepMerge(layer, style); // un-varianted → top-level of the layer
  } else {
    (layer.variants ??= []).push({ props: target.props, style });
  }
}

/** Pure user contribution, per tuned component — the export payload. */
export function buildOverrides(edits: DensityEdit[]): Overrides {
  const overrides: Overrides = {};
  for (const { row, value } of edits) {
    const { component, slot } = row.target;
    if (!overrides[component]) {
      overrides[component] = { styleOverrides: {} };
    }
    const slots = overrides[component].styleOverrides;
    if (!slots[slot]) {
      slots[slot] = {};
    }
    addFieldToLayer(slots[slot], row.target, value);
  }
  return overrides;
}

/**
 * Appends the user overrides onto the preset theme's components as a trailing
 * `[presetExisting, userLayer]` layer per touched slot — the same nesting MUI
 * flattens and applies in order, so the user layer wins without specificity hacks.
 */
export function mergeOntoPreset(
  presetComponents: Record<string, any>,
  overrides: Overrides,
): Record<string, any> {
  const merged: Record<string, any> = { ...presetComponents };
  for (const [component, { styleOverrides }] of Object.entries(overrides)) {
    const presetComp = presetComponents[component] ?? {};
    const mergedSlots: Record<string, any> = { ...presetComp.styleOverrides };
    for (const [slot, layer] of Object.entries(styleOverrides)) {
      mergedSlots[slot] = [presetComp.styleOverrides?.[slot], layer];
    }
    merged[component] = { ...presetComp, styleOverrides: mergedSlots };
  }
  return merged;
}
