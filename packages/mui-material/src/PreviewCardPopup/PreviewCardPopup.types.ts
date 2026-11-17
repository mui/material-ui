import type * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { useRender } from '@base-ui/react/use-render';
import type { SxProps } from '@mui/system';
import type { SlotComponentProps } from '@mui/utils/types';
import type { Theme } from '../styles';
import type { TransitionProps } from '../transitions/types';
import type { PaperProps } from '../Paper';
import type { PreviewCardPopupClasses } from './previewCardPopupClasses';

export interface PreviewCardPopupSlots {
  /**
   * The component that renders the popup surface.
   * @default Paper
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the portal element.
   * @default 'div'
   */
  portal?: React.ElementType | undefined;
  /**
   * The component that positions the popup next to the trigger.
   * @default 'div'
   */
  positioner?: React.ElementType | undefined;
  /**
   * The component used for the transition.
   * Set to `null` to render the popup without a Material UI transition.
   * @default Grow
   */
  transition?:
    | React.JSXElementConstructor<TransitionProps & { children: React.ReactElement }>
    | null
    | undefined;
}

type PreviewCardPopupSlotRenderProps<State> = {
  /**
   * Replaces the rendered element while keeping the slot styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: useRender.RenderProp<State & Record<string, unknown>> | undefined;
};

export interface PreviewCardPopupSlotProps {
  root?:
    | SlotComponentProps<'div', Omit<PaperProps, 'component'>, PreviewCardPopupOwnerState>
    | undefined;
  portal?:
    | SlotComponentProps<
        'div',
        {
          sx?: SxProps<Theme> | undefined;
        } & PreviewCardPopupSlotRenderProps<BasePreviewCard.Portal.State>,
        PreviewCardPopupProps
      >
    | undefined;
  positioner?:
    | SlotComponentProps<
        'div',
        {
          sx?: SxProps<Theme> | undefined;
        } & PreviewCardPopupSlotRenderProps<BasePreviewCard.Positioner.State>,
        PreviewCardPopupOwnerState
      >
    | undefined;
  transition?:
    | SlotComponentProps<
        React.ElementType<TransitionProps>,
        TransitionProps,
        PreviewCardPopupOwnerState
      >
    | undefined;
}

export interface PreviewCardPopupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Pick<PaperProps, 'square' | 'variant'>,
    Pick<
      BasePreviewCard.Positioner.Props,
      | 'align'
      | 'alignOffset'
      | 'anchor'
      | 'collisionAvoidance'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'disableAnchorTracking'
      | 'positionMethod'
      | 'side'
      | 'sticky'
    >,
    Pick<BasePreviewCard.Portal.Props, 'container' | 'keepMounted'> {
  /**
   * Distance between the anchor and the popup in pixels.
   * Also accepts a function that returns the distance from the anchor and positioner dimensions.
   * @default 8
   */
  sideOffset?: BasePreviewCard.Positioner.Props['sideOffset'] | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PreviewCardPopupClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The elevation of the popup surface.
   * @default 8
   */
  elevation?: number | undefined;
  /**
   * Replaces the rendered element while keeping the popup styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: BasePreviewCard.Popup.Props['render'] | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: PreviewCardPopupSlots | undefined;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: PreviewCardPopupSlotProps | undefined;
  /**
   * @ignore
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The duration of the transition, in milliseconds.
   * Set to 'auto' to calculate the duration from the popup height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto' | undefined;
}

export interface PreviewCardPopupOwnerState extends PreviewCardPopupProps {
  /**
   * Whether the popup is open. Live Base UI state, merged in by the slot adapter.
   */
  open: boolean;
}
