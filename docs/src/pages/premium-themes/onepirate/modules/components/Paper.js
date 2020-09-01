import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MuiPaper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const backgroundStyleMapping = {
  light: 'backgroundLight',
  main: 'backgroundMain',
  dark: 'backgroundDark',
};

const styles = (theme) => ({
  [backgroundStyleMapping['light']]: {
    backgroundColor: theme.palette.secondary.light,
  },
  [backgroundStyleMapping['main']]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [backgroundStyleMapping['dark']]: {
    backgroundColor: theme.palette.secondary.dark,
  },
  padding: {
    padding: theme.spacing(1),
  },
});

function Paper(props) {
  const { background, classes, className, padding, ...other } = props;

  return (
    <MuiPaper
      elevation={0}
      square
      className={clsx(
        classes[backgroundStyleMapping[background]],
        {
          [classes.padding]: !!padding,
        },
        className,
      )}
      {...other}
    />
  );
}

Paper.propTypes = {
  background: PropTypes.oneOf(['dark', 'light', 'main']).isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  padding: PropTypes.bool,
};

export default withStyles(styles)(Paper);
