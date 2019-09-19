import React from 'react';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';

// TODO: it really wants to be named useTitle but we're not quite there yet.
export default function usePageTitle(options) {
  const { activePage } = React.useContext(PageContext);

  if (!activePage) {
    throw new Error('Missing activePage.');
  }

  const title = pageToTitleI18n(activePage, options.t);
  return title;
}
