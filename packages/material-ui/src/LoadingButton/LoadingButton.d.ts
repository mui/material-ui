import { ExtendButton, ExtendButtonTypeMap } from '../Button';
import { OverrideProps } from '../OverridableComponent';

export type LoadingButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonTypeMap<{
  props: P & {
    /**
     * The content of the button.
     */
    loading?: boolean;
    /**
     * Element placed before the children if the button is in loading state.
     */
    loadingIndicator?: React.ReactNode;
    /**
     * The loading indicator can be positioned on the start, end or the center of the Button.
     */
    loadingIndicatorPosition?: 'start' | 'end' | 'center';
  };
  defaultComponent: D;
  classKey: LoadingButtonClassKey;
}>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
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

export type LoadingButtonClassKey = 'root' | 'loading';

export default LoadingButton;
