import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/all-components/all-components.md?@mui/markdown';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} disableToc />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};
