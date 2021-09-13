import * as React from 'react';

/**
 * @ignore - internal component.
 */
const TimelineContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  TimelineContext.displayName = 'TimelineContext';
}

export default TimelineContext;
