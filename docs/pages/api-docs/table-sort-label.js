import React from 'react';
import TopLayoutApi from 'docs/src/modules/components/TopLayoutApi';
import mapApiTranslations, { parsePropsMarkdown } from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './table-sort-label.json';

export default function Page({ pageContent }) {
  return <TopLayoutApi pageContent={pageContent} />;
}

Page.getInitialProps = async () => {
  const req1 = require.context('docs/translations', false, /component-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-descriptions.*.json$/);

  const componentDescription = mapApiTranslations(req1, 'TableSortLabel');
  const propDescriptions = parsePropsMarkdown(mapApiTranslations(req2, 'TableSortLabel'));
  const classDescriptions = mapApiTranslations(req3, 'TableSortLabel');

  return {
    pageContent: {
      ...jsonPageContent,
      componentDescription,
      propDescriptions,
      classDescriptions,
    },
  };
};
