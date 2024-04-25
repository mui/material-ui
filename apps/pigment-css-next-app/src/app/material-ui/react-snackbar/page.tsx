'use client';
import * as React from 'react';
import AutohideSnackbar from '../../../../../../docs/data/material/components/snackbars/AutohideSnackbar';
import ConsecutiveSnackbars from '../../../../../../docs/data/material/components/snackbars/ConsecutiveSnackbars';
import CustomizedSnackbars from '../../../../../../docs/data/material/components/snackbars/CustomizedSnackbars';
import DirectionSnackbar from '../../../../../../docs/data/material/components/snackbars/DirectionSnackbar';
import FabIntegrationSnackbar from '../../../../../../docs/data/material/components/snackbars/FabIntegrationSnackbar';
import IntegrationNotistack from '../../../../../../docs/data/material/components/snackbars/IntegrationNotistack';
import LongTextSnackbar from '../../../../../../docs/data/material/components/snackbars/LongTextSnackbar';
import PositionedSnackbar from '../../../../../../docs/data/material/components/snackbars/PositionedSnackbar';
import SimpleSnackbar from '../../../../../../docs/data/material/components/snackbars/SimpleSnackbar';
import TransitionsSnackbar from '../../../../../../docs/data/material/components/snackbars/TransitionsSnackbar';

export default function Snackbars() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
