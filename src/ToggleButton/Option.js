/**
 * Created by zabieru on 6/7/2017.
 */
import React, {Component} from 'react';
import ButtonBase from '../internal/ButtonBase'
import PropTypes from 'prop-types';
import Menu from '../Menu'
import ArrowDropdown from '../svg-icons/arrow-drop-down';
import withStyles from '../styles/withStyles';
import createStyleSheet from '../styles/createStyleSheet';
import { fade } from '../styles/colorManipulator';
import  common from '../colors/common';
import  grey from '../colors/grey';
import classNames from 'classnames';


/**
 * Represents an option within a Toggle Button
 *
 */

export const styleSheet = createStyleSheet('MuiOption', theme => ({
  root: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    fontWeight: 600,
    fontSize: 14,
    float: 'left',
    padding: '0px 12px',
    textTransform: 'uppercase',
    // borderLeft: props.optionStyle.borderLeft? props.optionStyle.borderLeft : 'none', //TODO: Maybe just do a merge?
    // borderRight: props.optionStyle.borderRight? props.optionStyle.borderRight : 'none',
    height: 36,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: fade(common.black, 0.3),
  },
  dropDownButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    float: "left", //TODO: Move this down to where the dropdown is being generated
    color: fade(common.black, 0.3),
  },
  textSelected: {
    color: fade(common.black, 0.54),
  },
  backgroundSelected: {
    backgroundColor: fade(common.black, 0.3),
  },
  iconAndText: {
    height: 58,
  },
  divided:{
    borderLeft : '0.25px solid ' + grey[500],
  }
}));

class Option extends Component{
  static muiName = 'Option';

  static defaultProps = {
    selected: false,
  };

  componentWillMount() {
    if(this.props.children){
      this.setState({
        value: null,
        anchorEl: undefined,
        open: false,
      });
    }
  }

  handleDropDownClick = (item) =>{
    const newValue = (this.props.value === item.props.value) ? null : item.props.value;
    this.setState({
      value: newValue,
      open: false,
    });
    if (this.props.onClick){
      const props = Object.assign({}, this.props);
      props.value = newValue;
      this.props.onClick(props);
    }
  };

  handleOptionClick = () => {
    if (this.props.onClick && !this.props.children) { //Regular functionality if not dropdown
      this.props.onClick(this.props);
    }
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render(){
    const {
      icon,
      label,
      classes,
      style,
      divider,
      noBackground,
      selected,
      children,
    } = this.props;

    const buttonProps ={
      className: classNames(classes.root, {
        [classes.iconAndText] : icon && label,
        [classes.backgroundSelected] : selected && !noBackground,
        [classes.divided] : divider,
      }),
      onClick: this.handleOptionClick,
      centerRipple: true,
    };
    const rootProps ={
      className: classNames(classes.button, {
        [classes.textSelected] : selected,
      }),
    };
    const dropDownProps = {
      className: classNames(classes.dropDownButton, {
        [classes.textSelected] : selected,
      }),
    };

    let optionButton;
    let option;
    //If there are children available, make it a Dropdown Menu.
    if(!children){
      optionButton = React.createElement("div", rootProps, icon, label);
      option = React.createElement(ButtonBase, buttonProps, optionButton);
    }else {
      const items = children.map((child, index) => {
        return React.cloneElement(child, {
          key: index,
          onClick: () => this.handleDropDownClick(child),
        });
      });
      const dropButtonProps ={
        'aria-owns': "option-menu",
        'aria-haspopup' : true,
        className: classNames(classes.root, {
          [classes.iconAndText] : icon && label,
          [classes.backgroundSelected] : selected && !noBackground,
          [classes.divided] : divider,
        }),
        onClick: this.handleClick,
        //centerRipple: true,
      };
      optionButton = React.createElement("div", dropDownProps, icon, label);
      let dropDownButton = React.createElement(ButtonBase, dropButtonProps, optionButton,
        React.createElement(ArrowDropdown, {
          style: {
            transform: label && icon? "translate(50%, 50%)": "none",  //TODO: Move this to get style
            color: selected? fade(common.black, 0.54) : fade(common.black, 0.3),
          }
        })
      );
      const menuProps = {
        id: 'option-menu',
        anchorEl: this.state.anchorEl,
        open: this.state.open,
        onRequestClose: this.handleRequestClose,
      };
      option = React.createElement("div", {style :{ display: 'inline-block', float: 'left', overflow: 'hidden',}}, dropDownButton, //Move Style to Stylesheet
        React.createElement(Menu, menuProps, items)
      );
    }
    return option;
  }
}

Option.propTypes ={

  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
   */
  icon: PropTypes.node,
  /**
   * Set a divider to the right of the option.
   */
  divider: PropTypes.bool,
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
  noBackground: PropTypes.bool,
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
   * Sets the value of the option which may be one of the primitive types.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  /**
   * If specified, renders a dropdown of Options of type 'MenuItem'.
   */
  children: PropTypes.node,
};

export default withStyles(styleSheet) (Option);
