'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useMenuButton } from '@mui/base/useMenuButton';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import {
  type MenuButtonProps,
  type MenuButtonOwnerState,
  type MenuButtonTypeMap,
} from './MenuButtonProps';
import { getMenuButtonUtilityClass } from './menuButtonClasses';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import CircularProgress from '../CircularProgress';
import { getButtonStyles } from '../Button/Button';
import { styled } from '../styles';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';

const useUtilityClasses = (ownerState: MenuButtonOwnerState) => {
  const { color, disabled, fullWidth, size, variant, loading } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      loading && 'loading',
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
    loadingIndicatorCenter: ['loadingIndicatorCenter'],
  };

  return composeClasses(slots, getMenuButtonUtilityClass, {});
};

export const MenuButtonRoot = styled('button', {
  name: 'JoyMenuButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuButtonOwnerState }>(getButtonStyles);

const MenuButtonStartDecorator = styled('span', {
  name: 'JoyMenuButton',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: MenuButtonOwnerState }>({
  '--Icon-margin': '0 0 0 calc(var(--Button-gap) / -2)',
  '--CircularProgress-margin': '0 0 0 calc(var(--Button-gap) / -2)',
  display: 'inherit',
  marginRight: 'var(--Button-gap)',
});

const MenuButtonEndDecorator = styled('span', {
  name: 'JoyMenuButton',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: MenuButtonOwnerState }>({
  '--Icon-margin': '0 calc(var(--Button-gap) / -2) 0 0',
  '--CircularProgress-margin': '0 calc(var(--Button-gap) / -2) 0 0',
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
});

const MenuButtonLoadingCenter = styled('span', {
  name: 'JoyMenuButton',
  slot: 'LoadingCenter',
  overridesResolver: (props, styles) => styles.loadingIndicatorCenter,
})<{ ownerState: MenuButtonOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
  ...(ownerState.disabled && {
    color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
  }),
}));

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/joy-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/joy-ui/api/menu-button/)
 */
const MenuButton = React.forwardRef(function MenuButton(
  inProps: MenuButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>,
) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyMenuButton',
  });

  const {
    children,
    color = 'neutral',
    component,
    disabled: disabledProp = false,
    endDecorator,
    loading = false,
    loadingPosition = 'center',
    loadingIndicator: loadingIndicatorProp,
    size: sizeProp = 'md',
    slotProps = {},
    slots = {},
    startDecorator,
    variant: variantProp = 'outlined',
    ...other
  } = props;
  const buttonGroup = React.useContext(ButtonGroupContext);

  const variant = inProps.variant || buttonGroup.variant || variantProp;
  const size = inProps.size || buttonGroup.size || sizeProp;
  const disabled = inProps.disabled ?? (buttonGroup.disabled || disabledProp || loading);

  const { getRootProps, open, active } = useMenuButton({ rootRef: forwardedRef, disabled });

  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress color={color} thickness={{ sm: 2, md: 3, lg: 4 }[size] || 3} />
  );

  const ownerState: MenuButtonOwnerState = {
    ...props,
    active,
    color,
    disabled,
    open,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    elementType: MenuButtonRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ref: forwardedRef,
    ownerState,
    className: classes.root,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: MenuButtonStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: MenuButtonEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotLoadingIndicatorCenter, loadingIndicatorCenterProps] = useSlot(
    'loadingIndicatorCenter',
    {
      className: classes.loadingIndicatorCenter,
      elementType: MenuButtonLoadingCenter,
      externalForwardedProps,
      ownerState,
    },
  );

  return (
    <SlotRoot {...rootProps}>
      {(startDecorator || (loading && loadingPosition === 'start')) && (
        <SlotStartDecorator {...startDecoratorProps}>
          {loading && loadingPosition === 'start' ? loadingIndicator : startDecorator}
        </SlotStartDecorator>
      )}

      {children}
      {loading && loadingPosition === 'center' && (
        <SlotLoadingIndicatorCenter {...loadingIndicatorCenterProps}>
          {loadingIndicator}
        </SlotLoadingIndicatorCenter>
      )}

      {(endDecorator || (loading && loadingPosition === 'end')) && (
        <SlotEndDecorator {...endDecoratorProps}>
          {loading && loadingPosition === 'end' ? loadingIndicator : endDecorator}
        </SlotEndDecorator>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<MenuButtonTypeMap>;

MenuButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
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
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loadingIndicatorCenter: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endDecorator: PropTypes.elementType,
    loadingIndicatorCenter: PropTypes.elementType,
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
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.shape({
      '__@iterator@86359': PropTypes.func.isRequired,
      '__@unscopables@86607': PropTypes.shape({
        '__@iterator@86359': PropTypes.bool,
        '__@unscopables@86607': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      '--LinearProgress-circulation': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-percent': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressMaxWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressMinWidth': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-progressRadius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-progressThickness': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      '--LinearProgress-radius': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      '--LinearProgress-thickness': PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default MenuButton;
