import React from 'react';
import ApiDocs from 'docs/src/modules/components/ApiDocs';
import mapApiTranslations from 'docs/src/modules/utils/mapApiTranslations';
import jsonPageContent from './bottom-navigation.json';

export async function getStaticProps() {
  const req = require.context('docs/translations', false, /prop-descriptions.*.json$/);
  const req2 = require.context('docs/translations', false, /class-descriptions.*.json$/);
  const req3 = require.context('docs/translations', false, /class-conditions.*.json$/);

  const propDescriptions = mapApiTranslations(req, 'BottomNavigation');
  const classDescriptions = mapApiTranslations(req2, 'BottomNavigation');
  const classConditions = mapApiTranslations(req3, 'BottomNavigation');

  const pageContent = { ...jsonPageContent, propDescriptions, classDescriptions, classConditions };
  return {
    props: { pageContent },
  };
}

export default function Page({ pageContent }) {
  return <ApiDocs pageContent={pageContent} />;
}
