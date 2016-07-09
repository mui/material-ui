import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

/**
 * With the `maxHeight` property set, the Select Field will be scrollable if the number of items causes the height to
 * exceed this limit.
 */
export default class DropDownMenuLongMenuExample extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 10};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  render() {
    return (
      <SelectField value={this.state.value} onChange={this.handleChange} maxHeight={200}>
        {items}
      </SelectField>
    );
  }
}
