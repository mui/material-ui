import React from 'react';

// The default value is never and should never be used.
// It's here to improve DX by enabling autocompletion for editors supporting TypeScript.
const PageContext = React.createContext({
  activePage: {
    pathname: '',
  },
  pages: [],
  versions: [],
});

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
