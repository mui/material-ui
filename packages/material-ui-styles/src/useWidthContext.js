import React from 'react';
import WidthContext from './WidthContext';

export default function useWidthContext() {
    return React.useContext(WidthContext);
}
