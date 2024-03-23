import * as React from 'react';
import Fade from '@mui/material/Fade';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';

export default function ThemeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fade in timeout={700}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="theme example"
        variant="fullWidth"
        sx={[
          {
            borderRadius: 1,
            background:
              'linear-gradient(180deg, var(--muidocs-palette-primary-600) 0%, var(--muidocs-palette-primary-700) 100%)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.04)',
            [`& .${tabsClasses.indicator}`]: {
              backgroundColor: 'transparent',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 30,
                right: 30,
                height: '100%',
                backgroundColor: '#fff',
              },
            },
            [`& .${tabClasses.root}`]: {
              minHeight: 48,
              margin: 0,
              color: 'primary.100',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&.Mui-selected': {
                color: '#fff',
              },
            },
          },
        ]}
      >
        <Tab label="Material UI" />
        <Tab label="Base UI" />
        <Tab label="Joy UI" />
      </Tabs>
    </Fade>
  );
}
