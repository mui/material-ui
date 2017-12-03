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
import EditIcon from 'material-ui-icons/ModeEdit';

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

class OpenIconSpeedDial extends React.Component {
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
        <Button onClick={this.handleVisibility}>Speed Dial with openIcon</Button>
        <SpeedDial
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          open={open}
          hidden={hidden}
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
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

OpenIconSpeedDial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpenIconSpeedDial);
