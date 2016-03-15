import React, {PropTypes} from 'react';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    inkBar,
  } = state.muiTheme;

  return {
    root: {
      left: props.left,
      width: props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: props.color || inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    },
  };
}

const InkBar = React.createClass({

  propTypes: {
    color: PropTypes.string,
    left: PropTypes.string.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    width: PropTypes.string.isRequired,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      style,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} />
    );
  },

});

export default InkBar;
