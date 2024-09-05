import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/no-ssr/no-ssr.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import NoSsrApiJsonPageContent from '../../api/no-ssr.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { docsTab: 'components-api' } }, { params: { docsTab: 'hooks-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = () => {
  const NoSsrApiReq = require.context(
    'docs/translations/api-docs-base/no-ssr',
    false,
    /no-ssr.*.json$/,
  );
  const NoSsrApiDescriptions = mapApiPageTranslations(NoSsrApiReq);

  return {
    props: {
      componentsApiDescriptions: { NoSsr: NoSsrApiDescriptions },
      componentsApiPageContents: { NoSsr: NoSsrApiJsonPageContent },
      hooksApiDescriptions: {},
      hooksApiPageContents: {},
    },
  };
};
