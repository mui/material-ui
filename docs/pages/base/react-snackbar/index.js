import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/snackbar/snackbar.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import SnackbarUnstyledApiJsonPageContent from '../api/snackbar-unstyled.json';
import useSnackbarApiJsonPageContent from '../api/use-snackbar.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const SnackbarUnstyledApiReq = require.context(
    'docs/translations/api-docs/snackbar-unstyled',
    false,
    /snackbar-unstyled.*.json$/,
  );
  const SnackbarUnstyledApiDescriptions = mapApiPageTranslations(SnackbarUnstyledApiReq);

  const useSnackbarApiReq = require.context(
    'docs/translations/api-docs/use-snackbar',
    false,
    /use-snackbar.*.json$/,
  );
  const useSnackbarApiDescriptions = mapApiPageTranslations(useSnackbarApiReq);

  return {
    componentsApiDescriptions: { SnackbarUnstyled: SnackbarUnstyledApiDescriptions },
    componentsApiPageContents: { SnackbarUnstyled: SnackbarUnstyledApiJsonPageContent },
    hooksApiDescriptions: { useSnackbar: useSnackbarApiDescriptions },
    hooksApiPageContents: { useSnackbar: useSnackbarApiJsonPageContent },
  };
};
