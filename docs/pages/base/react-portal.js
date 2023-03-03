import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/portal/portal.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import PortalApiJsonPageContent from './api/portal.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const PortalApiReq = require.context(
    'docs/translations/api-docs/portal',
    false,
    /portal.*.json$/,
  );
  const PortalApiDescriptions = mapApiPageTranslations(PortalApiReq);

  return {
    componentsApiDescriptions: { Portal: PortalApiDescriptions },
    componentsApiPageContents: { Portal: PortalApiJsonPageContent },
    hooksApiDescriptions: {},
    hooksApiPageContents: {},
  };
};
