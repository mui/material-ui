import React from 'react';
import PropTypes from 'prop-types';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';

// TODO: it really wants to be named useTitle but we're not quite there yet.
function PageTitle(props) {
  const { activePage } = React.useContext(PageContext);

  if (!activePage) {
    throw new Error('Missing activePage.');
  }

  const title = pageToTitleI18n(activePage, props.t);

  return props.children(title);
}

PageTitle.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PageTitle;
