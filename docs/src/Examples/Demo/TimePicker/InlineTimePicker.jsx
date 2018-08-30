import React, { Fragment, PureComponent } from 'react';
import { InlineTimePicker } from 'material-ui-pickers/TimePicker';

export default class InlineTimePickerDemo extends PureComponent {
  state = {
    selectedDate: '2018-01-01T00:00:00.000Z',
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <InlineTimePicker
            label="Inline"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <InlineTimePicker
            keyboard
            label="With keyboard"
            value={selectedDate}
            onChange={this.handleDateChange}
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
          />
        </div>
      </Fragment>
    );
  }
}
