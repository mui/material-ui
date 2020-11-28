import * as React from 'react';
import TopLayoutApi from 'docs/src/modules/components/TopLayoutApi';
import getApiPageContent from 'docs/src/modules/utils/getApiPageContent';
import jsonPageContent from './grow.json';

export default function Page({ pageContent }) {
  return <TopLayoutApi pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);

  return {
    pageContent: getApiPageContent({
      req1,
      req2,
      req3,
      jsonPageContent,
      componentName: 'Grow',
    }),
  };
};
