import * as React from 'react';

const StepContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
    StepContext.displayName = 'StepContext';
}

export default StepContext;
