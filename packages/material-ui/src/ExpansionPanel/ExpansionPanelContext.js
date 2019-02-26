import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

const ExpansionPanelContext = React.createContext({
  disabled: false,
  expanded: false,
  onChange: () => {
    warning(
      false,
      [
        'Material-UI: You called onChange from a component  that is not a child of a ',
        'ExpansionPanel component.',
      ].join(''),
    );
  },
});

export const PureProvider = React.memo(props => {
  const { children, ...value } = props;

  return <ExpansionPanelContext.Provider value={value}>{children}</ExpansionPanelContext.Provider>;
});

PureProvider.propTypes = {
  children: PropTypes.node,
};

export default ExpansionPanelContext;
