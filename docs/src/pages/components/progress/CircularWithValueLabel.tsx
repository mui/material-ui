import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Box, CircularProgressProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

const CircularProgressWithValueLabel = (props: CircularProgressProps) => {
  return (
    <Box position="relative" display="inline-block">
      <CircularProgress variant={props.variant} value={props.value} color={props.color} />
      <Box
        top={-3}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
};

export default function CircularStatic() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    }

    const timer = setInterval(progress, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <CircularProgressWithValueLabel
        variant="static"
        value={Math.floor(completed / 10) * 10}
        color={'primary'}
      />
      <CircularProgressWithValueLabel variant="determinate" value={completed} color={'secondary'} />
    </div>
  );
}
