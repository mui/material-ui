import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('BasicTextField', () => {
  return {
    button: {
      margin: '0 10px',
    },
  };
});

export default function BasicTextField(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <TextField />
    </div>
  );
}

BasicTextField.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

