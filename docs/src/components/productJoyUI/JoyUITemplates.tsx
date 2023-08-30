import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/joy/Tabs';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';
import FilesApp from 'docs/data/joy/getting-started/templates/files/App';
import TeamApp from 'docs/data/joy/getting-started/templates/team/App';
import EmailApp from 'docs/data/joy/getting-started/templates/email/App';
import DashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import SignInApp from 'docs/data/joy/getting-started/templates/sign-in-side/App';

export default function JoyUITemplates() {
  return (
    <Section bg="comfort">
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          alwaysCenter
          overline="Fresh look & feel"
          title={
            <Typography variant="h2" textAlign="center">
              Get started quickly with Joy UI
              <br />
              using <GradientText>free templates</GradientText>
            </Typography>
          }
        />
      </Box>
      <Box sx={{ my: 3 }}>
        <Tabs
          sx={{
            '& [role="tabpanel"]': {
              boxShadow: '0 0 0 6px rgba(0 0 0 / 0.12)',
              borderRadius: 'lg',
              maxHeight: 600,
              p: 0,
              transform: 'scale(0.9)',
              transformOrigin: 'center center',
              overflow: 'auto hidden',
            },
          }}
        >
          <TabList>
            <Tab>Team</Tab>
            <Tab>Files</Tab>
            <Tab>Email</Tab>
            <Tab>Dashboard</Tab>
            <Tab>Sign-in</Tab>
          </TabList>
          <TabPanel value={0}>
            <TeamApp />
          </TabPanel>
          <TabPanel value={1}>
            <FilesApp />
          </TabPanel>
          <TabPanel value={2}>
            <EmailApp />
          </TabPanel>
          <TabPanel value={3}>
            <DashboardApp />
          </TabPanel>
          <TabPanel
            value={4}
            sx={{
              '--Cover-width': '40%',
              '--Form-maxWidth': '768px',
              '& > div:first-of-type': {
                width:
                  'clamp(100% - var(--Cover-width), (var(--Collapsed-breakpoint) - 100%) * 999, 100%)',
              },
              '& > div:last-of-type': {
                left: 'clamp(0px, (100% - var(--Collapsed-breakpoint)) * 999, 100% - var(--Cover-width))',
              },
            }}
          >
            <SignInApp />
          </TabPanel>
        </Tabs>
      </Box>
    </Section>
  );
}
