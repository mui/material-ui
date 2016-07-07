// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import ButtonBase from './ButtonBase';

function createButtonColorRule(main, contrast, hover) {
  return {
    color: main,
    '&raised': {
      color: contrast,
      backgroundColor: main,
      '&:hover': {
        backgroundColor: hover,
      },
      '&disabled': {
        backgroundColor: main,
      },
    },
  };
}

export const styleSheet = createStyleSheet('Button', (theme) => {
  const {palette, shadows, transitions, typography} = theme;

  return {
    root: {
      ...typography.button,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 88,
      height: 36,
      padding: '0px 16px',
      borderRadius: 2,
      color: palette.text.primary,
      backgroundColor: 'transparent',
      transition: transitions.multi(['background-color', 'box-shadow']),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: palette.text.divider,
      },
      '&disabled': {
        backgroundColor: 'transparent',
      },
    },
    disabled: {
      opacity: 0.4,
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    raised: {
      color: palette.getContrastText(palette.grey[300]),
      backgroundColor: palette.grey[300],
      boxShadow: shadows[2],
      '&keyboardFocused': {
        boxShadow: shadows[6],
      },
      '&:hover': {
        backgroundColor: palette.grey.A100,
      },
      '&:active': {
        boxShadow: shadows[8],
      },
      '&disabled': {
        boxShadow: shadows[0],
        backgroundColor: palette.grey[300],
      },
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: shadows[6],
      '&:active': {
        boxShadow: shadows[12],
      },
    },
    primary: createButtonColorRule(
      palette.primary[500],
      palette.getContrastText(palette.primary[500]),
      palette.primary[700]
    ),
    accent: createButtonColorRule(
      palette.accent.A200,
      palette.getContrastText(palette.accent.A200),
      palette.accent.A400
    ),
  };
});

type DefaultProps = {
  component: string,
  ripple: boolean,
  focusRipple: boolean,
  raised: boolean,
  type: string,
};

type Props = {
  /**
   * If true, the button will use the theme's accent color.
   */
  accent?: boolean,
  /**
   * The content of the button.
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * The element or component used for the root node.
   */
  component?: string|Function,
  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean,
  /**
   * If true, well use floating action button styling.
   */
  fab?: boolean,
  /**
   * If true, the button will have a keyboard focus ripple.
   * Ripple must also be true.
   */
  focusRipple?: boolean,
  /**
   * The URL to link to when the button is clicked.
   * If set, an `a` element will be used as the root node.
   */
  href?: string,
  /**
   * If true, the button will use the theme's primary color.
   */
  primary?: boolean,
  /**
   * If true, the button will use raised styling.
   */
  raised?: boolean,
  /**
   * If true, the button will have a ripple.
   */
  ripple?: boolean,
  /**
   * @ignore
   */
  type?: string,
};

/**
 * Buttons communicate the action that will occur when the user
 * touches them.
 *
 * @see https://material.google.com/components/buttons.html
 *
 * ```js
 * import Button from 'material-ui/Button';
 *
 * const Component = () => <Button>Hello World</Button>;
 * ```
 */
export default class Button extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    component: 'button',
    ripple: true,
    focusRipple: true,
    raised: false,
    type: 'button',
  };

  props:Props;

  render():Element<any> {
    const {
      accent,
      children,
      className,
      disabled,
      fab,
      primary,
      raised,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames({
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.primary]: primary,
      [classes.accent]: accent,
      [classes.disabled]: disabled,
    }, className);

    return (
      <ButtonBase
        className={classNames}
        disabled={disabled}
        keyboardFocusedClassName={classes.keyboardFocused}
        {...other}
      >
        <span className={classes.label}>{children}</span>
      </ButtonBase>
    );
  }
}
