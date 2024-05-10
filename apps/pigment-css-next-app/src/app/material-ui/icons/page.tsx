'use client';
import * as React from 'react';
import CreateSvgIcon from '../../../../../../docs/data/material/components/icons/CreateSvgIcon';
import FontAwesomeIcon from '../../../../../../docs/data/material/components/icons/FontAwesomeIcon';
import FontAwesomeIconSize from '../../../../../../docs/data/material/components/icons/FontAwesomeIconSize';
import FontAwesomeSvgIconDemo from '../../../../../../docs/data/material/components/icons/FontAwesomeSvgIconDemo';
import Icons from '../../../../../../docs/data/material/components/icons/Icons';
import SvgIconChildren from '../../../../../../docs/data/material/components/icons/SvgIconChildren';
import SvgIconsColor from '../../../../../../docs/data/material/components/icons/SvgIconsColor';
import SvgIconsSize from '../../../../../../docs/data/material/components/icons/SvgIconsSize';
import SvgMaterialIcons from '../../../../../../docs/data/material/components/icons/SvgMaterialIcons';

export default function IconsPage() {
  return (
    <React.Fragment>
      <section>
        <h2> Create Svg Icon</h2>
        <div className="demo-container">
          <CreateSvgIcon />
        </div>
      </section>
      <section>
        <h2> Font Awesome Icon</h2>
        <div className="demo-container">
          <FontAwesomeIcon />
        </div>
      </section>
      <section>
        <h2> Font Awesome Icon Size</h2>
        <div className="demo-container">
          <FontAwesomeIconSize />
        </div>
      </section>
      <section>
        <h2> Font Awesome Svg Icon Demo</h2>
        <div className="demo-container">
          <FontAwesomeSvgIconDemo />
        </div>
      </section>
      <section>
        <h2> Icons</h2>
        <div className="demo-container">
          <Icons />
        </div>
      </section>
      <section>
        <h2> Svg Icon Children</h2>
        <div className="demo-container">
          <SvgIconChildren />
        </div>
      </section>
      <section>
        <h2> Svg Icons Color</h2>
        <div className="demo-container">
          <SvgIconsColor />
        </div>
      </section>
      <section>
        <h2> Svg Icons Size</h2>
        <div className="demo-container">
          <SvgIconsSize />
        </div>
      </section>
      <section>
        <h2> Svg Material Icons</h2>
        <div className="demo-container">
          <SvgMaterialIcons />
        </div>
      </section>
    </React.Fragment>
  );
}
