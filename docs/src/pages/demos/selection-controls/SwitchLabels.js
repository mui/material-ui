import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class SwitchLabels extends React.Component {
  static defaultProps: {};
  state = {
    checkedA: true,
    checkedB: false,
  };

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={(event, checked) => this.setState({ checkedA: checked })}
            />
          }
          label="A"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={(event, checked) => this.setState({ checkedB: checked })}
            />
          }
          label="B"
        />
        <FormControlLabel control={<Switch />} disabled label="C" />
      </div>
    );
  }
}

export default SwitchLabels;
