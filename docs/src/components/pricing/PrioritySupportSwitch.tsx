import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { usePrioritySupport } from 'docs/src/components/pricing/PrioritySupportContext';

export default function PrioritySupportSwitch() {
  const { prioritySupport, setPrioritySupport } = usePrioritySupport();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrioritySupport(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={prioritySupport} onChange={handleChange} />}
        label={
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.875rem' }}
          >
            Add priority support <Box component="span" sx={{ display: ['none', 'block'] }} />
            at $399/year/dev
          </Typography>
        }
        sx={{ mr: 0 }}
        labelPlacement="bottom"
      />
    </FormGroup>
  );
}
