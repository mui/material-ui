'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { SxProps } from '@mui/system';
import Divider from '../Divider';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { mergeStateClassName } from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewSeparatorUtilityClass,
  MenuPreviewSeparatorClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewSeparatorProps extends Omit<BaseSeparator.Props, 'className'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewSeparatorClasses> | undefined;
  /**
   * CSS class applied to the element, or a function that returns a class based on the component's state.
   */
  className?: BaseSeparator.Props['className'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewSeparatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuPreviewSeparatorUtilityClass, classes);
};

const MenuPreviewSeparatorRoot = styled(Divider, {
  name: 'MuiMenuPreviewSeparator',
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
 * - [MenuPreviewSeparator API](https://mui.com/material-ui/api/menu-preview-separator/)
 */
const MenuPreviewSeparator = React.forwardRef(function MenuPreviewSeparator(
  inProps: MenuPreviewSeparatorProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewSeparator',
  });

  const {
    className,
    classes: classesProp,
    orientation = 'horizontal',
    render,
    sx,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
    orientation,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      render={
        render ?? (
          <MenuPreviewSeparatorRoot
            component="div"
            orientation={orientation}
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

MenuPreviewSeparator.propTypes /* remove-proptypes */ = {
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
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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

export default MenuPreviewSeparator;
