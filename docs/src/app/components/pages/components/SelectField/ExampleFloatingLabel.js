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

/**
 * `SelectField` supports a floating label with the `floatingLabelText` property. This can be fixed in place with the
 * `floatingLabelFixed` property, and can be customised with the `floatingLabelText` property.
 */
export default class SelectFieldExampleFloatingLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Floating Label Text"
        >
          {items}
        </SelectField>
        <br />
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Floating Label Text"
          floatingLabelFixed={true}
          hintText="Hint text"
        >
          {items}
        </SelectField>
        <br />
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Styled Floating Label Text"
          floatingLabelStyle={{color: 'red'}}
        >
          {items}
        </SelectField>
      </div>
    );
  }
}
