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
      root?: string;
      pending?: string;
      pendingIndicator?: string;
      pendingIndicatorCenter?: string;
      pendingIndicatorStart?: string;
      pendingIndicatorEnd?: string;
      endIconPendingEnd?: string;
      startIconPendingStart?: string;
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
