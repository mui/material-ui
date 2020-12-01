import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './button-base.json';

export default function Page({ pageContent }) {
  return <ApiPage pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context('docs/pages/api-docs/button-base', false, /button-base.*.json$/);

  return {
    pageContent: {
      ...mapApiPageTranslations(req),
      ...jsonPageContent,
    },
  };
};
