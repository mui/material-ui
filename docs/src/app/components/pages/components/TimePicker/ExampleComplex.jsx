import React from 'react';
import TimePicker from 'material-ui/TimePicker';

export default class TimePickerExampleComplex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value24: null, value12: null};
  }

  handleChangeTimePicker24 = (event, date) => {
    this.setState({value24: date});
  };

  handleChangeTimePicker12 = (event, date) => {
    this.setState({value12: date});
  };

  render() {
    return (
      <div>
        <TimePicker
          format="ampm"
          hintText="12hr Format"
          value={this.state.value12}
          onChange={this.handleChangeTimePicker12}
        />
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          value={this.state.value24}
          onChange={this.handleChangeTimePicker24}
        />
      </div>
    );
  }
}
