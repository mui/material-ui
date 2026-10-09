'use client';
import * as React from 'react';
import composeClasses from '@mui/utils/composeClasses';
import { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { Theme } from '../styles';
import {
  Menu2PopupBase,
  Menu2PopupPublicProps,
  Menu2PopupSharedProps,
  Menu2PopupSharedSlotProps,
} from './menu2PopupShared';
import {
  Menu2ListBase,
  Menu2PaperBase,
  Menu2PositionerBase,
  Menu2RootBase,
} from './Menu2PopupSlotBases';
import { getMenu2UtilityClass, Menu2Classes } from './menu2Classes';
import type { Menu2Props } from './Menu2';

export interface Menu2PopupProps extends Omit<
  Menu2PopupSharedProps<Menu2PopupOwnerState>,
  | 'classes'
  | 'defaultPositionerProps'
  | 'defaultSlots'
  | 'ownerState'
  | 'onClosingChange'
  | keyof Menu2PopupPublicProps
> {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the root element, which contains the menu and its backdrops.
   */
  className?: Menu2PopupPublicProps['className'] | undefined;
  /**
   * Inline styles applied to the root element, which contains the menu and its backdrops.
   */
  style?: Menu2PopupPublicProps['style'] | undefined;
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor?: Menu2PopupPublicProps['anchor'] | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: Menu2PopupPublicProps['positionMethod'] | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: Menu2PopupPublicProps['side'] | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset?: Menu2PopupPublicProps['sideOffset'] | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: Menu2PopupPublicProps['align'] | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset?: Menu2PopupPublicProps['alignOffset'] | undefined;
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary?: Menu2PopupPublicProps['collisionBoundary'] | undefined;
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding?: Menu2PopupPublicProps['collisionPadding'] | undefined;
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky?: Menu2PopupPublicProps['sticky'] | undefined;
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking?: Menu2PopupPublicProps['disableAnchorTracking'] | undefined;
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance?: Menu2PopupPublicProps['collisionAvoidance'] | undefined;
  /**
   * The container element to portal the popup into.
   */
  container?: Menu2PopupPublicProps['container'] | undefined;
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted?: Menu2PopupPublicProps['keepMounted'] | undefined;
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus?: Menu2PopupPublicProps['finalFocus'] | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: Menu2PopupPublicProps['elevation'] | undefined;
  /**
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
   * @default 'auto'
   */
  transitionDuration?: Menu2PopupPublicProps['transitionDuration'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2Classes> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the root element. Use `slotProps.paper.sx` for the menu surface.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2PopupSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2PopupSlots | undefined;
}

export interface Menu2PopupOwnerState extends Menu2Props {}

interface Menu2PopupInternalProps extends Menu2PopupProps {
  ownerState: Menu2PopupOwnerState;
}

export interface Menu2PopupSlots {
  /**
   * The component used for the root element, which contains the menu and its backdrops.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component used to position the menu surface.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the optional backdrop beneath the menu.
   * Providing this slot or `slotProps.backdrop` renders it.
   * Set to `null` to omit it, including when configured in the theme.
   */
  backdrop?: React.ElementType | null | undefined;
  /**
   * The component used for the menu surface. The popup renders as this element.
   * @default Paper
   */
  paper?: React.ElementType | undefined;
  /**
   * The transition applied to the popup element. Set to null to use CSS animations instead.
   * @default Grow
   */
  transition?: React.JSXElementConstructor<any> | null | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

export interface Menu2PopupSlotProps extends Menu2PopupSharedSlotProps<Menu2PopupOwnerState> {}

const useUtilityClasses = (ownerState: Menu2PopupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    positioner: ['positioner'],
    paper: ['paper'],
    backdrop: ['backdrop'],
    list: ['list'],
  };

  return composeClasses(slots, getMenu2UtilityClass, classes);
};

const Menu2PopupRoot = styled(Menu2RootBase, {
  name: 'MuiMenu2',
  slot: 'root',
})({});

const Menu2PopupPositioner = styled(Menu2PositionerBase, {
  name: 'MuiMenu2',
  slot: 'positioner',
})({});

const Menu2PopupPaper = styled(Menu2PaperBase, {
  name: 'MuiMenu2',
  slot: 'paper',
})({});

const Menu2PopupBackdrop = styled('div', {
  name: 'MuiMenu2',
  slot: 'backdrop',
})({
  position: 'fixed',
  inset: 0,
  // The root controls page stacking. The positioner sits above this layer.
  zIndex: 0,
  // Transparent and click-through. Base UI handles modal interaction and
  // outside dismissal independently of this optional visual layer.
  backgroundColor: 'transparent',
  pointerEvents: 'none',
  WebkitTapHighlightColor: 'transparent',
}) as any;

const Menu2PopupList = styled(Menu2ListBase, {
  name: 'MuiMenu2',
  slot: 'list',
})({});

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2Popup = React.forwardRef(function Menu2Popup(
  inProps: Menu2PopupInternalProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  // Keep the collapsed component's resolved props for styling, without
  // forwarding its behavior props to the popup DOM.
  const { ownerState: ownerStateProp, ...props } = inProps;

  const ownerState: Menu2PopupOwnerState = {
    side: 'bottom',
    align: 'start',
    ...ownerStateProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <Menu2PopupBase
      ref={ref}
      {...props}
      ownerState={ownerState}
      classes={classes}
      defaultSlots={{
        root: Menu2PopupRoot,
        positioner: Menu2PopupPositioner,
        paper: Menu2PopupPaper,
        list: Menu2PopupList,
        backdrop: Menu2PopupBackdrop,
      }}
      defaultPositionerProps={{
        side: 'bottom',
        align: 'start',
      }}
    />
  );
});

export default Menu2Popup;
