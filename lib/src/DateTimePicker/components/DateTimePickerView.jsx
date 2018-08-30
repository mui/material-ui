import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

export const DateTimePickerView = ({
  selected, children, classes,
}) => {
  if (!selected) {
    return null;
  }

  return (
    <div className={classes.view}>
      { children }
    </div>
  );
};

DateTimePickerView.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  view: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
