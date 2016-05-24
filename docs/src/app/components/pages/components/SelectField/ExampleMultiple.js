import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export default class SelectFieldExampleMultiple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: []};
  }

  handleChange = (event, index, value) => {
    const stateValueIndex = this.state.value.indexOf(value);
    if (stateValueIndex === -1) {
      this.state.value.push(value);
    } else {
      this.state.value.splice(stateValueIndex, 1);
    }
  }

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          multiple={true}
          style={style}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
      </div>
    );
  }
}
