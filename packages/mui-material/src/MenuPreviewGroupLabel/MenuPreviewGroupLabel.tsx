'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { SxProps } from '@mui/system';
import ListSubheader from '../ListSubheader';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewGroupLabelUtilityClass,
  MenuPreviewGroupLabelClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewGroupLabelProps extends Omit<BaseMenu.GroupLabel.Props, 'className'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewGroupLabelClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseMenu.GroupLabel.Props['className'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewGroupLabelProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuPreviewGroupLabelUtilityClass, classes);
};

const MenuPreviewGroupLabelRoot = styled(ListSubheader, {
  name: 'MuiMenuPreviewGroupLabel',
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
 * - [MenuPreviewGroupLabel API](https://mui.com/material-ui/api/menu-preview-group-label/)
 */
const MenuPreviewGroupLabel = React.forwardRef(function MenuPreviewGroupLabel(
  inProps: MenuPreviewGroupLabelProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewGroupLabel',
  });

  const { className, classes: classesProp, render, sx, ...other } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenu.GroupLabel
      ref={ref}
      render={
        render ?? (
          <MenuPreviewGroupLabelRoot
            component="div"
            disableSticky
            ownerState={ownerState}
            sx={sx}
          />
        )
      }
      className={mergeStateClassName(className, () => clsx(classes.root))}
      {...other}
    />
  );
});

MenuPreviewGroupLabel.propTypes /* remove-proptypes */ = {
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

export default MenuPreviewGroupLabel;
