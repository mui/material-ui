import * as React from 'react';
import MaterialUILayout from '../../Layout';
import DividerText from '../../../../../docs/data/material/components/dividers/DividerText.tsx';
import DividerVariants from '../../../../../docs/data/material/components/dividers/DividerVariants.tsx';
import FlexDivider from '../../../../../docs/data/material/components/dividers/FlexDivider.tsx';
import IntroDivider from '../../../../../docs/data/material/components/dividers/IntroDivider.tsx';
import ListDividers from '../../../../../docs/data/material/components/dividers/ListDividers.tsx';
import VerticalDividerMiddle from '../../../../../docs/data/material/components/dividers/VerticalDividerMiddle.tsx';
import VerticalDividers from '../../../../../docs/data/material/components/dividers/VerticalDividers.tsx';

export default function Dividers() {
  return (
    <MaterialUILayout>
      <h1>Dividers</h1>
      <section>
        <h2> Divider Text</h2>
        <div className="demo-container">
          <DividerText />
        </div>
      </section>
      <section>
        <h2> Divider Variants</h2>
        <div className="demo-container">
          <DividerVariants />
        </div>
      </section>
      <section>
        <h2> Flex Divider</h2>
        <div className="demo-container">
          <FlexDivider />
        </div>
      </section>
      <section>
        <h2> Intro Divider</h2>
        <div className="demo-container">
          <IntroDivider />
        </div>
      </section>
      <section>
        <h2> List Dividers</h2>
        <div className="demo-container">
          <ListDividers />
        </div>
      </section>
      <section>
        <h2> Vertical Divider Middle</h2>
        <div className="demo-container">
          <VerticalDividerMiddle />
        </div>
      </section>
      <section>
        <h2> Vertical Dividers</h2>
        <div className="demo-container">
          <VerticalDividers />
        </div>
      </section>
    </MaterialUILayout>
  );
}
