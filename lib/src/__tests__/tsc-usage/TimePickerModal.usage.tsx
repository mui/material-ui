// tslint:disable max-classes-per-file
import { Moment } from 'moment';
import * as React from 'react';
import MuiUtilsProvider from '../../MuiPickersUtilsProvider';
import TimePickerWrapper from '../../TimePicker';
import { utilsToUse } from '../test-utils';

// initially from the docs site
export default class BasicUsage extends React.Component<
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
      <MuiUtilsProvider utils={utilsToUse}>
        <TimePickerWrapper
          keyboard
          mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
          placeholder="08:00 AM"
          value={selectedDate}
          onChange={this.handleChange}
          DialogProps={{
            contentEditable: true,
          }}
        />
      </MuiUtilsProvider>
    );
  }
}
