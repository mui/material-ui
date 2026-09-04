'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import useSlotProps from '@mui/utils/useSlotProps';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { PaperProps } from '../Paper';
import { ListProps } from '../List';
import { SlotProps } from './menu2Utils';

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

const rootHostOmittedProps = [
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
   * The component used for the backdrop rendered beneath the menu.
   * Only rendered by menus that provide a backdrop; it is transparent and
   * click-through by default, matching the classic Menu's invisible backdrop.
   */
  backdrop?: React.ElementType | undefined;
  /**
   * The component used for the positioner.
   * @default BaseMenu.Positioner
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component rendered as the popup. It is the root element and the visible surface.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

export interface Menu2PopupSharedSlotProps<OwnerState> {
  portal?: SlotProps<ExternalSlotProps<BaseMenu.Portal.Props>, OwnerState> | undefined;
  backdrop?: SlotProps<ExternalSlotProps<BaseMenu.Backdrop.Props>, OwnerState> | undefined;
  positioner?: SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props>, OwnerState> | undefined;
  root?: SlotProps<ExternalSlotProps<PaperProps>, OwnerState> | undefined;
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

/**
 * The flattened positioning/portal surface hoisted onto the popup, inherited
 * from the Base UI parts via Pick so new Base UI props flow through types
 * automatically. Only props that Material UI adds, or whose defaults differ
 * from Base UI, are declared locally.
 */
export interface Menu2PopupPublicProps
  extends
    Pick<
      Menu2PositionerProps,
      | 'anchor'
      | 'positionMethod'
      | 'sideOffset'
      | 'alignOffset'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'arrowPadding'
      | 'sticky'
      | 'disableAnchorTracking'
      | 'collisionAvoidance'
    >,
    Pick<Menu2PortalProps, 'container' | 'keepMounted'>,
    Pick<BaseMenu.Popup.Props, 'finalFocus'> {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * CSS class applied to the root element.
   */
  className?: string | undefined;
  /**
   * Inline styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side?: Menu2PopupSide | undefined;
  /**
   * How to align the popup relative to the specified side.
   * Defaults to `start` to match the classic Menu (Base UI defaults to `center`).
   * @default 'start'
   */
  align?: Menu2PopupAlign | undefined;
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
  classes?: Partial<Record<'root' | 'backdrop' | 'list', string>> | undefined;
  ownerState: OwnerState;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    root: React.ElementType;
    list: React.ElementType;
    backdrop?: React.ElementType | undefined;
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

  // The portal and positioner are context providers, not just elements: the
  // positioner needs the portal's context and the popup needs the positioner's.
  // Swapping either for a plain element breaks the tree, so the Base parts are
  // always rendered and a slot only changes what they render, through `render`.
  const PortalSlot = slots?.portal;
  // Opt-in: rendering a backdrop unconditionally would hand non-modal menus a
  // full-screen layer, and modal menus already get Base UI's inert backdrop.
  const BackdropSlot = slots?.backdrop ?? (slotProps?.backdrop ? defaultSlots.backdrop : undefined);
  const PositionerSlot = slots?.positioner;
  const RootSlot = slots?.root ?? defaultSlots.root;
  const ListSlot = slots?.list ?? defaultSlots.list;

  const resolvedPortalProps = resolveComponentProps(slotProps?.portal, ownerState);
  const resolvedBackdropProps = resolveComponentProps(slotProps?.backdrop, ownerState);
  const resolvedPositionerProps = resolveComponentProps(slotProps?.positioner, ownerState);
  const resolvedRootProps = resolveComponentProps(slotProps?.root, ownerState);
  const resolvedListProps = resolveComponentProps(slotProps?.list, ownerState);
  // Base UI merges the popup's className, style, and ref into the element that
  // `render` gives it, so those go through the popup. The rest goes on the
  // element, where the Paper props belong.
  const {
    className: resolvedRootClassName,
    ref: resolvedRootRef,
    style: resolvedRootStyle,
    sx: resolvedRootSx,
    ...resolvedRootOtherProps
  } = resolvedRootProps ?? {};
  const handleRootRef = useForkRef(ref, resolvedRootRef);
  const rootStyle =
    style === undefined && resolvedRootStyle === undefined
      ? undefined
      : { ...style, ...resolvedRootStyle };
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

  const rootClassName = clsx(classes?.root, className, resolvedRootClassName);
  const portalRender = PortalSlot ? (
    <PortalSlot {...appendOwnerState(PortalSlot, {}, ownerState)} />
  ) : undefined;
  const positionerRender = PositionerSlot ? (
    <PositionerSlot {...appendOwnerState(PositionerSlot, {}, ownerState)} />
  ) : undefined;
  const portalSlotProps = {
    container,
    keepMounted,
    ...resolvedPortalProps,
  };
  const positionerSlotProps = {
    ...positionerProps,
    ...resolvedPositionerProps,
  };
  const rootSlotProps = getSlotProps(
    RootSlot,
    appendOwnerState(
      RootSlot,
      {
        elevation: elevation ?? 8,
        ...resolvedRootOtherProps,
        sx: mergeSx(sx, resolvedRootSx),
      },
      ownerState,
    ),
    rootHostOmittedProps,
  );
  const rootRender = <RootSlot {...rootSlotProps} />;
  // The list goes through the shared slot plumbing (className merging, ref
  // forking, host-aware ownerState). Host-prop omission is layered on top.
  const mergedListProps = useSlotProps({
    elementType: ListSlot,
    externalSlotProps: resolvedListProps,
    ownerState,
    additionalProps: { component: 'div', disablePadding: false },
    className: classes?.list,
  });

  const listSlotProps = getSlotProps(ListSlot, mergedListProps, listHostOmittedProps);

  return (
    <BaseMenu.Portal {...portalSlotProps} render={portalRender}>
      {BackdropSlot ? (
        <BackdropSlot
          {...appendOwnerState(BackdropSlot, {}, ownerState)}
          {...resolvedBackdropProps}
          className={clsx(classes?.backdrop, resolvedBackdropProps?.className)}
        />
      ) : null}
      <BaseMenu.Positioner {...positionerSlotProps} render={positionerRender}>
        <BaseMenu.Popup
          id={id}
          finalFocus={finalFocus}
          style={rootStyle}
          {...other}
          ref={handleRootRef}
          render={rootRender}
          className={rootClassName}
        >
          <ListSlot {...listSlotProps}>{children}</ListSlot>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}) as <OwnerState>(
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
