import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './tab-context.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

export async function getStaticProps() {
  const req = require.context(
    'docs/translations/api-docs/tab-context',
    false,
    /\.\/tab-context.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    props: {
      descriptions,
      pageContent: jsonPageContent,
    },
  };
}
