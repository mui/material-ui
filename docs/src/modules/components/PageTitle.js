import React from 'react';
import PropTypes from 'prop-types';
import { pageToTitle } from 'docs/src/modules/utils/helpers';
import Context from './context';

// TODO: it really wants to be named useTitle but we're not quite there yet.
function PageTitle(props) {
  return (
    <Context.Consumer>
      {({ activePage }) => {
        if (!activePage) {
          throw new Error('Missing activePage.');
        }

        const title = activePage.title !== false ? pageToTitle(activePage) : null;
        return props.children(title);
      }}
    </Context.Consumer>
  );
}

PageTitle.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PageTitle;
