import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/button/button.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import ButtonUnstyledApiJsonPageContent from '../api/button-unstyled.json';
import useButtonApiJsonPageContent from '../api/use-button.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const ButtonUnstyledApiReq = require.context(
    'docs/translations/api-docs/button-unstyled',
    false,
    /button-unstyled.*.json$/,
  );
  const ButtonUnstyledApiDescriptions = mapApiPageTranslations(ButtonUnstyledApiReq);

  const useButtonApiReq = require.context(
    'docs/translations/api-docs/use-button',
    false,
    /use-button.*.json$/,
  );
  const useButtonApiDescriptions = mapApiPageTranslations(useButtonApiReq);

  return {
    componentsApiDescriptions: { ButtonUnstyled: ButtonUnstyledApiDescriptions },
    componentsApiPageContents: { ButtonUnstyled: ButtonUnstyledApiJsonPageContent },
    hooksApiDescriptions: { useButton: useButtonApiDescriptions },
    hooksApiPageContents: { useButton: useButtonApiJsonPageContent },
  };
};
