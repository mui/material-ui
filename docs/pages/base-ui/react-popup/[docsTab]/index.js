import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/popup/popup.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import PopupApiJsonPageContent from '../../api/popup.json';

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
  const PopupApiReq = require.context(
    'docs/translations/api-docs-base/popup',
    false,
    /popup.*.json$/,
  );
  const PopupApiDescriptions = mapApiPageTranslations(PopupApiReq);

  return {
    props: {
      componentsApiDescriptions: { Popup: PopupApiDescriptions },
      componentsApiPageContents: { Popup: PopupApiJsonPageContent },
      hooksApiDescriptions: {},
      hooksApiPageContents: {},
    },
  };
};
