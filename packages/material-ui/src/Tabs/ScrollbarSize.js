import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.

const styles = {
  width: '100px',
  height: '100px',
  position: 'absolute',
  top: '-10000px',
  overflow: 'scroll',
  msOverflowStyle: 'scrollbar',
};

/**
 * @ignore - internal component.
 * The component is originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
class ScrollbarSize extends React.Component {
  handleResize = debounce(() => {
    const { onChange } = this.props;

    const prevHeight = this.scrollbarHeight;
    const prevWidth = this.scrollbarWidth;
    this.setMeasurements();
    if (prevHeight !== this.scrollbarHeight || prevWidth !== this.scrollbarWidth) {
      onChange({ scrollbarHeight: this.scrollbarHeight, scrollbarWidth: this.scrollbarWidth });
    }
  }, 166); // Corresponds to 10 frames at 60 Hz.

  componentDidMount() {
    this.setMeasurements();
    this.props.onLoad({
      scrollbarHeight: this.scrollbarHeight,
      scrollbarWidth: this.scrollbarWidth,
    });
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  setMeasurements = () => {
    if (!this.node) {
      return;
    }

    this.scrollbarHeight = this.node.offsetHeight - this.node.clientHeight;
    this.scrollbarWidth = this.node.offsetWidth - this.node.clientWidth;
  };

  render() {
    const { onChange } = this.props;

    return (
      <div>
        {onChange ? <EventListener target="window" onResize={this.handleResize} /> : null}
        <div
          style={styles}
          ref={node => {
            this.node = node;
          }}
        />
      </div>
    );
  }
}

ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default ScrollbarSize;
