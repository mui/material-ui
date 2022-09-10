import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import { useSlotProps } from '@mui/base/utils';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import { LinkProps, LinkOwnerState, LinkTypeMap } from './LinkProps';
import { TypographyContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: LinkOwnerState) => {
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
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getLinkUtilityClass, {});
};

const StartDecorator = styled('span', {
  name: 'JoyLink',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: LinkOwnerState }>({
  display: 'inline-flex',
  marginInlineEnd: 'min(var(--Link-gap, 0.5em), 0.75rem)',
});

const EndDecorator = styled('span', {
  name: 'JoyLink',
  slot: 'endDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: LinkOwnerState }>({
  display: 'inline-flex',
  marginInlineStart: 'min(var(--Link-gap, 0.25em), 0.5rem)',
});

const LinkRoot = styled('a', {
  name: 'JoyLink',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: LinkOwnerState }>(({ theme, ownerState }) => {
  return [
    {
      '--Icon-fontSize': '1.25em',
      ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
      ...(ownerState.level === 'inherit' && {
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
      }),
      ...(ownerState.underline === 'none' && {
        textDecoration: 'none',
      }),
      ...(ownerState.underline === 'hover' && {
        textDecoration: 'none',
        '&:hover': {
          textDecorationLine: 'underline',
        },
      }),
      ...(ownerState.underline === 'always' && {
        textDecoration: 'underline',
      }),
      ...(ownerState.startDecorator && {
        verticalAlign: 'bottom', // to make the link align with the parent's content
      }),
      display: 'inline-flex',
      alignItems: 'center',
      WebkitTapHighlightColor: 'transparent',
      backgroundColor: 'transparent', // Reset default value
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      border: 0,
      margin: 0, // Remove the margin in Safari
      borderRadius: theme.vars.radius.xs,
      padding: 0, // Remove the padding in Firefox
      textDecorationColor: `rgba(${
        theme.vars.palette[ownerState.color!]?.mainChannel
      } / var(--Link-underlineOpacity, 0.72))`,
      ...(ownerState.variant
        ? {
            paddingInline: '0.25em', // better than left, right because it also works with writing mode.
            ...(!ownerState.nested && {
              marginInline: '-0.25em',
            }),
          }
        : {
            color: `rgba(${theme.vars.palette[ownerState.color!]?.mainChannel} / 1)`,
            cursor: 'pointer',
            [`&.${linkClasses.disabled}`]: {
              pointerEvents: 'none',
              color: `rgba(${theme.vars.palette[ownerState.color!]?.mainChannel} / 0.6)`,
            },
          }),
      userSelect: 'none',
      MozAppearance: 'none', // Reset
      WebkitAppearance: 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
      ...(ownerState.overlay
        ? {
            position: 'initial',
            '&::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: `var(--internal-action-radius, inherit)`,
              margin: `var(--internal-action-margin)`,
            },
            [`${theme.focus.selector}`]: {
              '&::after': theme.focus.default,
            },
          }
        : {
            position: 'relative',
            [theme.focus.selector]: theme.focus.default,
          }),
    },
    ownerState.variant && {
      ...theme.variants[ownerState.variant]?.[ownerState.color!],
      '&:hover': theme.variants[`${ownerState.variant}Hover`]?.[ownerState.color!],
      '&:active': theme.variants[`${ownerState.variant}Active`]?.[ownerState.color!],
      [`&.${linkClasses.disabled}`]:
        theme.variants[`${ownerState.variant}Disabled`]?.[ownerState.color!],
    },
  ];
});

const Link = React.forwardRef(function Link(inProps, ref) {
  const {
    color = 'primary',
    textColor,
    ...themeProps
  } = useThemeProps<typeof inProps & LinkProps>({
    props: inProps,
    name: 'JoyLink',
  });

  const nested = React.useContext(TypographyContext);

  const props = extendSxProp({ ...themeProps, color: textColor }) as LinkProps;

  const {
    component = 'a',
    componentsProps = {},
    children,
    disabled = false,
    onBlur,
    onFocus,
    level: levelProp = 'body1',
    overlay = false,
    underline = 'hover',
    variant,
    endDecorator,
    startDecorator,
    ...other
  } = props;

  const level = nested ? inProps.level || 'inherit' : levelProp;

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState<boolean>(false);
  const handleRef = useForkRef(ref, focusVisibleRef) as React.Ref<HTMLAnchorElement>;
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
    overlay,
    nested,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: LinkRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRef,
      as: component,
      onBlur: handleBlur,
      onFocus: handleFocus,
    },
    ownerState,
    className: classes.root,
  });

  const startDecoratorProps = useSlotProps({
    elementType: StartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: EndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    className: classes.endDecorator,
  });

  return (
    <LinkRoot {...rootProps}>
      {startDecorator && <StartDecorator {...startDecoratorProps}>{startDecorator}</StartDecorator>}

      {children}
      {endDecorator && <EndDecorator {...endDecoratorProps}>{endDecorator}</EndDecorator>}
    </LinkRoot>
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
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the component.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['body1', 'body2', 'body3', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit']),
    PropTypes.string,
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
   * If `true`, the ::after psuedo element is added to cover the area of interaction.
   * The parent of the overlay Link should have `relative` CSS position.
   * @default false
   */
  overlay: PropTypes.bool,
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The system color.
   */
  textColor: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * Controls when the link should have an underline.
   * @default 'hover'
   */
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme link styles.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Link;
