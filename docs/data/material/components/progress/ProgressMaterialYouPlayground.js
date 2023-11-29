import * as React from 'react';
import LinearProgress from '@mui/material-next/LinearProgress';
import Box from '@mui/material/Box';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';

export default function ProgressMaterialYouPlayground() {
  const [value, setValue] = React.useState(0);
  const [valueBuffer, setValueBuffer] = React.useState(0);
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
      componentName="Slider"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          options: ['buffer', 'determinate', 'indeterminate', 'query'],
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
      renderDemo={(props) => (
        <Box sx={{ width: 300 }}>
          <LinearProgress
            {...props}
            value={value}
            valueBuffer={valueBuffer + value}
          />
        </Box>
      )}
    />
  );
}
