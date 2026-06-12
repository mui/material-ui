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
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewRadioGroupUtilityClass,
  MenuPreviewRadioGroupClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewRadioGroupProps extends Omit<BaseMenu.RadioGroup.Props, 'className'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewRadioGroupClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.RadioGroup.Props['className'];
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
  onValueChange?: BaseMenu.RadioGroup.Props['onValueChange'];
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

const useUtilityClasses = (ownerState: MenuPreviewRadioGroupProps) => {
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

  const { className, classes: classesProp, render, sx, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenu.RadioGroup
      ref={ref}
      render={render ?? <MenuPreviewRadioGroupRoot ownerState={ownerState} sx={sx} />}
      className={mergeStateClassName(className, (state) =>
        clsx(classes.root, state.disabled && classes.disabled),
      )}
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
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
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
  onValueChange: PropTypes.func,
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
  /**
   * The controlled value of the radio item that should be currently selected.
   */
  value: PropTypes.any,
} as any;

export default MenuPreviewRadioGroup;
