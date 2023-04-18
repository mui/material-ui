import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function Header() {
  return (
    <Sheet sx={{ bgcolor: 'background.body', pt: 4, px: 4, flex: 1 }}>
      <Typography level="h1" fontSize="xl2">
        My profile
      </Typography>
      <Tabs>
        <TabList
          variant="plain"
          size="sm"
          sx={{
            '--ListItem-minHeight': '48px',
            '--Chip-minHeight': '20px',
            width: '100%',
            mx: 'calc(-1 * (var(--List-padding) + var(--ListItem-paddingX)))',
            alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--ListItem-paddingLeft)',
                  right: 'var(--ListItem-paddingRight)',
                  height: '2px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab>My detail</Tab>
          <Tab>Profile</Tab>
          <Tab>Password</Tab>
          <Tab>
            Team{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              2
            </Chip>
          </Tab>
          <Tab>Plan</Tab>
          <Tab>
            Billing{' '}
            <Chip size="sm" variant="soft" color="neutral" sx={{ ml: 1 }}>
              4
            </Chip>
          </Tab>
          <Tab>Email</Tab>
          <Tab>Notifications</Tab>
          <Tab>Integrations</Tab>
          <Tab>API</Tab>
        </TabList>
      </Tabs>
    </Sheet>
  );
}
