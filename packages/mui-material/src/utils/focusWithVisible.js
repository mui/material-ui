'use client';

/**
 * If `focusSource` is present, attempt to pass `focusVisible` through `focus()` options.
 * Fall back to a plain focus call when the browser does not support it.
 */
export default function focusWithVisible(element, focusSource) {
  if (focusSource == null) {
    element.focus();
    return;
  }

  try {
    element.focus({ focusVisible: focusSource === 'keyboard' });
  } catch (error) {
    element.focus();
  }
}
