import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccessibleTabs1 from '../../../../../docs/data/material/components/tabs/AccessibleTabs1.tsx';
import AccessibleTabs2 from '../../../../../docs/data/material/components/tabs/AccessibleTabs2.tsx';
import BasicTabs from '../../../../../docs/data/material/components/tabs/BasicTabs.tsx';
import CenteredTabs from '../../../../../docs/data/material/components/tabs/CenteredTabs.tsx';
import ColorTabs from '../../../../../docs/data/material/components/tabs/ColorTabs.tsx';
import CustomizedTabs from '../../../../../docs/data/material/components/tabs/CustomizedTabs.tsx';
import DisabledTabs from '../../../../../docs/data/material/components/tabs/DisabledTabs.tsx';
import FullWidthTabs from '../../../../../docs/data/material/components/tabs/FullWidthTabs.tsx';
import IconLabelTabs from '../../../../../docs/data/material/components/tabs/IconLabelTabs.tsx';
import IconPositionTabs from '../../../../../docs/data/material/components/tabs/IconPositionTabs.tsx';
import IconTabs from '../../../../../docs/data/material/components/tabs/IconTabs.tsx';
import LabTabs from '../../../../../docs/data/material/components/tabs/LabTabs.tsx';
import NavTabs from '../../../../../docs/data/material/components/tabs/NavTabs.tsx';
import ScrollableTabsButtonAuto from '../../../../../docs/data/material/components/tabs/ScrollableTabsButtonAuto.tsx';
import ScrollableTabsButtonForce from '../../../../../docs/data/material/components/tabs/ScrollableTabsButtonForce.tsx';
import ScrollableTabsButtonPrevent from '../../../../../docs/data/material/components/tabs/ScrollableTabsButtonPrevent.tsx';
import ScrollableTabsButtonVisible from '../../../../../docs/data/material/components/tabs/ScrollableTabsButtonVisible.tsx';
import TabsWrappedLabel from '../../../../../docs/data/material/components/tabs/TabsWrappedLabel.tsx';
import VerticalTabs from '../../../../../docs/data/material/components/tabs/VerticalTabs.tsx';

export default function Tabs() {
  return (
    <MaterialUILayout>
      <h1>Tabs</h1>
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
    </MaterialUILayout>
  );
}
