import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  valueLabel: {
    minWidth: theme.spacing(4),
  },
}));

const LinearProgressWithValueLabel = (props) => {
  const { variant, value, color } = props;
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant={variant} color={color} value={value} />
      </Box>
      <Typography className={classes.valueLabel} variant="body2" color="textSecondary">
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
};

LinearProgressWithValueLabel.propTypes = {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
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
