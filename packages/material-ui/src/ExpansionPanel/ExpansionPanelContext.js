import React from 'react';
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

export default ExpansionPanelContext;
