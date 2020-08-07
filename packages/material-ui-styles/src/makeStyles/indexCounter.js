/* eslint-disable import/prefer-default-export */
// Global index counter to preserve source order.
// We create the style sheet during the creation of the component,
// children are handled after the parents, so the order of style elements would be parent->child.
// It is a problem though when a parent passes a className
// which needs to override any child's styles.
// StyleSheet of the child has a higher specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
let indexCounter = -1e9;

export function increment() {
  indexCounter += 1;

  if (process.env.NODE_ENV !== 'production') {
    if (indexCounter >= 0) {
      console.warn(
        [
          'Material-UI: You might have a memory leak.',
          'The indexCounter is not supposed to grow that much.',
        ].join('\n'),
      );
    }
  }

  return indexCounter;
}
