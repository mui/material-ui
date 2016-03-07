import React from 'react';
import Popover from '../popover/popover';
import PopoverAnimationFromTop from '../popover/popover-animation-from-top';
import Menu from '../menus/menu';
import keycode from 'keycode';

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const SelectFieldMenu = React.createClass({
  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    anchorEl: React.PropTypes.object,
    /**
     * The width will automatically be set according to the items inside the menu.
     * To control this width in css instead, set this prop to false.
     */
    autoWidth: React.PropTypes.bool,

    /**
     * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
     * prop `label` that value will be used to render the representation of that
     * item within the field.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disables the menu.
     */
    disabled: React.PropTypes.bool,

    /**
     * Overrides the styles of icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Overrides the styles of label when the `DropDownMenu` is inactive.
     */
    labelStyle: React.PropTypes.object,

    /**
     * The style object to use to override underlying list style.
     */
    listStyle: React.PropTypes.object,

    /**
     * The maximum height of the `Menu` when it is displayed.
     */
    maxHeight: React.PropTypes.number,

    /**
     * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Fired when a menu item is clicked that is not the one currently selected.
     */
    onChange: React.PropTypes.func,

    /**
     * This is a callback that fires when the menu
     * thinks it should close. (e.g. clickAway or selection made)
     *
     * @param {string} reason Determines what triggered this request.
     */
    onRequestClose: React.PropTypes.func.isRequired,
    /**
     * Set to true to have the `SelectFieldMenu` open.
     */
    open: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the underline.
     */
    underlineStyle: React.PropTypes.object,

    /**
     * The value that is currently selected.
     */
    value: React.PropTypes.any,
  },

  onChange(event, value) {
    this.props.onChange(event, null, value);
                            // ^^^^ index - can we just ignore this?
    this.props.onRequestClose();
  },

  onKeyDown(event) {
    switch (keycode(event)) {
      case 'tab' : this.props.onRequestClose();
    }
  },

  render() {
    const {
      autoWidth,
      anchorEl,
      children,
      listStyle,
      menuStyle,
      maxHeight,
      open,
      style,
      //selectFieldRoot,
      //fullWidth,
      onRequestClose,
      value,
      ...other,
    } = this.props;

    let popoverStyle;
    if (anchorEl && !autoWidth) {
      popoverStyle = {width: anchorEl.clientWidth};
    }
    return (
      <Popover
        anchorOrigin={anchorOrigin}
        anchorEl={anchorEl}
        style={popoverStyle}
        animation={PopoverAnimationFromTop}
        open={open}
        onRequestClose={this.props.onRequestClose}
      >
        <Menu
          maxHeight={maxHeight}
          desktop={true}
          onChange={this.onChange}
          onEscKeyDown={this.props.onRequestClose}
          onKeyDown={this.onKeyDown}
          style={menuStyle}
          listStyle={listStyle}
          value={value}
        >
          {open ? children : null}
          {/* this hack is needed because of `componentDidUpdate`
              on list-item.jsx as it
              re-focusses the list-item during unmount */}
        </Menu>
      </Popover>
    );
  },
});

export default SelectFieldMenu;
