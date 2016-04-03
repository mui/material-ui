import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

function handleTouchTap() {
  alert('You clicked the Chip.');
}

/**
 * Examples of Chips, using an image [Avatar](/#/components/font-icon), [Font Icon](/#/components/font-icon) Avatar,
 * [SVG Icon](/#/components/svg-icon) Avatar, "Letter" (string) Avatar, and with custom colors.
 *
 * Chips with the `onRequestDelete` property defined will display a delete icon.
 */
export default class ChipExampleSimple extends React.Component {

  render() {
    return (
      <div style={styles.wrapper}>

        <Chip
          style={styles.chip}
        >
          Text Chip
        </Chip>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          Deletable Text Chip
        </Chip>

        <Chip
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar src="images/uxceo-128.jpg" />
          Image Avatar Chip
        </Chip>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar src="images/ok-128.jpg" />
          Deletable Avatar Chip
        </Chip>

        <Chip
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
          FontIcon Avatar Chip
        </Chip>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          SvgIcon Avatar Chip
        </Chip>

        <Chip onTouchTap={handleTouchTap} style={styles.chip}>
          <Avatar size={32}>A</Avatar>
          Text Avatar Chip
        </Chip>

        <Chip
          backgroundColor={blue300}
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900}>
            MB
          </Avatar>
          Colored Chip
        </Chip>
      </div>
    );
  }
}
