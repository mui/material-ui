import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import capitalize from '../utils/capitalize';
import withStyles from '../styles/withStyles';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useForkRef from '../utils/useForkRef';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `underline="none"`. */
  underlineNone: {
    textDecoration: 'none',
  },
  /* Styles applied to the root element if `underline="hover"`. */
  underlineHover: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  /* Styles applied to the root element if `underline="always"`. */
  underlineAlways: {
    textDecoration: 'underline',
  },
  // Same reset as ButtonBase.root
  /* Styles applied to the root element if `component="button"`. */
  button: {
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '&$focusVisible': {
      outline: 'auto',
    },
  },
  /* Pseudo-class applied to the root element if the link is keyboard focused. */
  focusVisible: {},
};

const Link = React.forwardRef(function Link(props, ref) {
  const {
    classes,
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'hover',
    variant = 'inherit',
    ...other
  } = props;

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);
  const handleBlur = (event) => {
    if (focusVisible) {
      onBlurVisible();
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <Typography
      className={clsx(
        classes.root,
        {
          [classes.button]: component === 'button',
          [classes.focusVisible]: focusVisible,
        },
        classes[`underline${capitalize(underline)}`],
        className,
      )}
      classes={TypographyClasses}
      color={color}
      component={component}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={handlerRef}
      variant={variant}
      {...other}
    />
  );
});

Link.propTypes = {
  /**
   * The content of the link.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   */
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * `classes` prop applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Controls when the link should have an underline.
   */
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiLink' })(Link);
