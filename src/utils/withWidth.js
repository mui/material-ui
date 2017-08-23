// @flow weak

import * as React from 'react';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withTheme from '../styles/withTheme';
import { keys } from '../styles/breakpoints';
import type { Breakpoint } from '../styles/breakpoints';

/**
 * By default, returns true if screen width is the same or greater than the given breakpoint.
 *
 * @param screenWidth
 * @param breakpoint
 * @param inclusive - defaults to true
 */
export const isWidthUp = (breakpoint, screenWidth, inclusive = true) => {
  if (inclusive) {
    return keys.indexOf(breakpoint) <= keys.indexOf(screenWidth);
  }
  return keys.indexOf(breakpoint) < keys.indexOf(screenWidth);
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
    return keys.indexOf(screenWidth) <= keys.indexOf(breakpoint);
  }
  return keys.indexOf(screenWidth) < keys.indexOf(breakpoint);
};

function withWidth(options = {}) {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  function enhance<BaseProps: {}>(BaseComponent: React.ComponentType<BaseProps>) {
    const factory = createEagerFactory(BaseComponent);

    type DefaultProps = {
      theme: Object,
    };

    type WidthProps = {
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
       * @ignore
       */
      theme?: Object,
      /**
       * Bypass the width calculation logic.
       */
      width?: Breakpoint,
    };

    type AllProps = DefaultProps & WidthProps & BaseProps;
    class Width extends React.Component<AllProps, { width: ?Breakpoint }> {
      props: AllProps;
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
        while (width === null && index < breakpoints.keys.length) {
          const currentWidth = breakpoints.keys[index];

          // @media are inclusive, so reproduce the behavior here.
          if (innerWidth < breakpoints.getWidth(currentWidth)) {
            width = breakpoints.keys[index - 1];
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
      Width.displayName = wrapDisplayName(BaseComponent, 'withWidth');
    }

    return withTheme(Width);
  }

  return enhance;
}

export default withWidth;
