'use client';
import * as React from 'react';
import BasicButtonGroup from '../../../../../../docs/data/material/components/button-group/BasicButtonGroup';
import DisableElevation from '../../../../../../docs/data/material/components/button-group/DisableElevation';
import GroupOrientation from '../../../../../../docs/data/material/components/button-group/GroupOrientation';
import GroupSizesColors from '../../../../../../docs/data/material/components/button-group/GroupSizesColors';
import LoadingButtonGroup from '../../../../../../docs/data/material/components/button-group/LoadingButtonGroup';
import SplitButton from '../../../../../../docs/data/material/components/button-group/SplitButton';
import VariantButtonGroup from '../../../../../../docs/data/material/components/button-group/VariantButtonGroup';

export default function ButtonGroup() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Button Group</h2>
        <div className="demo-container">
          <BasicButtonGroup />
        </div>
      </section>
      <section>
        <h2> Disable Elevation</h2>
        <div className="demo-container">
          <DisableElevation />
        </div>
      </section>
      <section>
        <h2> Group Orientation</h2>
        <div className="demo-container">
          <GroupOrientation />
        </div>
      </section>
      <section>
        <h2> Group Sizes Colors</h2>
        <div className="demo-container">
          <GroupSizesColors />
        </div>
      </section>
      <section>
        <h2> Loading Button Group</h2>
        <div className="demo-container">
          <LoadingButtonGroup />
        </div>
      </section>
      <section>
        <h2> Split Button</h2>
        <div className="demo-container">
          <SplitButton />
        </div>
      </section>
      <section>
        <h2> Variant Button Group</h2>
        <div className="demo-container">
          <VariantButtonGroup />
        </div>
      </section>
    </React.Fragment>
  );
}
