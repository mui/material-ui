/**
 * Returns a boolean indicating if the event's target has :focus-visible
 */
export default function isFocusVisible(element: EventTarget & Element): boolean {
  try {
    return element.matches(':focus-visible');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        [
          'MUI: The `:focus-visible` pseudo class is not supported in this browser.',
          'Some components rely on this feature to work properly.',
        ].join('\n'),
      );
    }
  }

  return false;
}
