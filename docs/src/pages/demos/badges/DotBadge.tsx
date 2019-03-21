import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
  });

function DotBadge(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <div>
      <div>
        <Badge className={classes.margin} color="primary" variant="dot">
          <MailIcon />
        </Badge>
        <Badge className={classes.margin} color="secondary" variant="dot">
          <MailIcon />
        </Badge>
      </div>
      <Badge color="primary" className={classes.margin} variant="dot">
        <Typography>Typography</Typography>
      </Badge>
    </div>
  );
}

DotBadge.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(DotBadge);
