import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = createStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

function UnstyledComponent(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return <Button className={classes.root}>Styled with HOC API</Button>;
}

export default withStyles(styles)(UnstyledComponent);
