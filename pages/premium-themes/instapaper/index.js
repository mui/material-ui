import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import InstapaperProfile from 'docs/src/pages/premium-themes/instapaper/pages/instapaper/Profile';

function Page() {
  return (
    <AppTheme
      title="Instapaper theme - Material-UI"
      description="Instagram's profile page by customizing Material-UI theme."
    >
      <InstapaperProfile />
    </AppTheme>
  );
}

export default Page;
