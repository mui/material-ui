import React from 'react';
import ContextPure from '../mixins/context-pure';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const FlatButtonLabel = React.createClass({

  propTypes: {
    label: React.PropTypes.node,

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
    ContextPure,
    StylePropable,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        spacingDesktopGutterLess: muiTheme.rawTheme.spacing.desktopGutterLess,
      };
    },
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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render: function() {
    const {
      label,
      style,
    } = this.props;

    const contextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    const mergedRootStyles = this.mergeStyles({
      position: 'relative',
      paddingLeft: contextKeys.spacingDesktopGutterLess,
      paddingRight: contextKeys.spacingDesktopGutterLess,
    }, style);

    return (
      <span style={this.prepareStyles(mergedRootStyles)}>{label}</span>
    );
  },

});

export default FlatButtonLabel;
