let React = require('react');
let StylePropable = require('./mixins/style-propable');
let PropTypes = require('./utils/prop-types');
let Transitions = require('./styles/transitions');


let Paper = React.createClass({

  mixins: [StylePropable],

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

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.context.muiTheme.component.paper.backgroundColor,
        transition: this.props.transitionEnabled && Transitions.easeOut(),
        boxSizing: 'border-box',
        fontFamily: this.context.muiTheme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        boxShadow: this._getZDepthShadows(this.props.zDepth),
        borderRadius: this.props.circle ? '50%' :
          this.props.rounded ? '2px' : '0px',
      },
    };

    return styles;
  },

  render() {
    let {
      style,
      circle,
      rounded,
      zDepth,
      ...other } = this.props;

    let styles = this.getStyles();

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root, this.props.style)}>
        {this.props.children}
      </div>
    );
  },

  _getZDepthShadows(zDepth) {
    let shadows = [
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
