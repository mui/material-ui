import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from "@material-ui/core/Avatar";

export default function NotInteractiveTooltips() {
  const img = <img src="/static/images/avatar/1.jpg" alt="Enlarged Remy Sharp"/>;
  return (
    <Tooltip placement="left" title={img}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
    </Tooltip>
  );
}
