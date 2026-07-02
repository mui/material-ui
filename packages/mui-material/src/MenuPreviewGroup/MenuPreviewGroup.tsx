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
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewGroupUtilityClass,
  MenuPreviewGroupClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewGroupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export interface MenuPreviewGroupSlotProps extends MenuPreviewRootSlotProps<MenuPreviewGroupProps> {}

export interface MenuPreviewGroupProps extends Omit<
  BaseMenu.Group.Props,
  'className' | 'render' | 'style'
> {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewGroupClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: MenuPreviewGroupSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewGroupSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: MenuPreviewGroupProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuPreviewGroupUtilityClass, classes);
};

const MenuPreviewGroupRoot = styled('div', {
  name: 'MuiMenuPreviewGroup',
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
 * - [MenuPreviewGroup API](https://mui.com/material-ui/api/menu-preview-group/)
 */
const MenuPreviewGroup = React.forwardRef(function MenuPreviewGroup(
  inProps: MenuPreviewGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewGroup',
  });

  const {
    className,
    classes: classesProp,
    component,
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

  return (
    <BaseMenu.Group
      ref={ref}
      render={getMenuPreviewRootRender(slots?.root ?? MenuPreviewGroupRoot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        as: component,
        ownerState,
        sx,
      })}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
    />
  );
});

MenuPreviewGroup.propTypes /* remove-proptypes */ = {
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

export default MenuPreviewGroup;
