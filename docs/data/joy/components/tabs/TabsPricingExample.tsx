import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';

export default function TabsPricingExample() {
  return (
    <Tabs
      size="sm"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={(theme) => ({
        width: 343,
        '--Tabs-gap': '0px',
        borderRadius: 'lg',
        boxShadow: 'sm',
        overflow: 'auto',
        border: `1px solid ${theme.vars.palette.divider}`,
      })}
    >
      <TabList
        sx={{
          '--ListItem-radius': '0px',
          borderRadius: 0,
          [`& .${tabClasses.root}`]: {
            fontWeight: 'lg',
            flex: 1,
            bgcolor: 'background.body',
            position: 'relative',
            [`&.${tabClasses.selected}`]: {
              color: 'primary.500',
            },
            [`&.${tabClasses.selected}:before`]: {
              content: '""',
              display: 'block',
              position: 'absolute',
              bottom: -1,
              width: '100%',
              height: 2,
              bgcolor: 'primary.400',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-3px',
            },
          },
        }}
      >
        <Tab sx={{ py: 1.5 }}>Community</Tab>
        <Tab>Pro</Tab>
        <Tab>Premium</Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 3 }}>
        <Typography level="inherit">
          Get started with the industry-standard React UI library, MIT-licensed.
        </Typography>
        <Typography textColor="success.400" fontSize="xl3" fontWeight="xl" my={1}>
          $0{' '}
          <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
            － Free forever
          </Typography>
        </Typography>
      </TabPanel>
      <TabPanel value={1} sx={{ p: 3 }}>
        <Typography level="inherit">
          Best for professional developers building enterprise or data-rich
          applications.
        </Typography>
        <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" my={1}>
          $15{' '}
          <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
            / dev / month
          </Typography>
        </Typography>
      </TabPanel>
      <TabPanel value={2} sx={{ p: 3 }}>
        <Typography level="inherit">
          The most advanced features for data-rich applications, as well as the
          highest priority for support.
        </Typography>
        <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" my={1}>
          <Typography
            fontSize="xl"
            borderRadius="sm"
            px={0.5}
            mr={0.5}
            sx={(theme) => ({
              ...theme.variants.soft.danger,
              color: 'danger.400',
              verticalAlign: 'text-top',
              textDecoration: 'line-through',
            })}
          >
            $49
          </Typography>
          $37*{' '}
          <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
            / dev / month
          </Typography>
        </Typography>
      </TabPanel>
    </Tabs>
  );
}
