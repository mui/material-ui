import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import Fade from 'material-ui/transitions/Fade';

export const DateTimePickerView = (props) => {
  const {
    view, selected, children, classes, timeout,
  } = props;

  if (timeout) {
    return (
      <Fade in={view === selected} timeout={timeout}>
        <div className={classnames(classes.view, { [classes.disabled]: view !== selected })}>
          { children }
        </div>
      </Fade>
    );
  }

  if (view !== selected) {
    return null;
  }

  return (
    <div className={classes.view}>
      { children }
    </div>
  );
};

DateTimePickerView.propTypes = {
  timeout: PropTypes.number,
  view: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

DateTimePickerView.defaultProps = {
  timeout: undefined,
};

const styles = {
  view: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  disabled: {
    zIndex: 0,
    '& *': {
      pointerEvents: 'none',
    },
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
