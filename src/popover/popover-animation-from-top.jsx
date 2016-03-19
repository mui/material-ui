import React, {PropTypes} from 'react';
import Paper from '../paper';
import Transitions from '../styles/transitions';
import getMuiTheme from '../styles/getMuiTheme';
import MuiPropTypes from '../utils/mui-prop-types';

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
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    targetOrigin: MuiPropTypes.origin,
    zDepth: MuiPropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
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
