import React from 'react';
import PropTypes from 'prop-types';
import { ListContext } from '../List';

/**
 * Consumes a context and passes that context merged with its props
 * @param props
 */
function MergeWithListContext(props) {
  const { children, dense } = props;
  return (
    <ListContext.Consumer>
      {context => {
        const isDense = dense || context.dense || false;
        const childContext = { dense: isDense };

        return (
          <ListContext.Provider value={childContext}>{children(childContext)}</ListContext.Provider>
        );
      }}
    </ListContext.Consumer>
  );
}

MergeWithListContext.propTypes = {
  children: PropTypes.func.isRequired,
  dense: PropTypes.bool,
};

export default MergeWithListContext;
