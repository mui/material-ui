// @flow
import warning from 'warning';
import { keys as breakpoints } from '../styles/breakpoints';
import withWidth, { isWidthDown, isWidthUp } from '../utils/withWidth';
import type { HiddenProps } from './types';

type Props = HiddenProps & {
  /**
   * @ignore
   * width prop provided by withWidth decorator
   */
  width: string,
};

/**
 * @ignore
 * Responsively hides by omission.
 */
function HiddenJs(props: Props) {
  const {
    children,
    only,
    xsUp, // eslint-disable-line no-unused-vars
    smUp, // eslint-disable-line no-unused-vars
    mdUp, // eslint-disable-line no-unused-vars
    lgUp, // eslint-disable-line no-unused-vars
    xlUp, // eslint-disable-line no-unused-vars
    xsDown, // eslint-disable-line no-unused-vars
    smDown, // eslint-disable-line no-unused-vars
    mdDown, // eslint-disable-line no-unused-vars
    lgDown, // eslint-disable-line no-unused-vars
    xlDown, // eslint-disable-line no-unused-vars
    width,
    ...other
  } = props;

  let visible = true;

  // `only` check is faster to get out sooner if used.
  if (only) {
    if (Array.isArray(only)) {
      for (let i = 0; i < only.length; i += 1) {
        const breakpoint = only[i];
        if (width === breakpoint) {
          visible = false;
          break;
        }
      }
    } else if (only && width === only) {
      visible = false;
    }
  }

  // Allow `only` to be combined with other props. If already hidden, no need to check others.
  if (visible) {
    // determine visibility based on the smallest size up
    for (let i = 0; i < breakpoints.length; i += 1) {
      const breakpoint = breakpoints[i];
      const breakpointUp = props[`${breakpoint}Up`];
      const breakpointDown = props[`${breakpoint}Down`];
      if (
        (breakpointUp && isWidthUp(width, breakpoint)) ||
        (breakpointDown && (isWidthDown(width, breakpoint, true)))
      ) {
        visible = false;
        break;
      }
    }
  }

  if (!visible) {
    return null;
  }

  warning(Object.keys(other).length === 0,
    `Material-UI: Unsupported properties received ${JSON.stringify(other)}`,
  );

  return children;
}

export default withWidth()(HiddenJs);
