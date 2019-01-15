import React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';

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
  mounted = false;

  state = {
    mounted: false,
  };

  componentDidMount() {
    this.mounted = true;

    if (this.props.defer) {
      // Wondering why we use two RAFs? Check this video out:
      // https://www.youtube.com/watch?v=cCOL7MC4Pl0
      //
      // The componentDidMount() method is called after the DOM nodes are inserted.
      // The UI might not have rendering the changes. We request a frame.
      requestAnimationFrame(() => {
        // The browser should be about to render the DOM nodes
        // that React committed at this point.
        // We don't want to interrupt. Let's wait the next frame.
        requestAnimationFrame(() => {
          // The UI is up-to-date at this point.
          // We can continue rendering the children.
          if (this.mounted) {
            this.setState({ mounted: true });
          }
        });
      });
    } else {
      this.setState({ mounted: true });
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
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   */
  defer: PropTypes.bool,
  /**
   * The fallback content to display.
   */
  fallback: PropTypes.node,
};

if (process.env.NODE_ENV !== 'production') {
  NoSsr.propTypes = exactProp(NoSsr.propTypes);
}

NoSsr.defaultProps = {
  defer: false,
  fallback: null,
};

export default NoSsr;
