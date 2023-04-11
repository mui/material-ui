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
import AdManager from 'docs/src/modules/components/AdManager';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';
import BackToTop from 'docs/src/modules/components/BackToTop';

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => ({
  display: 'grid',
  width: '100%',
  ...(disableToc
    ? {
        [theme.breakpoints.up('lg')]: {
          marginRight: '5%',
        },
      }
    : {
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: '1fr 242px',
        },
      }),
  '& .markdown-body .comment-link': {
    display: 'inline-block',
  },
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'hasTabs',
})(({ disableAd, hasTabs, theme }) => {
  return {
    position: 'relative',
    // By default, a grid item cannot be smaller than the size of its content.
    // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
    minWidth: 0,
    ...(!disableAd && {
      ...(!hasTabs && {
        '&& .description': {
          marginBottom: 198,
        },
        '&& .description.ad': {
          marginBottom: 40,
        },
      }),
      ...(hasTabs && {
        '&& .component-tabs .MuiTabs-root': {
          marginBottom: 193,
        },
        '&& .component-tabs.ad .MuiTabs-root': {
          marginBottom: 35,
        },
      }),
    }),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '60px',
      paddingRight: '60px',
    },
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
    BannerComponent,
    children,
    description,
    disableAd = false,
    disableToc = false,
    location,
    title,
    toc,
    hasTabs = false,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const { canonicalAs } = pathnameToLanguage(router.asPath);
  let productName = 'MUI';
  if (canonicalAs.startsWith('/material-ui/')) {
    productName = 'Material UI';
  } else if (canonicalAs.startsWith('/base/')) {
    productName = 'Base UI';
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
    <AppFrame BannerComponent={BannerComponent}>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-navDrawer-width': '300px',
          },
        }}
      />
      <AdManager {...(hasTabs && { classSelector: '.component-tabs' })}>
        <Head
          title={`${title} - ${productName}`}
          description={description}
          largeCard={false}
          card="https://mui.com/static/logo.png"
        />
        <Main disableToc={disableToc}>
          {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
          <StyledAppContainer disableAd={disableAd} hasTabs={hasTabs}>
            <ActionsDiv>
              <EditPage markdownLocation={location} />
            </ActionsDiv>
            {children}
            <NoSsr>
              <AppLayoutDocsFooter tableOfContents={toc} />
            </NoSsr>
          </StyledAppContainer>
          {disableToc ? null : <AppTableOfContents toc={toc} />}
        </Main>
      </AdManager>
      <BackToTop />
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  BannerComponent: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
  hasTabs: PropTypes.bool,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
