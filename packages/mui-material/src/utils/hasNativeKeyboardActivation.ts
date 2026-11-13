/**
 * Whether the rendered element has browser-provided keyboard activation.
 */
export default function hasNativeKeyboardActivation(element: HTMLElement): boolean {
  if (element.tagName === 'BUTTON') {
    return true;
  }

  // Preserve ButtonBase's support for native link activation.
  return Boolean(element.tagName === 'A' && (element as HTMLAnchorElement).href);
}
