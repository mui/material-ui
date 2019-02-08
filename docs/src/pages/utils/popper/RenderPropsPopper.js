import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

const styles = theme => ({
  typography: {
    padding: theme.spacing(2),
  },
});

function RenderPropsPopper(props) {
  const { classes } = props;

  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const id = open ? 'render-props-popper' : null;
        return (
          <React.Fragment>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={event => {
                updateAnchorEl(anchorEl ? null : event.currentTarget);
              }}
            >
              Toggle Popper
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <Typography className={classes.typography}>
                      The content of the Popper.
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </React.Fragment>
        );
      }}
    </WithState>
  );
}

RenderPropsPopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderPropsPopper);
