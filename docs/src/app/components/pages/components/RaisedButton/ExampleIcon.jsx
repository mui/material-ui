import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {fullWhite} from 'material-ui/lib/styles/colors';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
  margin: 12,
};

const RaisedButtonExampleIcon = () => (
  <div>
    <RaisedButton
      icon={<ActionAndroid />}
      style={style}
    />
    <RaisedButton
      backgroundColor="#a4c639"
      icon={<ActionAndroid color={fullWhite} />}
      style={style}
    />
    <RaisedButton
      linkButton={true}
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={style}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />
  </div>
);

export default RaisedButtonExampleIcon;
