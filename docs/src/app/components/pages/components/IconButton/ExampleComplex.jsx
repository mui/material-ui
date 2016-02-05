import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';

const IconButtonExampleComplex = () => (
  <div>
    <IconButton tooltip="Font Icon">
      <FontIcon className="muidocs-icon-action-home" />
    </IconButton>

    <IconButton tooltip="SVG Icon">
      <ActionHome />
    </IconButton>

    <IconButton
      iconClassName="material-icons"
      tooltip="Ligature"
    >
      home
    </IconButton>
  </div>
);

export default IconButtonExampleComplex;
