import React, {Component} from 'react';
import EventListener from 'react-event-listener';

export const SMALL = 1;
export const MEDIUM = 2;
export const LARGE = 3;

export default function withWidth(options = {}) {
  const {
    largeWidth = 992,
    mediumWidth = 768,
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  return (MyComponent) => {
    return class WithWidth extends Component {
      state = {
        width: null,
      };

      componentDidMount() {
        this.updateWidth();
      }

      componentWillUnmount() {
        clearTimeout(this.deferTimer);
      }

      handleResize = () => {
        clearTimeout(this.deferTimer);
        this.deferTimer = setTimeout(() => {
          this.updateWidth();
        }, resizeInterval);
      };

      updateWidth() {
        const innerWidth = window.innerWidth;
        let width;

        if (innerWidth >= largeWidth) {
          width = LARGE;
        } else if (innerWidth >= mediumWidth) {
          width = MEDIUM;
        } else { // innerWidth < 768
          width = SMALL;
        }

        if (width !== this.state.width) {
          this.setState({
            width: width,
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
            <MyComponent
              width={width}
              {...this.props}
            />
          </EventListener>
        );
      }
    };
  };
}
