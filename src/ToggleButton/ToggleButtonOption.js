// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';
import Menu from '../Menu';
import ArrowDropdown from '../svg-icons/arrow-drop-down';
import withStyles from '../styles/withStyles';
import createStyleSheet from '../styles/createStyleSheet';
import { fade } from '../styles/colorManipulator';
import common from '../colors/common';
import grey from '../colors/grey';

/**
 * Represents an option within a Toggle Button
 *
 */

export const styleSheet = createStyleSheet('MuiToggleButtonOption', theme => ({
  root: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    fontWeight: 600,
    fontSize: 14,
    padding: '0px 12px',
    textTransform: 'uppercase',
    // borderLeft: props.optionStyle.borderLeft? props.optionStyle.borderLeft : 'none',
    // borderRight: props.optionStyle.borderRight? props.optionStyle.borderRight : 'none',
  },
  rootButton: {
    height: 36,
  },
  rootToggle: {
    height: 48,
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
  toggle: {
    color: theme.palette.action.active,
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
  toggleSelected: {
    backgroundColor: fade(common.black, 0.2),
    borderRadius: '50%',
  },
  iconAndText: {
    height: 58,
  },
  divided: {
    borderLeft: `0.25px solid ${grey[500]}`,
  },
}));

class ToggleButtonOption extends Component {
  static defaultProps = {
    selected: false,
    disabled: false,
    divider: false,
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
    const { icon, label, classes, disabled, divider, toggle, selected, children } = this.props;

    const buttonProps = {
      className: classNames(classes.root, {
        [classes.rootButton]: !toggle,
        [classes.rootToggle]: toggle,
        [classes.iconAndText]: icon && label,
        [classes.buttonSelected]: selected && !toggle,
        [classes.toggleSelected]: selected && toggle && !disabled,
        [classes.divided]: divider,
      }),
      onClick: this.handleOptionClick,
      centerRipple: true,
    };
    const rootProps = {
      className: classNames(classes.buttonBase, {
        [classes.textSelected]: selected && !toggle,
        [classes.button]: !toggle || disabled,
        [classes.toggle]: toggle && !disabled,
      }),
    };

    let option;
    // If there are children available, make it a Dropdown Menu.
    if (!children) {
      option = (
        <ButtonBase {...buttonProps}>
          <div {...rootProps}>
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
      const dropButtonProps = {
        'aria-owns': 'option-menu',
        'aria-haspopup': true,
        className: classNames(classes.root, classes.rootButton, {
          [classes.iconAndText]: icon && label,
          [classes.buttonSelected]: selected && !toggle,
          [classes.divided]: divider,
        }),
        onClick: this.handleClick,
        // centerRipple: true,
      };
      const arrowProp = {
        style: {
          // TODO: Move this to get style
          transform: label && icon ? 'translate(50%, 50%)' : 'none',
          color: selected ? fade(common.black, 0.54) : fade(common.black, 0.3),
        },
      };
      const menuProps = {
        id: 'option-menu',
        anchorEl: this.state.anchorEl,
        open: this.state.open,
        onRequestClose: this.handleRequestClose,
      };
      option = (
        <div>
          <ButtonBase {...dropButtonProps}>
            <div
              className= {classNames(classes.dropDownButton, {
                [classes.textSelected]: selected,
              })}
            >
              {icon}
              {label}
            </div>
            <ArrowDropdown {...arrowProp}/>
          </ButtonBase>
          <Menu {...menuProps}>
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
   * @ignore
   * This property is overriden by the ToggleButton component.
   */
  onClick: PropTypes.func,
  /**
   * Fired when an option is deselected.
   * Use this event to specify any functionality when an option gets deselected.
   *
   * @param {number, boolean, string} value The current value of the selected option.
   */
  onDeselect: PropTypes.func,
  /**
   * Fired when an option is selected.
   * Use this event to specify any functionality when an option gets selected.
   *
   * @param {number, boolean, string} value The current value of the selected option.
   */
  onSelect: PropTypes.func,
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

export default withStyles(styleSheet)(ToggleButtonOption);
