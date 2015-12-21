import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import muiThemeable from './muiThemeable';

let FontIcon = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      hovered: false,
    };
  },

  render() {
    let {
      _muiTheme,
      color,
      hoverColor,
      onMouseLeave,
      onMouseEnter,
      style,
      ...other,
    } = this.props;

    let spacing = _muiTheme.baseTheme.spacing;
    let offColor = color ? color :
      style && style.color ? style.color :
      _muiTheme.baseTheme.palette.textColor;
    let onColor = hoverColor ? hoverColor : offColor;

    let mergedStyles = this.prepareStyles({
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

FontIcon = muiThemeable(FontIcon);

export default FontIcon;
