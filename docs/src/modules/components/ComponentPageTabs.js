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
    <Box
      className="component-tabs"
      sx={{ display: 'inline' }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
        sx={{
          position: 'sticky',
          top: 5,
          zIndex: 9999,
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
