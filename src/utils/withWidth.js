// @flow weak

import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import customPropTypes from '../utils/customPropTypes';
import { keys } from '../styles/breakpoints';

/**
 * By default, returns true if screen width is the same or greater than the given breakpoint.
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

  return (BaseComponent) => {
    const factory = createEagerFactory(BaseComponent);

    class Width extends Component {
      static contextTypes = {
        theme: customPropTypes.muiRequired,
      };

      state = {
        width: null,
      };

      componentDidMount() {
        this.updateWidth(window.innerWidth);
      }

      componentWillUnmount() {
        clearTimeout(this.deferTimer);
      }

      deferTimer = null;

      handleResize = () => {
        clearTimeout(this.deferTimer);
        this.deferTimer = setTimeout(() => {
          this.updateWidth(window.innerWidth);
        }, resizeInterval);
      };

      updateWidth(innerWidth) {
        const breakpoints = this.context.theme.breakpoints;
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
        const props = {
          width: this.state.width,
          ...this.props,
        };

        /**
         * When rendering the component on the server,
         * we have no idea about the screen width.
         * In order to prevent blinks and help the reconciliation
         * we are not rendering the component.
         *
         * A better alternative would be to send client hints.
         * But the browser support of this API is low:
         * http://caniuse.com/#search=client%20hint
         */
        if (props.width === null) {
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

    return Width;
  };
}

export default withWidth;
