import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AutohideSnackbar from '../../../../../docs/data/material/components/snackbars/AutohideSnackbar.tsx';
import ConsecutiveSnackbars from '../../../../../docs/data/material/components/snackbars/ConsecutiveSnackbars.tsx';
import CustomizedSnackbars from '../../../../../docs/data/material/components/snackbars/CustomizedSnackbars.tsx';
import DirectionSnackbar from '../../../../../docs/data/material/components/snackbars/DirectionSnackbar.tsx';
import FabIntegrationSnackbar from '../../../../../docs/data/material/components/snackbars/FabIntegrationSnackbar.tsx';
import IntegrationNotistack from '../../../../../docs/data/material/components/snackbars/IntegrationNotistack.tsx';
import LongTextSnackbar from '../../../../../docs/data/material/components/snackbars/LongTextSnackbar.tsx';
import PositionedSnackbar from '../../../../../docs/data/material/components/snackbars/PositionedSnackbar.tsx';
import SimpleSnackbar from '../../../../../docs/data/material/components/snackbars/SimpleSnackbar.tsx';
import TransitionsSnackbar from '../../../../../docs/data/material/components/snackbars/TransitionsSnackbar.tsx';

export default function Snackbars() {
  return (
    <MaterialUILayout>
      <h1>Snackbars</h1>
      <section>
        <h2> Autohide Snackbar</h2>
        <div className="demo-container">
          <AutohideSnackbar />
        </div>
      </section>
      <section>
        <h2> Consecutive Snackbars</h2>
        <div className="demo-container">
          <ConsecutiveSnackbars />
        </div>
      </section>
      <section>
        <h2> Customized Snackbars</h2>
        <div className="demo-container">
          <CustomizedSnackbars />
        </div>
      </section>
      <section>
        <h2> Direction Snackbar</h2>
        <div className="demo-container">
          <DirectionSnackbar />
        </div>
      </section>
      <section>
        <h2> Fab Integration Snackbar</h2>
        <div className="demo-container">
          <FabIntegrationSnackbar />
        </div>
      </section>
      <section>
        <h2> Integration Notistack</h2>
        <div className="demo-container">
          <IntegrationNotistack />
        </div>
      </section>
      <section>
        <h2> Long Text Snackbar</h2>
        <div className="demo-container">
          <LongTextSnackbar />
        </div>
      </section>
      <section>
        <h2> Positioned Snackbar</h2>
        <div className="demo-container">
          <PositionedSnackbar />
        </div>
      </section>
      <section>
        <h2> Simple Snackbar</h2>
        <div className="demo-container">
          <SimpleSnackbar />
        </div>
      </section>
      <section>
        <h2> Transitions Snackbar</h2>
        <div className="demo-container">
          <TransitionsSnackbar />
        </div>
      </section>
    </MaterialUILayout>
  );
}
