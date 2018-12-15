import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Terms from 'docs/src/pages/premium-themes/onepirate/Terms';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <Terms />
    </AppTheme>
  );
}

export default Page;
