import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';

export default function TabsPricingExample() {
  return (
    <Tabs
      variant="outlined"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={{ width: 343, borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Community
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Pro
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          Premium
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <Typography level="inherit">
          Get started with the industry-standard React UI library, MIT-licensed.
        </Typography>
        <Typography
          textColor="success.400"
          sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
        >
          $0{' '}
          <Typography
            textColor="text.secondary"
            sx={{ fontSize: 'sm', fontWeight: 'md' }}
          >
            － Free forever
          </Typography>
        </Typography>
      </TabPanel>
      <TabPanel value={1}>
        <Typography level="inherit">
          Best for professional developers building enterprise or data-rich
          applications.
        </Typography>
        <Typography
          textColor="primary.400"
          sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
        >
          $15{' '}
          <Typography
            textColor="text.secondary"
            sx={{ fontSize: 'sm', fontWeight: 'md' }}
          >
            / dev / month
          </Typography>
        </Typography>
      </TabPanel>
      <TabPanel value={2}>
        <Typography level="inherit">
          The most advanced features for data-rich applications, as well as the
          highest priority for support.
        </Typography>
        <Typography
          textColor="primary.400"
          sx={{ fontSize: 'xl3', fontWeight: 'xl', mt: 1 }}
        >
          <Typography
            sx={[
              {
                fontSize: 'xl',
                borderRadius: 'sm',
                px: 0.5,
                mr: 0.5,
              },
              (theme) => ({
                ...theme.variants.soft.danger,
                color: 'danger.400',
                verticalAlign: 'text-top',
                textDecoration: 'line-through',
              }),
            ]}
          >
            $49
          </Typography>
          $37*{' '}
          <Typography
            textColor="text.secondary"
            sx={{ fontSize: 'sm', fontWeight: 'md' }}
          >
            / dev / month
          </Typography>
        </Typography>
      </TabPanel>
    </Tabs>
  );
}
