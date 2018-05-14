import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';

const PickerToolbar = (props) => {
  const {
    children, className, classes, ...other
  } = props;

  return (
    <Toolbar className={classnames(classes.toolbar, className)} {...other}>
      { children }
    </Toolbar>
  );
};

PickerToolbar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

PickerToolbar.defaultProps = {
  className: '',
};

const styles = theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100,
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.primary.main
      : theme.palette.background.default,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
