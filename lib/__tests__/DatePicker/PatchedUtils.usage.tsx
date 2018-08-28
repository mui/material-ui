import * as React from 'react'
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import * as format from 'date-fns/format'

import { Fragment, Component } from 'react';
import { IconButton } from '@material-ui/core'
import { Moment } from 'moment'
import { DayComponent } from '../../src/DatePicker/components/Calendar'
import DatePickerWrapper  from '../../src/DatePicker';
import DateFnsUtils from '../../src/utils/date-fns-utils'
import MomentUtils from '../../src/utils/moment-utils'
import MuiUtilsProvider from '../../src/utils/MuiPickersUtilsProvider'

class PatchedDateFnsUtils extends DateFnsUtils {
  getDatePickerHeaderText(date: Date) {
    return format(date, 'D MMM YYYY', { locale: this.locale });
  }
}

export class WithPatchedDateFns extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
  }

  render() {
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
  getDatePickerHeaderText(date: Moment) {
    return date.format('D MMM YYYY');
  }
}

export default class WithPatchedMoment extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
  }

  render() {
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
