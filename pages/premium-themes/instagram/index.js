// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import InstagramProfile from 'docs/src/pages/premium-themes/instagram/pages/instagram/Profile';

function Page() {
  return (
    <AppTheme title="Paperbase theme - Material-UI" description="A page that mimics Firebase.">
      <InstagramProfile />
    </AppTheme>
  );
}

export default Page;
