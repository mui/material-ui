'use client';
import * as React from 'react';
import AlertDialog from '../../../../../../docs/data/material/components/dialogs/AlertDialog';
import AlertDialogSlide from '../../../../../../docs/data/material/components/dialogs/AlertDialogSlide';
import ConfirmationDialog from '../../../../../../docs/data/material/components/dialogs/ConfirmationDialog';
import CookiesBanner from '../../../../../../docs/data/material/components/dialogs/CookiesBanner';
import CustomizedDialogs from '../../../../../../docs/data/material/components/dialogs/CustomizedDialogs';
import DraggableDialog from '../../../../../../docs/data/material/components/dialogs/DraggableDialog';
import FormDialog from '../../../../../../docs/data/material/components/dialogs/FormDialog';
import FullScreenDialog from '../../../../../../docs/data/material/components/dialogs/FullScreenDialog';
import MaxWidthDialog from '../../../../../../docs/data/material/components/dialogs/MaxWidthDialog';
import ResponsiveDialog from '../../../../../../docs/data/material/components/dialogs/ResponsiveDialog';
import ScrollDialog from '../../../../../../docs/data/material/components/dialogs/ScrollDialog';
import SimpleDialogDemo from '../../../../../../docs/data/material/components/dialogs/SimpleDialogDemo';

export default function Dialogs() {
  return (
    <React.Fragment>
      <section>
        <h2> Alert Dialog</h2>
        <div className="demo-container">
          <AlertDialog />
        </div>
      </section>
      <section>
        <h2> Alert Dialog Slide</h2>
        <div className="demo-container">
          <AlertDialogSlide />
        </div>
      </section>
      <section>
        <h2> Confirmation Dialog</h2>
        <div className="demo-container">
          <ConfirmationDialog />
        </div>
      </section>
      <section>
        <h2> Cookies Banner</h2>
        <div className="demo-container">
          <CookiesBanner />
        </div>
      </section>
      <section>
        <h2> Customized Dialogs</h2>
        <div className="demo-container">
          <CustomizedDialogs />
        </div>
      </section>
      <section>
        <h2> Draggable Dialog</h2>
        <div className="demo-container">
          <DraggableDialog />
        </div>
      </section>
      <section>
        <h2> Form Dialog</h2>
        <div className="demo-container">
          <FormDialog />
        </div>
      </section>
      <section>
        <h2> Full Screen Dialog</h2>
        <div className="demo-container">
          <FullScreenDialog />
        </div>
      </section>
      <section>
        <h2> Max Width Dialog</h2>
        <div className="demo-container">
          <MaxWidthDialog />
        </div>
      </section>
      <section>
        <h2> Responsive Dialog</h2>
        <div className="demo-container">
          <ResponsiveDialog />
        </div>
      </section>
      <section>
        <h2> Scroll Dialog</h2>
        <div className="demo-container">
          <ScrollDialog />
        </div>
      </section>
      <section>
        <h2> Simple Dialog Demo</h2>
        <div className="demo-container">
          <SimpleDialogDemo />
        </div>
      </section>
    </React.Fragment>
  );
}
