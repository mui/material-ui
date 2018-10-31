import React from 'react';
import PropTypes from 'prop-types';
import { pageToTitle } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';

// TODO: it really wants to be named useTitle but we're not quite there yet.
function PageTitle(props) {
  return (
    <PageContext.Consumer>
      {({ activePage }) => {
        if (!activePage) {
          throw new Error('Missing activePage.');
        }

        const title = activePage.title !== false ? pageToTitle(activePage) : null;
        return props.children(title);
      }}
    </PageContext.Consumer>
  );
}

PageTitle.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PageTitle;
