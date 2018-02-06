import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  appFrame: {
    width: 360,
    minHeight: 300,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.easeIn,
    }),
  },
  snackBar: {
    position: 'absolute',
  },
  snackBarContent: {
    width: 360,
  },
});

class FloatingActionButtonZoom extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const fabClassName = classNames(classes.fab, {
      [classes.fabMoveUp]: open,
      [classes.fabMoveDown]: !open,
    });

    return (
      <div className={classes.root}>
        <Button className={classes.button} onClick={this.handleClick}>
          Open snackbar
        </Button>
        <div className={classes.appFrame}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Out of my way!
              </Typography>
            </Toolbar>
          </AppBar>
          <Button variant="fab" color="secondary" className={fabClassName}>
            <AddIcon />
          </Button>
          <Snackbar
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
              className: classes.snackBarContent,
            }}
            message={<span id="message-id">Archived</span>}
            action={[
              <Button key="undo" color="inherit" size="small" onClick={this.handleClose}>
                UNDO
              </Button>,
            ]}
            className={classes.snackBar}
            transitionProps={{ style: { transform: 'translateY(0px) !important' } }}
          />
        </div>
      </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
