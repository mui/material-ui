import { usePickerState } from './usePickerState';
import { ParsableDate } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { BaseDatePickerProps } from '../../DatePicker/DatePicker';

interface StaticStateOpts extends BaseDatePickerProps {
  value: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
  autoOk?: boolean;
  defaultFormat?: string;
}

export function useStaticState({ value, autoOk = true, onChange, defaultFormat }: StaticStateOpts) {
  const { pickerProps, wrapperProps, inputProps } = usePickerState(
    { value, onChange, autoOk },
    {
      // just a random format, mostly always not needed for users
      getDefaultFormat: () => defaultFormat || 'MM/dd/yyyy',
    }
  );

  return { pickerProps, wrapperProps, inputProps };
}
