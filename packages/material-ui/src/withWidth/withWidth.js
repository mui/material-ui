/* eslint-disable react/no-did-mount-set-state */

import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import wrapDisplayName from 'recompose/wrapDisplayName';
import hoistNonReactStatics from 'hoist-non-react-statics';
import withTheme from '../styles/withTheme';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import getThemeProps from '../styles/getThemeProps';

// By default, returns true if screen width is the same or greater than the given breakpoint.
export const isWidthUp = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }
  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
export const isWidthDown = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }
  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

const withWidth = (options = {}) => Component => {
  const {
    withTheme: withThemeOption = false,
    noSSR = false,
    initialWidth: initialWidthOption,
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  class WithWidth extends React.Component {
    handleResize = debounce(() => {
      const width = this.getWidth();
      if (width !== this.state.width) {
        this.setState({
          width,
        });
      }
    }, resizeInterval);

    constructor(props) {
      super(props);

      if (noSSR) {
        this.state.width = this.getWidth();
      }
    }

    state = {
      width: undefined,
    };

    componentDidMount() {
      const width = this.getWidth();
      if (width !== this.state.width) {
        this.setState({
          width,
        });
      }
    }

    componentWillUnmount() {
      this.handleResize.clear();
    }

    getWidth(innerWidth = window.innerWidth) {
      const breakpoints = this.props.theme.breakpoints;
      let width = null;

      /**
       * Start with the slowest value as low end devices often have a small screen.
       *
       * innerWidth |xs      sm      md      lg      xl
       *            |-------|-------|-------|-------|------>
       * width      |  xs   |  sm   |  md   |  lg   |  xl
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
      return width;
    }

    render() {
      const { initialWidth, theme, width, innerRef, ...other } = this.props;

      const props = {
        width:
          width ||
          this.state.width ||
          initialWidth ||
          initialWidthOption ||
          getThemeProps({ theme, name: 'MuiWithWidth' }).initialWidth,
        ...other,
      };
      const more = {};

      if (withThemeOption) {
        more.theme = theme;
      }

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
          <Component {...more} {...props} ref={innerRef} />
        </EventListener>
      );
    }
  }

  WithWidth.propTypes = {
    /**
     * As `window.innerWidth` is unavailable on the server,
     * we default to rendering an empty component during the first mount.
     * In some situation, you might want to use an heuristic to approximate
     * the screen width of the client browser screen width.
     *
     * For instance, you could be using the user-agent or the client-hints.
     * http://caniuse.com/#search=client%20hint
     */
    initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * Bypass the width calculation logic.
     */
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  if (process.env.NODE_ENV !== 'production') {
    WithWidth.displayName = wrapDisplayName(Component, 'WithWidth');
  }

  hoistNonReactStatics(WithWidth, Component);

  return withTheme()(WithWidth);
};

export default withWidth;
