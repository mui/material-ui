import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/popper/popper.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import PopperUnstyledApiJsonPageContent from '../api/popper-unstyled.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const PopperUnstyledApiReq = require.context(
    'docs/translations/api-docs/popper-unstyled',
    false,
    /popper-unstyled.*.json$/,
  );
  const PopperUnstyledApiDescriptions = mapApiPageTranslations(PopperUnstyledApiReq);

  return {
    componentsApiDescriptions: { PopperUnstyled: PopperUnstyledApiDescriptions },
    componentsApiPageContents: { PopperUnstyled: PopperUnstyledApiJsonPageContent },
    hooksApiDescriptions: {},
    hooksApiPageContents: {},
  };
};
