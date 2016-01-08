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

const MenuExampleNested = () => (
  <div>
    <Menu style={style} desktop={true} width={320}>
      <MenuItem primaryText="Single" insetChildren={true} />
      <MenuItem primaryText="1.15" insetChildren={true} />
      <MenuItem primaryText="Double" insetChildren={true} />
      <MenuItem primaryText="Custom: 1.2" checked={true} rightIcon={<ArrowDropRight />} menuItems={[
        <MenuItem primaryText="Show" rightIcon={<ArrowDropRight />} menuItems={[
          <MenuItem primaryText="Show Level 2" />,
          <MenuItem primaryText="Grid lines" checked={true} />,
          <MenuItem primaryText="Page breaks" insetChildren={true} />,
          <MenuItem primaryText="Rules" checked={true} />,
        ]}/>,
        <MenuItem primaryText="Grid lines" checked={true} />,
        <MenuItem primaryText="Page breaks" insetChildren={true} />,
        <MenuItem primaryText="Rules" checked={true} />,
      ]} />
      <Divider />
      <MenuItem primaryText="Add space before paragraph" />
      <MenuItem primaryText="Add space after paragraph" />
      <Divider />
      <MenuItem primaryText="Custom spacing..." />
    </Menu>
  </div>
);

export default MenuExampleNested;
