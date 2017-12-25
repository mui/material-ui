import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import RefreshIndicator from './RefreshIndicator';

const styles = {
  root: {
    overflowY: 'auto',
    position: 'relative'
  }
}

class RefreshableContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { swiping: false }
  }

  handleTouchStart = (e) => {
    this.setState({ touchStart: e.touches[0].clientY, touchNow: e.touches[0].clientY })
  }

  handleTouchMove = (e) => {
    const touchNow = e.touches[0].clientY
    this.setState({ touchNow })
    console.log(e.target.offsetTop - document.body.scrollTop)
    if (touchNow > this.state.touchStart && e.target.offsetTop - document.body.scrollTop === 0) {
      // swiped down
      e.preventDefault()
      this.setState({ swiping: true })
    }
  }

  handleTouchEnd = (e) => {
    const delta = this.state.touchNow - this.state.touchStart
    if (delta >= 100 && this.props.onRefresh) { // TODO
      this.props.onRefresh()
    }
    this.setState({ swiping: false, touchStart: 0, touchNow: 0 })
  }

  setRootNode = (node) => {
    if (node != null) {
      // manually attach this event listener to disable passive option
      // see https://github.com/facebook/react/issues/8968
      node.addEventListener('touchmove', this.handleTouchMove, { passive: false })
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
          style={{
            position: 'relative',
            top: loading || !swiping ? 0 : Math.max(0, touchDelta) - Math.max(0, (touchDelta - 95) * 0.6),
            transition: loading ? 'all 150ms ease-in-out' : 'transform 150ms ease-in-out',
            transform: loading || swiping ? 'scale(1)' : 'scale(0)'
          }}
        />
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(RefreshableContainer)
