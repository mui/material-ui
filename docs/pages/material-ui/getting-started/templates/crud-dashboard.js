import * as React from 'react';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import { NoSsr } from '@mui/material/NoSsr';

const CrudDashboard = dynamic(
  () => import('docs/data/material/getting-started/templates/crud-dashboard/CrudDashboard'),
  { ssr: false },
);

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <NoSsr>
          <CrudDashboard />
        </NoSsr>
      </TemplateFrame>
    </AppTheme>
  );
}
