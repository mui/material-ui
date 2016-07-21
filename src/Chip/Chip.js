import React, {Component, PropTypes} from 'react';
import keycode from 'keycode';
import {fade, emphasize} from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import DeleteIcon from '../svg-icons/navigation/cancel';

function getStyles(props, context, state) {
  const {chip} = context.muiTheme;

  const backgroundColor = props.backgroundColor || chip.backgroundColor;
  const focusColor = emphasize(backgroundColor, 0.08);
  const pressedColor = emphasize(backgroundColor, 0.12);

  return {
    avatar: {
      marginRight: -4,
    },
    deleteIcon: {
      color: (state.deleteHovered) ? fade(chip.deleteIconColor, 0.4) : chip.deleteIconColor,
      cursor: 'pointer',
      margin: '4px 4px 0px -8px',
    },
    label: {
      color: props.labelColor || chip.textColor,
      fontSize: chip.fontSize,
      fontWeight: chip.fontWeight,
      lineHeight: '32px',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
    },
    root: {
      backgroundColor: state.clicked ? pressedColor : (state.focused || state.hovered) ? focusColor : backgroundColor,
      borderRadius: 16,
      boxShadow: state.clicked ? chip.shadow : null,
      cursor: props.onTouchTap ? 'pointer' : 'default',
      display: 'flex',
      whiteSpace: 'nowrap',
      width: 'fit-content',
    },
  };
}

class Chip extends Component {

  static propTypes = {
    /**
     * Override the background color of the chip.
     */
    backgroundColor: PropTypes.string,
    /**
     * Used to render elements inside the Chip.
     */
    children: PropTypes.node,
    /**
     * CSS `className` of the root element.
     */
    className: PropTypes.node,
    /**
     * Override the label color.
     */
    labelColor: PropTypes.string,
    /**
     * Override the inline-styles of the label.
     */
    labelStyle: PropTypes.object,
    /** @ignore */
    onBlur: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /** @ignore */
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseDown: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseUp: PropTypes.func,
    /**
     * Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.
     * @param {object} event `touchTap` event targeting the element.
     */
    onRequestDelete: PropTypes.func,
    /** @ignore */
    onTouchEnd: PropTypes.func,
    /** @ignore */
    onTouchStart: PropTypes.func,
    /**
     * Callback function fired when the `Chip` element is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the element.
     */
    onTouchTap: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
  };

  static contextTypes = {muiTheme: PropTypes.object.isRequired};

  state = {
    clicked: false,
    deleteHovered: false,
    focused: false,
    hovered: false,
  };

  handleBlur = (event) => {
    this.setState({clicked: false, focused: false});
    this.props.onBlur(event);
  };

  handleFocus = (event) => {
    if (this.props.onTouchTap || this.props.onRequestDelete) {
      this.setState({focused: true});
    }
    this.props.onFocus(event);
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused) {
      this.handleFocus();
      this.props.onFocus(event);
    } else {
      this.handleBlur();
    }

    this.props.onKeyboardFocus(event, keyboardFocused);
  };

  handleKeyDown = (event) => {
    if (keycode(event) === 'backspace') {
      event.preventDefault();
      if (this.props.onRequestDelete) {
        this.props.onRequestDelete(event);
      }
    }
    this.props.onKeyDown(event);
  };

  handleMouseDown = (event) => {
    // Only listen to left clicks
    if (event.button === 0) {
      event.stopPropagation();
      if (this.props.onTouchTap) {
        this.setState({clicked: true});
      }
    }
    this.props.onMouseDown(event);
  };

  handleMouseEnter = (event) => {
    if (this.props.onTouchTap) {
      this.setState({hovered: true});
    }
    this.props.onMouseEnter(event);
  };

  handleMouseEnterDeleteIcon = () => {
    this.setState({deleteHovered: true});
  };

  handleMouseLeave = (event) => {
    this.setState({
      clicked: false,
      hovered: false,
    });
    this.props.onMouseLeave(event);
  };

  handleMouseLeaveDeleteIcon = () => {
    this.setState({deleteHovered: false});
  };

  handleMouseUp = (event) => {
    this.setState({clicked: false});
    this.props.onMouseUp(event);
  };

  handleTouchTapDeleteIcon = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    this.props.onRequestDelete(event);
  };

  handleTouchEnd = (event) => {
    this.setState({clicked: false});
    this.props.onTouchEnd(event);
  };

  handleTouchStart = (event) => {
    event.stopPropagation();
    if (this.props.onTouchTap) {
      this.setState({clicked: true});
    }
    this.props.onTouchStart(event);
  };

  render() {
    const buttonEventHandlers = {
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    let {
      children,
      style,
      className,
      labelStyle,
      labelColor, // eslint-disable-line no-unused-vars,prefer-const
      backgroundColor, // eslint-disable-line no-unused-vars,prefer-const
      onRequestDelete, // eslint-disable-line no-unused-vars,prefer-const
      ...other,
    } = this.props;

    const deletable = this.props.onRequestDelete;
    let avatar = null;

    style = Object.assign(styles.root, style);
    labelStyle = prepareStyles(Object.assign(styles.label, labelStyle));

    const deleteIcon = deletable ?
      <DeleteIcon
        color={styles.deleteIcon.color}
        style={styles.deleteIcon}
        onTouchTap={this.handleTouchTapDeleteIcon}
        onMouseEnter={this.handleMouseEnterDeleteIcon}
        onMouseLeave={this.handleMouseLeaveDeleteIcon}
      /> :
      null;

    const childCount = React.Children.count(children);

    // If the first child is an avatar, extract it and style it
    if (childCount > 1) {
      children = React.Children.toArray(children);

      if (React.isValidElement(children[0]) && children[0].type.muiName === 'Avatar') {
        avatar = children.shift();

        avatar = React.cloneElement(avatar, {
          style: Object.assign(styles.avatar, avatar.props.style),
          size: 32,
        });
      }
    }

    return (
      <EnhancedButton
        {...other}
        {...buttonEventHandlers}
        className={className}
        containerElement="div" // Firefox doesn't support nested buttons
        disableTouchRipple={true}
        disableFocusRipple={true}
        style={style}
      >
        {avatar}
        <span style={labelStyle}>{children}</span>
        {deleteIcon}
      </EnhancedButton>
    );
  }
}

export default Chip;
