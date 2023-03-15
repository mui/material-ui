import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/input/input.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import InputUnstyledApiJsonPageContent from '../api/input-unstyled.json';
import useInputApiJsonPageContent from '../api/use-input.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const InputUnstyledApiReq = require.context(
    'docs/translations/api-docs/input-unstyled',
    false,
    /input-unstyled.*.json$/,
  );
  const InputUnstyledApiDescriptions = mapApiPageTranslations(InputUnstyledApiReq);

  const useInputApiReq = require.context(
    'docs/translations/api-docs/use-input',
    false,
    /use-input.*.json$/,
  );
  const useInputApiDescriptions = mapApiPageTranslations(useInputApiReq);

  return {
    componentsApiDescriptions: { InputUnstyled: InputUnstyledApiDescriptions },
    componentsApiPageContents: { InputUnstyled: InputUnstyledApiJsonPageContent },
    hooksApiDescriptions: { useInput: useInputApiDescriptions },
    hooksApiPageContents: { useInput: useInputApiJsonPageContent },
  };
};
