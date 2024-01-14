import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import getModuleSize from 'docs/src/modules/components/getModuleSize';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/slider/slider.md?@mui/markdown';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = async () => {
  const moduleSize = await getModuleSize(pageProps);
  return {
    initialProps: { moduleSize },
  };
};
