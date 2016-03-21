import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  display: 'inline-block',
  float: 'left',
  margin: '16px 32px 16px 0',
};

const MenuExampleSecondary = () => (
  <div>
    <Paper style={style}>
      <Menu desktop={true} width={256}>
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
    </Paper>
    <Paper style={style}>
      <Menu desktop={true} width={256}>
        <MenuItem primaryText="Open" secondaryText="Cmd + O" />
        <MenuItem primaryText="Paste in place" secondaryText="Shift + V" />
        <MenuItem primaryText="Research" secondaryText="Opt + Shift + Cmd + I" />
      </Menu>
    </Paper>
    <Paper style={style}>
      <Menu desktop={true} width={256}>
        <MenuItem primaryText="Open" secondaryText="&#8984;O" />
        <MenuItem primaryText="Paste in place" secondaryText="&#8679;&#8984;V" />
        <MenuItem primaryText="Research" secondaryText="&#8997;&#8679;&#8984;I" />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleSecondary;
