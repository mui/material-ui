import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Accessibility extends React.Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedC: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          value="checkedA"
          inputProps={{ 'aria-label': 'Checkbox A' }}
        />
        <Checkbox
          checked={this.state.checkedB}
          onChange={this.handleChange('checkedB')}
          value="checkedA"
          inputProps={{ 'aria-labelledby': 'checkboxBdesc' }}
        />
        <Checkbox
          checked={this.state.checkedC}
          onChange={this.handleChange('checkedC')}
          value="checkedA"
          inputProps={{ title: 'Checkbox C' }}
        />
        <div id="checkboxBdesc">Checkbox B</div>
      </div>
    );
  }
}

export default Accessibility;
