import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/textarea-autosize/textarea-autosize.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TextareaAutosizeApiJsonPageContent from '../../api/textarea-autosize.json';

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
  const TextareaAutosizeApiReq = require.context(
    'docs/translations/api-docs-base/textarea-autosize',
    false,
    /textarea-autosize.*.json$/,
  );
  const TextareaAutosizeApiDescriptions = mapApiPageTranslations(TextareaAutosizeApiReq);

  return {
    props: {
      componentsApiDescriptions: { TextareaAutosize: TextareaAutosizeApiDescriptions },
      componentsApiPageContents: { TextareaAutosize: TextareaAutosizeApiJsonPageContent },
      hooksApiDescriptions: {},
      hooksApiPageContents: {},
    },
  };
};
