import * as React from 'react';
import { Icon, IconButton, Grid, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  root: theme.mixins.gutters({
    marginTop: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }),
  error: {
    backgroundColor: red[400],
  },
  warning: {
    backgroundColor: orange[400],
  },
  info: {
    backgroundColor: blue[400],
  },
  success: {
    backgroundColor: green[400],
  },
  textColor: {
    color: '#fff',
  },
  iconColor: {
    color: '#ffffffaa',
  },
});

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onCloseClick() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { classes } = this.props;
    const iconColumn = this.props.showIcon === true ? 2 : 0;
    const buttonColumn = this.props.showCloseButton === true ? 1 : 0;
    const centerColumn = 12 - iconColumn - buttonColumn;

    return (
      <Paper className={classNames(classes.root, classes[this.props.type])} elevation={4}>
        <Grid container alignItems="center">
          {this.props.showIcon && (
            <Grid item xs={iconColumn} style={{ maxWidth: 40 }}>
              <Icon className={classes.iconColor} style={{ fontSize: 30 }}>
                {this.props.type === 'success' ? 'check_circle' : this.props.type}
              </Icon>
            </Grid>
          )}
          <Grid item xs={centerColumn}>
            <Typography className={classes.textColor} variant="subheading">
              {this.props.children}
            </Typography>
          </Grid>
          {this.props.showCloseButton && (
            <Grid item xs={buttonColumn}>
              {/* eslint-disable-next-line react/jsx-handler-names */}
              <IconButton onClick={this.onCloseClick}>
                <Close className={classes.textColor} style={{ fontSize: 15 }} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  }
}

NotificationBar.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  showIcon: PropTypes.bool,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

NotificationBar.defaultProps = {
  showCloseButton: false,
  showIcon: true,
  type: 'error',
};

export default withStyles(styles)(NotificationBar);
