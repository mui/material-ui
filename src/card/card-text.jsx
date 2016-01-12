import React from 'react';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const CardText = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    expandable: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    const themeVariables = this.state.muiTheme.cardText;
    return {
      root: {
        padding: 16,
        fontSize: '14px',
        color: this.props.color ? this.props.color : themeVariables.textColor,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeStyles(styles.root, this.props.style);

    return (
      <div {...this.props} style={this.prepareStyles(rootStyle)}>
        {this.props.children}
      </div>
    );
  },
});

export default CardText;
