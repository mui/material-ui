import * as React from 'react';

/**
 * @ignore - internal component.
 */
const TimelineItemContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  TimelineItemContext.displayName = 'TimelineItemContext';
}

export default TimelineItemContext;
