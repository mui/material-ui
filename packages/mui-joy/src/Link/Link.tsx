'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isFocusVisible as isFocusVisible,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import linkClasses, { getLinkUtilityClass } from './linkClasses';
import { LinkProps, LinkOwnerState, LinkTypeMap } from './LinkProps';
import { TypographyNestedContext, TypographyInheritContext } from '../Typography/Typography';

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
})<{ ownerState: LinkOwnerState }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineEnd: 'clamp(4px, var(--Link-gap, 0.375em), 0.75rem)',
  ...(typeof ownerState.startDecorator !== 'string' &&
    (ownerState.alignItems === 'flex-start' ||
      (ownerState.sx as any)?.alignItems === 'flex-start') && {
      marginTop: '2px', // this makes the alignment perfect in most cases
    }),
}));

const EndDecorator = styled('span', {
  name: 'JoyLink',
  slot: 'endDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: LinkOwnerState }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineStart: 'clamp(4px, var(--Link-gap, 0.25em), 0.5rem)', // for end decorator, 0.25em looks better.
  ...(typeof ownerState.startDecorator !== 'string' &&
    (ownerState.alignItems === 'flex-start' ||
      (ownerState.sx as any)?.alignItems === 'flex-start') && {
      marginTop: '2px', // this makes the alignment perfect in most cases
    }),
}));

const LinkRoot = styled('a', {
  name: 'JoyLink',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: LinkOwnerState }>(({ theme, ownerState }) => {
  return [
    {
      '--Icon-fontSize': '1.25em',
      '--Icon-color': 'currentColor',
      '--CircularProgress-size': '1.25em',
      '--CircularProgress-thickness': '3px',
      ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
      ...(ownerState.level === 'inherit' && {
        font: 'inherit',
      }),
      ...(ownerState.underline === 'none' && {
        textDecoration: 'none',
      }),
      ...(ownerState.underline === 'hover' && {
        textDecoration: 'none',
        '&:hover': {
          '@media (hover: hover)': {
            textDecorationLine: 'underline',
          },
        },
      }),
      ...(ownerState.underline === 'always' && {
        textDecoration: 'underline',
      }),
      ...(ownerState.startDecorator && {
        verticalAlign: 'bottom', // to make the link align with the parent's content
      }),
      textDecorationThickness: 'max(0.08em, 1px)', // steal from https://moderncss.dev/modern-css-for-dynamic-component-based-architecture/#css-reset-additions
      textUnderlineOffset: '0.15em', // steal from https://moderncss.dev/modern-css-for-dynamic-component-based-architecture/#css-reset-additions
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
      cursor: 'pointer',
      textDecorationColor: `var(--variant-outlinedBorder, rgba(${
        theme.vars.palette[ownerState.color!]?.mainChannel
      } / var(--Link-underlineOpacity, 0.72)))`,
      ...(ownerState.variant
        ? {
            paddingBlock: 'min(0.1em, 4px)',
            paddingInline: '0.25em', // better than left, right because it also works with writing mode.
            ...(!ownerState.nesting && {
              marginInline: '-0.25em',
            }),
          }
        : {
            color: `var(--variant-plainColor, rgba(${
              theme.vars.palette[ownerState.color!]?.mainChannel
            } / 1))`,
            [`&.${linkClasses.disabled}`]: {
              pointerEvents: 'none',
              color: `var(--variant-plainDisabledColor, rgba(${
                theme.vars.palette[ownerState.color!]?.mainChannel
              } / 0.6))`,
            },
          }),
      userSelect: ownerState.component === 'button' ? 'none' : undefined,
      MozAppearance: 'none', // Reset
      WebkitAppearance: 'none', // Reset
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
      },
      ...(ownerState.overlay
        ? ({
            position: 'initial',
            '&::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: `var(--unstable_actionRadius, inherit)`,
              margin: `var(--unstable_actionMargin)`,
            },
            [`${theme.focus.selector}`]: {
              '&::after': theme.focus.default,
            },
          } as const)
        : ({
            position: 'relative',
            [theme.focus.selector]: theme.focus.default,
          } as const)),
    } as const,
    ownerState.variant && {
      ...theme.variants[ownerState.variant]?.[ownerState.color!],
      '&:hover': {
        '@media (hover: hover)': theme.variants[`${ownerState.variant}Hover`]?.[ownerState.color!],
      },
      '&:active': theme.variants[`${ownerState.variant}Active`]?.[ownerState.color!],
      [`&.${linkClasses.disabled}`]:
        theme.variants[`${ownerState.variant}Disabled`]?.[ownerState.color!],
    },
  ];
});
/**
 *
 * Demos:
 *
 * - [Link](https://mui.com/joy-ui/react-link/)
 *
 * API:
 *
 * - [Link API](https://mui.com/joy-ui/api/link/)
 */
const Link = React.forwardRef(function Link(inProps, ref) {
  const {
    color = 'primary',
    textColor,
    variant,
    ...themeProps
  } = useThemeProps<typeof inProps & LinkProps>({
    props: inProps,
    name: 'JoyLink',
  });

  const nesting = React.useContext(TypographyNestedContext);
  const inheriting = React.useContext(TypographyInheritContext);

  const props = extendSxProp({ ...themeProps, color: textColor }) as LinkProps;

  const {
    children,
    disabled = false,
    onBlur,
    onFocus,
    level: levelProp = 'body-md',
    overlay = false,
    underline = 'hover',
    endDecorator,
    startDecorator,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const level = nesting || inheriting ? inProps.level || 'inherit' : levelProp;

  const [focusVisible, setFocusVisible] = React.useState<boolean>(false);
  const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const ownerState = {
    ...props,
    color,
    disabled,
    focusVisible,
    underline,
    variant,
    level,
    overlay,
    nesting,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: {
      onBlur: handleBlur,
      onFocus: handleFocus,
    },
    ref,
    className: classes.root,
    elementType: LinkRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: StartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: EndDecorator,
    externalForwardedProps,
    ownerState,
  });

  return (
    <TypographyNestedContext.Provider value>
      <SlotRoot {...rootProps}>
        {startDecorator && (
          <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
        )}

        {isMuiElement(children, ['Skeleton'])
          ? React.cloneElement(children as React.ReactElement<any>, {
              variant: (children as React.ReactElement<any>).props.variant || 'inline',
            })
          : children}
        {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
      </SlotRoot>
    </TypographyNestedContext.Provider>
  );
}) as OverridableComponent<LinkTypeMap>;

Link.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * Applies the theme typography styles.
   * @default 'body-md'
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
   * If `true`, the ::after pseudo element is added to cover the area of interaction.
   * The parent of the overlay Link should have `relative` CSS position.
   * @default false
   */
  overlay: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endDecorator: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
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
