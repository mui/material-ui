import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab, { tabClasses } from '@mui/material/Tab';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { Link } from '@mui/docs/Link';

export const HEIGHT = 50;

const StyledTab = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(0.5),
  border: '1px solid',
  borderColor: 'transparent',
  fontWeight: theme.typography.fontWeightSemiBold,
  minHeight: 30,
  minWidth: 0,
  borderRadius: '8px',
  '&:hover': {
    background: (theme.vars || theme).palette.grey[50],
    borderColor: (theme.vars || theme).palette.divider,
    color: (theme.vars || theme).palette.text.primary,
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      borderColor: (theme.vars || theme).palette.divider,
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
          mt: 2,
          mx: -1,
          backgroundColor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: 1000,
          [`& .${tabsClasses.flexContainer}`]: {
            p: 1,
            gap: 1,
          },
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
        <StyledTab component={Link} href={demosHref} label={t('api-docs.demos')} value="" />
        {headers.components?.length > 0 && (
          <StyledTab
            className="skip-algolia-crawler" // For more details, see https://github.com/mui/material-ui/pull/37539.
            component={Link}
            href={componentsHref}
            label={t('api-docs.componentsApi')}
            value="components-api"
          />
        )}
        {headers.hooks && headers.hooks.length > 0 && (
          <StyledTab
            className="skip-algolia-crawler" // For more details, see https://github.com/mui/material-ui/pull/37539.
            component={Link}
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
