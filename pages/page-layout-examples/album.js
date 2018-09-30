import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Album from 'docs/src/pages/page-layout-examples/album/Album';

function Page() {
  return (
    <AppTheme
      title="Album page layout - Material-UI"
      description="An example layout for creating an albumn or gallery."
    >
      <Album />
    </AppTheme>
  );
}

export default withRoot(Page);
