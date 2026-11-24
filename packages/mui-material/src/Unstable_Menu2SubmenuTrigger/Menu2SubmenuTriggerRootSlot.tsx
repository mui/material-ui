'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useRtl } from '@mui/system/RtlProvider';
import type { HTMLProps } from '@base-ui/react/types';
import { Menu2ItemBaseRoot, menu2ItemOverridesResolver } from '../internal/Menu2ItemBase';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import type { Theme } from '../styles';
import { Menu2ItemRootSlot } from '../Unstable_Menu2/menu2ItemShared';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import {
  Menu2ItemEndAdornment,
  Menu2ItemStartAdornment,
} from '../Unstable_Menu2/Menu2ItemAdornment';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerOwnerState,
  Menu2SubmenuTriggerState,
} from './Menu2SubmenuTrigger';

function menu2SubmenuTriggerStyles(theme: Theme, selector: string) {
  // Keyboard focus takes precedence over the open tint. With a focus ring,
  // the tint stays because it shows the open state, not focus.
  // Keep the focus guard at zero specificity so state style overrides can win.
  const notFocused = theme.focusVisible ? '' : `:where(:not(.${buttonBaseClasses.focusVisible}))`;

  return {
    [`&${selector}${notFocused}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
  };
}

// Put the open tint before the common item overrides, as with the other defaults.
const Menu2SubmenuTriggerBase = styled(Menu2ItemBaseRoot, {
  name: 'MuiMenu2Item',
  slot: 'root',
  overridesResolver: menu2ItemOverridesResolver,
})<{ ownerState: Menu2SubmenuTriggerOwnerState }>(
  memoTheme(({ theme }) => ({
    ...menu2SubmenuTriggerStyles(theme, `.${menu2SubmenuTriggerClasses.open}`),
    ...menu2SubmenuTriggerStyles(theme, '[data-mui-internal-retain-open-tint]'),
  })),
);

const Menu2SubmenuTriggerRoot = styled(Menu2SubmenuTriggerBase, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'root',
  overridesResolver: menu2ItemOverridesResolver,
})({});

export const Menu2SubmenuTriggerStartAdornment = styled(Menu2ItemStartAdornment, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'startAdornment',
})({});

export const Menu2SubmenuTriggerEndAdornment = styled(Menu2ItemEndAdornment, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'endAdornment',
})({});

const Menu2SubmenuTriggerIndicator = styled('span', {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'indicator',
})({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginLeft: 'auto',
  paddingLeft: 8,
  // The end adornment takes the free space, so the chevron follows it.
  // `*:where()` keeps (0,1,0) so indicator overrides win; a leading `:` would nest.
  [`*:where(.${menu2SubmenuTriggerClasses.endAdornment}) + &`]: {
    marginLeft: 0,
  },
});

/**
 * @ignore - internal component.
 */
function Menu2SubmenuTriggerRootSlot(
  props: Pick<
    Menu2SubmenuTriggerProps,
    | 'disableRipple'
    | 'endAdornment'
    | 'nativeButton'
    | 'render'
    | 'slotProps'
    | 'slots'
    | 'startAdornment'
    | 'sx'
  > & {
    baseProps: HTMLProps & { 'data-mui-internal-retain-open-tint'?: string | undefined };
    ownerState: Menu2SubmenuTriggerOwnerState & Pick<Menu2SubmenuTriggerProps, 'classes'>;
    renderState: Menu2SubmenuTriggerState;
  },
) {
  const { ownerState, render: renderProp, renderState, slotProps, slots, ...other } = props;
  const isRtl = useRtl();
  const [IndicatorSlot, indicatorProps] = useSlot('indicator', {
    elementType: Menu2SubmenuTriggerIndicator,
    externalForwardedProps: {
      slots: { indicator: slots?.indicator ?? undefined },
      slotProps,
    },
    ownerState,
    className: clsx(menu2SubmenuTriggerClasses.indicator, ownerState.classes?.indicator),
    additionalProps: {
      'aria-hidden': true,
      children: isRtl ? (
        <KeyboardArrowLeft fontSize="small" />
      ) : (
        <KeyboardArrowRight fontSize="small" />
      ),
    },
  });

  return (
    <Menu2ItemRootSlot
      {...other}
      slots={slots}
      slotProps={slotProps}
      ownerState={ownerState}
      elementType={Menu2SubmenuTriggerRoot}
      component={renderProp ? Menu2RenderRoot : undefined}
      internalRender={renderProp}
      internalRenderState={renderState}
      endIndicator={slots?.indicator === null ? null : <IndicatorSlot {...indicatorProps} />}
    />
  );
}

export default Menu2SubmenuTriggerRootSlot;
