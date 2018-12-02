import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Privacy from 'docs/src/pages/premium-themes/onepirate/Privacy';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <Privacy />
    </AppTheme>
  );
}

export default withRoot(Page);
