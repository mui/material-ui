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
});

/**
 * theme2's loading indicator. The `loadingIndicator` prop arrives as children;
 * with none, it fills in a spinner that is a few lines of CSS rather than a
 * CircularProgress.
 *
 * `ownerState` is dropped rather than spread, because the element underneath is
 * a plain `span` and React would put it on the DOM.
 */
function Theme2LoadingIndicator({ children, ownerState, 'aria-labelledby': labelledBy, ...other }) {
  return (
    <span {...other}>
      {children ?? (
        <span className="theme2-spinner" role="progressbar" aria-labelledby={labelledBy} />
      )}
    </span>
  );
}

const buttonSlots = { loadingIndicator: Theme2LoadingIndicator };

export function Slider({ tone, scale, ...other }) {
  return <SliderUnstyled {...other} appearance={sliderAppearance.resolve({ tone, scale })} />;
}

export function Button({ tone, scale, emphasis, block, ...other }) {
  return (
    <ButtonUnstyled
      {...other}
      slots={buttonSlots}
      appearance={buttonAppearance.resolve({ tone, scale, emphasis, block })}
    />
  );
}
