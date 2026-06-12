'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { SxProps } from '@mui/system';
import Button from '../Button';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewTriggerUtilityClass,
  MenuPreviewTriggerClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewTriggerProps<Payload = unknown> extends Omit<
  BaseMenu.Trigger.Props<Payload>,
  'className'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewTriggerClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.Trigger.Props<Payload>['className'];
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
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
   * A payload to pass to the menu when it is opened.
   */
  payload?: Payload | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

interface MenuPreviewTriggerOwnerState extends MenuPreviewTriggerProps {
  disabled: boolean;
}

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
const MenuPreviewTrigger = React.forwardRef(function MenuPreviewTrigger<Payload = unknown>(
  inProps: MenuPreviewTriggerProps<Payload>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewTrigger',
  });

  const { className, classes: classesProp, disabled = false, render, sx, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
    disabled,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenuTrigger
      ref={ref}
      disabled={disabled}
      render={render ?? <MenuPreviewTriggerRoot ownerState={ownerState} sx={sx} />}
      className={mergeStateClassName(className, (state) =>
        clsx(classes.root, state.open && classes.open, state.disabled && classes.disabled),
      )}
      {...other}
    />
  );
}) as (<Payload = unknown>(
  props: MenuPreviewTriggerProps<Payload> & React.RefAttributes<HTMLElement>,
) => React.JSX.Element) & { propTypes?: any };

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
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * How long to wait before closing the menu that was opened on hover, in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
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
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
  /**
   * A payload to pass to the menu when it is opened.
   */
  payload: PropTypes.any,
  /**
   * Allows you to replace the component's HTML element
   * with a different tag, or compose it with another component.
   *
   * Accepts a `ReactElement` or a function that returns the element to render.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
