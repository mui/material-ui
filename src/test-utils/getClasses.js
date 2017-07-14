// @flow

import React from 'react';
import createShallow from './createShallow';
import withStyles from '../styles/withStyles';

const shallow = createShallow();
const Empty = () => <div />;
Empty.defaultProps = {};

// Helper function to extract the classes from a styleSheet.
export default function getClasses(styleSheet: Object, options?: Object) {
  const Extractor = withStyles(styleSheet, options)(Empty);

  return shallow(<Extractor />).props().classes;
}
