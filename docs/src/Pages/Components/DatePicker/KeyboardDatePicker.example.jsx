import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { withUtilsService } from '../../../_shared/UtilsServiceContext';

class KeyboardDatePicker extends PureComponent {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <DatePicker
            keyboard
            clearable
            label="Uncontrolled input"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
            minDate={new Date()}
            onInputChange={e => console.log('Keyboard Input:', e.target.value)}
          />
        </div>

        <div className="picker">
          <DatePicker
            keyboard
            label="Masked input"
            format={this.props.getFormatString({
              moment: 'MM/DD/YYYY',
              dateFns: 'MM/dd/yyyy',
            })}
            placeholder="10/10/2018"
            // handle clearing outside => pass plain array if you are not controlling value outside
            mask={value =>
              value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
            }
            value={selectedDate}
            onChange={this.handleDateChange}
            disableOpenOnEnter
            animateYearScrolling={false}
          />
        </div>
      </Fragment>
    );
  }
}

export default withUtilsService(KeyboardDatePicker);
