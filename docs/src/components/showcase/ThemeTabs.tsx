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
            bgcolor: 'primary.500',
            borderRadius: '10px',
            boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
            [`& .${tabsClasses.indicator}`]: {
              backgroundColor: 'transparent',
              '&:before': {
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
              color: 'primary.100',
              fontSize: '1rem',
              '&.Mui-selected': {
                color: '#fff',
              },
            },
          },
          (theme) =>
            theme.applyDarkStyles({
              bgcolor: 'primary.700',
              [`& .${tabClasses.root}`]: {
                color: 'primary.200',
              },
            }),
        ]}
      >
        <Tab label="Yesterday" />
        <Tab label="Today" />
        <Tab label="Tomorrow" />
      </Tabs>
    </Fade>
  );
}
