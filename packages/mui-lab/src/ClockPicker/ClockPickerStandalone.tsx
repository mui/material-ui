import * as React from 'react';
import ClockPicker, { ClockPickerProps } from './ClockPicker';
import { ClockView } from './shared';
import PickerView from '../internal/pickers/Picker/PickerView';
import { useViews } from '../internal/pickers/hooks/useViews';

export interface ClockPickerStandaloneProps<TDate>
  extends Omit<
    ClockPickerProps<TDate>,
    'view' | 'openNextView' | 'openPreviousView' | 'nextViewAvailable' | 'previousViewAvailable'
  > {
  className?: string;
  /**
   * Callback fired on view change.
   */
  onViewChange?: (view: ClockView) => void;
  /**
   * Initially opened view.
   */
  openTo?: ClockView;
  /**
   * Controlled clock view.
   */
  view?: ClockView;
  /**
   * Available views for clock.
   */
  views?: readonly ClockView[];
}

/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
export default React.forwardRef(function ClockPickerStandalone<TDate>(
  props: ClockPickerStandaloneProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { view, openTo, className, onViewChange, views = ['hours', 'minutes'], ...other } = props;

  const { openView, setOpenView, nextView, previousView } = useViews({
    view,
    views,
    openTo,
    onViewChange,
    onChange: other.onChange,
  });

  return (
    <PickerView className={className} ref={ref}>
      <ClockPicker
        view={openView}
        nextViewAvailable={Boolean(nextView)}
        previousViewAvailable={Boolean(previousView)}
        openNextView={() => setOpenView(nextView)}
        openPreviousView={() => setOpenView(previousView)}
        {...other}
      />
    </PickerView>
  );
}) as <TDate>(
  props: ClockPickerStandaloneProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
