import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/button/button.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import ButtonApiJsonPageContent from '../../api/button.json';
import useButtonApiJsonPageContent from '../../api/use-button.json';

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
  const ButtonApiReq = require.context(
    'docs/translations/api-docs-base/button',
    false,
    /button.*.json$/,
  );
  const ButtonApiDescriptions = mapApiPageTranslations(ButtonApiReq);

  const useButtonApiReq = require.context(
    'docs/translations/api-docs/use-button',
    false,
    /use-button.*.json$/,
  );
  const useButtonApiDescriptions = mapApiPageTranslations(useButtonApiReq);

  return {
    props: {
      componentsApiDescriptions: { Button: ButtonApiDescriptions },
      componentsApiPageContents: { Button: ButtonApiJsonPageContent },
      hooksApiDescriptions: { useButton: useButtonApiDescriptions },
      hooksApiPageContents: { useButton: useButtonApiJsonPageContent },
    },
  };
};
