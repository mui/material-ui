import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const persons = [
  {value: 0, name: 'Oliver Hansen'},
  {value: 1, name: 'Van Henry'},
  {value: 2, name: 'April Tucker'},
  {value: 3, name: 'Ralph Hubbard'},
  {value: 4, name: 'Omar Alexander'},
  {value: 5, name: 'Carlos Abbott'},
  {value: 6, name: 'Miriam Wagner'},
  {value: 7, name: 'Bradley Wilkerson'},
  {value: 8, name: 'Virginia Andrews'},
  {value: 9, name: 'Kelly Snyder'},
];

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
export default class SelectFieldExampleSelectionRenderer extends Component {
  state = {
    values: [],
  };

  handleChange = (event, index, values) => this.setState({values});

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return persons[values[0]].name;
      default:
        return `${values.length} names selected`;
    }
  }

  menuItems(persons) {
    return persons.map((person) => (
      <MenuItem
        key={person.value}
        insetChildren={true}
        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.name}
      />
    ));
  }

  render() {
    return (
      <SelectField
        multiple={true}
        hintText="Select a name"
        value={this.state.values}
        onChange={this.handleChange}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(persons)}
      </SelectField>
    );
  }
}
