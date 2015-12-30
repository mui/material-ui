import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

const IconButtonExampleMaterial = () => (
  <div>
    <IconButton tooltip="Sort" disabled={true}>
      <FontIcon className="muidocs-icon-custom-sort"/>
    </IconButton>
    <IconButton
      iconClassName="material-icons"
      tooltip="Sky">
      settings_system_daydream
    </IconButton>
  </div>
);

export default IconButtonExampleMaterial;
