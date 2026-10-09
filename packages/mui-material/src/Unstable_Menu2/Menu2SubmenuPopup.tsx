'use client';
import * as React from 'react';
import composeClasses from '@mui/utils/composeClasses';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { SxProps } from '@mui/system';
import ListContext from '../List/ListContext';
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
import { getMenu2SubmenuUtilityClass, Menu2SubmenuClasses } from './menu2Classes';
import Menu2SubmenuClosingContext from './Menu2SubmenuClosingContext';
import type { Menu2SubmenuProps } from '../Unstable_Menu2Submenu/Menu2Submenu';

export interface Menu2SubmenuPopupProps extends Omit<
  Menu2PopupSharedProps<Menu2SubmenuPopupOwnerState>,
  | 'classes'
  | 'defaultPositionerProps'
  | 'defaultSlots'
  | 'ownerState'
  | 'onClosingChange'
  | keyof Menu2PopupPublicProps
> {
  /**
   * The submenu items.
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
   * By default, the popup is positioned against the submenu trigger.
   */
  anchor?: Menu2PopupPublicProps['anchor'] | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: Menu2PopupPublicProps['positionMethod'] | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'inline-end'
   */
  side?: Menu2PopupPublicProps['side'] | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default -4
   */
  sideOffset?: Menu2PopupPublicProps['sideOffset'] | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: Menu2PopupPublicProps['align'] | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default -8
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
  classes?: Partial<Menu2SubmenuClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the root element. Use `slotProps.paper.sx` for the menu surface.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SubmenuPopupSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2SubmenuPopupSlots | undefined;
}

export interface Menu2SubmenuPopupOwnerState extends Menu2SubmenuProps {}

interface Menu2SubmenuPopupInternalProps extends Menu2SubmenuPopupProps {
  ownerState: Menu2SubmenuPopupOwnerState;
}

export interface Menu2SubmenuPopupSlots {
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

export interface Menu2SubmenuPopupSlotProps extends Omit<
  Menu2PopupSharedSlotProps<Menu2SubmenuPopupOwnerState>,
  'backdrop'
> {}

const useUtilityClasses = (ownerState: Menu2SubmenuPopupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    positioner: ['positioner'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenu2SubmenuUtilityClass, classes);
};

const Menu2SubmenuPopupRoot = styled(Menu2RootBase, {
  name: 'MuiMenu2Submenu',
  slot: 'root',
})({});

const Menu2SubmenuPopupPositioner = styled(Menu2PositionerBase, {
  name: 'MuiMenu2Submenu',
  slot: 'positioner',
})({});

const Menu2SubmenuPopupPaper = styled(Menu2PaperBase, {
  name: 'MuiMenu2Submenu',
  slot: 'paper',
})({});

const Menu2SubmenuPopupList = styled(Menu2ListBase, {
  name: 'MuiMenu2Submenu',
  slot: 'list',
})({});

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2SubmenuPopup = React.forwardRef(function Menu2SubmenuPopup(
  inProps: Menu2SubmenuPopupInternalProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  // Keep the collapsed component's resolved props for styling, without
  // forwarding its behavior props to the popup DOM.
  const { ownerState: ownerStateProp, ...props } = inProps;
  const { onClosingChange } = React.useContext(Menu2SubmenuClosingContext);
  const parentListContext = React.useContext(ListContext);

  const ownerState: Menu2SubmenuPopupOwnerState = {
    side: 'inline-end',
    align: 'start',
    ...ownerStateProp,
  };
  const classes = useUtilityClasses(ownerState);
  const listProps = resolveComponentProps(props.slotProps?.list, ownerState);

  return (
    <Menu2PopupBase
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        list: {
          ...listProps,
          dense: listProps?.dense ?? parentListContext.dense,
        },
      }}
      ownerState={ownerState}
      onClosingChange={onClosingChange}
      classes={classes}
      defaultSlots={{
        root: Menu2SubmenuPopupRoot,
        positioner: Menu2SubmenuPopupPositioner,
        paper: Menu2SubmenuPopupPaper,
        list: Menu2SubmenuPopupList,
      }}
      defaultPositionerProps={{
        side: 'inline-end',
        align: 'start',
        // A submenu overlaps its parent by a small amount, the way Base UI
        // positions one. `alignOffset` cancels the list's 8px top padding, so
        // the first item lines up with the trigger row.
        sideOffset: -4,
        alignOffset: -8,
      }}
    />
  );
});

export default Menu2SubmenuPopup;
