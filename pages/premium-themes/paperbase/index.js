import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Paperbase from 'docs/src/pages/premium-themes/paperbase/Paperbase';

function Page() {
  return (
    <AppTheme
      title="Paperbase theme - Material-UI"
      description={`A page that mimics Firebase.
        This item includes theming using the theme provider component.`}
    >
      <Paperbase />
    </AppTheme>
  );
}

export default Page;
