// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Block from 'material-ui/Layout';
import { darkWhite, teal, deepPurple } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('LayoutColumn', () => ({
  root: { height: 150, width: '50%', backgroundColor: darkWhite },
  cell1: { backgroundColor: teal[300] },
  cell2: { backgroundColor: deepPurple[300] },
}));

export default function LayoutColumn(props, context) {
  const { root, cell1, cell2 } = context.styleManager.render(styleSheet);
  return (
    <Block className={root} layout="column">
      <Block flex className={cell1}>First item</Block>
      <Block flex="20" className={cell2}>Second item</Block>
    </Block>
  );
}

LayoutColumn.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
