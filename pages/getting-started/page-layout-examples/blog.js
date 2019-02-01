import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Blog from 'docs/src/pages/getting-started/page-layout-examples/blog/Blog';

function Page() {
  return (
    <AppTheme
      title="Blog page layout example - Material-UI"
      description="An example layout for creating a blog or newsletter."
    >
      <Blog />
    </AppTheme>
  );
}

export default Page;
