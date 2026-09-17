import * as React from 'react';
/* eslint-disable no-restricted-imports */
import SliderUnstyled from '@mui/material/Slider/unstyled';
import ButtonUnstyled from '@mui/material/Button/unstyled';
import createAppearance, { prefixed, bare, whenTrue } from '@mui/material/utils/createAppearance';
/* eslint-enable no-restricted-imports */

/**
 * theme2 as a library: the unstyled components with theme2's vocabulary bound
 * to them, and nothing else.
 *
 * This is the whole of a styling layer under the seam. There is no Emotion, no
 * theme provider and no style object. Each wrapper translates theme2's own prop
 * names into class names through `createAppearance`, and /static/theme2.css
 * does the rest.
 *
 * `TONES` and `SCALES` are exported because the demos iterate them; keeping a
 * second copy on the page would let the two drift.
 */

export const TONES = ['brand', 'muted', 'positive', 'critical', 'caution'];
export const SCALES = ['compact', 'regular', 'roomy'];

// theme2's appearance vocabulary. Deliberately a different shape from Material's
// rather than a renaming of it: five tones against six colours, no `secondary`
// and no `info`, a `muted` that Material has no equivalent for, and three scales
// where Material has two. `tone` and `scale` are shared across components.
const sliderAppearance = createAppearance({
  tone: {
    default: 'brand',
    // Named after the value alone, so `tone="positive"` is `MuiSlider-positive`.
    className: bare,
    values: TONES,
  },
  scale: { default: 'regular', className: prefixed('scale'), values: SCALES },
});

// Button adds two more. `emphasis` has two values where Material's `variant` has
// three, and `block` is what Material calls `fullWidth`.
const buttonAppearance = createAppearance({
  tone: { default: 'brand', className: bare, values: TONES },
  scale: { default: 'regular', className: prefixed('scale'), values: SCALES },
  emphasis: { default: 'solid', className: bare, values: ['solid', 'quiet'] },
  block: { default: false, className: whenTrue('block'), values: [true] },
  // Where the spinner sits. Material calls this `loadingPosition` and says
  // start/center/end; theme2 says leading/over/trailing. The component has no
  // opinion either way: it renders the spinner in one place and a spacer on
  // each side, and the class decides the rest.
  spinner: {
    default: 'over',
    className: (value, props) => (props.loading ? prefixed('spinner')(value) : null),
    values: ['leading', 'over', 'trailing'],
    classKeys: ['spinnerLeading', 'spinnerOver', 'spinnerTrailing'],
  },
});

/** theme2's spinner, a few lines of CSS rather than a CircularProgress. */
function Theme2Spinner(props) {
  return <span {...props} className="theme2-spinner" />;
}

const buttonSlots = { loadingSpinner: Theme2Spinner };

export function Slider({ tone, scale, ...other }) {
  return <SliderUnstyled {...other} appearance={sliderAppearance.resolve({ tone, scale })} />;
}

export function Button({ tone, scale, emphasis, block, spinner, ...other }) {
  return (
    <ButtonUnstyled
      {...other}
      slots={buttonSlots}
      appearance={buttonAppearance.resolve({
        tone,
        scale,
        emphasis,
        block,
        spinner,
        loading: other.loading,
      })}
    />
  );
}
