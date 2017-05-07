// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('FlatButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

function FlatButtons(props) {
  const classes = props.classes;
  return (
    <div>
      <Button className={classes.button}>Default</Button>
      <Button primary className={classes.button}>Primary</Button>
      <Button accent className={classes.button}>Accent</Button>
      <Button contrast className={classes.button}>Contrast</Button>
      <Button disabled className={classes.button}>Disabled</Button>
    </div>
  );
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FlatButtons);
