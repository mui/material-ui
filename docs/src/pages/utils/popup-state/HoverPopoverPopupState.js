import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindHover, bindPopover } from '@material-ui/core/PopupState';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

const HoverPopoverPopupState = ({ classes }) => (
  <PopupState popupId="demoPopover">
    {popupState => (
      <div>
        <Typography {...bindHover(popupState)}>Hover with a Popover.</Typography>
        <Popover
          {...bindPopover(popupState)}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
        >
          <Typography>The content of the Popover.</Typography>
        </Popover>
      </div>
    )}
  </PopupState>
);

HoverPopoverPopupState.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HoverPopoverPopupState);
