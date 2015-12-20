import React from 'react';
import ContextPure from '../mixins/context-pure';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let FlatButtonLabel = React.createClass({

  mixins: [
    ContextPure,
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    label: React.PropTypes.node,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        spacingDesktopGutterLess: muiTheme.baseTheme.spacing.desktopGutterLess,
      };
    },
  },

  render: function() {
    const {
      _muiTheme,
      label,
      style,
    } = this.props;

    const contextKeys = this.constructor.getRelevantContextKeys(_muiTheme);

    const mergedRootStyles = this.mergeStyles({
      position: 'relative',
      padding: '0 ' + contextKeys.spacingDesktopGutterLess + 'px',
    }, style);

    return (
      <span style={this.prepareStyles(mergedRootStyles)}>{label}</span>
    );
  },

});

FlatButtonLabel = muiThemeable(FlatButtonLabel);

export default FlatButtonLabel;
