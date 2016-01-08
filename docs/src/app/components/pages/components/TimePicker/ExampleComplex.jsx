import React from 'react';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

export default class TimePickerExampleComplex extends React.Component {

  constructor(props) {
    super(props);
  }


  changeTimePicker24 = (err, time) => {
    this.refs.picker24hr.setTime(time);
  };

  changeTimePicker12 = (err, time) => {
    this.refs.picker12hr.setTime(time);
  };

  render() {
    return (
      <div>
        <TimePicker
          ref="picker12hr"
          format="ampm"
          hintText="12hr Format"
          onChange={this.changeTimePicker24} />

        <TimePicker
          ref="picker24hr"
          format="24hr"
          hintText="24hr Format"
          onChange={this.changeTimePicker12} />
      </div>
    );
  }
}
