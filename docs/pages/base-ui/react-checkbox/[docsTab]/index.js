import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/checkbox/checkbox.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import useCheckboxApiJsonPageContent from '../../api/use-checkbox.json';

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
  const useCheckboxApiReq = require.context(
    'docs/translations/api-docs/use-checkbox',
    false,
    /use-checkbox.*.json$/,
  );
  const useCheckboxApiDescriptions = mapApiPageTranslations(useCheckboxApiReq);

  return {
    props: {
      componentsApiDescriptions: {},
      componentsApiPageContents: {},
      hooksApiDescriptions: { useCheckbox: useCheckboxApiDescriptions },
      hooksApiPageContents: { useCheckbox: useCheckboxApiJsonPageContent },
    },
  };
};
