'use client';
import * as React from 'react';
import AccessibleBadges from '../../../../../../docs/data/material/components/badges/AccessibleBadges';
import BadgeMax from '../../../../../../docs/data/material/components/badges/BadgeMax';
import BadgeOverlap from '../../../../../../docs/data/material/components/badges/BadgeOverlap';
import BadgeVisibility from '../../../../../../docs/data/material/components/badges/BadgeVisibility';
import ColorBadge from '../../../../../../docs/data/material/components/badges/ColorBadge';
import CustomizedBadges from '../../../../../../docs/data/material/components/badges/CustomizedBadges';
import DotBadge from '../../../../../../docs/data/material/components/badges/DotBadge';
import ShowZeroBadge from '../../../../../../docs/data/material/components/badges/ShowZeroBadge';
import SimpleBadge from '../../../../../../docs/data/material/components/badges/SimpleBadge';

export default function Badges() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
