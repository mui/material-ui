'use client';

export const FOCUSABLE_ATTRIBUTE = 'data-mui-focusable';

export function getMuiFocusableElement(
  rootElement: HTMLElement | null | undefined,
): HTMLElement | null {
  if (!rootElement) {
    return null;
  }

  return rootElement.hasAttribute(FOCUSABLE_ATTRIBUTE)
    ? rootElement
    : (rootElement.querySelector(`[${FOCUSABLE_ATTRIBUTE}]`) as HTMLElement | null);
}
