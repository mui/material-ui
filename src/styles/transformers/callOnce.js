import warning from 'warning';

const CALLED_ONCE = 'muiPrepared';

export default function callOnce() {
  if (process.env.NODE_ENV !== 'production') {
    return (style) => {
      if (style[CALLED_ONCE]) {
        warning(false, 'You cannot call prepareStyles() on the same style object more than once.');
      }
      style[CALLED_ONCE] = true;
      return style;
    };
  }
}
