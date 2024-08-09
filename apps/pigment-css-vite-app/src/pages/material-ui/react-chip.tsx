import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AvatarChips from '../../../../../docs/data/material/components/chips/AvatarChips.tsx';
import BasicChips from '../../../../../docs/data/material/components/chips/BasicChips.tsx';
import ChipsArray from '../../../../../docs/data/material/components/chips/ChipsArray.tsx';
import ClickableAndDeletableChips from '../../../../../docs/data/material/components/chips/ClickableAndDeletableChips.tsx';
import ClickableChips from '../../../../../docs/data/material/components/chips/ClickableChips.tsx';
import ClickableLinkChips from '../../../../../docs/data/material/components/chips/ClickableLinkChips.tsx';
import ColorChips from '../../../../../docs/data/material/components/chips/ColorChips.tsx';
import CustomDeleteIconChips from '../../../../../docs/data/material/components/chips/CustomDeleteIconChips.tsx';
import DeletableChips from '../../../../../docs/data/material/components/chips/DeletableChips.tsx';
import IconChips from '../../../../../docs/data/material/components/chips/IconChips.tsx';
import MultilineChips from '../../../../../docs/data/material/components/chips/MultilineChips.tsx';
import SizesChips from '../../../../../docs/data/material/components/chips/SizesChips.tsx';

export default function Chips() {
  return (
    <MaterialUILayout>
      <h1>Chips</h1>
      <section>
        <h2> Avatar Chips</h2>
        <div className="demo-container">
          <AvatarChips />
        </div>
      </section>
      <section>
        <h2> Basic Chips</h2>
        <div className="demo-container">
          <BasicChips />
        </div>
      </section>
      <section>
        <h2> Chips Array</h2>
        <div className="demo-container">
          <ChipsArray />
        </div>
      </section>
      <section>
        <h2> Clickable And Deletable Chips</h2>
        <div className="demo-container">
          <ClickableAndDeletableChips />
        </div>
      </section>
      <section>
        <h2> Clickable Chips</h2>
        <div className="demo-container">
          <ClickableChips />
        </div>
      </section>
      <section>
        <h2> Clickable Link Chips</h2>
        <div className="demo-container">
          <ClickableLinkChips />
        </div>
      </section>
      <section>
        <h2> Color Chips</h2>
        <div className="demo-container">
          <ColorChips />
        </div>
      </section>
      <section>
        <h2> Custom Delete Icon Chips</h2>
        <div className="demo-container">
          <CustomDeleteIconChips />
        </div>
      </section>
      <section>
        <h2> Deletable Chips</h2>
        <div className="demo-container">
          <DeletableChips />
        </div>
      </section>
      <section>
        <h2> Icon Chips</h2>
        <div className="demo-container">
          <IconChips />
        </div>
      </section>
      <section>
        <h2> Multiline Chips</h2>
        <div className="demo-container">
          <MultilineChips />
        </div>
      </section>
      <section>
        <h2> Sizes Chips</h2>
        <div className="demo-container">
          <SizesChips />
        </div>
      </section>
    </MaterialUILayout>
  );
}
