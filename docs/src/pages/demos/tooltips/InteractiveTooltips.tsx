import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  });

function InteractiveTooltips(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <div>
      <Tooltip title="Add" interactive>
        <Button className={classes.button}>Interactive</Button>
      </Tooltip>
      <Tooltip title="Add">
        <Button className={classes.button}>Non Interactive</Button>
      </Tooltip>
    </div>
  );
}

InteractiveTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(InteractiveTooltips);
