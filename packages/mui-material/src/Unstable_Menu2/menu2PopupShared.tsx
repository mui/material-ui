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
import { resolveSlotProps, SlotProps } from './menu2Utils';

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

export interface Menu2PopupSharedSlots {
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

export interface Menu2PopupSharedSlotProps<OwnerState> {
  portal?: SlotProps<ExternalSlotProps<BaseMenu.Portal.Props>, OwnerState> | undefined;
  positioner?: SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props>, OwnerState> | undefined;
  popup?: SlotProps<ExternalSlotProps<BaseMenu.Popup.Props>, OwnerState> | undefined;
  paper?: SlotProps<ExternalSlotProps<PaperProps>, OwnerState> | undefined;
  list?: SlotProps<ExternalSlotProps<ListProps>, OwnerState> | undefined;
}

type Menu2PositionerProps = BaseMenu.Positioner.Props;
type Menu2PortalProps = BaseMenu.Portal.Props;

export type Menu2PopupState = BaseMenu.Popup.State;
export type Menu2PopupSide = NonNullable<Menu2PositionerProps['side']>;
export type Menu2PopupAlign = NonNullable<Menu2PositionerProps['align']>;
export type Menu2PopupOffset = NonNullable<Menu2PositionerProps['sideOffset']>;
export type Menu2PopupAnchor = Menu2PositionerProps['anchor'];
export type Menu2PopupPositionMethod = Menu2PositionerProps['positionMethod'];
export type Menu2PopupCollisionBoundary = Menu2PositionerProps['collisionBoundary'];
export type Menu2PopupCollisionPadding = Menu2PositionerProps['collisionPadding'];
export type Menu2PopupCollisionAvoidance = Menu2PositionerProps['collisionAvoidance'];
export type Menu2PopupContainer = Menu2PortalProps['container'];
export type Menu2PopupFinalFocus = BaseMenu.Popup.Props['finalFocus'];

export interface Menu2PopupPublicProps {
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
  anchor?: Menu2PopupAnchor | undefined;
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod?: Menu2PopupPositionMethod | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: Menu2PopupSide | undefined;
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset?: Menu2PopupOffset | undefined;
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align?: Menu2PopupAlign | undefined;
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset?: Menu2PopupOffset | undefined;
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary?: Menu2PopupCollisionBoundary | undefined;
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding?: Menu2PopupCollisionPadding | undefined;
  /**
   * Minimum distance to maintain between the arrow and the edges of the popup.
   * @default 5
   */
  arrowPadding?: Menu2PositionerProps['arrowPadding'] | undefined;
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky?: Menu2PositionerProps['sticky'] | undefined;
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking?: Menu2PositionerProps['disableAnchorTracking'] | undefined;
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance?: Menu2PopupCollisionAvoidance | undefined;
  /**
   * The container element to portal the popup into.
   */
  container?: Menu2PopupContainer | undefined;
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted?: Menu2PortalProps['keepMounted'] | undefined;
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus?: Menu2PopupFinalFocus | undefined;
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation?: number | undefined;
}

export interface Menu2PopupSharedProps<OwnerState>
  extends
    Omit<BaseMenu.Popup.Props, 'children' | 'className' | 'render' | 'style' | 'finalFocus'>,
    Menu2PopupPublicProps {
  classes?: Partial<Record<'root' | 'paper' | 'list', string>> | undefined;
  ownerState: OwnerState;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    popup: React.ElementType;
    paper: React.ElementType;
    list: React.ElementType;
  };
  defaultPositionerProps?: Partial<BaseMenu.Positioner.Props> | undefined;
  sx?: SxProps<Theme> | undefined;
}

export const Menu2PopupBase = React.forwardRef(function Menu2PopupBase<OwnerState>(
  props: Menu2PopupSharedProps<OwnerState>,
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
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
