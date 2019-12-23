import { useViews } from './useViews';
import { usePickerState } from './usePickerState';
import { ParsableDate } from '../../constants/prop-types';
import { DateTimePickerView } from '../../DateTimePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { BaseDatePickerProps } from '../../DatePicker/DatePicker';

interface StaticStateOpts extends BaseDatePickerProps {
  value: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
  autoOk?: boolean;
  defaultFormat?: string;
  views: DateTimePickerView[];
  openTo: DateTimePickerView;
}

export function useStaticState({
  views,
  openTo,
  value,
  autoOk = true,
  onChange,
  defaultFormat,
  ...other
}: StaticStateOpts) {
  const { openView, setOpenView, handleChangeAndOpenNext } = useViews(views, openTo, onChange);
  const { pickerProps, wrapperProps, inputProps } = usePickerState(
    { value, onChange, autoOk, ...other },
    {
      // just a random format, mostly always not needed for users
      getDefaultFormat: () => defaultFormat || 'MM/dd/yyyy',
    }
  );

  return {
    currentView: openView,
    changeView: setOpenView,
    handleChangeAndOpenNext,
    pickerProps,
    wrapperProps,
    inputProps,
  };
}
