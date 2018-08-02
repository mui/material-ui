import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState from '@material-ui/core/PopupState';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

const PopperPopupState = ({ classes }) => (
  <PopupState variant="popper" popupId="demoPopper">
    {({ bindToggle, bindPopup }) => (
      <div>
        <Button variant="contained" {...bindToggle}>
          Toggle Popper
        </Button>
        <Popper {...bindPopup} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>The content of the Popper.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    )}
  </PopupState>
);

PopperPopupState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopperPopupState);
