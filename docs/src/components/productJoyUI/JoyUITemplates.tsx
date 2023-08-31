import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { extendTheme } from '@mui/joy/styles';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Tabs from '@mui/joy/Tabs';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';
import FilesApp from 'docs/data/joy/getting-started/templates/files/App';
import TeamApp from 'docs/data/joy/getting-started/templates/team/App';
import EmailApp from 'docs/data/joy/getting-started/templates/email/App';
import DashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import SignInApp from 'docs/data/joy/getting-started/templates/sign-in-side/App';

export default function JoyUITemplates() {
  const [customTheme, setCustomTheme] = React.useState(() =>
    extendTheme({
      radius: {
        xs: '1.25rem',
        sm: '1.25rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    }),
  );
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
            bgcolor: 'transparent',
            '& [role="tabpanel"]': {
              '--_scale': '0.9',
              boxShadow: '0 0 0 6px rgba(var(--joy-palette-neutral-mainChannel) / 0.32)',
              borderRadius: 'lg',
              height: 'clamp(500px / var(--_scale), 80vh, 600px / var(--_scale))',
              p: 0,
              transform: 'scale(var(--_scale))',
              transformOrigin: 'center center',
              overflow: 'auto hidden',
            },
          }}
        >
          <List
            variant="outlined"
            component="div"
            orientation="horizontal"
            sx={{
              borderRadius: 'xl',
              fontWeight: 'lg',
              px: 0,
              mx: 'auto',
              overflow: 'auto',
              maxWidth: '100%',
            }}
          >
            <TabList
              variant="plain"
              size="sm"
              disableUnderline
              sx={(theme) => ({
                alignSelf: 'center',
                p: 0.5,
                gap: 0.5,
                borderRadius: 'xl',
                flex: 'none',
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  ...theme.variants.solid.neutral,
                  bgcolor: 'neutral.700',
                },
              })}
            >
              <Tab disableIndicator>Team</Tab>
              <Tab disableIndicator>Files</Tab>
              <Tab disableIndicator>Email</Tab>
              <Tab disableIndicator>Dashboard</Tab>
              <Tab disableIndicator>Sign-in</Tab>
            </TabList>
            <ListDivider />
            <ListItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link href="#" level="body-sm" endDecorator={<ArrowForwardIcon />}>
                View all
              </Link>
            </ListItem>
          </List>
          <TabPanel value={0}>
            <TeamApp
              attribute="data-mui-color-scheme"
              modeStorageKey="mui-mode"
              colorSchemeStorageKey="mui-color-scheme"
              theme={customTheme}
            />
          </TabPanel>
          <TabPanel value={1}>
            <FilesApp
              attribute="data-mui-color-scheme"
              modeStorageKey="mui-mode"
              colorSchemeStorageKey="mui-color-scheme"
              theme={customTheme}
            />
          </TabPanel>
          <TabPanel value={2}>
            <EmailApp
              attribute="data-mui-color-scheme"
              modeStorageKey="mui-mode"
              colorSchemeStorageKey="mui-color-scheme"
              theme={customTheme}
            />
          </TabPanel>
          <TabPanel value={3}>
            <DashboardApp
              attribute="data-mui-color-scheme"
              modeStorageKey="mui-mode"
              colorSchemeStorageKey="mui-color-scheme"
              theme={customTheme}
            />
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
            <SignInApp
              attribute="data-mui-color-scheme"
              modeStorageKey="mui-mode"
              colorSchemeStorageKey="mui-color-scheme"
              theme={customTheme}
            />
          </TabPanel>
        </Tabs>
      </Box>
    </Section>
  );
}
