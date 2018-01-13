import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

export const DateTimePickerView = (props) => {
  const {
    view, selected, children, classes,
  } = props;

  if (view !== selected) {
    return null;
  }

  return (
    <div className={classnames({ [classes.hidden]: view !== selected })}>
      { children }
    </div>
  );
};

DateTimePickerView.propTypes = {
  view: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {

};

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
