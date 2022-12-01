// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
export default function activeElement(root: Document | ShadowRoot = document): Element | null {
  const activeEl = root.activeElement;

  if (!activeEl) {
    return null;
  }

  if (activeEl.shadowRoot) {
    return activeElement(activeEl.shadowRoot);
  }

  return activeEl;
}
