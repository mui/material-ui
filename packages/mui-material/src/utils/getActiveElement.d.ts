/**
 * Gets the currently active element, traversing shadow DOM boundaries.
 * @param root - The root document or shadow root to search from (defaults to document)
 * @returns The active element or null if none found
 */
declare const getActiveElement: (root?: Document | ShadowRoot) => Element | null;

export default getActiveElement;