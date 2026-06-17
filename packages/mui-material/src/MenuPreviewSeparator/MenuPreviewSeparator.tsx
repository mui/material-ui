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
import {
  getMenuPreviewRootRender,
  MenuPreviewRootSlotProps,
  MenuPreviewRootSlots,
  resolveSlotProps,
} from '../MenuPreview/menuPreviewUtils';
import {
  getMenuPreviewSeparatorUtilityClass,
  MenuPreviewSeparatorClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewSeparatorSlots extends MenuPreviewRootSlots {}

export interface MenuPreviewSeparatorSlotProps extends MenuPreviewRootSlotProps<MenuPreviewSeparatorProps> {}

export interface MenuPreviewSeparatorProps extends Omit<
  BaseSeparator.Props,
  'className' | 'render' | 'style'
> {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewSeparatorClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: MenuPreviewSeparatorSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewSeparatorSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
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
    component,
    orientation = 'horizontal',
    slotProps,
    slots,
    sx,
    style,
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
      render={getMenuPreviewRootRender(slots?.root ?? MenuPreviewSeparatorRoot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        component: component ?? 'div',
        orientation,
        ownerState,
        sx,
      })}
      className={clsx(className, classes.root)}
      style={style}
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
   * CSS class applied to the element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   */
  component: PropTypes.elementType,
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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

export default MenuPreviewSeparator;
