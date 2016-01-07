import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import ArrowDropRight from 'material-ui/lib/svg-icons/navigation-arrow-drop-right';

const style = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0,
};

const MenuExampleSecondary = () => (
  <div>
    <Menu style={style} desktop={true} width={320}>
      <MenuItem primaryText="Bold" secondaryText="&#8984;B" />
      <MenuItem primaryText="Italic" secondaryText="&#8984;I" />
      <MenuItem primaryText="Underline" secondaryText="&#8984;U" />
      <MenuItem primaryText="Strikethrough" secondaryText="Alt+Shift+5" />
      <MenuItem primaryText="Superscript" secondaryText="&#8984;." />
      <MenuItem primaryText="Subscript" secondaryText="&#8984;," />
      <Divider />
      <MenuItem primaryText="Paragraph styles" rightIcon={<ArrowDropRight />} />
      <MenuItem primaryText="Align" rightIcon={<ArrowDropRight />} />
      <MenuItem primaryText="Line spacing" rightIcon={<ArrowDropRight />} />
      <MenuItem primaryText="Numbered list" rightIcon={<ArrowDropRight />} />
      <MenuItem primaryText="List options" rightIcon={<ArrowDropRight />} />
      <Divider />
      <MenuItem primaryText="Clear formatting" secondaryText="&#8984;/" />
    </Menu>
    <Menu style={style} desktop={true} width={320}>
      <MenuItem primaryText="Open" secondaryText="Cmnd + O" />
      <MenuItem primaryText="Paste in place" secondaryText="Shift + V" />
      <MenuItem primaryText="Research" secondaryText="Opt + Shift + Cmnd + I" />
    </Menu>
    <Menu style={style} desktop={true} width={320}>
      <MenuItem primaryText="Open" secondaryText="&#8984;O" />
      <MenuItem primaryText="Paste in place" secondaryText="&#8679;&#8984;V" />
      <MenuItem primaryText="Research" secondaryText="&#8997;&#8679;&#8984;I" />
    </Menu>
  </div>
);

export default MenuExampleSecondary;
