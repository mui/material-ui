import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import Link from 'docs/src/modules/components/Link';

export default function ComponentPageTabs(props) {
  const {
    activeTab,
    children,
    markdown: { headers },
  } = props;
  const router = useRouter();
  const t = useTranslate();

  const demosHref = router.pathname.endsWith('[docsTab]')
    ? router.pathname.replace('[docsTab]', '')
    : router.pathname;
  const apiPathname = `${demosHref.endsWith('/') ? demosHref : `${demosHref}/`}`;
  const componentsHref = `${apiPathname}components-api`;
  const hooksHref = `${apiPathname}hooks-api`;

  return (
    <Box className="component-tabs" sx={{ display: 'inline' }}>
      <Tabs
        value={activeTab}
        sx={{
          position: 'sticky',
          top: 65, // to be positioned below the app bar
          mt: 3,
          pt: 1,
          mx: {
            xs: -2,
            sm: 0,
          },
          px: {
            xs: 2,
            sm: 0,
          },
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : 'rgba(255,255,255)',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: 1000,
          [`& .${tabsClasses.indicator}`]: {
            transition: 'none',
          },
          // Make server side styles closer to hydrated
          [`& .${tabClasses.root}`]: {
            overflow: 'visible',
            [`& .${tabsClasses.indicator}`]: {
              top: '39px',
              borderRadius: 0,
            },
          },
        }}
      >
        <Tab
          component={Link}
          shallow
          scroll
          href={demosHref}
          label={t('api-docs.demos')}
          value=""
        />
        <Tab
          component={Link}
          shallow
          scroll
          href={componentsHref}
          label={t('api-docs.componentsApi')}
          value="components-api"
        />
        {headers.hooks && headers.hooks.length > 0 && (
          <Tab
            component={Link}
            shallow
            scroll
            href={hooksHref}
            label={t('api-docs.hooksApi')}
            value="hooks-api"
          />
        )}
      </Tabs>
      {children}
    </Box>
  );
}

ComponentPageTabs.propTypes = {
  activeTab: PropTypes.string,
  children: PropTypes.node,
  markdown: PropTypes.shape({
    headers: PropTypes.shape({
      hooks: PropTypes.array,
    }),
  }),
};
