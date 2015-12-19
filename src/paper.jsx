import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from './mixins/style-propable';
import PropTypes from './utils/prop-types';
import Transitions from './styles/transitions';
import muiThemeable from './muiThemeable';

let Paper = React.createClass({

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    transitionEnabled: React.PropTypes.bool,
    zDepth: PropTypes.zDepth,
  },

  getDefaultProps() {
    return {
      circle: false,
      rounded: true,
      transitionEnabled: true,
      zDepth: 1,
    };
  },

  render() {
    const {
      _muiTheme,
      children,
      circle,
      rounded,
      style,
      transitionEnabled,
      zDepth,
      ...other,
    } = this.props;

    const styles = {
      backgroundColor: _muiTheme.paper.backgroundColor,
      transition: transitionEnabled && Transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: _muiTheme.baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: this._getZDepthShadows(zDepth),
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    };

    return (
      <div {...other} style={this.prepareStyles(styles, style)}>
        {children}
      </div>
    );
  },

  _getZDepthShadows(zDepth) {
    const shadows = [
      null,
      '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
      '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
      '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)',
      '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)',
      '0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)',
    ];

    return shadows[zDepth];
  },

});

Paper = muiThemeable(Paper);

export default Paper;
