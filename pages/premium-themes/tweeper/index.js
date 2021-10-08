import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Tweeper from 'docs/src/pages/premium-themes/tweeper/pages/tweeper/Profile';

function Page() {
  return (
    <AppTheme
      title="Tweeper - Material-UI"
      description={`A page that mimics Twitter.
        This item includes theming using the theme provider component.`}
    >
      <Tweeper />
    </AppTheme>
  );
}

export default Page;
