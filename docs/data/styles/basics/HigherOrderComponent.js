import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function UnstyledComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Styled with HOC API</Button>;
}

UnstyledComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnstyledComponent);
