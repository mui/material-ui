let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');


let FontIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  render() {
    let {
      color,
      hoverColor,
      onMouseOut,
      onMouseOver,
      style,
      ...other,
    } = this.props;

    let spacing = this.context.muiTheme.spacing;
    let offColor = color ? color :
      style && style.color ? style.color :
      this.context.muiTheme.palette.textColor;
    let onColor = hoverColor ? hoverColor : offColor;

    let mergedStyles = this.mergeAndPrefix({
      position: 'relative',
      fontSize: spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut(),
    }, style, {
      color: this.state.hovered ? onColor : offColor,
    });

    return (
      <span
        {...other}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedStyles} />
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

module.exports = FontIcon;
