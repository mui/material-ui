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
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
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
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedStyles}
        viewBox={viewBox}>
        {this.props.children}
      </svg>
    );
  },

  _handleMouseOut(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleMouseOver(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  },
});

module.exports = SvgIcon;
