import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = createStyleSheet('Checkboxes', () => {
  return {
    checkbox: {},
  };
});

export default class Checkboxes extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    checked: false,
  };

  handleChange = (event, checked) => this.setState({checked: checked});

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.container}>
        <Checkbox
          checked={this.state.checked}
          className={classes.checkbox}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

