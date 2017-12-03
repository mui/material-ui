import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import SaveIcon from 'material-ui-icons/Save';
import PrintIcon from 'material-ui-icons/Print';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  root: {
    height: 400,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const actions = [
  { icon: <ContentCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <DeleteIcon />, name: 'Delete' },
];

class SpeedDials extends React.Component {
  state = {
    open: false,
    hidden: true,
  };

  handleVisibility = () => {
    this.setState({
      open: false,
      hidden: !this.state.hidden,
    });
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    /* returns an array of buttons based on the `actions` array */
    const SpeedDialActions = actions.map(action => {
      return (
        <SpeedDialAction
          icon={action.icon}
          tooltipTitle={action.name}
          key={action.name}
          onClick={this.handleClick}
        />
      );
    });

    return (
      <div className={classes.root}>
        <Button onClick={this.handleVisibility}>Speed Dial</Button>
        <SpeedDial
          icon={<SpeedDialIcon />}
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          open={open}
          hidden={hidden}
          onClick={this.handleClick}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          onFocus={this.handleOpen}
          onBlur={this.handleClose}
          onClose={this.handleClose}
        >
          {SpeedDialActions}
        </SpeedDial>
      </div>
    );
  }
}

SpeedDials.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeedDials);
