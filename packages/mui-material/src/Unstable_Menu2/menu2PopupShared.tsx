'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import useSlotProps from '@mui/utils/useSlotProps';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import { SxProps } from '@mui/system';
import mergeSlotProps from '../utils/mergeSlotProps';
import { Theme } from '../styles';
import Grow, { GrowProps } from '../Grow';
import { PaperProps } from '../Paper';
import { ListProps } from '../List';
import { SlotProps } from './menu2Utils';
import { Menu2SubmenuClosingState } from './Menu2SubmenuClosingContext';

type ExternalSlotProps<Props> = Omit<Partial<Props>, 'className' | 'render' | 'style'> & {
  className?: string | undefined;
  render?: never | undefined;
  style?: React.CSSProperties | undefined;
} & Record<string, any>;

// React event handler props are the `on` + capital letter keys.
const isEventHandlerKey = (key: string) => /^on[A-Z]/.test(key);

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

const sxHostOmittedProps = ['sx'] as const;
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
   * The transition applied to the popup element. Set to null to use CSS animations instead.
   * @default Grow
   */
  transition?: React.JSXElementConstructor<any> | null | undefined;
  /**
   * The component used for the root element, which wraps the menu in the portal.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component used for the backdrop rendered beneath the menu.
   * Only rendered by menus that provide a backdrop; it is transparent and
   * click-through by default, matching the classic Menu's invisible backdrop.
   */
  backdrop?: React.ElementType | undefined;
  /**
   * The component used for the positioner.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the menu surface. The popup renders as this element.
   * @default Paper
   */
  paper?: React.ElementType | undefined;
  /**
   * The component used for the presentational list wrapper.
   * @default List
   */
  list?: React.ElementType | undefined;
}

type WithSx = { sx?: SxProps<Theme> | undefined };

export interface Menu2PopupSharedSlotProps<OwnerState> {
  /**
   * Props for the transition component. Use onOpenChangeComplete for completion.
   * Base UI owns the open state and mounting lifecycle.
   */
  transition?:
    | SlotProps<
        Omit<
          Partial<GrowProps>,
          'children' | 'in' | 'appear' | 'mountOnEnter' | 'unmountOnExit' | 'onEntered' | 'onExited'
        >,
        OwnerState
      >
    | undefined;
  root?: SlotProps<ExternalSlotProps<BaseMenu.Portal.Props> & WithSx, OwnerState> | undefined;
  backdrop?: SlotProps<ExternalSlotProps<BaseMenu.Backdrop.Props>, OwnerState> | undefined;
  positioner?:
    SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props> & WithSx, OwnerState> | undefined;
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
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
   * @default 'auto'
   */
  transitionDuration?: GrowProps['timeout'] | undefined;
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
  classes?:
    Partial<Record<'root' | 'backdrop' | 'positioner' | 'paper' | 'list', string>> | undefined;
  ownerState: OwnerState;
  onClosingChange?: ((closing: boolean) => void) | undefined;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    root: React.ElementType;
    positioner: React.ElementType;
    paper: React.ElementType;
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
    onClosingChange,
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
    finalFocus,
    elevation,
    transitionDuration = 'auto',
    style,
    ...other
  } = props;

  // The portal and positioner are context providers, not just elements: the
  // positioner needs the portal's context and the popup needs the positioner's.
  // Swapping either for a plain element breaks the tree, so the Base parts are
  // always rendered and a slot only changes what they render, through `render`.
  const RootSlot = slots?.root ?? defaultSlots.root;
  const TransitionSlot = slots?.transition === undefined ? Grow : slots.transition;
  const transitionProps = resolveComponentProps(slotProps?.transition, ownerState);
  const transitionTimeout =
    transitionDuration === 'auto' &&
    !(TransitionSlot as (React.ElementType & { muiSupportAuto?: boolean | undefined }) | null)
      ?.muiSupportAuto
      ? undefined
      : transitionDuration;
  // Opt-in: rendering a backdrop unconditionally would hand non-modal menus a
  // full-screen layer, and modal menus already get Base UI's inert backdrop.
  const BackdropSlot = slots?.backdrop ?? (slotProps?.backdrop ? defaultSlots.backdrop : undefined);
  const PositionerSlot = slots?.positioner ?? defaultSlots.positioner;
  const PaperSlot = slots?.paper ?? defaultSlots.paper;
  const ListSlot = slots?.list ?? defaultSlots.list;

  const resolvedRootProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const resolvedBackdropProps = resolveComponentProps(slotProps?.backdrop, ownerState);
  const resolvedPositionerProps = resolveComponentProps(slotProps?.positioner, ownerState);
  const resolvedPaperProps = resolveComponentProps(slotProps?.paper, ownerState);
  const resolvedListProps = resolveComponentProps(slotProps?.list, ownerState);
  // Base UI merges className, style, and ref into the element that `render`
  // gives a part, so those go through the part. `sx` and the Paper props go on
  // the element. HTML attributes go to the root, the same as the classic Menu.
  // Base UI renders the portal element and the menu content as React siblings,
  // so a React handler on the root never sees the menu's events. Handlers
  // attach to the popup instead, where the events originate.
  const rootAttributes: Record<string, any> = {};
  const popupHandlers: Record<string, any> = {};
  Object.keys(other).forEach((key) => {
    (isEventHandlerKey(key) ? popupHandlers : rootAttributes)[key] = (other as any)[key];
  });
  const {
    className: rootSlotClassName,
    ref: rootSlotRef,
    style: rootSlotStyle,
    sx: rootSlotSx,
    ...rootSlotOtherProps
  } = resolvedRootProps ?? {};
  const {
    className: positionerSlotClassName,
    ref: positionerSlotRef,
    sx: positionerSlotSx,
    ...positionerSlotOtherProps
  } = resolvedPositionerProps ?? {};
  const {
    className: paperSlotClassName,
    ref: paperSlotRef,
    sx: paperSlotSx,
    ...paperSlotOtherProps
  } = resolvedPaperProps ?? {};
  const handleRootRef = useForkRef(ref, rootSlotRef);
  const rootStyle =
    style === undefined && rootSlotStyle === undefined ? undefined : { ...style, ...rootSlotStyle };
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

  const rootRender = (
    <RootSlot
      {...getSlotProps(
        RootSlot,
        appendOwnerState(RootSlot, { sx: rootSlotSx }, ownerState),
        sxHostOmittedProps,
      )}
    />
  );
  const positionerRender = (
    <PositionerSlot
      {...getSlotProps(
        PositionerSlot,
        appendOwnerState(PositionerSlot, { sx: positionerSlotSx }, ownerState),
        sxHostOmittedProps,
      )}
    />
  );
  const paperProps = getSlotProps(
    PaperSlot,
    appendOwnerState(
      PaperSlot,
      { elevation: elevation ?? 8, ...paperSlotOtherProps, sx: paperSlotSx },
      ownerState,
    ),
    paperHostOmittedProps,
  );
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
    <BaseMenu.Portal
      container={container}
      keepMounted={keepMounted}
      {...rootAttributes}
      {...rootSlotOtherProps}
      ref={handleRootRef}
      render={rootRender}
      className={clsx(classes?.root, className, rootSlotClassName)}
      style={rootStyle}
    >
      {BackdropSlot ? (
        <BackdropSlot
          {...appendOwnerState(BackdropSlot, {}, ownerState)}
          {...resolvedBackdropProps}
          className={clsx(classes?.backdrop, resolvedBackdropProps?.className)}
        />
      ) : null}
      <BaseMenu.Positioner
        {...positionerProps}
        {...positionerSlotOtherProps}
        ref={positionerSlotRef}
        render={positionerRender}
        className={clsx(classes?.positioner, positionerSlotClassName)}
      >
        <BaseMenu.Popup
          finalFocus={finalFocus}
          {...popupHandlers}
          ref={paperSlotRef}
          render={(renderProps, state) => {
            // Let Base UI apply its initial transition:none before Grow starts.
            // The opening popup must remain focusable while Grow is still exited.
            const paper = <PaperSlot {...mergeProps(renderProps, paperProps)} />;
            const surface = TransitionSlot ? (
              <TransitionSlot
                timeout={transitionTimeout}
                {...transitionProps}
                appear={false}
                in={state.open && state.transitionStatus !== 'starting'}
                mountOnEnter={false}
                unmountOnExit={false}
                style={{
                  ...transitionProps?.style,
                  ...(state.open && { visibility: 'visible' }),
                }}
              >
                {paper}
              </TransitionSlot>
            ) : (
              paper
            );
            return onClosingChange ? (
              <Menu2SubmenuClosingState
                closing={!state.open && state.transitionStatus === 'ending'}
                onClosingChange={onClosingChange}
              >
                {surface}
              </Menu2SubmenuClosingState>
            ) : (
              surface
            );
          }}
          className={clsx(classes?.paper, paperSlotClassName)}
        >
          <ListSlot {...listSlotProps}>{children}</ListSlot>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}) as <OwnerState>(
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
