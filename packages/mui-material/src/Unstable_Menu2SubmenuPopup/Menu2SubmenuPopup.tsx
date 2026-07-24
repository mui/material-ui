'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import { SxProps } from '@mui/system';
import Paper from '../Paper';
import List from '../List';
import { styled } from '../zero-styled';
import { Theme } from '../styles';
import { useDefaultProps } from '../DefaultPropsProvider';
import {
  Menu2PopupBase,
  Menu2PopupPublicProps,
  Menu2PopupSharedProps,
  Menu2PopupSharedSlotProps,
} from '../Unstable_Menu2/menu2PopupShared';
import { menu2PopupListStyles, menu2PopupPaperStyles } from '../Unstable_Menu2/menu2SharedStyles';
import {
  getMenu2SubmenuPopupUtilityClass,
  Menu2SubmenuPopupClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2SubmenuPopupProps extends Omit<
  Menu2PopupSharedProps<Menu2SubmenuPopupOwnerState>,
  'classes' | 'defaultPositionerProps' | 'defaultSlots' | 'ownerState' | keyof Menu2PopupPublicProps
> {
  /**
   * The submenu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the Base UI popup element.
   */
  className?: Menu2PopupPublicProps['className'] | undefined;
  /**
   * Styles applied to the Base UI popup element.
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
   * Minimum distance to maintain between the arrow and the edges of the popup.
   * @default 5
   */
  arrowPadding?: Menu2PopupPublicProps['arrowPadding'] | undefined;
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
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2SubmenuPopupClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
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

export interface Menu2SubmenuPopupOwnerState extends Menu2SubmenuPopupProps {}

export interface Menu2SubmenuPopupSlots {
  /**
   * The component used for the portal.
   * @default BaseMenu.Portal
   */
  portal?: React.ElementType | undefined;
  /**
   * The component used for the positioner.
   * @default BaseMenu.Positioner
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component rendered by the Base UI popup.
   * @default 'div'
   */
  popup?: React.ElementType | undefined;
  /**
   * The component used for the Material surface.
   * @default Paper
   */
  paper?: React.ElementType | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

export interface Menu2SubmenuPopupSlotProps extends Menu2PopupSharedSlotProps<Menu2SubmenuPopupOwnerState> {}

const useUtilityClasses = (ownerState: Menu2SubmenuPopupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenu2SubmenuPopupUtilityClass, classes);
};

const Menu2SubmenuPopupRoot = styled('div', {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  outline: 0,
});

const Menu2SubmenuPopupPaper = styled(Paper, {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(menu2PopupPaperStyles);

const Menu2SubmenuPopupList = styled(List, {
  name: 'MuiMenu2SubmenuPopup',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list,
})(menu2PopupListStyles);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu2SubmenuPopup API](https://mui.com/material-ui/api/menu-preview-submenu-popup/)
 */
const Menu2SubmenuPopup = React.forwardRef(function Menu2SubmenuPopup(
  inProps: Menu2SubmenuPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2SubmenuPopup',
  });

  const ownerState: Menu2SubmenuPopupOwnerState = {
    side: 'inline-end',
    align: 'start',
    ...props,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <Menu2PopupBase
      ref={ref}
      {...props}
      ownerState={ownerState}
      classes={classes}
      defaultSlots={{
        popup: Menu2SubmenuPopupRoot,
        paper: Menu2SubmenuPopupPaper,
        list: Menu2SubmenuPopupList,
      }}
      defaultPositionerProps={{
        side: 'inline-end',
        align: 'start',
      }}
    />
  );
});

Menu2SubmenuPopup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the submenu trigger.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * Minimum distance to maintain between the arrow and the edges of the popup.
   * @default 5
   */
  arrowPadding: PropTypes.number,
  /**
   * The submenu items.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the Base UI popup element.
   */
  className: PropTypes.string,
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance: PropTypes.oneOfType([
    PropTypes.shape({
      align: PropTypes.oneOf(['flip', 'none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['flip', 'none']),
    }),
    PropTypes.shape({
      align: PropTypes.oneOf(['none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['none', 'shift']),
    }),
  ]),
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['clipping-ancestors']),
    HTMLElementType,
    PropTypes.arrayOf(HTMLElementType),
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ]),
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }),
  ]),
  /**
   * The container element to portal the popup into.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking: PropTypes.bool,
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation: PropTypes.number,
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: HTMLElementType,
    }),
    PropTypes.bool,
  ]),
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'inline-end'
   */
  side: PropTypes.oneOf(['bottom', 'inline-end', 'inline-start', 'left', 'right', 'top']),
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popup: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    portal: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    positioner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    popup: PropTypes.elementType,
    portal: PropTypes.elementType,
    positioner: PropTypes.elementType,
  }),
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * Styles applied to the Base UI popup element.
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

export default Menu2SubmenuPopup;
