// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Block from 'material-ui/Layout';
import { darkWhite, teal, deepPurple } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('LayoutRow', () => ({
  root: { height: 150, width: '50%', backgroundColor: darkWhite },
  cell1: { backgroundColor: teal[300] },
  cell2: { backgroundColor: deepPurple[300] },
}));

export default function LayoutRow(props, context) {
  const { root, cell1, cell2 } = context.styleManager.render(styleSheet);
  return (
    <Block className={root} layout="row">
      <Block className={cell1} flex>First item</Block>
      <Block className={cell2} flex="20">Second item</Block>
    </Block>
  );
}

LayoutRow.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
