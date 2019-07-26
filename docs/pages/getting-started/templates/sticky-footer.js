import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import StickyFooter from 'docs/src/pages/getting-started/templates/sticky-footer/StickyFooter';

export default function Page() {
  return (
    <AppTheme>
      <StickyFooter />
    </AppTheme>
  );
}
