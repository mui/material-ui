import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class SelectFieldExampleMenuClose extends Component {
  state = {
    value: 1,
    closed: 0,
    selected: 0,
  };

  handleChange = (event, index, value) => this.setState({value: value});

  handleClose = () => this.setState({closed: this.state.closed++});

  handleSelectionRenderer = (value) => this.setState({selected: value});

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.value}
          dropDownMenuProps={{
            onchange: this.handleChange,
            onClose: this.handleClose,
            selectionRenderer: this.handleSelectionRenderer,
          }}
        >
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
        <br />
        <span id="spanClose">
          This SelectField was closed {this.state.closed}.}
        </span>
        <span id="spanSelect">
          The value selected is {this.state.selected}.
        </span>
      </div>
    );
  }
}
