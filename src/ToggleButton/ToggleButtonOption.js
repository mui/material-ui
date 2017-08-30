// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from '../ButtonBase';
import Menu from '../Menu';
import ArrowDropdown from '../svg-icons/arrow-drop-down';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import common from '../colors/common';
import grey from '../colors/grey';

/**
 * Represents an option within a Toggle Button
 *
 */
export const styles = (theme: Object) => ({
  root: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    fontWeight: 600,
    fontSize: 14,
    padding: '0px 12px',
    textTransform: 'uppercase',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  rootButton: {
    display: 'flex',
    alignItems: 'center',
    height: 36,
  },
  rootToggle: {
    height: 48,
    borderRadius: '50%',
  },
  buttonBase: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: theme.palette.text.hint,
  },
  dropDownButton: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.text.hint,
  },
  textSelected: {
    color: theme.palette.action.active,
  },
  buttonSelected: {
    backgroundColor: fade(common.black, 0.3),
  },
  iconAndText: {
    height: 58,
  },
  divided: {
    boxShadow: `-0.3px 0 0 0.3px ${grey[500]}`,
  },
  colorDefault: {
    color: theme.palette.action.active,
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
  colorAccent: {
    color: theme.palette.secondary.A200,
  },
  colorContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorInherit: {
    color: 'blue',
  },
  togglePrimary: {
    backgroundColor: fade(theme.palette.primary[500], 0.26),
    borderRadius: '50%',
  },
  toggleAccent: {
    backgroundColor: fade(theme.palette.secondary.A200, 0.26),
    borderRadius: '50%',
  },
  toggleContrast: {
    backgroundColor:
      theme.palette.type === 'light'
        ? fade(theme.palette.getContrastText(theme.palette.primary[500]), 0.3)
        : fade(theme.palette.getContrastText(theme.palette.primary[500]), 0.2),
    borderRadius: '50%',
  },
  toggleDefault: {
    backgroundColor:
      theme.palette.type === 'light' ? fade(common.black, 0.12) : fade(common.black, 0.2),
    borderRadius: '50%',
  },
  toggleInherit: {
    borderRadius: '50%',
  },
});

class ToggleButtonOption extends Component {
  static defaultProps = {
    selected: false,
    disabled: false,
    divider: false,
    color: 'default',
  };

  state = {
    value: null,
    anchorEl: undefined,
    open: false,
  };

  componentWillMount() {
    if (this.props.children) {
      this.setState({
        value: null,
        anchorEl: undefined,
        open: false,
      });
    }
  }

  handleDropDownClick = item => {
    const newValue = this.props.value === item.props.value ? null : item.props.value;
    this.setState({
      value: newValue,
      open: false,
    });
    if (this.props.onClick) {
      const props = Object.assign({}, this.props);
      props.value = newValue;
      this.props.onClick(props);
    }
  };

  handleOptionClick = () => {
    if (this.props.onClick && !this.props.children) {
      this.props.onClick(this.props);
    }
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      icon,
      label,
      classes,
      color,
      disabled,
      divider,
      toggle,
      selected,
      children,
    } = this.props;

    let option;
    // If there are children available, make it a DropDown Menu.
    if (!children) {
      option = (
        <ButtonBase
          className={classNames(classes.root, {
            [classes.rootButton]: !toggle,
            [classes.rootToggle]: toggle,
            [classes.iconAndText]: icon && label,
            [classes.buttonSelected]: selected && !toggle,
            [classes.toggleDefault]: color === 'default' && selected && toggle && !disabled,
            [classes.togglePrimary]: color === 'primary' && selected && toggle && !disabled,
            [classes.toggleAccent]: color === 'accent' && selected && toggle && !disabled,
            [classes.toggleContrast]: color === 'contrast' && selected && toggle && !disabled,
            [classes.colorDefault]: color === 'default' && toggle && !disabled,
            [classes.colorPrimary]: color === 'primary' && toggle && !disabled,
            [classes.colorAccent]: color === 'accent' && toggle && !disabled,
            [classes.colorContrast]: color === 'contrast' && toggle && !disabled,
            [classes.divided]: divider,
          })}
          onClick={this.handleOptionClick}
          focusRipple
        >
          <div
            className={classNames(classes.buttonBase, {
              [classes.textSelected]: selected && !toggle,
              [classes.button]: !toggle || disabled,
            })}
          >
            {icon}
            {label}
          </div>
        </ButtonBase>
      );
    } else {
      const items = children.map(child => {
        return React.cloneElement(child, {
          onClick: () => this.handleDropDownClick(child),
        });
      });

      option = (
        <div>
          <ButtonBase
            aria-owns="option-menu"
            aria-haspopup
            className={classNames(classes.root, classes.rootButton, {
              [classes.iconAndText]: icon && label,
              [classes.buttonSelected]: selected && !toggle,
              [classes.divided]: divider,
            })}
            onClick={this.handleClick}
            centerRipple
          >
            <div
              className={classNames(classes.dropDownButton, {
                [classes.textSelected]: selected,
              })}
            >
              {icon}
              {label}
            </div>
            <ArrowDropdown
              style={{
                // TODO: Move this to get style
                transform: label && icon ? 'translate(50%, 50%)' : 'none',
                color: selected ? fade(common.black, 0.54) : fade(common.black, 0.3),
              }}
            />
          </ButtonBase>
          <Menu
            id="option-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {items}
          </Menu>
        </div>
      );
    }
    return option;
  }
}

ToggleButtonOption.propTypes = {
  /**
   * If specified, renders a dropdown of Options of type 'MenuItem'.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'primary', 'accent', 'contrast']),
  /**
   * Determines if a toggle icon is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * Set a divider to the right of the option.
   */
  divider: PropTypes.bool,
  /**
   * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  index: PropTypes.any,
  /**
   * Sets the text value of the option to the string specified.
   */
  label: PropTypes.string,
  /**
   * Fired when an option is either selected or deselected.
   * Use this event to specify any functionality when an option gets changed.
   *
   * @param {number, boolean, string} value The current value of the selected option.
   * @param {boolean} selected Specifies whether or not the current option is selected.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   * This property is overriden by the ToggleButton component.
   */
  onClick: PropTypes.func,
  /**
   * Defines if the current option is selected or not.
   * The ToggleButton component is responsible for setting this property.
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   * This property is overriden by the ToggleButton component.
   */
  toggle: PropTypes.bool,
  /**
   * Sets the value of the option which may be one of the primitive types.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

export default withStyles(styles, { name: 'MuiToggleButtonOption' })(ToggleButtonOption);
