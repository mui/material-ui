import * as React from 'react';
import ClockPicker, { ClockPickerProps } from './ClockPicker';
import { TimePickerView } from '../internal/pickers/typings/Views';
import PickerView from '../internal/pickers/Picker/PickerView';
import { useViews } from '../internal/pickers/hooks/useViews';

export interface ClockPickerStandaloneProps<TDate>
  extends Omit<
    ClockPickerProps<TDate>,
    'view' | 'openNextView' | 'openPreviousView' | 'nextViewAvailable' | 'previousViewAvailable'
  > {
  /** Controlled clock view. */
  view?: TimePickerView;
  /** Available views for clock. */
  views?: TimePickerView[];
  /** Callback fired on view change. */
  onViewChange?: (view: TimePickerView) => void;
  /** Initially opened view. */
  openTo?: TimePickerView;
  className?: string;
}

/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
export default React.forwardRef(function ClockPickerStandalone<TDate>(
  props: ClockPickerStandaloneProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    view,
    openTo,
    className,
    onViewChange,
    views = ['hours', 'minutes'] as TimePickerView[],
    ...other
  } = props;

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
