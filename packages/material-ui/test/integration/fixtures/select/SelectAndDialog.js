import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'packages/material-ui/src/MenuItem';
import Select from 'packages/material-ui/src/Select';
import Dialog from 'packages/material-ui/src/Dialog';

class SelectAndDialog extends React.Component {
  state = {
    value: 10,
  };

  handleChange = event => {
    this.setState({ value: Number(event.target.value) });
  };

  render() {
    return (
      <Dialog open>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          MenuProps={this.props.MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Dialog>
    );
  }
}

SelectAndDialog.propTypes = {
  MenuProps: PropTypes.object,
};

export default SelectAndDialog;
