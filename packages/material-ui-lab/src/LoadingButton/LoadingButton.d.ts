import { ExtendButton, ExtendButtonTypeMap } from '@material-ui/core/Button';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type LoadingButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `pending={true}`. */
      pending?: string;
      /** Styles applied to the pendingIndicator element. */
      pendingIndicator?: string;
      /** Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
      pendingIndicatorCenter?: string;
      /** Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
      pendingIndicatorStart?: string;
      /** Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
      pendingIndicatorEnd?: string;
      /** Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
      endIconPendingEnd?: string;
      /** Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
      startIconPendingStart?: string;
      /** Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
      labelPendingCenter?: string;
    };
    /**
     * If `true`, the pending indicator will be shown.
     * @default false
     */
    pending?: boolean;
    /**
     * Element placed before the children if the button is in pending state.
     * @default <CircularProgress color="inherit" size={16} />
     */
    pendingIndicator?: React.ReactNode;
    /**
     * The pending indicator can be positioned on the start, end, or the center of the button.
     * @default 'center'
     */
    pendingPosition?: 'start' | 'end' | 'center';
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [LoadingButton API](https://material-ui.com/api/loading-button/)
 * - inherits [Button API](https://material-ui.com/api/button/)
 */
declare const LoadingButton: ExtendButton<LoadingButtonTypeMap>;

export type LoadingButtonProps<
  D extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LoadingButtonTypeMap<P, D>, D>;

export type LoadingButtonClassKey = keyof NonNullable<LoadingButtonTypeMap['props']['classes']>;

export default LoadingButton;
