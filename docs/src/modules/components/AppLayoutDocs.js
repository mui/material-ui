import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { exactProp } from '@mui/utils';
import GlobalStyles from '@mui/material/GlobalStyles';
import NoSsr from '@mui/material/NoSsr';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';
import BackToTop from 'docs/src/modules/components/BackToTop';

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => ({
  display: 'flex',
  width: '100%',
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(1deg, ${theme.palette.primaryDark[900]} 0%, ${theme.palette.primaryDark[800]} 100%)`
      : `linear-gradient(180deg, ${theme.palette.grey[50]} 40%, #FFFFFF 100%)`,
  backgroundSize: '100% 300px',
  backgroundRepeat: 'no-repeat',
  ...(disableToc && {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5%',
    },
  }),
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
  },
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'disableToc',
})(({ disableAd, disableToc, theme }) => {
  return {
    position: 'relative',
    ...(!disableAd && {
      '&& .description': {
        marginBottom: 198,
      },
      '&& .description.ad': {
        marginBottom: 40,
      },
    }),
    ...(!disableToc && {
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100% - var(--MuiDocs-toc-width))',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '60px',
        paddingRight: '60px',
      },
    }),
  };
});

const ActionsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: -10,
  marginBottom: -15,
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'flex-end',
  },
}));

function AppLayoutDocs(props) {
  const router = useRouter();
  const {
    children,
    description,
    disableAd = false,
    disableToc = false,
    location,
    title,
    toc,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const { canonicalAs } = pathnameToLanguage(router.asPath);
  let productName = 'MUI';
  if (canonicalAs.startsWith('/material-ui/')) {
    productName = 'Material UI';
  } else if (canonicalAs.startsWith('/base/')) {
    productName = 'MUI Base';
  } else if (canonicalAs.startsWith('/x/')) {
    productName = 'MUI X';
  } else if (canonicalAs.startsWith('/system/')) {
    productName = 'MUI System';
  } else if (canonicalAs.startsWith('/toolpad/')) {
    productName = 'MUI Toolpad';
  } else if (canonicalAs.startsWith('/joy-ui/')) {
    productName = 'Joy UI';
  }

  return (
    <AppFrame>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-navDrawer-width': '300px',
            '--MuiDocs-toc-width': '240px',
          },
        }}
      />
      <AdManager>
        <Head title={`${title} - ${productName}`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad />
          </AdGuest>
        )}
        <Main disableToc={disableToc}>
          {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
          {disableToc ? null : <AppTableOfContents toc={toc} />}
          <StyledAppContainer disableAd={disableAd} disableToc={disableToc}>
            <ActionsDiv>{location && <EditPage markdownLocation={location} />}</ActionsDiv>
            {children}
            <NoSsr>
              <AppLayoutDocsFooter />
            </NoSsr>
          </StyledAppContainer>
        </Main>
      </AdManager>
      <BackToTop />
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
  location: PropTypes.string,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
