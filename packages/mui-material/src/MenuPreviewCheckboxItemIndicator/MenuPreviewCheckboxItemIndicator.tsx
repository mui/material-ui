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
import { menuPreviewIndicatorStyles } from '../MenuPreview/menuPreviewSharedStyles';
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewCheckboxItemIndicatorUtilityClass,
  MenuPreviewCheckboxItemIndicatorClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewCheckboxItemIndicatorProps extends Omit<
  BaseMenu.CheckboxItemIndicator.Props,
  'className'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewCheckboxItemIndicatorClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.CheckboxItemIndicator.Props['className'];
  /**
   * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
   * @default false
   */
  keepMounted?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewCheckboxItemIndicatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    checked: ['checked'],
    disabled: ['disabled'],
    highlighted: ['highlighted'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenuPreviewCheckboxItemIndicatorUtilityClass, classes),
  };
};

const MenuPreviewCheckboxItemIndicatorRoot = styled('span', {
  name: 'MuiMenuPreviewCheckboxItemIndicator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(menuPreviewIndicatorStyles) as any;

function DefaultCheckboxIndicatorIcon() {
  return (
    <svg
      aria-hidden="true"
      data-mui-menu-preview-indicator-icon=""
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2z" />
      <path
        data-mui-menu-preview-checkbox-checkmark=""
        data-mui-menu-preview-indicator-mark=""
        d="m10 17-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  );
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewCheckboxItemIndicator API](https://mui.com/material-ui/api/menu-preview-checkbox-item-indicator/)
 */
const MenuPreviewCheckboxItemIndicator = React.forwardRef(function MenuPreviewCheckboxItemIndicator(
  inProps: MenuPreviewCheckboxItemIndicatorProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewCheckboxItemIndicator',
  });

  const { children, className, classes: classesProp, render, sx, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      render={render ?? <MenuPreviewCheckboxItemIndicatorRoot ownerState={ownerState} sx={sx} />}
      className={mergeStateClassName(className, (state) =>
        clsx(
          classes.root,
          state.checked && classes.checked,
          state.disabled && classes.disabled,
          state.highlighted && classes.highlighted,
        ),
      )}
      {...other}
    >
      {children ?? <DefaultCheckboxIndicatorIcon />}
    </BaseMenu.CheckboxItemIndicator>
  );
});

MenuPreviewCheckboxItemIndicator.propTypes /* remove-proptypes */ = {
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
   * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
   * @default false
   */
  keepMounted: PropTypes.bool,
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

export default MenuPreviewCheckboxItemIndicator;
