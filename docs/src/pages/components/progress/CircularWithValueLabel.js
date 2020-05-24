import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularStatic() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    }

    const timer = setInterval(progress, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const CircularProgressWithValueLabel = (props) => {
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
          <Typography variant="caption" component="div" color="textSecondary">
            {`${props.value}%`}
          </Typography>
        </Box>
      </Box>
    );
  };

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
