import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';

export const AdContext = React.createContext();

// Persisted for the whole session.
// The state is used to use different ad placements.
const randomSession = Math.random();

// Distribution profile:
// 20% body-inline
// 80% body-image
export const adShape = randomSession < 0.2 ? 'inline' : 'image';

export default function AdManager({ classSelector = '.description', ...props }) {
  const [portal, setPortal] = React.useState({});

  useEnhancedEffect(() => {
    const description = document.querySelector(classSelector);
    setPortal({ placement: 'body-top', element: description });
  }, [classSelector]);

  return <AdContext.Provider value={portal}>{props.children}</AdContext.Provider>;
}

AdManager.propTypes = {
  children: PropTypes.node,
  classSelector: PropTypes.string,
};
