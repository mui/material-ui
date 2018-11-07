import React from 'react';
import PropTypes from 'prop-types';
import ListContext from '../List/ListContext';

/**
 * @ignore - internal component.
 *
 * Consumes a context and passes that context merged with its props.
 */
function MergeListContext(props) {
  const { children, dense: denseProp } = props;
  return (
    <ListContext.Consumer>
      {context => {
        const childContext = { dense: denseProp || context.dense || false };

        return (
          <ListContext.Provider value={childContext}>{children(childContext)}</ListContext.Provider>
        );
      }}
    </ListContext.Consumer>
  );
}

MergeListContext.propTypes = {
  children: PropTypes.func.isRequired,
  dense: PropTypes.bool.isRequired,
};

export default MergeListContext;
