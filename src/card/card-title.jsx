import React from 'react';
import Styles from '../styles';
import StylePropable from '../mixins/style-propable';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const CardTitle = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
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

  getDefaultProps() {
    return {
      titleColor: Styles.Colors.darkBlack,
      subtitleColor: Styles.Colors.lightBlack,
    };
  },

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
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  },

  getStyles() {
    return {
      root: {
        padding: 16,
        position: 'relative',
      },
      title: {
        fontSize: 24,
        color: this.props.titleColor,
        display: 'block',
        lineHeight: '36px',
      },
      subtitle: {
        fontSize: 14,
        color: this.props.subtitleColor,
        display: 'block',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const rootStyle = this.prepareStyles(styles.root, this.props.style);
    const titleStyle = this.prepareStyles(styles.title, this.props.titleStyle);
    const subtitleStyle = this.prepareStyles(styles.subtitle, this.props.subtitleStyle);

    return (
      <div {...this.props} style={rootStyle}>
        <span style={titleStyle}>
          {this.props.title}
        </span>
        <span style={subtitleStyle}>
          {this.props.subtitle}
        </span>
        {this.props.children}
      </div>
    );
  },
});

export default CardTitle;
