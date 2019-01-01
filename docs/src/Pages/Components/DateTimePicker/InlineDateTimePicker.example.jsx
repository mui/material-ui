import { InlineDateTimePicker } from 'material-ui-pickers';
import React, { Fragment, PureComponent } from 'react';
import { withUtilsService } from '../../../_shared/UtilsServiceContext';

class InlineDateTimePickerDemo extends PureComponent {
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
          <InlineDateTimePicker
            label="Basic example"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <InlineDateTimePicker
            keyboard
            label="With keyboard"
            value={selectedDate}
            onChange={this.handleDateChange}
            format={this.props.getFormatString({
              moment: 'YYYY/MM/DD hh:mm A',
              dateFns: 'yyyy/MM/dd hh:mm A',
            })}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '/',
              /\d/,
              /\d/,
              '/',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ':',
              /\d/,
              /\d/,
              ' ',
              /a|p/i,
              'M',
            ]}
          />
        </div>
      </Fragment>
    );
  }
}

export default withUtilsService(InlineDateTimePickerDemo);
