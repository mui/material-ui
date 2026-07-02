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
  MenuPreviewPopupBase,
  MenuPreviewPopupPublicProps,
  MenuPreviewPopupSharedProps,
  MenuPreviewPopupSharedSlotProps,
} from '../MenuPreview/menuPreviewPopupShared';
import {
  menuPreviewPopupListStyles,
  menuPreviewPopupPaperStyles,
} from '../MenuPreview/menuPreviewSharedStyles';
import {
  getMenuPreviewPopupUtilityClass,
  MenuPreviewPopupClasses,
} from '../MenuPreview/menuPreviewClasses';

export interface MenuPreviewPopupProps extends Omit<
  MenuPreviewPopupSharedProps<MenuPreviewPopupOwnerState>,
  | 'classes'
  | 'defaultPositionerProps'
  | 'defaultSlots'
  | 'ownerState'
  | keyof MenuPreviewPopupPublicProps
> {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the Base UI popup element.
   */
  className?: MenuPreviewPopupPublicProps['className'] | undefined;
  /**
   * Styles applied to the Base UI popup element.
   */
  style?: MenuPreviewPopupPublicProps['style'] | undefined;
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor?: MenuPreviewPopupPublicProps['anchor'] | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: MenuPreviewPopupPublicProps['positionMethod'] | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: MenuPreviewPopupPublicProps['side'] | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset?: MenuPreviewPopupPublicProps['sideOffset'] | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: MenuPreviewPopupPublicProps['align'] | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset?: MenuPreviewPopupPublicProps['alignOffset'] | undefined;
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary?: MenuPreviewPopupPublicProps['collisionBoundary'] | undefined;
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding?: MenuPreviewPopupPublicProps['collisionPadding'] | undefined;
  /**
   * Minimum distance to maintain between the arrow and the edges of the popup.
   * @default 5
   */
  arrowPadding?: MenuPreviewPopupPublicProps['arrowPadding'] | undefined;
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky?: MenuPreviewPopupPublicProps['sticky'] | undefined;
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking?: MenuPreviewPopupPublicProps['disableAnchorTracking'] | undefined;
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance?: MenuPreviewPopupPublicProps['collisionAvoidance'] | undefined;
  /**
   * The container element to portal the popup into.
   */
  container?: MenuPreviewPopupPublicProps['container'] | undefined;
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted?: MenuPreviewPopupPublicProps['keepMounted'] | undefined;
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus?: MenuPreviewPopupPublicProps['finalFocus'] | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: MenuPreviewPopupPublicProps['elevation'] | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MenuPreviewPopupClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: MenuPreviewPopupSlotProps | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: MenuPreviewPopupSlots | undefined;
}

export interface MenuPreviewPopupOwnerState extends MenuPreviewPopupProps {}

export interface MenuPreviewPopupSlots {
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

export interface MenuPreviewPopupSlotProps extends MenuPreviewPopupSharedSlotProps<MenuPreviewPopupOwnerState> {}

const useUtilityClasses = (ownerState: MenuPreviewPopupOwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list'],
  };

  return composeClasses(slots, getMenuPreviewPopupUtilityClass, classes);
};

const MenuPreviewPopupRoot = styled('div', {
  name: 'MuiMenuPreviewPopup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  outline: 0,
});

const MenuPreviewPopupPaper = styled(Paper, {
  name: 'MuiMenuPreviewPopup',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper,
})(menuPreviewPopupPaperStyles);

const MenuPreviewPopupList = styled(List, {
  name: 'MuiMenuPreviewPopup',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list,
})(menuPreviewPopupListStyles);

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreviewPopup API](https://mui.com/material-ui/api/menu-preview-popup/)
 */
const MenuPreviewPopup = React.forwardRef(function MenuPreviewPopup(
  inProps: MenuPreviewPopupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuPreviewPopup',
  });

  const ownerState: MenuPreviewPopupOwnerState = {
    side: 'bottom',
    align: 'start',
    ...props,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <MenuPreviewPopupBase
      ref={ref}
      {...props}
      ownerState={ownerState}
      classes={classes}
      defaultSlots={{
        popup: MenuPreviewPopupRoot,
        paper: MenuPreviewPopupPaper,
        list: MenuPreviewPopupList,
      }}
      defaultPositionerProps={{
        side: 'bottom',
        align: 'start',
      }}
    />
  );
});

MenuPreviewPopup.propTypes /* remove-proptypes */ = {
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
   * By default, the popup is positioned against the trigger.
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
   * The menu items.
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
   * @default 'bottom'
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

export default MenuPreviewPopup;
