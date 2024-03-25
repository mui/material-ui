import * as React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { css } from '@pigment-css/react';
import Alert from '@mui/material/Alert';

import MaterialUILayout from '../../Layout';
import ActiveLastBreadcrumb from '../../../../../docs/data/material/components/breadcrumbs/ActiveLastBreadcrumb.tsx';
import BasicBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/BasicBreadcrumbs.tsx';
import CollapsedBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/CollapsedBreadcrumbs.tsx';
import CustomSeparator from '../../../../../docs/data/material/components/breadcrumbs/CustomSeparator.tsx';
import CustomizedBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/CustomizedBreadcrumbs.tsx';
import IconBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/IconBreadcrumbs.tsx';
import RouterBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/RouterBreadcrumbs.tsx';

function ErrorBoundaryFallback({ error }: FallbackProps) {
  const err = error as Error;
  return (
    <Alert severity="error" variant="outlined">
      Error while rendering.
      <pre
        className={css({
          border: '1px dotted #ccc',
          padding: 4,
          whiteSpace: 'pre-wrap',
        })}
      >
        {err.message}
      </pre>
    </Alert>
  );
}

export default function Breadcrumbs() {
  return (
    <MaterialUILayout>
      <h1>Breadcrumbs</h1>
      <section>
        <h2> Active Last Breadcrumb</h2>
        <div className="demo-container">
          <ActiveLastBreadcrumb />
        </div>
      </section>
      <section>
        <h2> Basic Breadcrumbs</h2>
        <div className="demo-container">
          <BasicBreadcrumbs />
        </div>
      </section>
      <section>
        <h2> Collapsed Breadcrumbs</h2>
        <div className="demo-container">
          <CollapsedBreadcrumbs />
        </div>
      </section>
      <section>
        <h2> Custom Separator</h2>
        <div className="demo-container">
          <CustomSeparator />
        </div>
      </section>
      <section>
        <h2> Customized Breadcrumbs</h2>
        <div className="demo-container">
          <CustomizedBreadcrumbs />
        </div>
      </section>
      <section>
        <h2> Icon Breadcrumbs</h2>
        <div className="demo-container">
          <IconBreadcrumbs />
        </div>
      </section>
      <section>
        <h2> Router Breadcrumbs</h2>
        <div className="demo-container">
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <RouterBreadcrumbs />
          </ErrorBoundary>
        </div>
      </section>
    </MaterialUILayout>
  );
}
