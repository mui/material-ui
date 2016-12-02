// @flow weak

import React, { Component, PropTypes } from 'react';
import EventListener from 'react-event-listener';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';
import { keys } from '../styles/breakpoints';

export const isWidthUp = (baseWidth, width) => (
  keys.indexOf(baseWidth) <= keys.indexOf(width)
);

export const isWidthDown = (baseWidth, width) => (
  keys.indexOf(baseWidth) > keys.indexOf(width)
);

function withWidth(options = {}) {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  return (BaseComponent) => {
    const factory = createEagerFactory(BaseComponent);

    return class WithWidth extends Component {
      static contextTypes = {
        theme: PropTypes.object.isRequired,
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
        const width = this.state.width;

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
        if (width === null) {
          return null;
        }

        return (
          <EventListener target="window" onResize={this.handleResize}>
            {factory({
              width,
              ...this.props,
            })}
          </EventListener>
        );
      }
    };
  };
}

export default createHelper(withWidth, 'withWidth');
