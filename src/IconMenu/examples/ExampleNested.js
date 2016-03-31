import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
