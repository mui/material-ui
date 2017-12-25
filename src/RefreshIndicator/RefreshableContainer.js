import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import RefreshIndicator from './RefreshIndicator';

const INDICATOR_SIZE = 40

const styles = {
  root: {
    overflowY: 'auto',
    position: 'relative'
  },
  indicator: {
    position: 'relative',
    margin: `0 auto -${INDICATOR_SIZE}px`
  }
}


class RefreshableContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { swiping: false }
  }

  handleTouchStart = (e) => {
    if (this.rootNode.scrollTop === 0) {
      this.setState({ touchStart: e.touches[0].clientY, touchNow: e.touches[0].clientY })
    }
  }

  handleTouchMove = (e) => {
    if (this.rootNode.scrollTop === 0) {
      const touchNow = e.touches[0].clientY
      this.setState({ touchNow })

      if (touchNow > this.state.touchStart) {
        // swiped down
        e.preventDefault()
        this.setState({ swiping: true })
      }
    } else if (this.state.swiping) {
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 })
    }
  }

  handleTouchEnd = (e) => {
    if (this.rootNode.scrollTop === 0) {
      const delta = this.state.touchNow - this.state.touchStart
      if (delta >= 100 && this.props.onRefresh) { // TODO
        this.props.onRefresh()
      }
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 })
    } else if (this.state.swiping) {
      this.setState({ swiping: false, touchStart: 0, touchNow: 0 })
    }
  }

  setRootNode = (node) => {
    this.rootNode = node;
    if (node != null) {
      // manually attach this event listener to disable passive option
      // see https://github.com/facebook/react/issues/8968
      node.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    }
  }

  getTopOffset () {
    if (this.props.loading) {
      return 0;
    } else if (this.state.swiping) {
      const touchDelta = this.state.touchNow - this.state.touchStart;
      return Math.max(-INDICATOR_SIZE - 5, touchDelta - INDICATOR_SIZE - 5) - Math.max(0, (touchDelta - 95) * 0.6);
    } else {
      return -INDICATOR_SIZE - 5;
    }
  }

  render () {
    const {
      classes,
      className: classNameProp,
      children,
      loading,
      ...other
    } = this.props

    const { swiping } = this.state;

    const touchDelta = this.state.touchNow - this.state.touchStart;

    return (
      <div
        ref={this.setRootNode}
        className={classNames(classes.root, classNameProp)}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        {...other}
      >
        <RefreshIndicator
          percentage={Math.min(100, Math.max(0, touchDelta - Math.max(0, touchDelta - 95) * 0.6))}
          status={loading ? 'loading' : 'ready'}
          className={classes.indicator}
          style={{
            top: this.getTopOffset(),
            transition: loading || !swiping ? 'all 150ms ease-in-out' : 'transform 150ms ease-in-out',
            // transform: loading || swiping ? 'scale(1)' : 'scale(0)' // TODO only do this in co-planar mode
          }}
        />
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(RefreshableContainer)
