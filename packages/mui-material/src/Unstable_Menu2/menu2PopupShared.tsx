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
   * CSS class applied to the Base UI popup element.
   */
  className?: string | undefined;
  /**
   * Styles applied to the Base UI popup element.
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
