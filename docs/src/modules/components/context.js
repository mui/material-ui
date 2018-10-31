import React from 'react';

export default React.createContext({
  activePage: { pathname: '' },
  pages: [],
  userLanguage: 'en',
});
