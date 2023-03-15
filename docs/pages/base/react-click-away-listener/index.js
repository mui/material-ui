import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/click-away-listener/click-away-listener.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import ClickAwayListenerApiJsonPageContent from '../api/click-away-listener.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const ClickAwayListenerApiReq = require.context(
    'docs/translations/api-docs/click-away-listener',
    false,
    /click-away-listener.*.json$/,
  );
  const ClickAwayListenerApiDescriptions = mapApiPageTranslations(ClickAwayListenerApiReq);

  return {
    componentsApiDescriptions: { ClickAwayListener: ClickAwayListenerApiDescriptions },
    componentsApiPageContents: { ClickAwayListener: ClickAwayListenerApiJsonPageContent },
    hooksApiDescriptions: {},
    hooksApiPageContents: {},
  };
};
