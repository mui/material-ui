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
import {
  getMenuPreviewRootRender,
  MenuPreviewRootSlotProps,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewGroupLabelUtilityClass,
  MenuPreviewGroupLabelClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewGroupLabelSlots {
  /**
   * The component that renders the root.
   * @default ListSubheader
   */
  root?: React.ElementType | undefined;
}

export interface MenuPreviewGroupLabelSlotProps extends MenuPreviewRootSlotProps<MenuPreviewGroupLabelProps> {}

export interface MenuPreviewGroupLabelProps extends Omit<
  BaseMenu.GroupLabel.Props,
  'className' | 'render' | 'style'
> {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewGroupLabelClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: MenuPreviewGroupLabelSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewGroupLabelSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
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
    <BaseMenu.GroupLabel
      ref={ref}
      render={getMenuPreviewRootRender(slots?.root ?? MenuPreviewGroupLabelRoot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        component: component ?? 'div',
        disableSticky: true,
        ownerState,
        sx,
      })}
      className={clsx(className, classes.root)}
      style={style}
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

export default MenuPreviewGroupLabel;
