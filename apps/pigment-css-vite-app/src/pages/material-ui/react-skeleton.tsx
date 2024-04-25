import * as React from 'react';
import MaterialUILayout from '../../Layout';
import Animations from '../../../../../docs/data/material/components/skeleton/Animations.tsx';
import Facebook from '../../../../../docs/data/material/components/skeleton/Facebook.tsx';
import SkeletonChildren from '../../../../../docs/data/material/components/skeleton/SkeletonChildren.tsx';
import SkeletonColor from '../../../../../docs/data/material/components/skeleton/SkeletonColor.tsx';
import SkeletonTypography from '../../../../../docs/data/material/components/skeleton/SkeletonTypography.tsx';
import Variants from '../../../../../docs/data/material/components/skeleton/Variants.tsx';
import YouTube from '../../../../../docs/data/material/components/skeleton/YouTube.tsx';

export default function Skeleton() {
  return (
    <MaterialUILayout>
      <h1>Skeleton</h1>
      <section>
        <h2> Animations</h2>
        <div className="demo-container">
          <Animations />
        </div>
      </section>
      <section>
        <h2> Facebook</h2>
        <div className="demo-container">
          <Facebook />
        </div>
      </section>
      <section>
        <h2> Skeleton Children</h2>
        <div className="demo-container">
          <SkeletonChildren />
        </div>
      </section>
      <section>
        <h2> Skeleton Color</h2>
        <div className="demo-container">
          <SkeletonColor />
        </div>
      </section>
      <section>
        <h2> Skeleton Typography</h2>
        <div className="demo-container">
          <SkeletonTypography />
        </div>
      </section>
      <section>
        <h2> Variants</h2>
        <div className="demo-container">
          <Variants />
        </div>
      </section>
      <section>
        <h2> You Tube</h2>
        <div className="demo-container">
          <YouTube />
        </div>
      </section>
    </MaterialUILayout>
  );
}
