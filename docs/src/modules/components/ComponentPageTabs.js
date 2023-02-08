import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default function ComponentPageTabs(props) {
  const {
    markdown: { headers },
    activeTab,
    setActiveTab,
    children,
  } = props;

  return (
    <Box className="component-tabs" sx={{ display: 'inline' }}>
      <Tabs
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
        sx={{
          position: 'sticky',
          // to be positioned below the app bar
          top: 65,
          mx: -2,
          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(10, 25, 41, 0.7)' : 'rgba(255,255,255,0.8)',
          zIndex: 1000,
        }}
      >
        <Tab label="Demos" value="" />
        <Tab label="Component API" value="component-api" />
        {headers.hooks && headers.hooks.length > 0 && <Tab label="Hook API" value="hook-api" />}
      </Tabs>
      {children}
    </Box>
  );
}
