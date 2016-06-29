import React from 'react';
import Button from 'material-ui/Button';
import {fullWhite} from 'material-ui/styles/colors';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin: '6px 12px 6px 0px',
};

/**
 * Examples of Raised Buttons using an icon without a label. The first example uses an
 * [SVG Icon](/#/components/svg-icon), and has the default color. The second example shows
 * how the icon and background color can be changed. The final example uses a
 * [Font Icon](/#/components/font-icon), and is wrapped in an anchor tag.
 *
 * Flat Buttons should have only text.
 */
const ButtonExampleIcon = () => (
  <div>
    <Button
      style={style}
    >
      <ActionAndroid />
    </Button>
    <Button
      backgroundColor="#a4c639"
      style={style}
    >
      <ActionAndroid color={fullWhite} />
    </Button>
    <Button
      href="https://github.com/callemall/material-ui"
      secondary={true}
      style={style}
    >
      <FontIcon className="muidocs-icon-custom-github" />
    </Button>
  </div>
);

export default ButtonExampleIcon;
