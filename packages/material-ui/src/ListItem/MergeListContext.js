import React from 'react';
import PropTypes from 'prop-types';
import ListContext from '../List/ListContext';

/**
 * @ignore - internal component.
 *
 * Consumes a context and passes that context merged with its props.
 */
function MergeListContext(props) {
  const { alignItems, children, dense } = props;
  return (
    <ListContext.Consumer>
      {context => {
        const childContext = {
          dense: dense || context.dense || false,
          alignItems,
        };

        return (
          <ListContext.Provider value={childContext}>{children(childContext)}</ListContext.Provider>
        );
      }}
    </ListContext.Consumer>
  );
}

MergeListContext.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center']).isRequired,
  children: PropTypes.func.isRequired,
  dense: PropTypes.bool.isRequired,
};

export default MergeListContext;
