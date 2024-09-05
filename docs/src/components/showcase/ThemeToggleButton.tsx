import * as React from 'react';
import Fade from '@mui/material/Fade';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ThemeToggleButton() {
  const [lang, setLang] = React.useState('joy');
  return (
    <Fade in timeout={700}>
      <ToggleButtonGroup
        fullWidth
        // size="small"
        color="primary"
        value={lang}
        exclusive
        onChange={(event, value) => setLang(value)}
        aria-label="language"
        sx={[
          {
            bgcolor: '#fff',
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.700',
                bgcolor: 'primary.50',
              },
            },
          },
          (theme) =>
            theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
              '& .MuiToggleButton-root': {
                '&.Mui-selected': {
                  color: 'primary.100',
                  bgcolor: 'primary.900',
                },
              },
            }),
        ]}
      >
        <ToggleButton value="joy">Joy UI</ToggleButton>
        <ToggleButton value="material">Material UI</ToggleButton>
        <ToggleButton value="base">Base UI</ToggleButton>
      </ToggleButtonGroup>
    </Fade>
  );
}
