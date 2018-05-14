import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const ToolbarButton = (props) => {
  const {
    classes, selected, label, className, ...other
  } = props;

  return (
    <Typography
      className={classnames(classes.toolbarBtn, className, {
        [classes.toolbarBtnSelected]: selected,
      })}
      {...other}
    >
      { label }
    </Typography>
  );
};

ToolbarButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ToolbarButton.defaultProps = {
  className: '',
};

const styles = theme => ({
  toolbarBtn: {
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.54)',
  },
  toolbarBtnSelected: {
    color: theme.palette.common.white,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
