import {PropTypes} from 'react';

const propTypes = {
  /**
   * Override the default background color for the button, but not the default disabled background color
   * (use `disabledBackgroundColor` for this).
   */
  backgroundColor: PropTypes.string,
  /**
   * The content of the button. May be a string, an icon or both, with an optional element such as `<input />`
   */
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Override the disabled background color for the button.
   */
  disabledBackgroundColor: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   */
  href: PropTypes.string,
  /**
   * The color of the button's label or icon.
   */
  labelColor: PropTypes.string,
  /**
   * Override the inline-styles of the button's label element.
   */
  labelStyle: PropTypes.object,
  /**
   * If true, the floating action button will be small.
   */
  mini: PropTypes.bool,
  /**
   * Callback function fired when the element is focused or blurred by the keyboard.
   *
   * @param {object} event `focus` or `blur` event targeting the element.
   * @param {boolean} isKeyboardFocused Indicates whether the element is focused.
   */
  onKeyboardFocus: PropTypes.func,
  /** @ignore */
  onMouseDown: PropTypes.func,
  /** @ignore */
  onMouseEnter: PropTypes.func,
  /** @ignore */
  onMouseLeave: PropTypes.func,
  /** @ignore */
  onMouseUp: PropTypes.func,
  /** @ignore */
  onTouchEnd: PropTypes.func,
  /** @ignore */
  onTouchStart: PropTypes.func,
  /**
   * If true, the button will use the theme's primary color.
   */
  primary: PropTypes.bool,
  /**
   * Override the inline styles of the ripple.
   */
  rippleStyle: PropTypes.object,
  /**
   * If true, the button will use the theme's secondary color.
   * If both `secondary` and `primary` are true, the button will use
   * the theme's primary color.
   */
  secondary: PropTypes.bool,
  /**
   * Override the inline-styles of the button element.
   */
  style: PropTypes.object,
  /**
   * Button type to render.
   */
  type: PropTypes.string,
};

export default propTypes;
