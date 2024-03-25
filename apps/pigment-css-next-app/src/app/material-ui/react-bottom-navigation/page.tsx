'use client';
import * as React from 'react';
import FixedBottomNavigation from '../../../../../../docs/data/material/components/bottom-navigation/FixedBottomNavigation';
import LabelBottomNavigation from '../../../../../../docs/data/material/components/bottom-navigation/LabelBottomNavigation';
import SimpleBottomNavigation from '../../../../../../docs/data/material/components/bottom-navigation/SimpleBottomNavigation';

export default function BottomNavigation() {
  return (
    <React.Fragment>
      <section>
        <h2> Fixed Bottom Navigation</h2>
        <div className="demo-container">
          <FixedBottomNavigation />
        </div>
      </section>
      <section>
        <h2> Label Bottom Navigation</h2>
        <div className="demo-container">
          <LabelBottomNavigation />
        </div>
      </section>
      <section>
        <h2> Simple Bottom Navigation</h2>
        <div className="demo-container">
          <SimpleBottomNavigation />
        </div>
      </section>
    </React.Fragment>
  );
}
