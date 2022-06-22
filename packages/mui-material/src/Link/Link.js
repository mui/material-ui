import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { elementTypeAcceptingRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useForkRef from '../utils/useForkRef';
import Typography from '../Typography';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import getTextDecoration, { colorTransformations } from './getTextDecoration';

const useUtilityClasses = (ownerState) => {
  const { classes, component, focusVisible, underline } = ownerState;

  const slots = {
    root: [
      'root',
      `underline${capitalize(underline)}`,
      component === 'button' && 'button',
      focusVisible && 'focusVisible',
    ],
  };

  return composeClasses(slots, getLinkUtilityClass, classes);
};

const LinkRoot = styled(Typography, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`underline${capitalize(ownerState.underline)}`],
      ownerState.component === 'button' && styles.button,
    ];
  },
})(({ theme, ownerState }) => {
  return {
    ...(ownerState.underline === 'none' && {
      textDecoration: 'none',
    }),
    ...(ownerState.underline === 'hover' && {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
    ...(ownerState.underline === 'always' && {
      textDecoration: 'underline',
      ...(ownerState.color !== 'inherit' && {
        textDecorationColor: getTextDecoration({ theme, ownerState }),
      }),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    }),
    // Same reset as ButtonBase.root
    ...(ownerState.component === 'button' && {
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
      MozAppearance: 'none', // Reset
      WebkitAppearance: 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
      [`&.${linkClasses.focusVisible}`]: {
        outline: 'auto',
      },
    }),
  };
});

const Link = React.forwardRef(function Link(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiLink',
  });

  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'always',
    variant = 'inherit',
    sx,
    ...other
  } = props;

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);
  const handleBlur = (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const ownerState = {
    ...props,
    color,
    component,
    focusVisible,
    underline,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <LinkRoot
      color={color}
      className={clsx(classes.root, className)}
      classes={TypographyClasses}
      component={component}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={handlerRef}
      ownerState={ownerState}
      variant={variant}
      sx={[
        ...(!Object.keys(colorTransformations).includes(color) ? [{ color }] : []),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
});

Link.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.any,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * `classes` prop applied to the [`Typography`](/material-ui/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'body1',
      'body2',
      'button',
      'caption',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'inherit',
      'overline',
      'subtitle1',
      'subtitle2',
    ]),
    PropTypes.string,
  ]),
};

export default Link;
