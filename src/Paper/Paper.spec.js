// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Paper, { styleSheet } from './Paper';

describe('<Paper />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({
      dive: true,
    });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(<Paper>Hello World</Paper>);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the paper class, default depth class, and rounded', () => {
    const wrapper = shallow(<Paper>Hello World</Paper>);
    assert.strictEqual(wrapper.hasClass(classes.paper), true, 'should have the paper class');
    assert.strictEqual(wrapper.hasClass(classes.rounded), true, 'should be rounded by default');
  });

  it('should disable the rounded class', () => {
    const wrapper = shallow(<Paper square>Hello World</Paper>);
    assert.strictEqual(wrapper.hasClass(classes.rounded), false, 'should not be rounded');
  });

  it('should set the elevation shadow class', () => {
    const wrapper = shallow(<Paper elevation={16}>Hello World</Paper>);
    assert.strictEqual(wrapper.hasClass(classes.shadow16), true, 'should have the 16 shadow class');
    wrapper.setProps({ elevation: 24 });
    assert.strictEqual(wrapper.hasClass(classes.shadow24), true, 'should have the 24 shadow class');
    wrapper.setProps({ elevation: 2 });
    assert.strictEqual(wrapper.hasClass(classes.shadow2), true, 'should have the 2 shadow class');
  });

  describe('prop: component', () => {
    it('should render a header', () => {
      const wrapper = shallow(<Paper component="header">Hello World</Paper>);
      assert.strictEqual(wrapper.name(), 'header');
    });
  });
});
