// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Backdrop, { styleSheet } from './Backdrop';

describe('<Backdrop />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(styleSheet);
  });

  it('should render a backdrop div', () => {
    const wrapper = shallow(<Backdrop className="woof" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass('woof'), true);
  });
});
