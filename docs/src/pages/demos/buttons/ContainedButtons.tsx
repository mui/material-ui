import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  });

function ContainedButtons(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" className={classes.button}>
        Default
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="contained" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ContainedButtons);
