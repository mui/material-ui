import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccessibleBadges from '../../../../../docs/data/material/components/badges/AccessibleBadges.tsx';
import BadgeMax from '../../../../../docs/data/material/components/badges/BadgeMax.tsx';
import BadgeOverlap from '../../../../../docs/data/material/components/badges/BadgeOverlap.tsx';
import BadgeVisibility from '../../../../../docs/data/material/components/badges/BadgeVisibility.tsx';
import ColorBadge from '../../../../../docs/data/material/components/badges/ColorBadge.tsx';
import CustomizedBadges from '../../../../../docs/data/material/components/badges/CustomizedBadges.tsx';
import DotBadge from '../../../../../docs/data/material/components/badges/DotBadge.tsx';
import ShowZeroBadge from '../../../../../docs/data/material/components/badges/ShowZeroBadge.tsx';
import SimpleBadge from '../../../../../docs/data/material/components/badges/SimpleBadge.tsx';

export default function Badges() {
  return (
    <MaterialUILayout>
      <h1>Badges</h1>
      <section>
        <h2> Accessible Badges</h2>
        <div className="demo-container">
          <AccessibleBadges />
        </div>
      </section>
      <section>
        <h2> Badge Max</h2>
        <div className="demo-container">
          <BadgeMax />
        </div>
      </section>
      <section>
        <h2> Badge Overlap</h2>
        <div className="demo-container">
          <BadgeOverlap />
        </div>
      </section>
      <section>
        <h2> Badge Visibility</h2>
        <div className="demo-container">
          <BadgeVisibility />
        </div>
      </section>
      <section>
        <h2> Color Badge</h2>
        <div className="demo-container">
          <ColorBadge />
        </div>
      </section>
      <section>
        <h2> Customized Badges</h2>
        <div className="demo-container">
          <CustomizedBadges />
        </div>
      </section>
      <section>
        <h2> Dot Badge</h2>
        <div className="demo-container">
          <DotBadge />
        </div>
      </section>
      <section>
        <h2> Show Zero Badge</h2>
        <div className="demo-container">
          <ShowZeroBadge />
        </div>
      </section>
      <section>
        <h2> Simple Badge</h2>
        <div className="demo-container">
          <SimpleBadge />
        </div>
      </section>
    </MaterialUILayout>
  );
}
