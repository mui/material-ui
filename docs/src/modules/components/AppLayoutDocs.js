import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { exactProp } from '@mui/utils';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  AdManager,
  AD_MARGIN_TOP,
  AD_HEIGHT,
  AD_HEIGHT_MOBILE,
  AD_MARGIN_BOTTOM,
} from '@mui/docs/Ad';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';
import BackToTop from 'docs/src/modules/components/BackToTop';
import getProductInfoFromUrl from 'docs/src/modules/utils/getProductInfoFromUrl';
import { convertProductIdToName } from 'docs/src/modules/components/AppSearch';

const TOC_WIDTH = 242;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ theme }) => ({
  minHeight: '100vh',
  display: 'grid',
  width: '100%',
  '& .markdown-body .comment-link': {
    display: 'flex',
  },
  variants: [
    {
      props: ({ disableToc }) => disableToc,
      style: {
        [theme.breakpoints.up('md')]: {
          marginRight: TOC_WIDTH / 2,
        },
      },
    },
    {
      props: ({ disableToc }) => !disableToc,
      style: {
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: `1fr ${TOC_WIDTH}px`,
        },
      },
    },
  ],
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'hasTabs' && prop !== 'disableToc',
})(({ theme }) => {
  return {
    position: 'relative',
    // By default, a grid item cannot be smaller than the size of its content.
    // https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
    minWidth: 0,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '60px',
      paddingRight: '60px',
    },
    variants: [
      {
        props: ({ disableToc }) => disableToc,
        style: {
          // 105ch ≈ 930px
          maxWidth: `calc(105ch + ${TOC_WIDTH / 2}px)`,
        },
      },
      {
        props: ({ disableToc }) => !disableToc,
        style: {
          // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
          fontFamily: 'Arial',
          // 105ch ≈ 930px
          maxWidth: '105ch',
        },
      },
      {
        props: ({ disableAd, hasTabs }) => !disableAd && hasTabs,
        style: {
          '&& .component-tabs .MuiTabs-root': {
            // 40px matches MarkdownElement h2 margin-top.
            marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px + 40px)`,
            [theme.breakpoints.up('sm')]: {
              marginBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px + 40px)`,
            },
          },
          '&& .component-tabs.ad .MuiTabs-root': {
            marginBottom: 0,
          },
        },
      },
      {
        props: ({ disableAd, hasTabs }) => !disableAd && !hasTabs,
        style: {
          '&& .description': {
            marginBottom: theme.spacing(AD_MARGIN_BOTTOM),
            paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT_MOBILE}px)`,
            [theme.breakpoints.up('sm')]: {
              paddingBottom: `calc(${theme.spacing(AD_MARGIN_TOP)} + ${AD_HEIGHT}px)`,
            },
          },
          '&& .description.ad': {
            paddingBottom: 0,
            marginBottom: 0,
          },
        },
      },
    ],
  };
});

export default function AppLayoutDocs(props) {
  const router = useRouter();
  const {
    BannerComponent,
    cardOptions,
    children,
    description,
    disableAd = false,
    // TODO, disableLayout should be the default, retaining the layout between pages
    // improves the UX. It's faster to transition, and you don't lose UI states, like scroll.
    disableLayout = false,
    disableToc = false,
    hasTabs = false,
    location,
    title,
    toc,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const productName = convertProductIdToName(getProductInfoFromUrl(router.asPath));
  if (!productName) {
    console.error('productName mapping missing for', router.asPath);
  }

  const Layout = disableLayout ? React.Fragment : AppFrame;
  const layoutProps = disableLayout ? {} : { BannerComponent };

  const card = `/edge-functions/og-image?product=${productName}&title=${cardOptions?.title ?? title}&description=${cardOptions?.description ?? description}`;
  return (
    <Layout {...layoutProps}>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-navDrawer-width': '300px',
          },
        }}
      />
      <AdManager {...(hasTabs && { classSelector: '.component-tabs' })}>
        <Head title={`${title} - ${productName}`} description={description} card={card} />
        <Main disableToc={disableToc}>
          {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
          <StyledAppContainer disableAd={disableAd} hasTabs={hasTabs} disableToc={disableToc}>
            {children}
            <AppLayoutDocsFooter tableOfContents={toc} location={location} />
          </StyledAppContainer>
          {disableToc ? null : <AppTableOfContents toc={toc} />}
        </Main>
      </AdManager>
      <BackToTop />
    </Layout>
  );
}

AppLayoutDocs.propTypes = {
  BannerComponent: PropTypes.elementType,
  cardOptions: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableLayout: PropTypes.bool,
  disableToc: PropTypes.bool.isRequired,
  hasTabs: PropTypes.bool,
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}
