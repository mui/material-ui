'use client';
import * as React from 'react';
import AccountMenu from '../../../../../../docs/data/material/components/menus/AccountMenu';
import BasicMenu from '../../../../../../docs/data/material/components/menus/BasicMenu';
import ContextMenu from '../../../../../../docs/data/material/components/menus/ContextMenu';
import CustomizedMenus from '../../../../../../docs/data/material/components/menus/CustomizedMenus';
import DenseMenu from '../../../../../../docs/data/material/components/menus/DenseMenu';
import FadeMenu from '../../../../../../docs/data/material/components/menus/FadeMenu';
import IconMenu from '../../../../../../docs/data/material/components/menus/IconMenu';
import LongMenu from '../../../../../../docs/data/material/components/menus/LongMenu';
import MenuListComposition from '../../../../../../docs/data/material/components/menus/MenuListComposition';
import MenuPopupState from '../../../../../../docs/data/material/components/menus/MenuPopupState';
import PositionedMenu from '../../../../../../docs/data/material/components/menus/PositionedMenu';
import SimpleListMenu from '../../../../../../docs/data/material/components/menus/SimpleListMenu';
import TypographyMenu from '../../../../../../docs/data/material/components/menus/TypographyMenu';

export default function Menus() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
