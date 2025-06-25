import * as React from 'react';
import dynamic from 'next/dynamic';
import { NoSsr } from '@mui/material/NoSsr';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';

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
