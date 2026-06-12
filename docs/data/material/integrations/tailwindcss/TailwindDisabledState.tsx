import * as React from 'react';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

export default function TailwindDisabledState() {
  return (
    <Stack spacing={4} sx={{ maxWidth: 320, width: '100%' }}>
      <div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Volume — enabled vs disabled
        </p>
        <Stack spacing={2}>
          {/* Tailwind's `mui-disabled:` variant adds opacity only when the
              component has the `Mui-disabled` class applied by MUI */}
          <Slider
            defaultValue={70}
            className="mui-disabled:opacity-40 mui-disabled:cursor-not-allowed"
          />
          <Slider
            defaultValue={70}
            disabled
            className="mui-disabled:opacity-40 mui-disabled:cursor-not-allowed"
          />
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Notifications — enabled vs disabled
        </p>
        <Stack spacing={1}>
          <FormControlLabel
            label="Marketing emails"
            control={<Switch className="mui-disabled:opacity-50" />}
          />
          <FormControlLabel
            label="Product updates (disabled)"
            control={<Switch disabled className="mui-disabled:opacity-50" />}
          />
        </Stack>
      </div>
    </Stack>
  );
}
