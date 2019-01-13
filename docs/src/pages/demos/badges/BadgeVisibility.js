import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  divider: {
    width: '100%',
  },
  row: {
    marginTop: theme.spacing.unit * 2,
  },
});

class BadgeVisibility extends React.Component {
  state = {
    invisible: false,
  };

  handleBadgeVisibility = () => {
    this.setState(prevState => ({ invisible: !prevState.invisible }));
  };

  render() {
    const { classes } = this.props;
    const { invisible } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <Badge
            color="secondary"
            badgeContent={4}
            invisible={invisible}
            className={classes.margin}
          >
            <MailIcon />
          </Badge>
          <Badge color="secondary" variant="dot" invisible={invisible} className={classes.margin}>
            <MailIcon />
          </Badge>
        </div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch color="primary" checked={!invisible} onChange={this.handleBadgeVisibility} />
            }
            label="Show Badge"
          />
        </FormGroup>
        <Divider className={classes.divider} />
        <div className={classes.row}>
          <Badge color="secondary" badgeContent={0} className={classes.margin}>
            <MailIcon />
          </Badge>
          <Badge color="secondary" badgeContent={0} showZero className={classes.margin}>
            <MailIcon />
          </Badge>
        </div>
      </div>
    );
  }
}

BadgeVisibility.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgeVisibility);
