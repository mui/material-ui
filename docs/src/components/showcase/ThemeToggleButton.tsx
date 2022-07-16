import * as React from 'react';
import Fade from '@mui/material/Fade';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ThemeToggleButton() {
  const [lang, setLang] = React.useState('javascript');
  return (
    <Fade in timeout={700}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={lang}
        exclusive
        onChange={(event, value) => setLang(value)}
        aria-label="language"
        sx={(theme) => ({
          bgcolor: '#fff',
          [theme.getColorSchemeSelector('dark')]: {
            bgcolor: 'primaryDark.800',
          },
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontWeight: 700,
            color: 'grey.700',
            borderColor: 'grey.200',
            [theme.getColorSchemeSelector('dark')]: {
              color: 'grey.300',
              borderColor: 'primaryDark.500',
            },
            '&.Mui-selected': {
              borderColor: 'primary.500',
              color: 'primary.500',
              bgcolor: 'primaryDark.50',
              [theme.getColorSchemeSelector('dark')]: {
                color: '#fff',
                bgcolor: 'primary.800',
              },
            },
          },
        })}
      >
        <ToggleButton value="javascript">React</ToggleButton>
        <ToggleButton value="html">TypeScript</ToggleButton>
        <ToggleButton value="css">CSS</ToggleButton>
      </ToggleButtonGroup>
    </Fade>
  );
}
