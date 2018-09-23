import React from 'react';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */
class NoSsr extends React.Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.mounted = true;

    if (this.props.defer) {
      // Wondering why we use two raf? Check this video out:
      // https://www.youtube.com/watch?v=cCOL7MC4Pl0
      requestAnimationFrame(() => {
        // The browser should be about to render the DOM that React commited at this point.
        // We don't want to interrupt. Let's wait the next raf.
        requestAnimationFrame(() => {
          if (this.mounted) {
            this.setState({ mounted: true });
          }
        });
      });
    } else {
      this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { children, fallback } = this.props;

    return this.state.mounted ? children : fallback;
  }
}

NoSsr.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * If `true`, the component will not only prevent server side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   */
  defer: PropTypes.bool,
  /**
   * The fallback content to display.
   */
  fallback: PropTypes.node,
};

NoSsr.propTypes = exactProp(NoSsr.propTypes);

NoSsr.defaultProps = {
  defer: false,
  fallback: null,
};

export default NoSsr;
