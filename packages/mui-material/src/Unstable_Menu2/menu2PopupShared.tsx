'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import { SxProps } from '@mui/system';
import mergeSlotProps from '../utils/mergeSlotProps';
import useSlot from '../utils/useSlot';
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
   * The component used for the root element, which positions the menu.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component used for the optional backdrop beneath the menu.
   * Providing this slot or `slotProps.backdrop` renders it.
   * Set to `null` to omit it. The default backdrop is transparent and click-through.
   */
  backdrop?: React.ElementType | null | undefined;
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
  root?: SlotProps<ExternalSlotProps<BaseMenu.Positioner.Props> & WithSx, OwnerState> | undefined;
  backdrop?: SlotProps<ExternalSlotProps<BaseMenu.Backdrop.Props>, OwnerState> | undefined;
  paper?: SlotProps<ExternalSlotProps<PaperProps>, OwnerState> | undefined;
  list?: SlotProps<ExternalSlotProps<ListProps>, OwnerState> | undefined;
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
}

export interface Menu2PopupSharedProps<OwnerState>
  extends
    Omit<BaseMenu.Popup.Props, 'children' | 'className' | 'render' | 'style' | 'finalFocus'>,
    Menu2PopupPublicProps {
  classes?: Partial<Record<'root' | 'backdrop' | 'paper' | 'list', string>> | undefined;
  ownerState: OwnerState;
  onClosingChange?: ((closing: boolean) => void) | undefined;
  slots?: Menu2PopupSharedSlots | undefined;
  slotProps?: Menu2PopupSharedSlotProps<OwnerState> | undefined;
  defaultSlots: {
    root: React.ElementType;
    paper: React.ElementType;
    list: React.ElementType;
    backdrop?: React.ElementType | undefined;
  };
  defaultPositionerProps?: Partial<BaseMenu.Positioner.Props> | undefined;
  sx?: SxProps<Theme> | undefined;
}

export const Menu2PopupBase = React.forwardRef(function Menu2PopupBase<OwnerState extends object>(
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
    sticky,
    disableAnchorTracking,
    collisionAvoidance,
    finalFocus,
    elevation,
    transitionDuration = 'auto',
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...other
  } = props;

  // Keep the Base parts for their context and behavior. The root slot changes
  // the positioner's element through `render`; the portal remains internal.
  const RootSlot = slots?.root ?? defaultSlots.root;
  const TransitionSlot = slots?.transition === undefined ? Grow : slots.transition;
  const transitionProps = resolveComponentProps(slotProps?.transition, ownerState);
  const transitionTimeout =
    transitionDuration === 'auto' &&
    !(TransitionSlot as (React.ElementType & { muiSupportAuto?: boolean | undefined }) | null)
      ?.muiSupportAuto
      ? undefined
      : transitionDuration;
  // Base UI owns modality and outside dismissal. Slot configuration enables
  // this optional visual layer; null overrides that configuration.
  const BackdropSlot =
    slots?.backdrop === null
      ? null
      : (slots?.backdrop ?? (slotProps?.backdrop ? defaultSlots.backdrop : undefined));
  const PaperSlot = slots?.paper ?? defaultSlots.paper;

  const resolvedRootProps = mergeSlotProps(resolveComponentProps(slotProps?.root, ownerState), {
    sx,
  });
  const resolvedBackdropProps = BackdropSlot
    ? resolveComponentProps(slotProps?.backdrop, ownerState)
    : undefined;
  const resolvedPaperProps = resolveComponentProps(slotProps?.paper, ownerState);
  // Base UI merges className, style, and ref into the element that `render`
  // gives a part, so those go through the part. `sx` and the Paper props go on
  // the element. HTML attributes go to the root, except the menu's accessible
  // name and description. Handlers attach to the popup so that they run before
  // Base UI handles navigation keys and stops their propagation.
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
  const { sx: backdropSlotSx, ...backdropSlotOtherProps } = resolvedBackdropProps ?? {};
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
  const paperProps = getSlotProps(
    PaperSlot,
    appendOwnerState(
      PaperSlot,
      {
        elevation: elevation ?? 8,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        ...paperSlotOtherProps,
        sx: paperSlotSx,
      },
      ownerState,
    ),
    paperHostOmittedProps,
  );
  const [ListSlot, mergedListProps] = useSlot('list', {
    elementType: defaultSlots.list,
    externalForwardedProps: { slots, slotProps },
    ownerState,
    additionalProps: { component: 'div', disablePadding: false },
    className: classes?.list,
    shouldForwardComponentProp: true,
  });

  const listSlotProps = getSlotProps(ListSlot, mergedListProps, listHostOmittedProps);

  return (
    <BaseMenu.Portal container={container} keepMounted={keepMounted}>
      {BackdropSlot ? (
        <BaseMenu.Backdrop
          {...backdropSlotOtherProps}
          render={
            <BackdropSlot
              {...getSlotProps(
                BackdropSlot,
                appendOwnerState(BackdropSlot, { sx: backdropSlotSx }, ownerState),
                sxHostOmittedProps,
              )}
            />
          }
          className={clsx(classes?.backdrop, backdropSlotOtherProps.className)}
        />
      ) : null}
      <BaseMenu.Positioner
        {...positionerProps}
        {...rootAttributes}
        {...rootSlotOtherProps}
        ref={handleRootRef}
        render={rootRender}
        className={clsx(classes?.root, className, rootSlotClassName)}
        style={rootStyle}
      >
        <BaseMenu.Popup
          finalFocus={finalFocus}
          {...popupHandlers}
          ref={paperSlotRef}
          render={(renderProps, state) => {
            // Let Base UI apply its initial transition:none before Grow starts.
            // The opening popup must remain focusable while Grow is still exited.
            const mergedPaperProps = mergeProps(renderProps, paperProps);
            // A supplied name takes precedence over Base UI's trigger label.
            // Keep an explicit labelledby when both naming attributes are set.
            mergedPaperProps['aria-labelledby'] =
              paperProps['aria-labelledby'] ??
              (paperProps['aria-label'] !== undefined ? undefined : renderProps['aria-labelledby']);
            const paper = <PaperSlot {...mergedPaperProps} />;
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
}) as <OwnerState extends object>(
  props: Menu2PopupSharedProps<OwnerState> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;
