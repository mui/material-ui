// @flow weak

// flow sanity check (DO NOT DELETE) https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMOFEAMjhwiCj4gBpyAEps9J58oTCIyPiWOR00ABsUSMi4AHUAi1K4FxheABM55GkAOhzuTKHWyPaWWiCyuEqauoSx1KIuDaQoRK6H1LgiGHcoP2CBzy8GYuzBZmAkV2YGGohK1gAvMwIVDIjAUOtdvCkKJ5PEKKlhAT6ilvkhfv8FktLuRhAolFpGUy1PolMYzMtrHAAKqRFAAcyQ5CmMzmAEFVs51s9tsQYPs+kdipdytVavBGiwULEuO4QBVXmcKjq9QaoPdmHS0L40XBOUgNkD+vAEf4OZdEmKuhQDPMmBtfPh4DwHbQIHAwKK4MA-AADbGx1YAN14Fwg7n5pjgsYAsnQnZlE0QAI7uYBEOYmXbkYL2x2KvhwFBIgCMogqSIATLj4vSVMyB6lWW7TIsNmY4PZHC43LQhHAAEJSADWkBjLoIzki+DgAB8CJEQDv9-gQBtjwRJvyL-hnJNZOR6IwqePTC0onBXcxSTGTMAUJMY5mAA-LES6oKuEDrp0OjGK+oGLiua58J0dJOK40AeF4MA+H47KjsAr7vJ8mCeN4virFwpgoF4SDHFEsRAW+wxJKSqQFnwvS5M6BR0cwcFmGBSFQShcBgrs76RAkMFwD0aTcZkvH0SMYxsXAIqzFSZhMZK0pbIgcoKgpfDKaM35fGSzyvMR5kWepNogr+OEAUxZwCaYoiuii0LDGpjzkn8AIcSC4neTCJyiO5SL4Ie+A9sShIJSSak-IFWkEa+xJEuMZIUn4vDUbRFBoQYA5leow7uHygrCtMmkLrpmyynswVFO5QkQchMBnNqcC6vqhrGn1pqvBapJPC8bwfLZEwOSw7meRckI+ScKUBZSwQbMASZwHipJ0lac1MQ6wWfiOTHvIkC7esOfpwAGXBBn1SChjA4aRppMbZu5iZICmfhmOmmbZnmwVFkgpblkglbyjWx31sZ8DNswbZwB2zDdrt+JAA
import React from 'react';
import type { HigherOrderComponent } from 'react-flow-types';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withTheme from '../styles/withTheme';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import type { Breakpoint } from '../styles/createBreakpoints';

/**
 * By default, returns true if screen width is the same or greater than the given breakpoint.
 *
 * @param screenWidth
 * @param breakpoint
 * @param inclusive - defaults to true
 */
export const isWidthUp = (breakpoint, screenWidth, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(screenWidth);
  }
  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(screenWidth);
};

/**
 * By default, returns true if screen width is the same or less than the given breakpoint.
 *
 * @param screenWidth
 * @param breakpoint
 * @param inclusive - defaults to true
 */
export const isWidthDown = (breakpoint, screenWidth, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(screenWidth) <= breakpointKeys.indexOf(breakpoint);
  }
  return breakpointKeys.indexOf(screenWidth) < breakpointKeys.indexOf(breakpoint);
};

// optional props introduced by this HOC
export type HOCProps = {
  /**
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth?: Breakpoint,
  /**
   * Bypass the width calculation logic.
   */
  width?: Breakpoint,
};

export type InjectedProps = { width: Breakpoint };

const withWidth = (
  // eslint-disable-line prettier/prettier
  options = {},
): HigherOrderComponent<{}, InjectedProps> => (Component: any): any => {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  // `theme` is injected below by withTheme
  class Width extends React.Component<{ theme: Object } & HOCProps, { width: Breakpoint }> {
    state = {
      width: undefined,
    };

    componentDidMount() {
      this.updateWidth(window.innerWidth);
    }

    componentWillUnmount() {
      this.handleResize.cancel();
    }

    handleResize = debounce(() => {
      this.updateWidth(window.innerWidth);
    }, resizeInterval);

    updateWidth(innerWidth) {
      if (this.props.theme) {
        const breakpoints = this.props.theme.breakpoints;
        let width = null;

        /**
         * Start with the slowest value as low end devices often have a small screen.
         *
         * innerWidth |0      xs      sm      md      lg      xl
         *            |-------|-------|-------|-------|-------|------>
         * width      |  xs   |  xs   |  sm   |  md   |  lg   |  xl
         */
        let index = 1;
        while (width === null && index < breakpointKeys.length) {
          const currentWidth = breakpointKeys[index];

          // @media are inclusive, so reproduce the behavior here.
          if (innerWidth < breakpoints.values[currentWidth]) {
            width = breakpointKeys[index - 1];
            break;
          }

          index += 1;
        }

        width = width || 'xl';

        if (width !== this.state.width) {
          this.setState({
            width,
          });
        }
      }
    }

    render() {
      const { initialWidth, theme, width, ...other } = this.props;
      const props = {
        width: width || this.state.width || initialWidth,
        ...other,
      };

      // When rendering the component on the server,
      // we have no idea about the client browser screen width.
      // In order to prevent blinks and help the reconciliation of the React tree
      // we are not rendering the child component.
      //
      // An alternative is to use the `initialWidth` property.
      if (props.width === undefined) {
        return null;
      }

      return (
        <EventListener target="window" onResize={this.handleResize}>
          <Component {...props} />
        </EventListener>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    Width.displayName = wrapDisplayName(Component, 'withWidth');
  }

  return withTheme()(Width);
};

export default withWidth;
