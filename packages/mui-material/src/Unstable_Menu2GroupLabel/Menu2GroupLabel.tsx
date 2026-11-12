'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { SxProps } from '@mui/system';
import ListSubheader from '../ListSubheader';
import type { ListSubheaderOwnProps } from '../ListSubheader';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Menu2RootSlot from '../internal/Menu2RootSlot';
import type { Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import type { Menu2GroupLabelClasses } from '../Unstable_Menu2/menu2Classes';
import { getMenu2GroupLabelUtilityClass } from '../Unstable_Menu2/menu2Classes';

export interface Menu2GroupLabelOwnerState extends BaseMenu.GroupLabel.State {}

export interface Menu2GroupLabelSlots {
  /**
   * The component that renders the root.
   * Replaces the default styled root and takes precedence over `render`.
   * @default Menu2GroupLabelRoot
   */
  root?: React.ElementType | undefined;
}

export interface Menu2GroupLabelSlotProps {
  root?: Menu2RootSlotProps<Menu2GroupLabelOwnerState>['root'] | undefined;
}

export interface Menu2GroupLabelProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    Pick<ListSubheaderOwnProps, 'color' | 'disableGutters' | 'inset'> {
  /**
   * The content of the label.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2GroupLabelClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and accessibility.
   * Applies to the default root only. Use `slots.root` to replace the styled root.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, Menu2GroupLabelOwnerState>
    | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2GroupLabelSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2GroupLabelSlots | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: Menu2GroupLabelProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenu2GroupLabelUtilityClass, classes);
};

const Menu2GroupLabelRoot = styled(ListSubheader, {
  name: 'MuiMenu2GroupLabel',
  slot: 'root',
})<{ component?: React.ElementType | undefined; ownerState: Menu2GroupLabelProps }>({});

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2GroupLabel API](https://next.mui.com/material-ui/api/menu-2-group-label/)
 */
const Menu2GroupLabel = React.forwardRef(function Menu2GroupLabel(
  inProps: Menu2GroupLabelProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2GroupLabel',
  });

  const {
    className,
    classes: classesProp,
    color,
    disableGutters,
    inset,
    render: renderProp,
    slots,
    slotProps,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef(ref);
  // Base UI must register the same ID that is rendered on the label.
  const { id: rootId, ...rootSlotProps } = resolveComponentProps(slotProps?.root, ownerState) ?? {};

  return (
    <BaseMenu.GroupLabel
      ref={handleRef}
      render={(renderProps, state) => (
        <Menu2RootSlot<Menu2GroupLabelOwnerState>
          baseProps={renderProps}
          elementType={Menu2GroupLabelRoot}
          ownerState={ownerState}
          internalForwardedProps={{
            component: 'div',
            color,
            disableGutters,
            disableSticky: true,
            inset,
          }}
          render={renderProp}
          renderState={state}
          shouldForwardComponentProp
          slots={slots}
          slotProps={{ root: rootSlotProps }}
          sx={sx}
        />
      )}
      className={clsx(className, classes.root)}
      style={style}
      {...other}
      id={rootId ?? other.id}
    />
  );
});

Menu2GroupLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the label.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary']),
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The element to render, or a function that returns it.
   * Forward the props, ref, and children to preserve Material styles and accessibility.
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
} as any;

export default Menu2GroupLabel;
