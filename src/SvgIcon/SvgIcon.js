import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';

class SvgIcon extends Component {
  static muiName = 'SvgIcon';

  static propTypes = {
    /**
     * Elements passed into the SVG Icon.
     */
    children: PropTypes.node,
    /**
     * This is the fill color of the svg icon.
     * If not specified, this component will default
     * to muiTheme.palette.textColor.
     */
    color: PropTypes.string,
    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: PropTypes.string,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Allows you to redefine what the coordinates
     * without units mean inside an svg element. For example,
     * if the SVG element is 500 (width) by 200 (height), and you
     * pass viewBox="0 0 50 20", this means that the coordinates inside
     * the svg will go from the top left corner (0,0) to bottom right (50,20)
     * and each unit will be worth 10px.
     */
    viewBox: PropTypes.string,
  };

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    viewBox: '0 0 24 24',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleMouseEnter = (event) => {
    this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };

  render() {
    const {
      children,
      color,
      hoverColor,
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      style,
      viewBox,
      ...other,
    } = this.props;

    const {
      svgIcon,
      prepareStyles,
    } = this.context.muiTheme;

    const offColor = color ? color : 'currentColor';
    const onColor = hoverColor ? hoverColor : offColor;

    const mergedStyles = Object.assign({
      display: 'inline-block',
      color: svgIcon.color,
      fill: this.state.hovered ? onColor : offColor,
      height: 24,
      width: 24,
      userSelect: 'none',
      transition: transitions.easeOut(),
    }, style);

    return (
      <svg
        {...other}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={prepareStyles(mergedStyles)}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }
}

export default SvgIcon;
