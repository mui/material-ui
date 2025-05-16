'use client';
import * as React from 'react';
import BasicSelect from '../../../../../../docs/data/material/components/selects/BasicSelect';
import ControlledOpenSelect from '../../../../../../docs/data/material/components/selects/ControlledOpenSelect';
import CustomizedSelects from '../../../../../../docs/data/material/components/selects/CustomizedSelects';
import DialogSelect from '../../../../../../docs/data/material/components/selects/DialogSelect';
import GroupedSelect from '../../../../../../docs/data/material/components/selects/GroupedSelect';
import MultipleSelect from '../../../../../../docs/data/material/components/selects/MultipleSelect';
import MultipleSelectCheckmarks from '../../../../../../docs/data/material/components/selects/MultipleSelectCheckmarks';
import MultipleSelectChip from '../../../../../../docs/data/material/components/selects/MultipleSelectChip';
import MultipleSelectNative from '../../../../../../docs/data/material/components/selects/MultipleSelectNative';
import MultipleSelectPlaceholder from '../../../../../../docs/data/material/components/selects/MultipleSelectPlaceholder';
import NativeSelectDemo from '../../../../../../docs/data/material/components/selects/NativeSelectDemo';
import SelectAutoWidth from '../../../../../../docs/data/material/components/selects/SelectAutoWidth';
import SelectLabels from '../../../../../../docs/data/material/components/selects/SelectLabels';
import SelectOtherProps from '../../../../../../docs/data/material/components/selects/SelectOtherProps';
import SelectSmall from '../../../../../../docs/data/material/components/selects/SelectSmall';
import SelectVariants from '../../../../../../docs/data/material/components/selects/SelectVariants';

export default function Selects() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Select</h2>
        <div className="demo-container">
          <BasicSelect />
        </div>
      </section>
      <section>
        <h2> Controlled Open Select</h2>
        <div className="demo-container">
          <ControlledOpenSelect />
        </div>
      </section>
      <section>
        <h2> Customized Selects</h2>
        <div className="demo-container">
          <CustomizedSelects />
        </div>
      </section>
      <section>
        <h2> Dialog Select</h2>
        <div className="demo-container">
          <DialogSelect />
        </div>
      </section>
      <section>
        <h2> Grouped Select</h2>
        <div className="demo-container">
          <GroupedSelect />
        </div>
      </section>
      <section>
        <h2> Multiple Select</h2>
        <div className="demo-container">
          <MultipleSelect />
        </div>
      </section>
      <section>
        <h2> Multiple Select Checkmarks</h2>
        <div className="demo-container">
          <MultipleSelectCheckmarks />
        </div>
      </section>
      <section>
        <h2> Multiple Select Chip</h2>
        <div className="demo-container">
          <MultipleSelectChip />
        </div>
      </section>
      <section>
        <h2> Multiple Select Native</h2>
        <div className="demo-container">
          <MultipleSelectNative />
        </div>
      </section>
      <section>
        <h2> Multiple Select Placeholder</h2>
        <div className="demo-container">
          <MultipleSelectPlaceholder />
        </div>
      </section>
      <section>
        <h2> Native Select Demo</h2>
        <div className="demo-container">
          <NativeSelectDemo />
        </div>
      </section>
      <section>
        <h2> Select Auto Width</h2>
        <div className="demo-container">
          <SelectAutoWidth />
        </div>
      </section>
      <section>
        <h2> Select Labels</h2>
        <div className="demo-container">
          <SelectLabels />
        </div>
      </section>
      <section>
        <h2> Select Other Props</h2>
        <div className="demo-container">
          <SelectOtherProps />
        </div>
      </section>
      <section>
        <h2> Select Small</h2>
        <div className="demo-container">
          <SelectSmall />
        </div>
      </section>
      <section>
        <h2> Select Variants</h2>
        <div className="demo-container">
          <SelectVariants />
        </div>
      </section>
    </React.Fragment>
  );
}
