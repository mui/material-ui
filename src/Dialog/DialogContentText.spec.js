// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import DialogContentText, { styleSheet } from './DialogContentText';

describe('<DialogContentText />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('prop: className', () => {
    it('should render with the user and root classes', () => {
      const wrapper = shallow(<DialogContentText className="woof" />);
      assert.strictEqual(wrapper.hasClass('woof'), true);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
    });
  });

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <p />;
      const wrapper = shallow(<DialogContentText>{children}</DialogContentText>);
      assert.strictEqual(wrapper.children().equals(children), true);
    });
  });
});
