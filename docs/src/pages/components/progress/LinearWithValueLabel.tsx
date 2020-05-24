import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography, Box, LinearProgressProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    valueLabel: {
      minWidth: theme.spacing(4),
    },
  }),
);

const LinearProgressWithValueLabel = (props: LinearProgressProps) => {
  const { variant, value, color } = props;
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant={variant} color={color} value={value} />
      </Box>
      <Typography
        className={classes.valueLabel}
        variant="body2"
        color="textSecondary"
      >{`${Math.round(props.value as number)}%`}</Typography>
    </Box>
  );
};

export default function LinearDeterminate() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgressWithValueLabel variant="determinate" value={Math.floor(completed / 10) * 10} />
      <LinearProgressWithValueLabel variant="determinate" value={completed} color="secondary" />
    </div>
  );
}
