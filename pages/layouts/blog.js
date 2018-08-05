import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import Head from 'docs/src/modules/components/Head';
import Blog from 'docs/src/pages/layouts/blog/Blog';

function Page() {
  return (
    <React.Fragment>
      <Head
        title="Blog layout - Material-UI"
        description="An example layout for creating a blog or newsletter."
      />
      <Blog />
    </React.Fragment>
  );
}

export default withRoot(Page);
