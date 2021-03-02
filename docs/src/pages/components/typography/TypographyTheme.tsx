import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function TypographyTheme() {
  return (
    <Box
      sx={{
        typography: 'button',
        bgcolor: 'background.paper',
        p: 1,
      }}
    >
      {"This div's text looks like that of a button."}
    </Box>
  );
}
