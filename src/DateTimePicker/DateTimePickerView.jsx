import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui';

const DateTimePickerView = ({
  view, selected, children, classes,
}) => (
  <div className={classnames({ [classes.hidden]: view !== selected })}>
    { children }
  </div>
);

DateTimePickerView.propTypes = {
  view: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  hidden: {
    display: 'none',
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
