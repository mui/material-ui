import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Pricing from 'docs/src/pages/getting-started/templates/pricing/Pricing';

export default function Page() {
  return (
    <AppTheme>
      <Pricing />
    </AppTheme>
  );
}
