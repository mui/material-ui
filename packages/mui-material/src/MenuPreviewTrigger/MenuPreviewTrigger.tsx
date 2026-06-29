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
  getMenuPreviewRootRender,
  isMenuPreviewRootNativeButton,
  MenuPreviewRootSlotProps,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewTriggerUtilityClass,
  MenuPreviewTriggerClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewTriggerSlots {
  /**
   * The component that renders the root.
   * @default Button
   */
  root?: React.ElementType | undefined;
}

export interface MenuPreviewTriggerProps
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
  classes?: Partial<MenuPreviewTriggerClasses> | undefined;
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
  slots?: MenuPreviewTriggerSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewTriggerSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

interface MenuPreviewTriggerOwnerState extends MenuPreviewTriggerProps {
  disabled: boolean;
}

export interface MenuPreviewTriggerSlotProps extends MenuPreviewRootSlotProps<MenuPreviewTriggerOwnerState> {}

const useUtilityClasses = (ownerState: MenuPreviewTriggerOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    disabled: ['disabled'],
    open: ['open'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenuPreviewTriggerUtilityClass, classes),
  };
};

const MenuPreviewTriggerRoot = styled(Button, {
  name: 'MuiMenuPreviewTrigger',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({}) as any;

const BaseMenuTrigger = BaseMenu.Trigger as any;
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewTrigger API](https://mui.com/material-ui/api/menu-preview-trigger/)
 */
const MenuPreviewTrigger = React.forwardRef(function MenuPreviewTrigger(
  inProps: MenuPreviewTriggerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewTrigger',
  });

  const { href: ignoredHref, ...propsWithoutHref } = props as MenuPreviewTriggerProps & {
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
  const RootSlot = slots?.root ?? MenuPreviewTriggerRoot;

  return (
    <BaseMenuTrigger
      ref={ref}
      disabled={disabled}
      render={getMenuPreviewRootRender(RootSlot, ownerState, {
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
      nativeButton={nativeButtonProp ?? isMenuPreviewRootNativeButton(RootSlot, component, true)}
      style={style}
      {...other}
    />
  );
}) as ((props: MenuPreviewTriggerProps & React.RefAttributes<HTMLElement>) => React.JSX.Element) & {
  propTypes?: any;
};

MenuPreviewTrigger.propTypes /* remove-proptypes */ = {
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

export default MenuPreviewTrigger;
