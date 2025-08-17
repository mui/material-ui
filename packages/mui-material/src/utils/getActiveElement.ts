export default function getActiveElement(root: Document | ShadowRoot = document) {
    // Check if document is defined (for SSR compatibility)
    if (typeof document === 'undefined') {
        return null;
    }

    const doc = root || document;
    const activeEl = doc.activeElement;

    if (!activeEl) {
        return null;
    }

    if (activeEl.shadowRoot) {

        return getActiveElement(activeEl.shadowRoot);
    }

    return activeEl;
};