import React from 'react';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      padding: theme.spacing(1),
      margin: theme.spacing(1, 0),
      border: '1px solid',
      borderColor: theme.palette.text.primary,
    },
  }),
);

function SimplePortal() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);
  const classes = useStyles();

  function handleClick() {
    setShow(!show);
  }

  return (
    <div>
      <Button onClick={handleClick}>{show ? 'Unmount children' : 'Mount children'}</Button>
      <div className={classes.alert}>
        <Typography>It looks like I will render here.</Typography>
        {show ? (
          <Portal container={container.current}>
            <Typography>But I actually render here!</Typography>
          </Portal>
        ) : null}
      </div>
      <div className={classes.alert} ref={container} />
    </div>
  );
}

export default SimplePortal;
