import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  borderBottom: 1,
  borderBottomColor: theme.palette.divider,
  borderBottomStyle: 'solid',
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SecondaryNavbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        top: { xs: 56, md: 64 },
      }}
    >
      <StyledToolbar variant="dense">
        <Stack
          maxWidth="xl"
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          flexGrow={1}
        >
          <Tabs value={value} onChange={handleChange} aria-label="navbar tabs">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Analytics" {...a11yProps(1)} />
            <Tab label="Clients" {...a11yProps(2)} />
          </Tabs>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
}
