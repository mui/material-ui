import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

const styles = theme => ({
  typography: {
    margin: theme.spacing(2),
  },
});

function RenderPropsPopover(props) {
  const { classes } = props;

  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        return (
          <React.Fragment>
            <Button
              aria-owns={open ? 'render-props-popover' : undefined}
              aria-haspopup="true"
              variant="contained"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              Open Popover
            </Button>
            <Popover
              id="render-props-popover"
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                updateAnchorEl(null);
              }}
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
          </React.Fragment>
        );
      }}
    </WithState>
  );
}

RenderPropsPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderPropsPopover);
