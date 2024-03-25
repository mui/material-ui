import * as React from 'react';
import CircularProgress from '@mui/material-next/CircularProgress';
import LinearProgress from '@mui/material-next/LinearProgress';
import Box from '@mui/material/Box';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function ProgressMaterialYouPlayground() {
  const [value, setValue] = React.useState(0);
  const [valueBuffer, setValueBuffer] = React.useState(0);
  const [type, setType] = React.useState('CircularProgress');
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((val) => (val >= 100 ? 0 : val + 10));
      setValueBuffer(Math.floor(Math.random() * 10));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <MaterialYouUsageDemo
      componentName={type}
      data={[
        {
          propName: 'type',
          knob: 'select',
          options: ['CircularProgress', 'LinearProgress'],
          defaultValue: 'CircularProgress',
          codeBlockDisplay: false,
          onChange: (e) => setType(e.target.value),
        },
        {
          propName: 'variant',
          knob: 'select',
          options: [
            'indeterminate',
            'determinate',
            ...(type === 'LinearProgress' ? ['buffer', 'query'] : []),
          ],
          defaultValue: 'indeterminate',
        },
        {
          propName: 'color',
          knob: 'select',
          options: ['primary', 'secondary', 'tertiary'],
          defaultValue: 'primary',
        },
        { propName: 'fourColor', knob: 'switch', defaultValue: false },
      ]}
      renderDemo={({ type: progressType, ...props }) => (
        <Box
          sx={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {type === 'CircularProgress' ? (
            <CircularProgress {...props} value={value} />
          ) : (
            <LinearProgress
              {...props}
              value={value}
              valueBuffer={valueBuffer + value}
              sx={{ width: 300 }}
            />
          )}
        </Box>
      )}
    />
  );
}
