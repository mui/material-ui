import React from 'react';
import OpenIcon from '../svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from '../svg-icons/hardware/keyboard-arrow-down';
import IconButton from '../icon-button';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles() {
  return {
    root: {
      top: 0,
      bottom: 0,
      right: 4,
      margin: 'auto',
      position: 'absolute',
    },
  };
}

const CardExpandable = React.createClass({

  propTypes: {
    expanded: React.PropTypes.bool,
    onExpanding: React.PropTypes.func.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
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
    const styles = getStyles(this.props, this.state);

    return (
      <IconButton
        style={Object.assign(styles.root, this.props.style)}
        onTouchTap={this.props.onExpanding}
      >
        {this.props.expanded ? <OpenIcon /> : <CloseIcon />}
      </IconButton>
    );
  },
});

export default CardExpandable;
