import * as React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import CrudDashboard from 'docs/data/material/getting-started/templates/crud-dashboard/CrudDashboard';
import { NoSsr } from '@mui/material';

export default function Page() {
  return (
    <NoSsr>
      <AppTheme>
        <TemplateFrame>
          <CrudDashboard />
        </TemplateFrame>
      </AppTheme>
    </NoSsr>
  );
}
