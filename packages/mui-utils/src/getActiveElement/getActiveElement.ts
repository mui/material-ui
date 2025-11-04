/**
 * Gets the actual active element, traversing through shadow roots if necessary.
 *
 * When an element inside a shadow root has focus, `document.activeElement` returns
 * the shadow host element. This function recursively traverses shadow roots to find
 * the actual focused element.
 *
 * @param root - The document or shadow root to start from. Defaults to document.
 * @returns The actual focused element, or null if no element has focus.
 *
 * @example
 * // In a shadow DOM context
 * const activeElement = getActiveElement(document);
 * // Returns the actual focused element inside the shadow root
 *
 * @example
 * // Starting from a specific document
 * const activeElement = getActiveElement(ownerDocument(element));
 */
export default function getActiveElement(root: Document | ShadowRoot = document): Element | null {
  const activeEl = root.activeElement;

  if (!activeEl) {
    return null;
  }

  // If the active element has a shadow root, recursively check inside it
  if (activeEl.shadowRoot && activeEl.shadowRoot.activeElement) {
    return getActiveElement(activeEl.shadowRoot);
  }

  return activeEl;
}
