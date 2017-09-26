// @flow weak

import React from 'react';
import type { ComponentType } from 'react';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import createEagerFactory from 'recompose/createEagerFactory';
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

// baseline before trying to add optional props
// https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMOFEAMjhwiCj4gBpyAEps9J58oTCIyPiWOR00ABsUSMi4AHUAi1K4FxheABM55GkAOhzuTKHWyPaWWiCyuEqauoSx1KIuDaQoRK6H1LgiGHcoP2CBzy8GYuzBZmAkV2YGGohK1gAvMwIVDIjAUOtdvCkKJ5PEKKlhAT6ilvkhfv8FktLuRhAolFpGUy1PolMYzMtrHAAKqRFAAcyQ5CmMzmAEFVs51s9tsQYPs+kdipdytVavBGiwULEuO4QBVXmcKjq9QaoPdmHS0L40XBOUgNkD+vAEf4OZdEmKuhQDPMmBtfPh4DwHbQIHAwKK4MA-AADbGx1YAN14Fwg7n5pjgsYAsnQnZlE0QAI7uYBEOYmXbkYL2x2KvhwFBIgCMogqSIATLj4vSVMyB6lWW7TIsNmY4PZHC43LQhHAAEJSADWkBjLoIzki+DgAB8CJEQDv9-gQBtjwRJvyL-hnJNZOR6IwqePTC0onBXcxh9GuCZgCgkxjmYAD8sRLqgq4QOunQGBcpSqrcMCdDoxivuBK5rnwnR0k4rjQB4XgwD4fjsqOwCvu8nyYJ43i+KsXCmCgXhIMcUSxJaSSkqkBZ8L0uTOgUrHAW+wxwE074jChcA9GkAmZEJbEjGM3FwCKsxUu6KxrJssp7LxMBKWcrBoWYGGQVhGqjN+Xxks8rxUTZtlwIo1pcLazAxv+gEiaIrootCwyqakbkeaZph+RckK7GiGJCs5ZIUgCBksGCWKmNFMInKI4VIuFPbEoShUkqpPx-H4ixadYxJEuMiXlQxTEsRQuEGAO7XqMO7h8oKwrTBpC6StKWyIHKCryXwRTheZKBQeumrMNqcC6vqhrGstpqvBapJPC8bwfE5Ew2iC+WflFUJZVEpXkg1wQbMASYub2Oh0lax0viU9YTRuZEie8iQLt6w5+nAAZcEGy1IKGMDhpGGkxtm4WJkgKZ+GY6aZtmeYGUWSCluWSCVvKNYiQ6KXNswbZwB2zDdk9pBAA

// wip https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMABo4ADpmgBIAUWdpMIjI+LgEuvIASmz0nnyhbogovuY5HTQAGxRIyLgAdQCLUrgXGF4AEzXkaUac7kypqIbioLK4SpqMftmU3SIuA6QoRKGWN9SRBg7igfmC5zy8GYzUaZmAkUaYB6ohK1gAvMw4QjIjAUPtYXdRPJ4hRUsJSf03kCQX5NmZttZyMIFEotGz2Wp9EpjPS7nAAKqRFAAcyQ5CWKzWAEFds59p9jsQYGcxpdbqVytVavBRAAyFgoWJcdwgCrfBoVI0ms1QBJxcW+HFwBlIA4Q8bwNH+XmlRJSoYUAzrJgHXz4eA8V20CBwMCSuDAPwAA1RSCTuwAbrxaKYIO5haY4EmALJ0d2ZdNEACO7mARDWJka5GCLrdqr4cBQGIAjKIKhiAExE+IslQc8epLne0ybA5mOD2RwuNy0IRwABCUgA1pBE56CM5Ivg4AAfAiREDHs-4EAHK8ERbC+-4ZyLWTkeiMDbAOemcLTNYvTmHRExMYAUEWWczAAfliTdUB3CA90GHRjF-WCN23Xc+EGZknFcaAPC8GAfD8HkZx-Mxfn+HRME8bxfF2LhTBQLwkCuGJv1-f8ZmSVIdHLPhRlyD0CnY5g0LMOCsKQnCmmaHjIgGN4RjSETMjEjjXgBOAJVWb8fWsWV5SORAlRVdS+C0mj+I+L4fj+YD+IWR0oVAkiIKg0wGkk0xRC9LFER6HTASQYFQTgcF2yhGFAqRADRF8jF8AvfBhwpMkMspHTqQiulAlKClyXmOBcr8XgWLYig8IMcc6vUKd3CFUVxWWfT12Mw5FVOQSYCKXzpIQ7CYAaQ04GNU1zUtcbrW+O0nLs75qKclyuCdCTKL8uAAtMeEgoAnKwppSKDmADM4GJN5mWZNBXK4ko20s-dyK835EnXAMp2DOBQy4cNxqQKMYBjON9MTItfPTJAsz8Mw8wLItS16yskBrOskAbZVmy811es7Hs+0HdKgA

type State = { width: Breakpoint };

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

type InjectedProps = { width: Breakpoint };

function withWidth(options = {}) {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  function enhance<Props: HOCProps>(
    Component: ComponentType<InjectedProps & Props>,
  ): ComponentType<Props> {
    const factory = createEagerFactory(Component);

    // `theme` is injected below by withTheme
    class Width extends React.Component<{ theme: Object } & Props, State> {
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

        /**
         * When rendering the component on the server,
         * we have no idea about the client browser screen width.
         * In order to prevent blinks and help the reconciliation of the React tree
         * we are not rendering the child component.
         *
         * An alternative is to use the `initialWidth` property.
         */
        if (props.width === undefined) {
          return null;
        }

        return (
          <EventListener target="window" onResize={this.handleResize}>
            {factory(props)}
          </EventListener>
        );
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      Width.displayName = wrapDisplayName(Component, 'withWidth');
    }

    return withTheme(Width);
  }

  return enhance;
}

export default withWidth;
