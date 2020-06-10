import { ExtendButton, ExtendButtonTypeMap } from '../Button';
import { OverrideProps } from '../OverridableComponent';

export type BusyButtonTypeMap<
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
     * The loading indicator can be positioned on the start, end or the centre of the Button.
     */
    loadingIndicatorPosition?: 'start' | 'end' | 'centre';
  };
  defaultComponent: D;
  classKey: BusyButtonClassKey;
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
 * - [BusyButton API](https://material-ui.com/api/busy-button/)
 * - inherits [Button API](https://material-ui.com/api/button/)
 */
declare const BusyButton: ExtendButton<BusyButtonTypeMap>;

export type BusyButtonProps<
  D extends React.ElementType = BusyButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BusyButtonTypeMap<P, D>, D>;

export type BusyButtonClassKey = 'root' | 'loading';

export default BusyButton;
