import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Checkbox from '@mui/joy/Checkbox';

export default function FullscreenOverflowDivider() {
  const [shadow, setShadow] = React.useState(false);
  const [clip, setClip] = React.useState(false);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Box
          sx={{
            width: 200,
            py: 5,
            mx: 'auto',
            border: '1px solid',
            borderColor: 'success.300',
            bgcolor: (theme) =>
              `rgba(${theme.vars.palette.success.lightChannel} / 0.5)`,
          }}
        >
          <Divider
            sx={{
              boxShadow: shadow
                ? '0 0 0 100vmax var(--Divider-lineColor)'
                : 'initial',
              clipPath: clip ? 'inset(0px -100vmax)' : 'initial',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 2 }}>
        <Checkbox
          label="box-shadow"
          checked={shadow}
          onChange={(event) => setShadow(event.target.checked)}
        />
        <Checkbox
          label="clip-path"
          checked={clip}
          onChange={(event) => setClip(event.target.checked)}
        />
      </Box>
    </Box>
  );
}
