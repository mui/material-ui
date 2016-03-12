import React from 'react';
import Paper from '../paper';
import Transitions from '../styles/transitions';
import getMuiTheme from '../styles/getMuiTheme';
import PropTypes from '../utils/prop-types';

function getStyles(props, state) {
  const {
    targetOrigin,
  } = props;

  const {
    open,
    muiTheme: {
      zIndex,
    },
  } = state;

  const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

  return {
    root: {
      opacity: open ? 1 : 0,
      transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      position: 'fixed',
      zIndex: zIndex.popover,
      transition: Transitions.easeOut('450ms', ['transform', 'opacity']),
      maxHeight: '100%',
    },
  };
}

const PopoverAnimationFromTop = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      style: {},
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this.setState({open: true}); //eslint-disable-line react/no-did-mount-set-state
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      open: nextProps.open,
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      className,
      style,
      zDepth,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    return (
      <Paper
        style={Object.assign(styles.root, style)}
        zDepth={zDepth}
        className={className}
      >
          {this.props.children}
      </Paper>
    );
  },
});

export default PopoverAnimationFromTop;
