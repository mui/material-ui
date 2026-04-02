import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type LinearProgressWithLabelAndValueProps = LinearProgressProps & {
  minValue: number;
  maxValue: number;
  value: number;
};

function LinearProgressWithLabelAndValue({
  maxValue,
  minValue,
  value,
  ...rest
}: LinearProgressWithLabelAndValueProps) {
  const progressText = `${value} out of ${maxValue} files`;
  return (
    <div>
      <Typography
        id="upload-progress-label"
        variant="body2"
        color="text.secondary"
        sx={{ mr: 1 }}
      >
        Uploading photos…
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            aria-labelledby="upload-progress-label"
            aria-valuetext={progressText}
            minValue={minValue}
            maxValue={maxValue}
            value={value}
            {...rest}
          />
        </Box>
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {progressText}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

LinearProgressWithLabelAndValue.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  /**
   * The minimum value of the progress indicator.
   */
  minValue: PropTypes.number.isRequired,
  /**
   * The maximum value of the progress indicator.
   */
  maxValue: PropTypes.number.isRequired,
};

export default function LinearWithAriaValueText() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 10 ? 0 : prevProgress + 1));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabelAndValue value={progress} minValue={0} maxValue={10} />
    </Box>
  );
}
