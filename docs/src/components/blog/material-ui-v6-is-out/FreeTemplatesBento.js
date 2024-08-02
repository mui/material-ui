import * as React from 'react';
import Box from '@mui/material/Box';

export default function FreeTemplatesBento() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          py: 3,
          background: 'var(--muidocs-palette-gradients-linearSubtle)',
        }}
      >
        <Box
          component="img"
          src="/static/blog/material-ui-v6-is-out/light-templates.png"
          sx={(theme) => ({
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            display: 'block',
            height: 'auto',
            ...theme.applyStyles('dark', {
              content: `url(/static/blog/material-ui-v6-is-out/dark-templates.png)`,
            }),
          })}
        />
      </Box>
    </Box>
  );
}
