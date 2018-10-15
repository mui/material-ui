// tslint:disable max-classes-per-file
import * as format from 'date-fns/format';
import * as React from 'react';

import { Moment } from 'moment';
import DatePickerWrapper from '../../DatePicker';
import DateFnsUtils from '../../utils/date-fns-utils';
import MomentUtils from '../../utils/moment-utils';
import MuiUtilsProvider from '../../utils/MuiPickersUtilsProvider';

class PatchedDateFnsUtils extends DateFnsUtils {
  public getDatePickerHeaderText(date: Date) {
    return format(date, 'D MMM YYYY', { locale: this.locale });
  }
}

export class WithPatchedDateFns extends React.Component<
  {},
  { selectedDate: Date }
> {
  public state = {
    selectedDate: new Date(),
  };

  public handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={PatchedDateFnsUtils}>
        <DatePickerWrapper
          keyboard
          clearable
          value={selectedDate}
          onChange={this.handleChange}
          animateYearScrolling={false}
        />
      </MuiUtilsProvider>
    );
  }
}

class PatchedMomentUtils extends MomentUtils {
  public getDatePickerHeaderText(date: Moment) {
    return date.format('D MMM YYYY');
  }
}

export default class WithPatchedMoment extends React.Component<
  {},
  { selectedDate: Date }
> {
  public state = {
    selectedDate: new Date(),
  };

  public handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={PatchedMomentUtils}>
        <DatePickerWrapper
          keyboard
          clearable
          value={selectedDate}
          onChange={this.handleChange}
          animateYearScrolling={false}
        />
      </MuiUtilsProvider>
    );
  }
}
