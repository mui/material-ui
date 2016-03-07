import React from 'react';
import Paper from 'material-ui/lib/paper';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';
import ContentCopy from 'material-ui/lib/svg-icons/content/content-copy';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Download from 'material-ui/lib/svg-icons/file/file-download';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import RemoveRedEye from 'material-ui/lib/svg-icons/image/remove-red-eye';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const MenuExampleIcons = () => (
  <div>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
        <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
        <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
        <Divider />
        <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
        <MenuItem primaryText="Download" leftIcon={<Download />} />
        <Divider />
        <MenuItem primaryText="Remove" leftIcon={<Delete />} />
      </Menu>
    </Paper>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Clear Config" />
        <MenuItem primaryText="New Config" rightIcon={<PersonAdd />} />
        <MenuItem primaryText="Project" rightIcon={<FontIcon className="material-icons">settings</FontIcon>} />
        <MenuItem
          primaryText="Workspace"
          rightIcon={
            <FontIcon className="material-icons" style={{color: '#559'}}>settings</FontIcon>
          }
        />
        <MenuItem primaryText="Paragraph" rightIcon={<b style={style.rightIcon}>¶</b>} />
        <MenuItem primaryText="Section" rightIcon={<b style={style.rightIcon}>§</b>} />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleIcons;
