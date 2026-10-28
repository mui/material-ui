import { afterAll, afterEach, beforeAll } from 'vitest';
import setupVitest from '@mui/internal-test-utils/setupVitest';

setupVitest({ emotion: true });

// Kept by name: `querySelectorAll()` is slow in jsdom, and some tests depend on timing.
const layerStyleElements = new Map<string, HTMLStyleElement>();

// jsdom doesn't implement cascade layers: it never applies the rules inside an `@layer` block.
// Material UI puts its styles in layers by default, so in jsdom, move each layered rule out of its
// block into a style element of its own at the start of `<head>`, one per layer, in layer order.
// Unlayered styles then still win over layered ones, as long as their specificity is the same.
// Browser tests run the real layers.
if (typeof globalThis.navigator !== 'undefined' && navigator.userAgent.includes('jsdom')) {
  // Without test isolation, this file runs again for each test file in the same document:
  // patch the native method again, so that the cleanup below and the patch share the same elements.
  const appendChild: Node['appendChild'] =
    (Node.prototype.appendChild as any).native ?? Node.prototype.appendChild;
  const appendChildEmulatingCssLayers = function appendChildEmulatingCssLayers<T extends Node>(
    this: Node,
    node: T,
  ): T {
    if (
      node.nodeType === Node.TEXT_NODE &&
      this instanceof HTMLStyleElement &&
      this.hasAttribute('data-emotion') &&
      node.textContent?.startsWith('@layer')
    ) {
      const layered = unwrapCssLayer(node.textContent);
      if (layered) {
        insertLayeredRule(this.ownerDocument, layered.name, layered.css);
      }
      node.textContent = '';
    }
    return appendChild.call(this, node) as T;
  };
  (appendChildEmulatingCssLayers as any).native = appendChild;
  Node.prototype.appendChild = appendChildEmulatingCssLayers;

  // Each test renders with a fresh Emotion cache, whose style elements are removed afterwards.
  afterEach(() => {
    layerStyleElements.forEach((element) => {
      element.remove();
    });
    layerStyleElements.clear();
  });
}

const CSS_LAYER_ORDER = [
  'mui',
  'mui.global',
  'mui.components',
  'mui.theme',
  'mui.custom',
  'mui.sx',
];

function getLayerRank(name: string) {
  const rank = CSS_LAYER_ORDER.indexOf(name);
  return rank === -1 ? CSS_LAYER_ORDER.length : rank;
}

// Uses `insertRule()`: jsdom parses a style element's whole sheet again each time its text changes.
// `@media all` turns the rules of the block into one rule, and jsdom applies the rules inside it.
function insertLayeredRule(doc: Document, name: string, css: string) {
  const sheet = getLayerStyleElement(doc, name).sheet!;
  try {
    sheet.insertRule(`@media all{${css}}`, sheet.cssRules.length);
  } catch {
    // Browsers drop invalid rules as well.
  }
}

function getLayerStyleElement(doc: Document, name: string) {
  const existing = layerStyleElements.get(name);
  if (existing?.isConnected) {
    return existing;
  }
  const element = doc.createElement('style');
  element.setAttribute('data-jsdom-layer', name);
  const rank = getLayerRank(name);
  const others = Array.from(layerStyleElements)
    .filter(([, el]) => el.isConnected)
    .sort(([a], [b]) => getLayerRank(a) - getLayerRank(b));
  const next = others.find(([other]) => getLayerRank(other) > rank);
  const previous = others.filter(([other]) => getLayerRank(other) < rank).pop();
  if (next) {
    next[1].before(element);
  } else if (previous) {
    previous[1].after(element);
  } else {
    doc.head.prepend(element);
  }
  layerStyleElements.set(name, element);
  return element;
}

// Returns the rules inside an `@layer` block with the layer's full name,
// or `null` for a layer order statement.
function unwrapCssLayer(rule: string) {
  const names: string[] = [];
  let css = rule;
  while (css.startsWith('@layer')) {
    const blockStart = css.indexOf('{');
    const statementEnd = css.indexOf(';');
    if (blockStart === -1 || (statementEnd !== -1 && statementEnd < blockStart)) {
      return null;
    }
    names.push(css.slice('@layer'.length, blockStart).trim());
    css = css.slice(blockStart + 1, -1);
  }
  return { name: names.join('.'), css };
}

// In Firefox, calling focus() with arguments (e.g. focusOptions) fails silently,
// which causes focus-visible related tests to fail as a consequence.
// This override is only applied in a browser environment running Firefox.
if (typeof globalThis.navigator !== 'undefined' && !navigator.userAgent.includes('jsdom')) {
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

  if (isFirefox) {
    const originalFocus = HTMLElement.prototype.focus;

    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        configurable: true,
        value: function focusWithoutArguments() {
          originalFocus.call(this); // always call without arguments
        },
      });
    });

    afterAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'focus', {
        value: originalFocus,
      });
    });
  }
}
