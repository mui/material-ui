import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll',
  // TODO Do we need this style for IE 11 support?
  msOverflowStyle: 'scrollbar',
};

/**
 * @ignore - internal component.
 * The component is originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
class ScrollbarSize extends React.Component {
  constructor() {
    super();

    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        const prevHeight = this.scrollbarHeight;
        this.setMeasurements();

        if (prevHeight !== this.scrollbarHeight) {
          this.props.onChange(this.scrollbarHeight);
        }
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
  }

  componentDidMount() {
    this.setMeasurements();
    this.props.onChange(this.scrollbarHeight);
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  handleRef = ref => {
    this.nodeRef = ref;
  };

  setMeasurements = () => {
    const nodeRef = this.nodeRef;

    if (!nodeRef) {
      return;
    }

    this.scrollbarHeight = nodeRef.offsetHeight - nodeRef.clientHeight;
  };

  render() {
    return (
      <React.Fragment>
        <EventListener target="window" onResize={this.handleResize} />
        <div style={styles} ref={this.handleRef} />
      </React.Fragment>
    );
  }
}

ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ScrollbarSize;
