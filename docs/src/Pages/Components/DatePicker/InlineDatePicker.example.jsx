import { InlineDatePicker } from 'material-ui-pickers';
import React, { Fragment, PureComponent } from 'react';
import { withUtilsService } from '../../../_shared/UtilsServiceContext';

class InlineDatePickerDemo extends PureComponent {
  state = {
    selectedDate: '2018-01-01T00:00:00.000Z',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <InlineDatePicker
            label="Basic example"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <InlineDatePicker
            onlyCalendar
            label="Only calendar"
            helperText="No year selection"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <InlineDatePicker
            keyboard
            clearable
            variant="outlined"
            label="With keyboard"
            value={selectedDate}
            onChange={this.handleDateChange}
            format={this.props.getFormatString({
              moment: 'MM/DD/YYYY',
              dateFns: 'MM/dd/yyyy',
            })}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
      </Fragment>
    );
  }
}

export default withUtilsService(InlineDatePickerDemo);
