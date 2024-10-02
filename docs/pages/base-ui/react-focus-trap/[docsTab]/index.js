import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/focus-trap/focus-trap.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import FocusTrapApiJsonPageContent from '../../api/focus-trap.json';

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
  const FocusTrapApiReq = require.context(
    'docs/translations/api-docs-base/focus-trap',
    false,
    /focus-trap.*.json$/,
  );
  const FocusTrapApiDescriptions = mapApiPageTranslations(FocusTrapApiReq);

  return {
    props: {
      componentsApiDescriptions: { FocusTrap: FocusTrapApiDescriptions },
      componentsApiPageContents: { FocusTrap: FocusTrapApiJsonPageContent },
      hooksApiDescriptions: {},
      hooksApiPageContents: {},
    },
  };
};
