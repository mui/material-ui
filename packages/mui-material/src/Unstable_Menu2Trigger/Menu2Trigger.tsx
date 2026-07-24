'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { SxProps } from '@mui/system';
import Button, { ButtonProps } from '../Button';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import {
  getMenu2RootRender,
  isMenu2RootNativeButton,
  Menu2RootSlotProps,
  resolveSlotProps,
} from '../Unstable_Menu2/menu2Utils';
import { getMenu2TriggerUtilityClass, Menu2TriggerClasses } from '../Unstable_Menu2/menu2Classes';

export interface Menu2TriggerSlots {
  /**
   * The component that renders the root.
   * @default Button
   */
  root?: React.ElementType | undefined;
}

export interface Menu2TriggerProps
  extends
    Omit<
      BaseMenu.Trigger.Props,
      'className' | 'handle' | 'nativeButton' | 'payload' | 'render' | 'style'
    >,
    Omit<
      ButtonProps,
      keyof BaseMenu.Trigger.Props | 'classes' | 'component' | 'disabled' | 'href' | 'style'
    > {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2TriggerClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether the component is rendered as a native button.
   *
   * By default, this is inferred from the root slot and `component` prop.
   */
  nativeButton?: boolean | undefined;
  /**
   * How long to wait before the menu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay?: number | undefined;
  /**
   * How long to wait before closing the menu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay?: number | undefined;
  /**
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover?: boolean | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2TriggerSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2TriggerSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

interface Menu2TriggerOwnerState extends Menu2TriggerProps {
  disabled: boolean;
}

export interface Menu2TriggerSlotProps extends Menu2RootSlotProps<Menu2TriggerOwnerState> {}

const useUtilityClasses = (ownerState: Menu2TriggerOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    disabled: ['disabled'],
    open: ['open'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenu2TriggerUtilityClass, classes),
  };
};

const Menu2TriggerRoot = styled(Button, {
  name: 'MuiMenu2Trigger',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({}) as any;

const BaseMenuTrigger = BaseMenu.Trigger as any;
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2Trigger = React.forwardRef(function Menu2Trigger(
  inProps: Menu2TriggerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Trigger',
  });

  const { href: ignoredHref, ...propsWithoutHref } = props as Menu2TriggerProps & {
    href?: unknown;
  };
  void ignoredHref;

  const {
    className,
    classes: classesProp,
    component,
    disabled = false,
    nativeButton: nativeButtonProp,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = propsWithoutHref;
  const ownerState = {
    ...propsWithoutHref,
    classes: classesProp,
    disabled,
  };
  const classes = useUtilityClasses(ownerState);
  const RootSlot = slots?.root ?? Menu2TriggerRoot;

  return (
    <BaseMenuTrigger
      ref={ref}
      disabled={disabled}
      render={getMenu2RootRender(RootSlot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        component,
        ownerState,
        sx,
      })}
      className={(state: BaseMenu.Trigger.State) =>
        clsx(
          className,
          classes.root,
          state.open && classes.open,
          state.disabled && classes.disabled,
        )
      }
      nativeButton={nativeButtonProp ?? isMenu2RootNativeButton(RootSlot, component, true)}
      style={style}
      {...other}
    />
  );
}) as ((props: Menu2TriggerProps & React.RefAttributes<HTMLElement>) => React.JSX.Element) & {
  propTypes?: any;
};

Menu2Trigger.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the element.
   */
  className: PropTypes.string,
  /**
   * How long to wait before closing the menu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
  /**
   * The component used for the root node.
   */
  component: PropTypes.elementType,
  /**
   * How long to wait before the menu may be opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Whether the component is rendered as a native button.
   *
   * By default, this is inferred from the root slot and `component` prop.
   */
  nativeButton: PropTypes.bool,
  /**
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * Styles applied to the root element.
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Menu2Trigger;
