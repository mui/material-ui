'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import {
  getMenuPreviewRootRender,
  MenuPreviewRootSlotProps,
  MenuPreviewRootSlots,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewRadioGroupUtilityClass,
  MenuPreviewRadioGroupClasses,
} from '../MenuPreview/menuPreviewClasses';

interface MenuPreviewRadioGroupOwnerState extends MenuPreviewRadioGroupProps {}

export interface MenuPreviewRadioGroupSlots extends MenuPreviewRootSlots {}

export interface MenuPreviewRadioGroupSlotProps extends MenuPreviewRootSlotProps<MenuPreviewRadioGroupOwnerState> {}

export interface MenuPreviewRadioGroupProps extends Omit<
  BaseMenu.RadioGroup.Props,
  'className' | 'onChange' | 'onValueChange' | 'render' | 'style'
> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewRadioGroupClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The controlled value of the radio item that should be currently selected.
   */
  value?: any;
  /**
   * The uncontrolled value of the radio item that should be initially selected.
   */
  defaultValue?: any;
  /**
   * Function called when the selected value changes.
   */
  onChange?:
    | ((event: Event, value: any, eventDetails: BaseMenu.RadioGroup.ChangeEventDetails) => void)
    | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: MenuPreviewRadioGroupSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewRadioGroupSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewRadioGroupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    disabled: ['disabled'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenuPreviewRadioGroupUtilityClass, classes),
  };
};

const MenuPreviewRadioGroupRoot = styled('div', {
  name: 'MuiMenuPreviewRadioGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({}) as any;

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewRadioGroup API](https://mui.com/material-ui/api/menu-preview-radio-group/)
 */
const MenuPreviewRadioGroup = React.forwardRef(function MenuPreviewRadioGroup(
  inProps: MenuPreviewRadioGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewRadioGroup',
  });

  const {
    className,
    classes: classesProp,
    component,
    onChange,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);
  const handleValueChange = React.useCallback(
    (newValue: any, eventDetails: BaseMenu.RadioGroup.ChangeEventDetails) => {
      onChange?.(eventDetails.event, newValue, eventDetails);
    },
    [onChange],
  );

  return (
    <BaseMenu.RadioGroup
      ref={ref}
      render={getMenuPreviewRootRender(slots?.root ?? MenuPreviewRadioGroupRoot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        as: component,
        ownerState,
        sx,
      })}
      className={(state) => clsx(className, classes.root, state.disabled && classes.disabled)}
      onValueChange={handleValueChange}
      style={style}
      {...other}
    />
  );
});

MenuPreviewRadioGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * The component used for the root node.
   */
  component: PropTypes.elementType,
  /**
   * The uncontrolled value of the radio item that should be initially selected.
   */
  defaultValue: PropTypes.any,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Function called when the selected value changes.
   */
  onChange: PropTypes.func,
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
  /**
   * The controlled value of the radio item that should be currently selected.
   */
  value: PropTypes.any,
} as any;

export default MenuPreviewRadioGroup;
