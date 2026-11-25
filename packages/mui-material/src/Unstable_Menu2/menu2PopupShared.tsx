'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import ownerDocument from '@mui/utils/ownerDocument';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import type { SxProps } from '@mui/system';
import { useRtl } from '@mui/system/RtlProvider';
import getActiveElement from '../utils/getActiveElement';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
import type { Theme } from '../styles';
import type { GrowProps } from '../Grow';
import Grow from '../Grow';
import type { PaperProps } from '../Paper';
import type { ListProps } from '../List';
import { manager as modalManager } from '../Modal/useModal';
import type { Menu2SlotRender, SlotProps } from './menu2Utils';
import {
  getMenu2RootRender,
  getMenu2SlotRender,
  isOutsideMenuTree,
  resolveMenu2SlotRender,
} from './menu2Utils';
import { Menu2SubmenuClosingState } from './Menu2SubmenuClosingContext';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';

function Menu2ScrollLock({
  locked,
  popupRef,
}: {
  locked: boolean;
  popupRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEnhancedEffect(() => {
    if (!locked) {
      return undefined;
    }

    // Body is the default Modal container, so a Modal on the page shares this lock.
    return modalManager.lockScroll(ownerDocument(popupRef.current).body);
  }, [locked, popupRef]);

  return null;
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

// Internal layer of a modal menu: above the visual backdrop, below the positioner.
function getModalBlockerStyle(state: BaseMenu.Backdrop.State): React.CSSProperties {
  return {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: state.open ? 'auto' : 'none',
    WebkitTapHighlightColor: 'transparent',
  };
}

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

export const Menu2PopupBase = React.forwardRef(function Menu2PopupBase<OwnerState extends object>(
  props: Menu2PopupSharedProps<OwnerState>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isRtl = useRtl();
  const {
    children,
    className,
    classes,
    ownerState,
    modal = false,
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
    sticky,
    disableAnchorTracking,
    collisionAvoidance,
    finalFocus,
    elevation,
    transitionDuration = 'auto',
    style,
    render: renderProp,
    ...other
  } = props;

  // Keep the Base parts for their context and behavior. The portal styles the
  // portal's shared stacking layer; the positioner controls placement inside it.
  const RootSlot = slots?.root ?? defaultSlots.root;
  const PortalSlot = slots?.portal ?? defaultSlots.portal;
  const PositionerSlot = slots?.positioner ?? defaultSlots.positioner;
  const TransitionSlot = slots?.transition === undefined ? Grow : slots.transition;
  const transitionProps = resolveComponentProps(slotProps?.transition, ownerState);
  const transitionTimeout =
    transitionDuration === 'auto' &&
    !(TransitionSlot as (React.ElementType & { muiSupportAuto?: boolean | undefined }) | null)
      ?.muiSupportAuto
      ? undefined
      : transitionDuration;
  // The visual backdrop renders only when configured; null removes it.
  // It never blocks clicks: a modal menu renders an internal layer for that.
  const BackdropSlot =
    slots?.backdrop === null
      ? null
      : (slots?.backdrop ?? (slotProps?.backdrop ? defaultSlots.backdrop : undefined));
  const resolvedRootProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const { render: portalSlotRender, props: resolvedPortalProps } = resolveMenu2SlotRender(
    slotProps?.portal,
    ownerState,
  );
  const { render: positionerSlotRender, props: resolvedPositionerProps } = resolveMenu2SlotRender(
    slotProps?.positioner,
    ownerState,
  );
  const { render: backdropSlotRender, props: resolvedBackdropProps } = resolveMenu2SlotRender(
    BackdropSlot ? slotProps?.backdrop : undefined,
    ownerState,
  );
  // Base UI merges className, style, and ref into the element that `render`
  // gives a part, so those go through the part. `sx` and the Paper props go on
  // the element. All HTML attributes and handlers target the popup surface.
  // Handlers run before Base UI handles navigation keys and stops propagation.
  // JavaScript callers can still pass `component`; the surface takes `render` instead.
  const {
    className: rootSlotClassName,
    ref: rootSlotRef,
    style: rootSlotStyle,
    sx: rootSlotSx,
    component: ignoredRootSlotComponent,
    ...rootSlotOtherProps
  }: NonNullable<typeof resolvedRootProps> & { component?: unknown } = resolvedRootProps ?? {};
  const {
    className: portalSlotClassName,
    sx: portalSlotSx,
    ...portalSlotOtherProps
  } = resolvedPortalProps;
  const {
    className: positionerSlotClassName,
    sx: positionerSlotSx,
    ...positionerSlotOtherProps
  } = resolvedPositionerProps;
  const {
    sx: backdropSlotSx,
    style: backdropSlotStyle,
    ...backdropSlotOtherProps
  } = resolvedBackdropProps;
  const popupRef = React.useRef<HTMLDivElement>(null);
  const handleRootRef = useForkRef(ref, rootSlotRef, popupRef);
  // Keep focus off the body on an outside press, or a Dialog's FocusTrap takes it before
  // Base UI returns it. Focus leaves the items, so Enter during the exit selects nothing.
  const handleBlockerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    // The portal also holds the submenu portals.
    const portal = event.currentTarget.parentElement;
    // Wait for the close render: a canceled outside press keeps focus on the item.
    queueMicrotask(() => {
      const popup = popupRef.current;
      const active = getActiveElement(ownerDocument(popup));
      if (popup?.hasAttribute('data-closed') && active !== popup && portal?.contains(active)) {
        popup.focus({ preventScroll: true });
      }
    });
  };
  // An explicit target must not take focus that already left the menu tree, for example to a Dialog.
  const popupFinalFocus = React.useMemo<typeof finalFocus>(() => {
    if (finalFocus == null || typeof finalFocus === 'boolean') {
      return finalFocus;
    }
    return (closeType) => {
      const popup = popupRef.current;
      if (isOutsideMenuTree(getActiveElement(ownerDocument(popup)), popup)) {
        return false;
      }
      return typeof finalFocus === 'function' ? finalFocus(closeType) : finalFocus.current;
    };
  }, [finalFocus]);
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
  setDefinedProp(positionerProps, 'sticky', sticky);
  setDefinedProp(positionerProps, 'disableAnchorTracking', disableAnchorTracking);
  setDefinedProp(positionerProps, 'collisionAvoidance', collisionAvoidance);

  // `render` keeps the styled slot. A `slots.<slot>` replacement takes precedence.
  // Base UI reads the portal `id` from the element, so the portal uses the element form
  // and lifts the id of a render element. The portal state is empty, as in Base UI.
  const portalRenderId = React.isValidElement<{ id?: string | undefined }>(portalSlotRender)
    ? portalSlotRender.props.id
    : undefined;
  const portalRender = getMenu2RootRender(PortalSlot, ownerState, {
    sx: portalSlotSx,
    ...(portalSlotRender &&
      !slots?.portal && {
        ...(portalRenderId !== undefined && { id: portalRenderId }),
        as: Menu2RenderRoot,
        internalRender: portalSlotRender,
        internalRenderState: {},
      }),
  });
  const positionerRender = getMenu2SlotRender(
    PositionerSlot,
    ownerState,
    { sx: positionerSlotSx },
    slots?.positioner ? undefined : positionerSlotRender,
  );
  const rootProps = getSlotProps(
    RootSlot,
    appendOwnerState(RootSlot, { sx: rootSlotSx }, ownerState),
    paperHostOmittedProps,
  );
  const popupProps = getSlotProps(
    RootSlot,
    mergeProps({ elevation: elevation ?? 8 }, other, rootSlotOtherProps),
    paperHostOmittedProps,
  );
  // Base UI names the popup from a `render` element, but the Material render function hides it.
  const renderElementLabel =
    !slots?.root && React.isValidElement<HTMLProps>(renderProp)
      ? renderProp.props['aria-label']
      : undefined;
  const { render: listRender, props: resolvedListProps } = resolveMenu2SlotRender(
    slotProps?.list,
    ownerState,
  );
  const renderList = listRender && !slots?.list;
  const [ListSlot, mergedListProps] = useSlot('list', {
    elementType: defaultSlots.list,
    externalForwardedProps: { slots, slotProps: { list: resolvedListProps } },
    ownerState,
    additionalProps: { component: renderList ? Menu2RenderRoot : 'div', disablePadding: false },
    // The list state is empty, as in Base UI's Menu.List.
    internalForwardedProps: renderList
      ? { internalRender: listRender, internalRenderState: {} }
      : undefined,
    className: classes?.list,
    shouldForwardComponentProp: true,
  });

  const listSlotProps = getSlotProps(ListSlot, mergedListProps, listHostOmittedProps);

  return (
    <BaseMenu.Portal
      {...portalSlotOtherProps}
      container={container}
      keepMounted={keepMounted}
      render={portalRender}
      className={clsx(classes?.portal, portalSlotClassName)}
    >
      {BackdropSlot ? (
        <BaseMenu.Backdrop
          {...backdropSlotOtherProps}
          style={backdropSlotStyle}
          render={getMenu2SlotRender(
            BackdropSlot,
            ownerState,
            { sx: backdropSlotSx },
            slots?.backdrop ? undefined : backdropSlotRender,
          )}
          className={clsx(classes?.backdrop, backdropSlotOtherProps.className)}
        />
      ) : null}
      {modal ? (
        // Blocks outside clicks. No slot, class, or theme key reaches this layer.
        <BaseMenu.Backdrop
          // With marked elements on the page, Base UI ignores presses on unmarked layers.
          // The mark makes a press on this layer close the menu.
          data-base-ui-inert=""
          onMouseDown={handleBlockerMouseDown}
          style={getModalBlockerStyle}
        />
      ) : null}
      <BaseMenu.Positioner
        // Floating UI reads DOM direction separately from Base UI's context.
        dir={isRtl ? 'rtl' : 'ltr'}
        {...positionerProps}
        {...positionerSlotOtherProps}
        render={positionerRender}
        className={clsx(classes?.positioner, positionerSlotClassName)}
      >
        <BaseMenu.Popup
          aria-label={renderElementLabel}
          finalFocus={popupFinalFocus}
          {...popupProps}
          ref={handleRootRef}
          render={(renderProps, state) => {
            // Let Base UI apply its initial transition:none before Grow starts.
            // The opening popup must remain focusable while Grow is still exited.
            const mergedRootProps = mergeProps(renderProps, rootProps);
            // `render` keeps the styled surface; a `slots.root` replacement takes precedence.
            const root =
              renderProp && !slots?.root ? (
                <RootSlot
                  {...mergedRootProps}
                  component={Menu2RenderRoot}
                  internalRender={renderProp}
                  internalRenderState={state}
                />
              ) : (
                <RootSlot {...mergedRootProps} />
              );
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
                {root}
              </TransitionSlot>
            ) : (
              root
            );
            return onClosingChange ? (
              <Menu2SubmenuClosingState
                closing={!state.open && state.transitionStatus === 'ending'}
                onClosingChange={onClosingChange}
              >
                {surface}
              </Menu2SubmenuClosingState>
            ) : (
              <React.Fragment>
                {surface}
                <Menu2ScrollLock locked={modal && state.open} popupRef={popupRef} />
              </React.Fragment>
            );
          }}
          className={clsx(classes?.root, className, rootSlotClassName)}
          style={rootStyle}
        >
          <ListSlot {...listSlotProps}>{children}</ListSlot>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}) as <OwnerState extends object>(
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;

type ExternalSlotProps<Props> = Omit<Partial<Props>, 'className' | 'render' | 'style'> & {
  className?: string | undefined;
  render?: never | undefined;
  style?: React.CSSProperties | undefined;
};

export interface Menu2PopupSharedSlots {
  /**
   * The transition applied to the popup element. Set to null to use CSS animations instead.
   * @default Grow
   */
  transition?: React.JSXElementConstructor<any> | null | undefined;
  /**
   * The component used for the portal element, which contains the menu and its backdrops.
   * Takes precedence over `slotProps.portal.render`.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component used to position the menu surface.
   * Takes precedence over `slotProps.positioner.render`.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the visual backdrop beneath the menu.
   * It renders only when you set this slot or `slotProps.backdrop`. By default, it is transparent and lets clicks through.
   * Takes precedence over `slotProps.backdrop.render`.
   * Set to `null` to remove it. This removes only the visual layer: a modal menu still blocks outside clicks.
   * @default 'div'
   */
  backdrop?: React.ElementType | null | undefined;
  /**
   * The component used for the menu surface. The popup renders as this element.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The component used for the presentational list wrapper.
   * Takes precedence over `slotProps.list.render`.
   * @default List
   */
  list?: React.ElementType | undefined;
}

type WithSx = { sx?: SxProps<Theme> | undefined };

// Menu2 has no dense mode.
export type Menu2ListProps = Omit<ListProps, 'dense'> & { dense?: never | undefined };

// These slots take `render` instead of `component`.
type Menu2RenderSlotProps<Props, State> = Omit<ExternalSlotProps<Props>, 'render'> & {
  /**
   * The element to render, or a function that returns it. The slot styles stay.
   */
  render?: Menu2SlotRender<State> | undefined;
};

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
  portal?:
    | SlotProps<
        Menu2RenderSlotProps<React.ComponentPropsWithRef<'div'>, BaseMenu.Portal.State> & WithSx,
        OwnerState
      >
    | undefined;
  positioner?:
    | SlotProps<
        Menu2RenderSlotProps<BaseMenu.Positioner.Props, BaseMenu.Positioner.State> & WithSx,
        OwnerState
      >
    | undefined;
  backdrop?:
    | SlotProps<
        Menu2RenderSlotProps<BaseMenu.Backdrop.Props, BaseMenu.Backdrop.State> & WithSx,
        OwnerState
      >
    | undefined;
  root?: SlotProps<ExternalSlotProps<Omit<PaperProps, 'component'>>, OwnerState> | undefined;
  list?:
    | SlotProps<
        Menu2RenderSlotProps<Omit<Menu2ListProps, 'component'>, BaseMenu.List.State>,
        OwnerState
      >
    | undefined;
}

type Menu2PositionerProps = BaseMenu.Positioner.Props;

type Menu2PortalProps = BaseMenu.Portal.Props;

export type Menu2PopupSide = NonNullable<Menu2PositionerProps['side']>;

export type Menu2PopupAlign = NonNullable<Menu2PositionerProps['align']>;

/**
 * These positioning and portal props use Base UI types.
 * Pick limits the public API to the listed props.
 * Material UI additions and different defaults are declared below.
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
  /**
   * The element to render for the menu surface, or a function that returns it.
   */
  render?:
    | React.ReactElement
    | ComponentRenderFn<Omit<HTMLProps, 'color'>, BaseMenu.Popup.State>
    | undefined;
}

export interface Menu2PopupSharedProps<OwnerState>
  extends
    Omit<BaseMenu.Popup.Props, 'children' | 'className' | 'render' | 'style' | 'finalFocus'>,
    Menu2PopupPublicProps {
  classes?:
    Partial<Record<'root' | 'portal' | 'positioner' | 'backdrop' | 'list', string>> | undefined;
  ownerState: OwnerState;
  modal?: boolean | undefined;
  onClosingChange?: ((closing: boolean) => void) | undefined;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    root: React.ElementType;
    portal: React.ElementType;
    positioner: React.ElementType;
    list: React.ElementType;
    backdrop?: React.ElementType | undefined;
  };
  defaultPositionerProps?: Partial<BaseMenu.Positioner.Props> | undefined;
  sx?: SxProps<Theme> | undefined;
}
