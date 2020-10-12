import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './fab.json';

export async function getStaticProps() {
  const req = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /class-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-conditions.*.json$/);

  const propDescriptions = mapApiTranslations(req, 'Fab');
  const classDescriptions = mapApiTranslations(req2, 'Fab');
  const classConditions = mapApiTranslations(req3, 'Fab');

  const pageContent = { ...jsonPageContent, propDescriptions, classDescriptions, classConditions };
  return {
    props: { pageContent },
  };
}

export default function Page({ pageContent }) {
  return <ApiDocs pageContent={pageContent} />;
}
