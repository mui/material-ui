import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Album from 'docs/src/pages/getting-started/page-layout-examples/album/Album';

function Page() {
  return (
    <AppTheme
      title="Album page layout - Material-UI"
      description="An example layout for creating an album or gallery."
    >
      <Album />
    </AppTheme>
  );
}

export default Page;
