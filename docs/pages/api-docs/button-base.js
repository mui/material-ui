import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import getApiPageContent from 'docs/src/modules/utils/getApiPageContent';
import jsonPageContent from './button-base.json';

export default function Page({ pageContent }) {
  return <ApiPage pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context('docs/pages/api-docs/button-base', false, /button-base.*.json$/);

  return {
    pageContent: getApiPageContent({
      req,
      jsonPageContent,
    }),
  };
};
