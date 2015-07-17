let React = require('react/addons');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');


let SvgIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    viewBox: React.PropTypes.string,
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  getDefaultProps() {
    return {
      viewBox: '0 0 24 24',
    };
  },

  render() {
    let {
      color,
      hoverColor,
      viewBox,
      style,
      ...other,
    } = this.props;

    let offColor = color ? color :
      style && style.fill ? style.fill : this.context.muiTheme.palette.textColor;
    let onColor = hoverColor ? hoverColor : offColor;

    let mergedStyles = this.mergeAndPrefix({
      display: 'inline-block',
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style, {
      // Make sure our fill color overrides fill provided in props.style
      fill: this.state.hovered ? onColor : offColor,
    });

    return (
      <svg
        {...other}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        style={mergedStyles}
        viewBox={viewBox}>
        {this.props.children}
      </svg>
    );
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  },

  _handleMouseEnter(e) {
    this.setState({hovered: true});
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  },
});

module.exports = SvgIcon;
