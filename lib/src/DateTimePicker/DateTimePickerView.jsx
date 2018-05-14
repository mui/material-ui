import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

export const DateTimePickerView = (props) => {
  const {
    view, selected, children, classes, timeout,
  } = props;

  if (timeout) {
    return (
      <Fade
        in={view === selected}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.view}>
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
};

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
