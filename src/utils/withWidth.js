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
        /**
         * For the server side rendering,
         * let's set the width for the slower environment.
         */
        width: SMALL,
      };

      componentWillMount() {
        // We make sure that we are in a browser environment.
        if (typeof window !== 'undefined') {
          this.updateWidth();
        }
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
        return (
          <EventListener target="window" onResize={this.handleResize}>
            <MyComponent
              width={this.state.width}
              {...this.props}
            />
          </EventListener>
        );
      }
    };
  };
}
