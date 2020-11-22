import * as React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import MuiSnackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.primary,
      flexWrap: 'inherit',
      [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      },
    },
    contentMessage: {
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
    },
    contentAction: {
      paddingLeft: theme.spacing(2),
    },
    info: {
      flexShrink: 0,
      marginRight: theme.spacing(2),
    },
    close: {
      padding: theme.spacing(1),
    },
  });

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

interface ExtraSnackbarProps {
  closeFunc?: () => void;
}

function Snackbar(
  props: WithStyles<typeof styles> & SnackbarProps & ExtraSnackbarProps,
) {
  const { classes, message, closeFunc, ...other } = props;

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      TransitionComponent={Transition}
      ContentProps={{
        classes: {
          root: classes.content,
          message: classes.contentMessage,
          action: classes.contentAction,
        },
      }}
      message={
        <React.Fragment>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => closeFunc && closeFunc()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default withStyles(styles)(Snackbar);
