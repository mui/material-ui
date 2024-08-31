'use client';
import * as React from 'react';
import AccessibleTabs1 from '../../../../../../docs/data/material/components/tabs/AccessibleTabs1';
import AccessibleTabs2 from '../../../../../../docs/data/material/components/tabs/AccessibleTabs2';
import BasicTabs from '../../../../../../docs/data/material/components/tabs/BasicTabs';
import CenteredTabs from '../../../../../../docs/data/material/components/tabs/CenteredTabs';
import ColorTabs from '../../../../../../docs/data/material/components/tabs/ColorTabs';
import CustomizedTabs from '../../../../../../docs/data/material/components/tabs/CustomizedTabs';
import DisabledTabs from '../../../../../../docs/data/material/components/tabs/DisabledTabs';
import FullWidthTabs from '../../../../../../docs/data/material/components/tabs/FullWidthTabs';
import IconLabelTabs from '../../../../../../docs/data/material/components/tabs/IconLabelTabs';
import IconPositionTabs from '../../../../../../docs/data/material/components/tabs/IconPositionTabs';
import IconTabs from '../../../../../../docs/data/material/components/tabs/IconTabs';
import LabTabs from '../../../../../../docs/data/material/components/tabs/LabTabs';
import NavTabs from '../../../../../../docs/data/material/components/tabs/NavTabs';
import ScrollableTabsButtonAuto from '../../../../../../docs/data/material/components/tabs/ScrollableTabsButtonAuto';
import ScrollableTabsButtonForce from '../../../../../../docs/data/material/components/tabs/ScrollableTabsButtonForce';
import ScrollableTabsButtonPrevent from '../../../../../../docs/data/material/components/tabs/ScrollableTabsButtonPrevent';
import ScrollableTabsButtonVisible from '../../../../../../docs/data/material/components/tabs/ScrollableTabsButtonVisible';
import TabsWrappedLabel from '../../../../../../docs/data/material/components/tabs/TabsWrappedLabel';
import VerticalTabs from '../../../../../../docs/data/material/components/tabs/VerticalTabs';

export default function Tabs() {
  return (
    <React.Fragment>
      <section>
        <h2> Accessible Tabs1</h2>
        <div className="demo-container">
          <AccessibleTabs1 />
        </div>
      </section>
      <section>
        <h2> Accessible Tabs2</h2>
        <div className="demo-container">
          <AccessibleTabs2 />
        </div>
      </section>
      <section>
        <h2> Basic Tabs</h2>
        <div className="demo-container">
          <BasicTabs />
        </div>
      </section>
      <section>
        <h2> Centered Tabs</h2>
        <div className="demo-container">
          <CenteredTabs />
        </div>
      </section>
      <section>
        <h2> Color Tabs</h2>
        <div className="demo-container">
          <ColorTabs />
        </div>
      </section>
      <section>
        <h2> Customized Tabs</h2>
        <div className="demo-container">
          <CustomizedTabs />
        </div>
      </section>
      <section>
        <h2> Disabled Tabs</h2>
        <div className="demo-container">
          <DisabledTabs />
        </div>
      </section>
      <section>
        <h2> Full Width Tabs</h2>
        <div className="demo-container">
          <FullWidthTabs />
        </div>
      </section>
      <section>
        <h2> Icon Label Tabs</h2>
        <div className="demo-container">
          <IconLabelTabs />
        </div>
      </section>
      <section>
        <h2> Icon Position Tabs</h2>
        <div className="demo-container">
          <IconPositionTabs />
        </div>
      </section>
      <section>
        <h2> Icon Tabs</h2>
        <div className="demo-container">
          <IconTabs />
        </div>
      </section>
      <section>
        <h2> Lab Tabs</h2>
        <div className="demo-container">
          <LabTabs />
        </div>
      </section>
      <section>
        <h2> Nav Tabs</h2>
        <div className="demo-container">
          <NavTabs />
        </div>
      </section>
      <section>
        <h2> Scrollable Tabs Button Auto</h2>
        <div className="demo-container">
          <ScrollableTabsButtonAuto />
        </div>
      </section>
      <section>
        <h2> Scrollable Tabs Button Force</h2>
        <div className="demo-container">
          <ScrollableTabsButtonForce />
        </div>
      </section>
      <section>
        <h2> Scrollable Tabs Button Prevent</h2>
        <div className="demo-container">
          <ScrollableTabsButtonPrevent />
        </div>
      </section>
      <section>
        <h2> Scrollable Tabs Button Visible</h2>
        <div className="demo-container">
          <ScrollableTabsButtonVisible />
        </div>
      </section>
      <section>
        <h2> Tabs Wrapped Label</h2>
        <div className="demo-container">
          <TabsWrappedLabel />
        </div>
      </section>
      <section>
        <h2> Vertical Tabs</h2>
        <div className="demo-container">
          <VerticalTabs />
        </div>
      </section>
    </React.Fragment>
  );
}
