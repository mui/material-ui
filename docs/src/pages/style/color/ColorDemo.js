import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    width: 260,
    height: 360,
    backgroundColor: theme.palette.background.paper,
  },
  statusBar: {
    width: '100%',
    height: 24,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const ColorDemo = props => {
  const { classes, primary, theme, secondary } = props;
  theme.palette.augmentColor(primary);
  theme.palette.augmentColor(secondary);

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <div className={classes.statusBar} style={{ backgroundColor: primary.dark }} />
        <AppBar position="static" style={{ backgroundColor: primary.main }}>
          <Toolbar style={{ color: primary.contrastText }}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Color sample
            </Typography>
          </Toolbar>
        </AppBar>
        <pre>
          {`
    palette: {
      primary: {
        main: '${primary.main}',
      },
      secondary: {
        main: '${secondary.main}',
      },
    },
        `}
        </pre>
        <Button variant="fab" className={classes.fab} style={{ backgroundColor: secondary.main }}>
          <AddIcon nativeColor={secondary.contrastText} />
        </Button>
      </div>
    </div>
  );
};

ColorDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ColorDemo);
