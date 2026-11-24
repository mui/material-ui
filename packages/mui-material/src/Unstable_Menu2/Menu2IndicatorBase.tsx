'use client';
import * as React from 'react';
import clsx from 'clsx';
import { mergeProps } from '@base-ui/react/merge-props';
import type { HTMLProps } from '@base-ui/react/types';
import useForkRef from '@mui/utils/useForkRef';
import type { ListItemIconProps } from '../ListItemIcon';
import ListItemIcon from '../ListItemIcon';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import type { SlotProps } from '../utils/types';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';
import type { Menu2SlotRender } from './menu2Utils';
import { getMenu2RootRender } from './menu2Utils';

interface IndicatorSlotProps<State> {
  /**
   * Whether to keep the indicator mounted when the item is not checked.
   * @default true
   */
  keepMounted?: boolean | undefined;
  /**
   * The element to render, or a function that returns it. The indicator styles stay.
   */
  render?: Menu2SlotRender<State> | undefined;
  component?: never | undefined;
}

export type Menu2IndicatorSlotProps<OwnerState, State> = SlotProps<
  'span',
  IndicatorSlotProps<State>,
  OwnerState
>;

interface Menu2IndicatorRenderRootProps {
  baseProps: HTMLProps;
  state: object;
  slot: React.ElementType;
  ownerState: object;
  slotProps: Record<string, any>;
  render: Menu2SlotRender<any>;
}

function Menu2IndicatorRenderRoot(props: Menu2IndicatorRenderRootProps) {
  const { baseProps, state, slot, ownerState, slotProps, render } = props;
  const ref = useForkRef(baseProps.ref, slotProps.ref);
  return getMenu2RootRender(slot, ownerState, {
    ...mergeProps(baseProps, slotProps),
    ref,
    component: Menu2RenderRoot,
    internalRender: render,
    internalRenderState: state,
  });
}

// Base UI gives the indicator state only to a render function, so `render` goes through one.
export function getMenu2IndicatorRender(
  slot: React.ElementType,
  ownerState: object,
  slotProps: Record<string, any>,
  render: Menu2SlotRender<any> | undefined,
) {
  if (!render) {
    return getMenu2RootRender(slot, ownerState, slotProps);
  }
  return function renderIndicator(baseProps: HTMLProps, state: object) {
    return (
      <Menu2IndicatorRenderRoot
        baseProps={baseProps}
        state={state}
        slot={slot}
        ownerState={ownerState}
        slotProps={slotProps}
        render={render}
      />
    );
  };
}

interface IndicatorProps extends ListItemIconProps {
  component?: React.ElementType | undefined;
}

// Pass the element override through ListItemIcon, not through styled(), so its
// classes and theme styles also apply when the indicator uses another element.
const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(function Indicator(
  { component = 'span', ...props },
  ref,
) {
  const iconProps = { ...props, as: component };
  return <ListItemIcon {...iconProps} ref={ref} />;
});

// Merge the icon classes and default to the small size, as Checkbox and Radio do.
export function getMenu2IndicatorIcon(icon: React.ReactNode, className: string) {
  if (
    !React.isValidElement<{ className?: string | undefined; fontSize?: string | undefined }>(icon)
  ) {
    return icon;
  }
  return React.cloneElement(icon, {
    className: clsx(className, icon.props.className),
    fontSize: icon.props.fontSize ?? 'small',
  });
}

// Each item supplies the theme overrides for its indicator slot.
/**
 * @ignore - internal component.
 */
const Menu2IndicatorBase = styled(Indicator, { slot: 'root' })(
  memoTheme(({ theme }) => ({
    alignItems: 'center',
    // Match the start adornment column, so labels align across item kinds.
    minWidth: 36,
    // Match Checkbox and Radio colors, not the color of a decorative ListItemIcon.
    color: (theme.vars || theme).palette.text.secondary,
    '&[data-checked]': {
      color: (theme.vars || theme).palette.primary.main,
    },
  })),
);

export default Menu2IndicatorBase;
