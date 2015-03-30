var React = require('react');
var StylePropable = require('./mixins/style-propable');
var CustomVariables = require('./styles/variables/custom-variables');

var Paper = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    circle: React.PropTypes.bool,
    className: React.PropTypes.string,
    innerClassName: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5]),
  },

  getDefaultProps: function() {
    return {
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  /** Styles */
  _main: function() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      fontFamily: CustomVariables.contentFontFamily,
      webkitTapHighlightColor: 'rgba(0,0,0,0)', 
      boxShadow: this.getZDepthShadows(this.props.zDepth).boxShadow,
      borderRadius: this.props.circle ? '50%' : 
                    this.props.rounded ? '2px' :
                    '0px',
    });
  },

  _inner: function() {
    var style = {
      width: '100%', 
      height: '100%',
      boxSizing: 'border-box',
      fontFamily: CustomVariables.contentFontFamily,
      webkitTapHighlightColor: 'rgba(0,0,0,0)', 
      boxShadow: this.getZDepthShadows(this.props.zDepth).bottomBoxShadow,
      borderRadius: this.props.circle ? '50%' : 
                    this.props.rounded ? '2px' :
                    '0px',
    };

    if (this.props.innerStyle) {
      style = this.mergeAndPrefix(style, this.props.innerStyle);
    }

    return style;
  },

  render: function() {
    var {
      className,
      innerClassName,
      style,
      innerStyle,
      circle,
      rounded,
      zDepth,
      ...other } = this.props;

    return (
      <div {...other} className={this.props.className} style={this._main()}>
        <div ref="innerContainer" className={this.props.innerClassName} style={this._inner()}>
          {this.props.children}
        </div>
      </div>
    );
  },

  getInnerContainer: function() {
    return this.refs.innerContainer;
  },

  getZDepthShadows: function(zDepth) {
    var shadows = [
      {
        boxShadow: '',
        bottomBoxShadow: '',
      },
      {
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.24)',
        bottomBoxShadow: '0 1px 6px rgba(0, 0, 0, 0.12)',
      },
      {
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.23)',
        bottomBoxShadow: '0 3px 10px rgba(0, 0, 0, 0.16)',
      },
      {
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.23)',
        bottomBoxShadow: '0 10px 30px rgba(0, 0, 0, 0.19)',
      },
      {
        boxShadow: '0 10px 18px rgba(0, 0, 0, 0.22)',
        bottomBoxShadow: '0 14px 45px rgba(0, 0, 0, 0.25)',
      },
      {
        boxShadow: '0 15px 20px rgba(0, 0, 0, 0.22)',
        bottomBoxShadow: '0 19px 60px rgba(0, 0, 0, 0.30)',
      },
    ];

    return shadows[zDepth];
  }

});

module.exports = Paper;
