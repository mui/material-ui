import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Blog from 'docs/src/pages/getting-started/templates/blog/Blog';

export default function Page() {
  return (
    <AppTheme>
      <Blog />
    </AppTheme>
  );
}
