import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

/**
 * `SelectField` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */
export default class SelectFieldExampleNullable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField floatingLabelText="Ready?" value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={null} primaryText="" />
          <MenuItem value={false} primaryText="No" />
          <MenuItem value={true} primaryText="Yes" />
        </SelectField>
      </div>
    );
  }
}
