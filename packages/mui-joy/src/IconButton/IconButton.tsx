import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/base/ButtonUnstyled';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';
import { IconButtonOwnerState, IconButtonTypeMap, ExtendIconButton } from './IconButtonProps';

const useUtilityClasses = (ownerState: IconButtonOwnerState) => {
  const { color, disabled, focusVisible, focusVisibleClassName, size, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getIconButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

export const IconButtonRoot = styled('button', {
  name: 'JoyIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: IconButtonOwnerState }>(({ theme, ownerState }) => [
  {
    '--Icon-margin': 'initial', // reset the icon's margin.
    '--CircularProgress-size': 'var(--Icon-fontSize)',
    ...(ownerState.size === 'sm' && {
      '--Icon-fontSize': 'calc(var(--IconButton-size, 2rem) / 1.6)', // 1.25rem by default
      minWidth: 'var(--IconButton-size, 2rem)', // use min-width instead of height to make the button resilient to its content
      minHeight: 'var(--IconButton-size, 2rem)', // use min-height instead of height to make the button resilient to its content
      fontSize: theme.vars.fontSize.sm,
      paddingInline: '2px', // add a gap, in case the content is long, e.g. multiple icons
    }),
    ...(ownerState.size === 'md' && {
      '--Icon-fontSize': 'calc(var(--IconButton-size, 2.5rem) / 1.667)', // 1.5rem by default
      minWidth: 'var(--IconButton-size, 2.5rem)',
      minHeight: 'var(--IconButton-size, 2.5rem)',
      fontSize: theme.vars.fontSize.md,
      paddingInline: '0.25rem',
    }),
    ...(ownerState.size === 'lg' && {
      '--Icon-fontSize': 'calc(var(--IconButton-size, 3rem) / 1.714)', // 1.75rem by default
      minWidth: 'var(--IconButton-size, 3rem)',
      minHeight: 'var(--IconButton-size, 3rem)',
      fontSize: theme.vars.fontSize.lg,
      paddingInline: '0.375rem',
    }),
    WebkitTapHighlightColor: 'transparent',
    paddingBlock: 0,
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.md,
    margin: `var(--IconButton-margin)`, // to be controlled by other components, eg. Input
    borderRadius: `var(--IconButton-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, eg. Input
    border: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    [theme.focus.selector]: theme.focus.default,
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
  { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
  {
    [`&.${iconButtonClasses.disabled}`]:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
]);

const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyIconButton',
  });

  const {
    children,
    action,
    component = 'button',
    color = 'primary',
    variant = 'soft',
    size = 'md',
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    size,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: IconButtonRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      as: component,
    },
    className: classes.root,
  });

  return <IconButtonRoot {...rootProps}>{children}</IconButtonRoot>;
}) as ExtendIconButton<IconButtonTypeMap>;

IconButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default IconButton;
