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
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
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
      onMouseLeave,
      onMouseEnter,
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
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        style={mergedStyles} />
    );
  },

  _handleMouseLeave(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  },

  _handleMouseEnter(e) {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined)
      this.setState({hovered: true});
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  },
});

module.exports = FontIcon;
