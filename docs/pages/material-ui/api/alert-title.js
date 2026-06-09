import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';
import { mapApiPageTranslation } from '@mui/internal-core-docs/mapApiPageTranslations';
import translation from 'docs/translations/api-docs/alert-title/alert-title.json';
import jsonPageContent from './alert-title.json';

export default function Page(props) {
  const { descriptions } = props;
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}

export async function getStaticProps() {
  const descriptions = mapApiPageTranslation(translation);

  return { props: { descriptions } };
}
