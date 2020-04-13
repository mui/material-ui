import * as React from 'react';

const MarkdownDocsContext = React.createContext(undefined);
if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsContext.displayName = 'MarkdownDocsContext';
}
export default MarkdownDocsContext;
