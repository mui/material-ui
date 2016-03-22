import React from 'react';
import IconButton from 'material-ui/IconButton';

const IconButtonExampleTooltip = () => (
  <div>
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"
      tooltipPosition="bottom-right"
    />
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="bottom-center"
      tooltipPosition="bottom-center"
    />
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="bottom-left"
      tooltipPosition="bottom-left"
    />
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="top-right"
      tooltipPosition="top-right"
    />
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="top-center"
      tooltipPosition="top-center"
    />
    <IconButton
      iconClassName="muidocs-icon-custom-github" tooltip="top-left"
      tooltipPosition="top-left"
    />
  </div>
);

export default IconButtonExampleTooltip;
