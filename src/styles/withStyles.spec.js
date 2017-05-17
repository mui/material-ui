// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, consoleErrorMock } from 'src/test-utils';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from './withStyles';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withStyles', () => {
  let shallow;
  const styleSheet = createStyleSheet('MuiTextField', {
    root: {
      display: 'flex',
    },
  });

  before(() => {
    shallow = createShallow();
  });

  it('should provide a classes property', () => {
    const classes = shallow.context.styleManager.render(styleSheet);
    const StyledComponent = withStyles(styleSheet)(Empty);
    const wrapper = shallow(<StyledComponent />);

    assert.strictEqual(wrapper.props().classes, classes, 'Should provide the classes property');
  });

  describe('prop: classes', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should accept a classes property', () => {
      const classes = shallow.context.styleManager.render(styleSheet);
      const StyledComponent = withStyles(styleSheet)(Empty);
      const wrapper = shallow(<StyledComponent classes={{ root: 'h1' }} />);

      assert.deepEqual(wrapper.props().classes, {
        root: `${classes.root} h1`,
      });
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });

    it('should warn if providing a unknown key', () => {
      const classes = shallow.context.styleManager.render(styleSheet);
      const StyledComponent = withStyles(styleSheet)(Empty);
      const wrapper = shallow(<StyledComponent classes={{ bar: 'foo' }} />);

      assert.deepEqual(wrapper.props().classes, {
        root: classes.root,
        bar: 'undefined foo',
      });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });
  });
});
