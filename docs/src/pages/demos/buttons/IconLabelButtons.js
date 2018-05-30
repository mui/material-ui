import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import FileUpload from '@material-ui/icons/FileUpload';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button}>
        Delete
        <Delete className={classes.rightIcon} />
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
      <Button variant="contained" color="default" className={classes.button}>
        Upload
        <FileUpload className={classes.rightIcon} />
      </Button>
      <Button variant="contained" disabled color="secondary" className={classes.button}>
        <KeyboardVoice className={classes.leftIcon} />
        Talk
      </Button>
      <Button variant="contained" size="small" className={classes.button}>
        <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
