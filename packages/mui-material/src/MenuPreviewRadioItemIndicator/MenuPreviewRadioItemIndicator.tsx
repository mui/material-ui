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
  getMenuPreviewRadioItemIndicatorUtilityClass,
  MenuPreviewRadioItemIndicatorClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewRadioItemIndicatorProps extends Omit<
  BaseMenu.RadioItemIndicator.Props,
  'className'
> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewRadioItemIndicatorClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.RadioItemIndicator.Props['className'];
  /**
   * Whether to keep the HTML element in the DOM when the radio item is inactive.
   * @default false
   */
  keepMounted?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewRadioItemIndicatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    checked: ['checked'],
    disabled: ['disabled'],
    highlighted: ['highlighted'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenuPreviewRadioItemIndicatorUtilityClass, classes),
  };
};

const MenuPreviewRadioItemIndicatorRoot = styled('span', {
  name: 'MuiMenuPreviewRadioItemIndicator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(menuPreviewIndicatorStyles) as any;

function DefaultRadioIndicatorIcon() {
  return (
    <svg
      aria-hidden="true"
      data-mui-menu-preview-indicator-icon=""
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path
        data-mui-menu-preview-indicator-mark=""
        d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
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
 * - [MenuPreviewRadioItemIndicator API](https://mui.com/material-ui/api/menu-preview-radio-item-indicator/)
 */
const MenuPreviewRadioItemIndicator = React.forwardRef(function MenuPreviewRadioItemIndicator(
  inProps: MenuPreviewRadioItemIndicatorProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewRadioItemIndicator',
  });

  const { children, className, classes: classesProp, render, sx, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      render={render ?? <MenuPreviewRadioItemIndicatorRoot ownerState={ownerState} sx={sx} />}
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
      {children ?? <DefaultRadioIndicatorIcon />}
    </BaseMenu.RadioItemIndicator>
  );
});

MenuPreviewRadioItemIndicator.propTypes /* remove-proptypes */ = {
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
   * Whether to keep the HTML element in the DOM when the radio item is inactive.
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

export default MenuPreviewRadioItemIndicator;
