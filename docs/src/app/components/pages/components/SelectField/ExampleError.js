import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
  <MenuItem key={1} value={1} primaryText="Never" />,
  <MenuItem key={2} value={2} primaryText="Every Night" />,
  <MenuItem key={3} value={3} primaryText="Weeknights" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />,
];

export default class SelectFieldExampleError extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const {value} = this.state;

    const night = value === 2 || value === 3;

    return (
      <div>
        <SelectField
          value={value}
          onChange={this.handleChange}
          errorText={!night && 'Should be Night'}
        >
          {items}
        </SelectField>
        <br />
        <SelectField
          value={value}
          onChange={this.handleChange}
          errorText={night && 'Should not be Night (Custom error style)'}
          errorStyle={{color: 'orange'}}
        >
          {items}
        </SelectField>
      </div>
    );
  }
}
