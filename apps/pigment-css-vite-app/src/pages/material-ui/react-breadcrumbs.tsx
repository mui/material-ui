import { ErrorBoundary } from 'react-error-boundary';

import MaterialUILayout from '../../Layout';
import ActiveLastBreadcrumb from '../../../../../docs/data/material/components/breadcrumbs/ActiveLastBreadcrumb';
import BasicBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/BasicBreadcrumbs';
import CollapsedBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/CollapsedBreadcrumbs';
import CustomSeparator from '../../../../../docs/data/material/components/breadcrumbs/CustomSeparator';
import CustomizedBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/CustomizedBreadcrumbs';
import IconBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/IconBreadcrumbs';
import RouterBreadcrumbs from '../../../../../docs/data/material/components/breadcrumbs/RouterBreadcrumbs';
import { ErrorBoundaryFallback } from '../../components/ErrorBoundaryFallback';

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
