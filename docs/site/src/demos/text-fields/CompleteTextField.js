import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import TextField, {TextFieldInput, TextFieldLabel} from 'material-ui/TextField';

const styleSheet = createStyleSheet('CompleteTextField', () => {
  return {
    textField: {
      display: 'flex',
      margin: '0 10px',
    },
    label: {
      order: 1,
    },
    input: {
      order: 0,
    },
  };
});

export default class CompleteTextField extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <TextField className={classes.textField}>
          <TextFieldLabel className={classes.label} htmlFor="name">
            Name
          </TextFieldLabel>
          <TextFieldInput
            className={classes.input}
            id="name"
            defaultValue="Nathan Marks"
          />
        </TextField>
      </div>
    );
  }
}

