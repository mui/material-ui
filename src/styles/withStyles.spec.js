// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from './withStyles';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withStyles', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should provide a classes property', () => {
    const styleSheet = createStyleSheet('MuiTextField', () => ({
      root: {
        display: 'flex',
      },
    }));
    const classes = shallow.context.styleManager.render(styleSheet);

    const StyledComponent = withStyles(styleSheet)(Empty);
    const wrapper = shallow(<StyledComponent />);

    assert.strictEqual(wrapper.props().classes, classes,
      'Should provide the classes property');
  });
});
