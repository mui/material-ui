import { useUtils } from '../_shared/hooks/useUtils';
import { DatePickerToolbar } from './DatePickerToolbar';
import { getFormatByViews } from '../_helpers/date-utils';
import { WithViewsProps } from '../Picker/SharedPickerProps';
import { datePickerDefaultProps } from '../constants/prop-types';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { ExportedCalendarViewProps } from '../views/Calendar/CalendarView';
import { makePickerWithStateAndWrapper } from '../Picker/makePickerWithState';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';

export type DatePickerView = 'year' | 'date' | 'month';

export interface DatePickerProps
  extends WithViewsProps<'year' | 'date' | 'month'>,
    ExportedCalendarViewProps {}

const datePickerConfig = {
  DefaultToolbarComponent: DatePickerToolbar,
  useDefaultProps: ({ openTo = 'date', views = ['year', 'date'] }: DatePickerProps) => {
    const utils = useUtils();

    return {
      ...datePickerDefaultProps,
      views,
      openTo,
      mask: '__/__/____',
      inputFormat: getFormatByViews(views, utils),
    };
  },
};

export const DatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ResponsiveWrapper,
  datePickerConfig
);

export const MobileDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export const DesktopDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export const StaticDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  StaticWrapper,
  datePickerConfig
);
