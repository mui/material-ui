import { ExtendButton, ExtendButtonTypeMap } from '@material-ui/core/Button';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type LoadingButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonTypeMap<{
  props: P & {
    /**
     * If `true`, the pending indicator will be shown.
     */
    pending?: boolean;
    /**
     * Element placed before the children if the button is in pending state.
     */
    pendingIndicator?: React.ReactNode;
    /**
     * The pending indicator can be positioned on the start, end, or the center of the button.
     */
    pendingPosition?: 'start' | 'end' | 'center';
  };
  defaultComponent: D;
  classKey: LoadingButtonClassKey;
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

export type LoadingButtonClassKey =
  | 'root'
  | 'pending'
  | 'pendingIndicator'
  | 'pendingIndicatorCenter'
  | 'pendingIndicatorStart'
  | 'pendingIndicatorEnd'
  | 'endIconPendingEnd'
  | 'startIconPendingStart'
  | 'labelPendingCenter';

export default LoadingButton;
