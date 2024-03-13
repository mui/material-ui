import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BackToTop from '../../../../../docs/data/material/components/app-bar/BackToTop.tsx';
import BottomAppBar from '../../../../../docs/data/material/components/app-bar/BottomAppBar.tsx';
import ButtonAppBar from '../../../../../docs/data/material/components/app-bar/ButtonAppBar.tsx';
import DenseAppBar from '../../../../../docs/data/material/components/app-bar/DenseAppBar.tsx';
import DrawerAppBar from '../../../../../docs/data/material/components/app-bar/DrawerAppBar.tsx';
import ElevateAppBar from '../../../../../docs/data/material/components/app-bar/ElevateAppBar.tsx';
import EnableColorOnDarkAppBar from '../../../../../docs/data/material/components/app-bar/EnableColorOnDarkAppBar.tsx';
import HideAppBar from '../../../../../docs/data/material/components/app-bar/HideAppBar.tsx';
import MenuAppBar from '../../../../../docs/data/material/components/app-bar/MenuAppBar.tsx';
import PrimarySearchAppBar from '../../../../../docs/data/material/components/app-bar/PrimarySearchAppBar.tsx';
import ProminentAppBar from '../../../../../docs/data/material/components/app-bar/ProminentAppBar.tsx';
import ResponsiveAppBar from '../../../../../docs/data/material/components/app-bar/ResponsiveAppBar.tsx';
import SearchAppBar from '../../../../../docs/data/material/components/app-bar/SearchAppBar.tsx';

export default function AppBar() {
  return (
    <MaterialUILayout>
      <h1>AppBar</h1>
      <section>
        <h2> Back To Top</h2>
        <div className="demo-container">
          <BackToTop />
        </div>
      </section>
      <section>
        <h2> Bottom App Bar</h2>
        <div className="demo-container">
          <BottomAppBar />
        </div>
      </section>
      <section>
        <h2> Button App Bar</h2>
        <div className="demo-container">
          <ButtonAppBar />
        </div>
      </section>
      <section>
        <h2> Dense App Bar</h2>
        <div className="demo-container">
          <DenseAppBar />
        </div>
      </section>
      <section>
        <h2> Drawer App Bar</h2>
        <div className="demo-container">
          <DrawerAppBar />
        </div>
      </section>
      <section>
        <h2> Elevate App Bar</h2>
        <div className="demo-container">
          <ElevateAppBar />
        </div>
      </section>
      <section>
        <h2> Enable Color On Dark App Bar</h2>
        <div className="demo-container">
          <EnableColorOnDarkAppBar />
        </div>
      </section>
      <section>
        <h2> Hide App Bar</h2>
        <div className="demo-container">
          <HideAppBar />
        </div>
      </section>
      <section>
        <h2> Menu App Bar</h2>
        <div className="demo-container">
          <MenuAppBar />
        </div>
      </section>
      <section>
        <h2> Primary Search App Bar</h2>
        <div className="demo-container">
          <PrimarySearchAppBar />
        </div>
      </section>
      <section>
        <h2> Prominent App Bar</h2>
        <div className="demo-container">
          <ProminentAppBar />
        </div>
      </section>
      <section>
        <h2> Responsive App Bar</h2>
        <div className="demo-container">
          <ResponsiveAppBar />
        </div>
      </section>
      <section>
        <h2> Search App Bar</h2>
        <div className="demo-container">
          <SearchAppBar />
        </div>
      </section>
    </MaterialUILayout>
  );
}
