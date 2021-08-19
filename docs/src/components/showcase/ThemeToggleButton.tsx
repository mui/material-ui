import * as React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

export default function ThemeToggleButton() {
  const [lang, setLang] = React.useState('javascript');

  return (
    <ToggleButtonGroup
      fullWidth
      color="primary"
      value={lang}
      exclusive
      onChange={(event, value) => setLang(value)}
      aria-label="language"
      sx={{
        '& .MuiToggleButton-root': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primaryDark[500]
              : theme.palette.grey[200],
          '&.Mui-selected': {
            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary[500]),
            borderColor: 'primary.500',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[800]
                : theme.palette.primaryDark[50],
          },
        },
      }}
    >
      <ToggleButton value="javascript">Javascript</ToggleButton>
      <ToggleButton value="html">HTML</ToggleButton>
      <ToggleButton value="css">CSS</ToggleButton>
    </ToggleButtonGroup>
  );
}
