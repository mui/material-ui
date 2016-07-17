import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
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
      <Button raised className={classes.button}>Default</Button>
      <Button raised primary className={classes.button}>Primary</Button>
      <Button raised accent className={classes.button}>Accent</Button>
      <Button
        raised
        disabled
        accent
        className={classes.button}
      >
        Disabled
      </Button>
    </div>
  );
}

RaisedButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

