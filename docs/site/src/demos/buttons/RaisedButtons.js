import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RaisedButtons', () => {
  return {
    button: {
      margin: '0 10px',
    },
  };
});

export default function RaisedButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button raised={true} className={classes.button}>Default</Button>
      <Button raised={true} primary={true} className={classes.button}>Primary</Button>
      <Button raised={true} accent={true} className={classes.button}>Accent</Button>
    </div>
  );
}

RaisedButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

