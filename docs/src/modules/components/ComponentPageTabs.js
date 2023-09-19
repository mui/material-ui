import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Link from 'docs/src/modules/components/Link';

export const HEIGHT = 50;

const StyledTab = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontWeight: 600,
  minHeight: 32,
  minWidth: 0,
  borderRadius: '12px',
  '&:hover': {
    background: (theme.vars || theme).palette.grey[50],
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      background: (theme.vars || theme).palette.primaryDark[700],
    },
    '&.Mui-selected': {
      color: (theme.vars || theme).palette.primary[300],
    },
  }),
}));

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
          mt: 1,
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
        <StyledTab
          component={Link}
          shallow
          scroll
          href={demosHref}
          label={t('api-docs.demos')}
          value=""
        />
        {headers.components?.length > 0 && (
          <StyledTab
            className="skip-algolia-crawler" // For more details, see https://github.com/mui/material-ui/pull/37539.
            component={Link}
            shallow
            scroll
            href={componentsHref}
            label={t('api-docs.componentsApi')}
            value="components-api"
          />
        )}
        {headers.hooks && headers.hooks.length > 0 && (
          <StyledTab
            className="skip-algolia-crawler" // For more details, see https://github.com/mui/material-ui/pull/37539.
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
      components: PropTypes.array,
      hooks: PropTypes.array,
    }),
  }),
};
