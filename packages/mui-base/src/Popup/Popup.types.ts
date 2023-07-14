import {
  Middleware,
  OffsetOptions,
  Placement,
  Strategy,
  VirtualElement,
} from '@floating-ui/react-dom';
import { PortalProps } from '../Portal';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface PopupRootSlotPropsOverrides {}

interface PopupSettings {
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, an offset and flip functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware?: Array<Middleware | null | undefined | false>;
  /**
   * Distance between a popup and the trigger element.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset?: OffsetOptions;
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom-start'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement?: Placement;
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy?: Strategy;
}

export interface PopupChildrenProps {
  placement: Placement;
  in: boolean;
  onExited: () => void;
  onEnter: () => void;
}

export interface PopupOwnProps extends PopupSettings {
  anchor?: VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement) | null;
  children?: React.ReactNode | ((props: PopupChildrenProps) => React.ReactNode);
  container?: PortalProps['container'];
  disablePortal?: boolean;
  keepMounted?: boolean;
  open?: boolean;
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: SlotComponentProps<'div', PopupRootSlotPropsOverrides, PopupProps>;
  };
  withTransition?: boolean;
}

export interface PopupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface PopupTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: PopupOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type PopupProps<
  RootComponentType extends React.ElementType = PopupTypeMap['defaultComponent'],
> = PolymorphicProps<PopupTypeMap<{}, RootComponentType>, RootComponentType>;

export interface PopupOwnerState extends PopupOwnProps {
  // isMounted: boolean;
  // transitionStatus: 'unmounted' | 'initial' | 'open' | 'close';
}
