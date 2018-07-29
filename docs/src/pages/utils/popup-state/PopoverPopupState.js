import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState from '@material-ui/core/PopupState';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

const PopoverPopupState = ({ classes }) => (
  <PopupState>
    {({ bindTrigger, bindPopup }) => (
      <div>
        <Button variant="contained" {...bindTrigger}>
          Open Popover
        </Button>
        <Popover
          {...bindPopup}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>The content of the Popover.</Typography>
        </Popover>
      </div>
    )}
  </PopupState>
);

PopoverPopupState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopoverPopupState);
