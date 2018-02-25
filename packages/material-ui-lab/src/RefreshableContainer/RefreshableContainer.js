import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import RefreshIndicator from '@material-ui/lab/RefreshIndicator';

const INDICATOR_SIZE = 40;
const INDICATOR_ACTIVE_POSITION = 114;

const styles = {
  root: {
    overflowY: 'auto',
    position: 'relative',
  },
  indicator: {
    position: 'relative',
    margin: `0 auto -${INDICATOR_SIZE}px`,
    '&$window': {
      position: 'fixed',
    },
  },
  window: {},
};

class RefreshableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { swiping: false };
  }

  handleTouchStart = e => {
    if (this.rootNode.scrollTop === 0) {
      this.setState({ touchStart: e.touches[0].clientY, touchNow: e.touches[0].clientY });
    }
  };

  handleTouchMove = e => {
    if (this.rootNode.scrollTop === 0) {
      const touchNow = e.touches[0].clientY;
      this.setState({ touchNow });

      if (touchNow > this.state.touchStart) {
        // swiped down
        e.preventDefault();
        this.setState({ swiping: true });
      }
    } else if (this.state.swiping) {
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 });
    }
  };

  handleTouchEnd = e => {
    if (this.rootNode.scrollTop === 0) {
      const delta = this.state.touchNow - this.state.touchStart;
      if (delta - INDICATOR_SIZE - 5 >= INDICATOR_ACTIVE_POSITION && this.props.onRefresh) {
        // TODO
        this.props.onRefresh();
      }
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 });
    } else if (this.state.swiping) {
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 });
    }
  };

  setRootNode = node => {
    this.rootNode = node;
    if (node != null) {
      if (this.props.attachToWindow) {
        node = document.documentElement;
        this.rootNode = node;
      }
      node.addEventListener('touchstart', this.handleTouchStart);
      node.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      node.addEventListener('touchend', this.handleTouchEnd);
    }
  };

  componentWillUnmount() {
    this.rootNode.removeEventListener('touchstart', this.handleTouchStart);
    this.rootNode.removeEventListener('touchmove', this.handleTouchMove);
    this.rootNode.removeEventListener('touchend', this.handleTouchEnd);
  }

  getTopOffset() {
    if (this.props.loading) {
      return INDICATOR_ACTIVE_POSITION;
    } else if (this.state.swiping) {
      const touchDelta = this.state.touchNow - this.state.touchStart;
      if (touchDelta - INDICATOR_SIZE - 5 >= INDICATOR_ACTIVE_POSITION) {
        console.log(
          INDICATOR_ACTIVE_POSITION +
            Math.log(1 + touchDelta - INDICATOR_SIZE - 5 - INDICATOR_ACTIVE_POSITION) * 20,
        );
        return (
          INDICATOR_ACTIVE_POSITION -
          INDICATOR_SIZE -
          5 +
          Math.log(1 + touchDelta - INDICATOR_SIZE - 5 - INDICATOR_ACTIVE_POSITION) * 50
        );
      }
      return Math.max(-INDICATOR_SIZE - 5, touchDelta - INDICATOR_SIZE - 5);
    } else {
      return -INDICATOR_SIZE - 5;
    }
  }

  render() {
    const {
      attachToWindow,
      classes,
      className: classNameProp,
      children,
      loading,
      ...other
    } = this.props;

    const { swiping } = this.state;

    const touchDelta = this.state.touchNow - this.state.touchStart;

    return (
      <div ref={this.setRootNode} className={classNames(classes.root, classNameProp)} {...other}>
        <RefreshIndicator
          percentage={Math.max(
            0,
            touchDelta - Math.max(0, touchDelta - INDICATOR_ACTIVE_POSITION) * 0.6,
          )}
          status={loading ? 'loading' : 'ready'}
          className={classNames(classes.indicator, { [classes.window]: attachToWindow })}
          style={{
            top: this.getTopOffset(),
            transition:
              loading || !swiping ? 'all 150ms ease-in-out' : 'transform 150ms ease-in-out',
            // transform: loading || swiping ? 'scale(1)' : 'scale(0)' // TODO only do this in co-planar mode
          }}
        />
        {children}
      </div>
    );
  }
}

RefreshableContainer.propTypes = {
  /**
   * If `true`, the swipe down gesture uses the document instead of this container.
   */
  attachToWindow: PropTypes.bool,
  /**
   * The contents of the refreshable container.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, a loading indicator is displayed.
   */
  loading: PropTypes.bool,
};

RefreshableContainer.defaultTypes = {
  attachToWindow: false,
  loading: false,
};

export default withStyles(styles)(RefreshableContainer);
