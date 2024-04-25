import * as React from 'react';
import MaterialUILayout from '../../Layout';
import CreateSvgIcon from '../../../../../docs/data/material/components/icons/CreateSvgIcon.tsx';
import FontAwesomeIcon from '../../../../../docs/data/material/components/icons/FontAwesomeIcon.tsx';
import FontAwesomeIconSize from '../../../../../docs/data/material/components/icons/FontAwesomeIconSize.tsx';
import FontAwesomeSvgIconDemo from '../../../../../docs/data/material/components/icons/FontAwesomeSvgIconDemo.tsx';
import Icons from '../../../../../docs/data/material/components/icons/Icons.tsx';
import SvgIconChildren from '../../../../../docs/data/material/components/icons/SvgIconChildren.tsx';
import SvgIconsColor from '../../../../../docs/data/material/components/icons/SvgIconsColor.tsx';
import SvgIconsSize from '../../../../../docs/data/material/components/icons/SvgIconsSize.tsx';
import SvgMaterialIcons from '../../../../../docs/data/material/components/icons/SvgMaterialIcons.tsx';

export default function IconsPage() {
  return (
    <MaterialUILayout>
      <h1>Icons</h1>
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
    </MaterialUILayout>
  );
}
