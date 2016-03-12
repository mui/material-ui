import React from 'react';
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
    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    width: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
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
