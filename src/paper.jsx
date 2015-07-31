const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const StylePropable = require('./mixins/style-propable');
const PropTypes = require('./utils/prop-types');
const Transitions = require('./styles/transitions');


const Paper = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
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
      children,
      circle,
      rounded,
      style,
      transitionEnabled,
      zDepth,
      ...other,
    } = this.props;

    const styles = {
      backgroundColor: this.context.muiTheme.component.paper.backgroundColor,
      transition: transitionEnabled && Transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: this.context.muiTheme.contentFontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: this._getZDepthShadows(zDepth),
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    };

    return (
      <div {...other} style={this.mergeAndPrefix(styles, style)}>
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

module.exports = Paper;
