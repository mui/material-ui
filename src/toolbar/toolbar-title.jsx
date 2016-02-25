import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
    toolbar,
  } = state.muiTheme;

  return {
    root: {
      paddingRight: baseTheme.spacing.desktopGutterLess,
      lineHeight: `${toolbar.height}px`,
      fontSize: toolbar.titleFontSize,
      display: 'inline-block',
      position: 'relative',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  };
}

const ToolbarTitle = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The text to be displayed.
     */
    text: React.PropTypes.string,
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
      className,
      style,
      text,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <span {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {text}
      </span>
    );
  },

});

export default ToolbarTitle;
