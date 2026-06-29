'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { PaperProps } from '../Paper';
import { ListProps } from '../List';
import { resolveSlotProps, SlotProps } from './menuPreviewUtils';

type ExternalSlotProps<Props> = Omit<Partial<Props>, 'className' | 'render' | 'style'> & {
  className?: string | undefined;
  render?: never | undefined;
  style?: React.CSSProperties | undefined;
} & Record<string, any>;

function mergeSx(...sx: Array<SxProps<Theme> | undefined>) {
  return sx.flatMap((style) => (Array.isArray(style) ? style : [style])).filter(Boolean);
}

function setDefinedProp(props: Record<string, any>, key: string, value: unknown) {
  if (value !== undefined) {
    props[key] = value;
  }
}

function omitProps<Props extends Record<string, any> | undefined>(
  props: Props,
  keys: readonly string[],
): Props {
  if (props == null) {
    return props;
  }

  const result = { ...props };
  keys.forEach((key) => {
    delete result[key];
  });

  return result as Props;
}

function getSlotProps<ElementType extends React.ElementType, Props extends Record<string, any>>(
  Slot: ElementType,
  props: Props,
  hostOmittedProps: readonly string[],
) {
  return isHostComponent(Slot) ? omitProps(props, hostOmittedProps) : props;
}

const portalHostOmittedProps = ['container', 'keepMounted'] as const;
const positionerHostOmittedProps = [
  'align',
  'alignOffset',
  'anchor',
  'arrowPadding',
  'collisionAvoidance',
  'collisionBoundary',
  'collisionPadding',
  'disableAnchorTracking',
  'positionMethod',
  'render',
  'side',
  'sideOffset',
  'sticky',
] as const;
const paperHostOmittedProps = [
  'classes',
  'component',
  'elevation',
  'square',
  'sx',
  'variant',
] as const;
const listHostOmittedProps = [
  'classes',
  'component',
  'dense',
  'disablePadding',
  'subheader',
  'sx',
] as const;

export interface MenuPreviewPopupSharedSlots {
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

export interface MenuPreviewPopupSharedSlotProps<OwnerState> {
  portal?: SlotProps<ExternalSlotProps<BaseMenu.Portal.Props>, OwnerState> | undefined;
  positioner?: SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props>, OwnerState> | undefined;
  popup?: SlotProps<ExternalSlotProps<BaseMenu.Popup.Props>, OwnerState> | undefined;
  paper?: SlotProps<ExternalSlotProps<PaperProps>, OwnerState> | undefined;
  list?: SlotProps<ExternalSlotProps<ListProps>, OwnerState> | undefined;
}

type MenuPreviewPositionerProps = BaseMenu.Positioner.Props;
type MenuPreviewPortalProps = BaseMenu.Portal.Props;

export type MenuPreviewPopupState = BaseMenu.Popup.State;
export type MenuPreviewPopupSide = NonNullable<MenuPreviewPositionerProps['side']>;
export type MenuPreviewPopupAlign = NonNullable<MenuPreviewPositionerProps['align']>;
export type MenuPreviewPopupOffset = NonNullable<MenuPreviewPositionerProps['sideOffset']>;
export type MenuPreviewPopupAnchor = MenuPreviewPositionerProps['anchor'];
export type MenuPreviewPopupPositionMethod = MenuPreviewPositionerProps['positionMethod'];
export type MenuPreviewPopupCollisionBoundary = MenuPreviewPositionerProps['collisionBoundary'];
export type MenuPreviewPopupCollisionPadding = MenuPreviewPositionerProps['collisionPadding'];
export type MenuPreviewPopupCollisionAvoidance = MenuPreviewPositionerProps['collisionAvoidance'];
export type MenuPreviewPopupContainer = MenuPreviewPortalProps['container'];
export type MenuPreviewPopupFinalFocus = BaseMenu.Popup.Props['finalFocus'];

export interface MenuPreviewPopupPublicProps {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the Base UI popup element.
   */
  className?: string | undefined;
  /**
   * Styles applied to the Base UI popup element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor?: MenuPreviewPopupAnchor | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: MenuPreviewPopupPositionMethod | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: MenuPreviewPopupSide | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset?: MenuPreviewPopupOffset | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: MenuPreviewPopupAlign | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset?: MenuPreviewPopupOffset | undefined;
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary?: MenuPreviewPopupCollisionBoundary | undefined;
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding?: MenuPreviewPopupCollisionPadding | undefined;
  /**
   * Minimum distance to maintain between the arrow and the edges of the popup.
   * @default 5
   */
  arrowPadding?: MenuPreviewPositionerProps['arrowPadding'] | undefined;
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky?: MenuPreviewPositionerProps['sticky'] | undefined;
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking?: MenuPreviewPositionerProps['disableAnchorTracking'] | undefined;
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance?: MenuPreviewPopupCollisionAvoidance | undefined;
  /**
   * The container element to portal the popup into.
   */
  container?: MenuPreviewPopupContainer | undefined;
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted?: MenuPreviewPortalProps['keepMounted'] | undefined;
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus?: MenuPreviewPopupFinalFocus | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: number | undefined;
}

export interface MenuPreviewPopupSharedProps<OwnerState>
  extends
    Omit<BaseMenu.Popup.Props, 'children' | 'className' | 'render' | 'style' | 'finalFocus'>,
    MenuPreviewPopupPublicProps {
  classes?: Partial<Record<'root' | 'paper' | 'list', string>> | undefined;
  ownerState: OwnerState;
  slots?: MenuPreviewPopupSharedSlots | undefined;
  slotProps?: MenuPreviewPopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    popup: React.ElementType;
    paper: React.ElementType;
    list: React.ElementType;
  };
  defaultPositionerProps?: Partial<BaseMenu.Positioner.Props> | undefined;
  sx?: SxProps<Theme> | undefined;
}

export const MenuPreviewPopupBase = React.forwardRef(function MenuPreviewPopupBase<OwnerState>(
  props: MenuPreviewPopupSharedProps<OwnerState>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    className,
    classes,
    ownerState,
    slots,
    slotProps,
    defaultSlots,
    defaultPositionerProps,
    sx,
    container,
    keepMounted,
    anchor,
    positionMethod,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    arrowPadding,
    sticky,
    disableAnchorTracking,
    collisionAvoidance,
    id,
    finalFocus,
    elevation,
    style,
    ...other
  } = props;

  const PortalSlot = slots?.portal ?? BaseMenu.Portal;
  const PositionerSlot = slots?.positioner ?? BaseMenu.Positioner;
  const PopupSlot = slots?.popup ?? defaultSlots.popup;
  const PaperSlot = slots?.paper ?? defaultSlots.paper;
  const ListSlot = slots?.list ?? defaultSlots.list;

  const resolvedPortalProps = resolveSlotProps(slotProps?.portal, ownerState);
  const resolvedPositionerProps = resolveSlotProps(slotProps?.positioner, ownerState);
  const resolvedPopupProps = resolveSlotProps(slotProps?.popup, ownerState);
  const resolvedPaperProps = resolveSlotProps(slotProps?.paper, ownerState);
  const resolvedListProps = resolveSlotProps(slotProps?.list, ownerState);
  const { className: resolvedPopupClassName, ...resolvedPopupOtherProps } =
    resolvedPopupProps ?? {};
  const positionerProps = {
    ...defaultPositionerProps,
  };

  setDefinedProp(positionerProps, 'anchor', anchor);
  setDefinedProp(positionerProps, 'positionMethod', positionMethod);
  setDefinedProp(positionerProps, 'side', side);
  setDefinedProp(positionerProps, 'sideOffset', sideOffset);
  setDefinedProp(positionerProps, 'align', align);
  setDefinedProp(positionerProps, 'alignOffset', alignOffset);
  setDefinedProp(positionerProps, 'collisionBoundary', collisionBoundary);
  setDefinedProp(positionerProps, 'collisionPadding', collisionPadding);
  setDefinedProp(positionerProps, 'arrowPadding', arrowPadding);
  setDefinedProp(positionerProps, 'sticky', sticky);
  setDefinedProp(positionerProps, 'disableAnchorTracking', disableAnchorTracking);
  setDefinedProp(positionerProps, 'collisionAvoidance', collisionAvoidance);

  const popupClassName = clsx(classes?.root, className, resolvedPopupClassName);
  const popupRender = <PopupSlot {...appendOwnerState(PopupSlot, {}, ownerState)} />;
  const portalSlotProps = getSlotProps(
    PortalSlot,
    {
      container,
      keepMounted,
      ...resolvedPortalProps,
    },
    portalHostOmittedProps,
  );
  const positionerSlotProps = getSlotProps(
    PositionerSlot,
    {
      ...positionerProps,
      ...resolvedPositionerProps,
    },
    positionerHostOmittedProps,
  );
  const paperSlotProps = getSlotProps(
    PaperSlot,
    {
      elevation: elevation ?? 8,
      ...resolvedPaperProps,
      className: clsx(classes?.paper, resolvedPaperProps?.className),
      sx: mergeSx(sx, resolvedPaperProps?.sx),
    },
    paperHostOmittedProps,
  );
  const listSlotProps = getSlotProps(
    ListSlot,
    {
      component: 'div',
      disablePadding: false,
      ...resolvedListProps,
      className: clsx(classes?.list, resolvedListProps?.className),
    },
    listHostOmittedProps,
  );

  return (
    <PortalSlot {...portalSlotProps}>
      <PositionerSlot {...positionerSlotProps}>
        <BaseMenu.Popup
          id={id}
          finalFocus={finalFocus}
          style={style}
          {...other}
          {...resolvedPopupOtherProps}
          ref={ref}
          render={popupRender}
          className={popupClassName}
        >
          <PaperSlot {...paperSlotProps}>
            <ListSlot {...listSlotProps}>{children}</ListSlot>
          </PaperSlot>
        </BaseMenu.Popup>
      </PositionerSlot>
    </PortalSlot>
  );
}) as <OwnerState>(
  props: MenuPreviewPopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
