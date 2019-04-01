import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  appFrame: {
    height: 356,
    background: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));

function FabIntegrationSnackbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Button className={classes.button} onClick={handleClick}>
        Open snackbar
      </Button>
      <div className={classes.appFrame}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Out of my way!
            </Typography>
          </Toolbar>
        </AppBar>
        <Fab color="secondary" className={classes.fab}>
          <AddIcon />
        </Fab>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
          }}
          message={<span id="snackbar-fab-message-id">Archived</span>}
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              Undo
            </Button>
          }
          className={classes.snackbar}
        />
      </div>
    </div>
  );
}

export default FabIntegrationSnackbar;
