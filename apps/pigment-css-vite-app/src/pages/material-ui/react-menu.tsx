import * as React from 'react';
import MaterialUILayout from '../../Layout';
import AccountMenu from '../../../../../docs/data/material/components/menus/AccountMenu.tsx';
import BasicMenu from '../../../../../docs/data/material/components/menus/BasicMenu.tsx';
import ContextMenu from '../../../../../docs/data/material/components/menus/ContextMenu.tsx';
import CustomizedMenus from '../../../../../docs/data/material/components/menus/CustomizedMenus.tsx';
import DenseMenu from '../../../../../docs/data/material/components/menus/DenseMenu.tsx';
import FadeMenu from '../../../../../docs/data/material/components/menus/FadeMenu.tsx';
import IconMenu from '../../../../../docs/data/material/components/menus/IconMenu.tsx';
import LongMenu from '../../../../../docs/data/material/components/menus/LongMenu.tsx';
import MenuListComposition from '../../../../../docs/data/material/components/menus/MenuListComposition.tsx';
import MenuPopupState from '../../../../../docs/data/material/components/menus/MenuPopupState.tsx';
import PositionedMenu from '../../../../../docs/data/material/components/menus/PositionedMenu.tsx';
import SimpleListMenu from '../../../../../docs/data/material/components/menus/SimpleListMenu.tsx';
import TypographyMenu from '../../../../../docs/data/material/components/menus/TypographyMenu.tsx';

export default function Menus() {
  return (
    <MaterialUILayout>
      <h1>Menus</h1>
      <section>
        <h2> Account Menu</h2>
        <div className="demo-container">
          <AccountMenu />
        </div>
      </section>
      <section>
        <h2> Basic Menu</h2>
        <div className="demo-container">
          <BasicMenu />
        </div>
      </section>
      <section>
        <h2> Context Menu</h2>
        <div className="demo-container">
          <ContextMenu />
        </div>
      </section>
      <section>
        <h2> Customized Menus</h2>
        <div className="demo-container">
          <CustomizedMenus />
        </div>
      </section>
      <section>
        <h2> Dense Menu</h2>
        <div className="demo-container">
          <DenseMenu />
        </div>
      </section>
      <section>
        <h2> Fade Menu</h2>
        <div className="demo-container">
          <FadeMenu />
        </div>
      </section>
      <section>
        <h2> Icon Menu</h2>
        <div className="demo-container">
          <IconMenu />
        </div>
      </section>
      <section>
        <h2> Long Menu</h2>
        <div className="demo-container">
          <LongMenu />
        </div>
      </section>
      <section>
        <h2> Menu List Composition</h2>
        <div className="demo-container">
          <MenuListComposition />
        </div>
      </section>
      <section>
        <h2> Menu Popup State</h2>
        <div className="demo-container">
          <MenuPopupState />
        </div>
      </section>
      <section>
        <h2> Positioned Menu</h2>
        <div className="demo-container">
          <PositionedMenu />
        </div>
      </section>
      <section>
        <h2> Simple List Menu</h2>
        <div className="demo-container">
          <SimpleListMenu />
        </div>
      </section>
      <section>
        <h2> Typography Menu</h2>
        <div className="demo-container">
          <TypographyMenu />
        </div>
      </section>
    </MaterialUILayout>
  );
}
