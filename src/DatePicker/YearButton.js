import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import { createStyleSheet } from 'jss-theme-reactor';
export const styleSheet = createStyleSheet('Year', (theme) => {
  return {
    root: {
      boxSizing: 'border-box',
      display: 'block',
      fontSize: 14,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
    },
    label: {
      alignSelf: 'center',
      position: 'relative',
      top: -1,
    },
  };
});

function getStyles(props, ctxt, state) {
  const { selected } = props;
  const { palette } = ctxt.theme;
  const { hover } = state;
  //const { baseTheme, datePicker } = context.muiTheme;
  return {
    root: {
      color: year === new Date().getFullYear() && palette.text.accent,
    },
    label: {
      color: hover || selected ? palette.text.accent : palette.text.primary,
      fontSize: selected ? 26 : 17,
      fontWeight: hover ? 450 : selected ? 500 : 400,
    },
  };
}
class YearButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    year: PropTypes.number.isRequired,
  };
  static defaultProps = {
    selected: false,
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
  /*
   static contextTypes = {
   muiTheme: PropTypes.object.isRequired,
   };*/
  state = {
    hover: false,
  };
  handleMouseEnter = () => {
    this.setState({ hover: true });
  };
  handleMouseLeave = () => {
    this.setState({ hover: false });
  };
  handleTouchTap = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.year);
    }
  };

  render() {
    const {
      children,
      className, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      year, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const styleManager = this.context.styleManager;
    const { render } = styleManager;
    const cls = render(styleSheet);
    //  const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, styleManager, this.state);
    const labelStyle = styleManager.prepareInline(styles.label);
    const rootStyle = styleManager.prepareInline(styles.root);
    return (
      <Button
        {...other}
        ripple
        className={cls.root}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleTouchTap}
        style={rootStyle}
      >
        <span style={labelStyle}
              className={cls.label}>
          {children}
        </span>
      </Button>
    );
  }
}
export default YearButton;
