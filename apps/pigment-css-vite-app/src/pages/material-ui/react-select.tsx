import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicSelect from '../../../../../docs/data/material/components/selects/BasicSelect.tsx';
import ControlledOpenSelect from '../../../../../docs/data/material/components/selects/ControlledOpenSelect.tsx';
import CustomizedSelects from '../../../../../docs/data/material/components/selects/CustomizedSelects.tsx';
import DialogSelect from '../../../../../docs/data/material/components/selects/DialogSelect.tsx';
import GroupedSelect from '../../../../../docs/data/material/components/selects/GroupedSelect.tsx';
import MultipleSelect from '../../../../../docs/data/material/components/selects/MultipleSelect.tsx';
import MultipleSelectCheckmarks from '../../../../../docs/data/material/components/selects/MultipleSelectCheckmarks.tsx';
import MultipleSelectChip from '../../../../../docs/data/material/components/selects/MultipleSelectChip.tsx';
import MultipleSelectNative from '../../../../../docs/data/material/components/selects/MultipleSelectNative.tsx';
import MultipleSelectPlaceholder from '../../../../../docs/data/material/components/selects/MultipleSelectPlaceholder.tsx';
import NativeSelectDemo from '../../../../../docs/data/material/components/selects/NativeSelectDemo.tsx';
import SelectAutoWidth from '../../../../../docs/data/material/components/selects/SelectAutoWidth.tsx';
import SelectLabels from '../../../../../docs/data/material/components/selects/SelectLabels.tsx';
import SelectOtherProps from '../../../../../docs/data/material/components/selects/SelectOtherProps.tsx';
import SelectSmall from '../../../../../docs/data/material/components/selects/SelectSmall.tsx';
import SelectVariants from '../../../../../docs/data/material/components/selects/SelectVariants.tsx';

export default function Selects() {
  return (
    <MaterialUILayout>
      <h1>Selects</h1>
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
    </MaterialUILayout>
  );
}
