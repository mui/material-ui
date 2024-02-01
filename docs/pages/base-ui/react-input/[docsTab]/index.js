import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/input/input.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TextboxApiJsonPageContent from '../../api/textbox.json';
import useTextboxApiJsonPageContent from '../../api/use-textbox.json';

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
  const TextboxApiReq = require.context(
    'docs/translations/api-docs-base/textbox',
    false,
    /textbox.*.json$/,
  );
  const TextboxApiDescriptions = mapApiPageTranslations(TextboxApiReq);

  const useTextboxApiReq = require.context(
    'docs/translations/api-docs/use-textbox',
    false,
    /use-textbox.*.json$/,
  );
  const useTextboxApiDescriptions = mapApiPageTranslations(useTextboxApiReq);

  return {
    props: {
      componentsApiDescriptions: { Textbox: TextboxApiDescriptions },
      componentsApiPageContents: { Textbox: TextboxApiJsonPageContent },
      hooksApiDescriptions: { useTextbox: useTextboxApiDescriptions },
      hooksApiPageContents: { useTextbox: useTextboxApiJsonPageContent },
    },
  };
};
