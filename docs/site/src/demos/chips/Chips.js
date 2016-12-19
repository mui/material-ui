// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Face from 'material-ui/svg-icons/face';
import { grey } from 'material-ui/styles/colors';
import avatarImage from 'docs/site/assets/images/uxceo-128.jpg';

const styleSheet = createStyleSheet('Chips', () => ({
  chip: {
    margin: '0 8px',
  },
  svgIcon: {
    color: grey[800],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function handleRequestDelete() {
  alert('You clicked the delete icon.'); // eslint-ignore-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-ignore-line no-alert
}

export default function Chips(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Chip
        label="Basic Chip"
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar src={avatarImage} />}
        label="Deletable Chip"
        onRequestDelete={handleRequestDelete}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar><Face className={classes.svgIcon} /></Avatar>}
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onRequestDelete={handleRequestDelete}
        className={classes.chip}
      />
    </div>
  );
}

Chips.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
