import React, { PureComponent } from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import frLocale from 'date-fns/locale/fr';
import format from 'date-fns/format';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'D MMM YYYY', { locale: this.locale });
  }
}

export default class DateFnsLocalizationExample extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
        <div className="picker">
          <DatePicker
            clearable
            label="Localization done right"
            format="D MMM YYYY"
            value={selectedDate}
            onChange={this.handleDateChange}
            clearLabel="vider"
            cancelLabel="annuler"
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}
