import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './dialog-title.json';

export default function Page(props) {
  const { descriptions } = props;
  return <ApiPage descriptions={descriptions} pageContent={jsonPageContent} />;
}

export async function getStaticProps() {
  const req = require.context(
    'docs/translations/api-docs-joy/dialog-title',
    false,
    /\.\/dialog-title.*\.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return { props: { descriptions } };
}
