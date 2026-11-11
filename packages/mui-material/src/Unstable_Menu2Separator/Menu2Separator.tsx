'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useForkRef from '@mui/utils/useForkRef';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { SxProps } from '@mui/system';
import Divider from '../Divider';
import type { DividerOwnProps } from '../Divider';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Menu2RootSlot from '../internal/Menu2RootSlot';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import type { Menu2SeparatorClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2SeparatorUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2SeparatorOwnerState extends BaseSeparator.State {}

export interface Menu2SeparatorSlots {
  /**
   * The component that renders the root.
   * Replaces the default styled root and takes precedence over `render`.
   * @default Menu2SeparatorRoot
   */
  root?: React.ElementType | undefined;
}

export interface Menu2SeparatorSlotProps {
  root?: Menu2RootSlotProps<Menu2SeparatorOwnerState>['root'] | undefined;
}

export interface Menu2SeparatorProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Pick<DividerOwnProps, 'absolute' | 'children' | 'flexItem' | 'textAlign' | 'variant'>,
    Pick<BaseSeparator.Props, 'orientation'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2SeparatorClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and separator semantics.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2SeparatorOwnerState>
    | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SeparatorSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2SeparatorSlots | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: Menu2SeparatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenu2SeparatorUtilityClass, classes);
};

const Menu2SeparatorRoot = styled(Divider, {
  name: 'MuiMenu2Separator',
  slot: 'root',
})<{
  component: React.ElementType;
  ownerState: Menu2SeparatorProps & Menu2SeparatorOwnerState;
}>(
  // Own the classic item/divider spacing instead of relying on the legacy
  // `[item] + divider` adjacency rule: Base UI mounts inline focus-guard
  // nodes next to an open submenu trigger, which breaks that selector and
  // collapses the gap.
  memoTheme(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  })),
);

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Separator API](https://next.mui.com/material-ui/api/menu-2-separator/)
 */
const Menu2Separator = React.forwardRef(function Menu2Separator(
  inProps: Menu2SeparatorProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Separator',
  });

  const {
    absolute,
    className,
    classes: classesProp,
    flexItem,
    orientation = 'horizontal',
    render: renderProp,
    slots,
    slotProps,
    sx,
    style,
    textAlign,
    variant,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
    orientation,
  };
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef(ref);

  return (
    <BaseSeparator
      ref={handleRef}
      data-mui-menu-separator=""
      orientation={orientation}
      render={(renderProps, state) => (
        <Menu2RootSlot<Menu2SeparatorOwnerState>
          baseProps={renderProps}
          elementType={Menu2SeparatorRoot}
          ownerState={ownerState}
          internalForwardedProps={{
            component: 'div',
            absolute,
            flexItem,
            orientation,
            textAlign,
            variant,
          }}
          render={renderProp}
          renderState={state}
          shouldForwardComponentProp
          slots={slots}
          slotProps={slotProps}
          sx={sx}
        />
      )}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
    />
  );
});

Menu2Separator.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
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
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and separator semantics.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
} as any;

export default Menu2Separator;
