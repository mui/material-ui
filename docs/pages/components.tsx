import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import BrandingProvider from 'docs/src/BrandingProvider';
import Section from 'docs/src/layouts/Section';
import PageContext from 'docs/src/modules/components/PageContext';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Link from 'docs/src/modules/components/Link';

export default function Home() {
  const { pages } = React.useContext(PageContext);
  const t = useTranslate();
  const componentPageData = pages.find(({ pathname }) => pathname === '/components');
  return (
    <BrandingProvider>
      <Head
        title="Components - MUI"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design. You will develop React applications faster."
      />
      <AppHeader />
      <main>
        <Section bg="gradient" sx={{ py: { xs: 2, sm: 4 } }}>
          <Typography component="h1" variant="h2" sx={{ mb: 4, pl: 1 }}>
            All Components
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
          >
            {(componentPageData?.children || []).map((page) => (
              <Box key={page.pathname} sx={{ pb: 2 }}>
                <Typography
                  component="h2"
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    bgcolor: 'transparent',
                    color: 'grey.600',
                    px: 1,
                  }}
                >
                  {pageToTitleI18n(page, t)}
                </Typography>
                <List>
                  {(page.children || []).map((nestedPage) => (
                    <ListItem key={nestedPage.pathname} disablePadding>
                      <ListItemButton
                        component={Link}
                        noLinkStyle
                        href={nestedPage.pathname}
                        sx={{
                          px: 1,
                          py: 0.5,
                          fontSize: '0.84375rem',
                          fontWeight: 500,
                          '&:hover, &:focus': { '& svg': { opacity: 1 } },
                        }}
                      >
                        {pageToTitleI18n(nestedPage, t) || ''}
                        <KeyboardArrowRightRounded
                          sx={{
                            ml: 'auto',
                            fontSize: '1.125rem',
                            opacity: 0,
                            color: 'primary.main',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </Section>
      </main>
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
