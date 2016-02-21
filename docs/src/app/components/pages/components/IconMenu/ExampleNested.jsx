import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Divider from 'material-ui/lib/divider';

import Download from 'material-ui/lib/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/lib/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

const IconMenuExampleNested = () => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem
        primaryText="Copy & Paste"
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="Cut" />,
          <MenuItem primaryText="Copy" />,
          <Divider />,
          <MenuItem primaryText="Paste" />,
        ]}
      />

      <MenuItem
        primaryText="Case Tools"
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="UPPERCASE" />,
          <MenuItem primaryText="lowercase" />,
          <MenuItem primaryText="CamelCase" />,
          <MenuItem primaryText="Propercase" />,
        ]}
      />
      <Divider />
      <MenuItem primaryText="Download" leftIcon={<Download />} />
      <Divider />
      <MenuItem value="Del" primaryText="Delete" />

    </IconMenu>
  </div>
);

export default IconMenuExampleNested;
