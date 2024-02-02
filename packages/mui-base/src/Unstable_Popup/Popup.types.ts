import {
  Middleware as PopupMiddleware,
  OffsetOptions as PopupOffsetOptions,
  Placement as PopupPlacement,
  Strategy as PopupStrategy,
  VirtualElement as PopupVirtualElement,
} from '@floating-ui/react-dom';
import { PortalProps } from '../Portal';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export type {
  PopupPlacement,
  PopupStrategy,
  PopupOffsetOptions,
  PopupMiddleware,
  PopupVirtualElement,
};

export interface PopupRootSlotPropsOverrides {}

export interface PopupOwnProps {
  /**
   * An HTML element, [virtual element](https://floating-ui.com/docs/virtual-elements),
   * or a function that returns either.
   * It's used to set the position of the popup.
   */
  anchor?:
    | PopupVirtualElement
    | HTMLElement
    | (() => HTMLElement)
    | (() => PopupVirtualElement)
    | null;
  children?: React.ReactNode;
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
    By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container?: PortalProps['container'];
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `visibility` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware?: Array<PopupMiddleware | null | undefined | false>;
  /**
   * Distance between a popup and the trigger element.
   * This prop is ignored when custom `middleware` is provided.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset?: PopupOffsetOptions;
  /**
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open?: boolean;
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement?: PopupPlacement;
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', PopupRootSlotPropsOverrides, PopupProps>;
  };
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy?: PopupStrategy;
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
  disablePortal: boolean;
  open: boolean;
  keepMounted: boolean;
  offset: PopupOffsetOptions;
  placement: PopupPlacement;
  finalPlacement: PopupPlacement;
  strategy: PopupStrategy;
}

export type PopupRootSlotProps = {
  className?: string;
  children?: React.ReactNode;
  ownerState: PopupOwnerState;
  style: React.CSSProperties;
  role: React.AriaRole;
};
