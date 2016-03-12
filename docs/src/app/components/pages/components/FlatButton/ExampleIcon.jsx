import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import {fullWhite} from 'material-ui/lib/styles/colors';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
  margin: 12,
};

const FlatButtonExampleIcon = () => (
  <div>
    <FlatButton
      icon={<ActionAndroid />}
      style={style}
    />
    <FlatButton
      backgroundColor="#a4c639"
      hoverColor="#8AA62F"
      icon={<ActionAndroid color={fullWhite} />}
      style={style}
    />
    <FlatButton
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
      style={style}
    />
  </div>
);

export default FlatButtonExampleIcon;
