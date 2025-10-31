import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './list-item-secondary-action.json';
import { withTranslations } from 'docs/src/modules/utils/withTranslations';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

export async function getStaticProps() {
  const req = require.context(
    'docs/translations/api-docs/list-item-secondary-action',
    false,
    /\.\/list-item-secondary-action.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    props: withTranslations({
      descriptions,
      pageContent: jsonPageContent,
    }),
  };
}
