import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import { LinkProps, LinkTypeMap } from './LinkProps';

const useUtilityClasses = (ownerState: LinkProps) => {
  const { level, color, variant, underline, focusVisible, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      level,
      underline && `underline${capitalize(underline)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getLinkUtilityClass, {});
};

const LinkRoot = styled(Typography, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: LinkProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
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
        '&:hover': {
          textDecorationColor: 'inherit',
        },
      }),
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent', // Reset default value
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      border: 0,
      margin: 0, // Remove the margin in Safari
      borderRadius: 0,
      padding: 0, // Remove the padding in Firefox
      ...(!!ownerState.variant && {
        paddingInline: '0.25em', // better than left, right because it also works with writing mode.
        marginInline: '-0.25em',
      }),
      userSelect: 'none',
      verticalAlign: 'middle',
      MozAppearance: 'none', // Reset
      WebkitAppearance: 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
      [`&.${linkClasses.focusVisible}`]: theme.focus.default,
      color: theme.vars.palette[ownerState.color!]?.textColor,
      cursor: 'pointer',
    },
    ownerState.variant && theme.variants[ownerState.variant]?.[ownerState.color!],
    ownerState.variant && theme.variants[`${ownerState.variant}Hover`]?.[ownerState.color!],
    ownerState.variant && theme.variants[`${ownerState.variant}Active`]?.[ownerState.color!],
    theme.variants[`${ownerState.variant || 'text'}Disabled`]?.[ownerState.color!],
  ];
});

const Link = React.forwardRef(function Link(inProps, ref) {
  const props = useThemeProps<typeof inProps & LinkProps>({
    props: inProps,
    name: 'MuiLink',
  });

  const {
    className,
    color = 'primary',
    component = 'a',
    disabled = false,
    onBlur,
    onFocus,
    level = 'body1',
    underline = 'hover',
    variant,
    ...other
  } = props;

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState<boolean>(false);
  const handlerRef = useForkRef(ref, focusVisibleRef) as React.RefObject<HTMLSpanElement>;
  const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
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
    disabled,
    focusVisible,
    underline,
    variant,
    level,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <LinkRoot
      className={clsx(classes.root, className)}
      as={component}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={handlerRef}
      ownerState={ownerState}
      {...other}
    />
  );
}) as OverridableComponent<LinkTypeMap>;

Link.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  level: PropTypes.oneOf([
    'body1',
    'body2',
    'body3',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
  ]),
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Controls when the link should have an underline.
   * @default 'hover'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme link styles.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Link;
