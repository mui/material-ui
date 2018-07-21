import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

class FakedReferencePopper extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleMouseUp = () => {
    const selection = window.getSelection();

    // Resets when the selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      this.handleClose();
      return;
    }

    const boundingClientRect = selection.getRangeAt(0).getBoundingClientRect();

    const virtualAnchorEl = {
      clientWidth: boundingClientRect.width,
      clientHeight: boundingClientRect.height,
      getBoundingClientRect: () => boundingClientRect,
    };

    this.setState(state => ({
      anchorEl: virtualAnchorEl,
      open: !state.open,
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div onMouseLeave={this.handleClose}>
        <Typography variant="caption">Highlight part of the text to see the popper</Typography>
        <Typography variant="body1" onMouseUp={this.handleMouseUp}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
          amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi
          finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada
          ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis
          finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet
          facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse
          lacinia tellus a libero volutpat maximus.
        </Typography>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography className={classes.typography}>The content of the Popper.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

FakedReferencePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FakedReferencePopper);
