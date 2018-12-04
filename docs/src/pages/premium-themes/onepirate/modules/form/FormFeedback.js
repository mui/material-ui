import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  error: {
    backgroundColor: theme.palette.error.xLight,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.xLight,
    color: theme.palette.success.dark,
  },
});

function FormFeedback(props) {
  return (
    <div
      className={classNames(
        props.classes.root,
        { [props.classes.error]: props.error, [props.classes.success]: props.success },
        props.className,
      )}
    >
      <Typography color="inherit">{props.children}</Typography>
    </div>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default withStyles(styles)(FormFeedback);
