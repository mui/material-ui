// @flow

import React from 'react';
import { spy } from 'sinon';
import { assert } from 'chai';
import { createShallow, consoleErrorMock, createMount } from 'src/test-utils';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from './withStyles';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referential transparency for testing purposes.

describe('withStyles', () => {
  let shallow;
  let StyledComponent;
  let classes;
  let mount;
  const styleSheet = createStyleSheet('MuiTextField', {
    root: {
      display: 'flex',
    },
  });

  before(() => {
    shallow = createShallow();
    StyledComponent = withStyles(styleSheet)(Empty);
    classes = shallow.context.styleManager.render(styleSheet);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should provide a classes property', () => {
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
      const wrapper = shallow(<StyledComponent classes={{ root: 'h1' }} />);

      assert.deepEqual(wrapper.props().classes, {
        root: `${classes.root} h1`,
      });
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });

    it('should warn if providing a unknown key', () => {
      const wrapper = shallow(<StyledComponent classes={{ bar: 'foo' }} />);

      assert.deepEqual(wrapper.props().classes, {
        root: classes.root,
        bar: 'undefined foo',
      });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });
  });

  describe('prop: innerRef', () => {
    it('should provide a ref on the inner component', () => {
      const handleRef = spy();
      mount(<StyledComponent innerRef={handleRef} />);
      assert.strictEqual(handleRef.callCount, 1);
    });
  });
});
