import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/input/input.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import InputApiJsonPageContent from '../../api/input.json';
import useInputApiJsonPageContent from '../../api/use-input.json';

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
  const InputApiReq = require.context(
    'docs/translations/api-docs-base/input',
    false,
    /input.*.json$/,
  );
  const InputApiDescriptions = mapApiPageTranslations(InputApiReq);

  const useInputApiReq = require.context(
    'docs/translations/api-docs/use-input',
    false,
    /use-input.*.json$/,
  );
  const useInputApiDescriptions = mapApiPageTranslations(useInputApiReq);

  return {
    props: {
      componentsApiDescriptions: { Input: InputApiDescriptions },
      componentsApiPageContents: { Input: InputApiJsonPageContent },
      hooksApiDescriptions: { useInput: useInputApiDescriptions },
      hooksApiPageContents: { useInput: useInputApiJsonPageContent },
    },
  };
};
