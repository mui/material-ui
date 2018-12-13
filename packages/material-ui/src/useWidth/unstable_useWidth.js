/* eslint-disable camelcase */
import React from 'react';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import { ThemeContext } from '@material-ui/styles/ThemeProvider';
import { calculateWidthUp, calculateWidthDown, calculateWidth } from '../withWidth/withWidth';
import createBreakpoints from '../styles/createBreakpoints';

const defaultBreakpoints = createBreakpoints({});

export default function unstable_useWidth(options = {}) {
  const {
    initialWidth: initialWidthOption,
    noSSR = false,
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  const theme = React.useContext(ThemeContext) || { breakpoints: defaultBreakpoints };

  const [width, setWidth] = React.useState(
    typeof window !== 'undefined'
      ? calculateWidth(window.innerWidth, theme.breakpoints)
      : undefined,
  );

  if (typeof window !== 'undefined') {
    React.useEffect(
      () => {
        const handleResize = debounce(() => {
          const newWidth = calculateWidth(window.innerWidth, theme.breakpoints);
          setWidth(newWidth);
        }, resizeInterval);
        window.addEventListener('resize', handleResize);

        return () => {
          handleResize.clear();
          window.removeEventListener('resize', handleResize);
        };
      },
      [window.innerWidth, theme.breakpoints],
    );
  }

  return {
    width: width || initialWidthOption,
    isWidthUp: (breakpoint, inclusive = true) =>
      calculateWidthUp(theme.breakpoints.keys, breakpoint, width, inclusive),
    isWidthDown: (breakpoint, inclusive = true) =>
      calculateWidthDown(theme.breakpoints.keys, breakpoint, width, inclusive),
  };
}
