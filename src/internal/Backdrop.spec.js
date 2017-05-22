// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Backdrop, { styleSheet } from './Backdrop';

describe('<Backdrop />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop className="woof" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the woof class');
  });
});
