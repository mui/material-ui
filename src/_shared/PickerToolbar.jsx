import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Toolbar, withStyles } from 'material-ui';

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
    backgroundColor: theme.palette.primary[500],
    height: 100,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
