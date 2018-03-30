// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import TableBody from './TableBody';

describe('<TableBody />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render a tbody', () => {
    const wrapper = shallow(<TableBody>foo</TableBody>);
    assert.strictEqual(wrapper.name(), 'tbody');
  });

  it('should render a div', () => {
    const wrapper = shallow(<TableBody component="div">foo</TableBody>);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render with the user and class', () => {
    const wrapper = shallow(<TableBody className="woofTableBody">foo</TableBody>);
    assert.strictEqual(wrapper.hasClass('woofTableBody'), true);
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = shallow(<TableBody>{children}</TableBody>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });

  it('should define table.body in the child context', () => {
    const wrapper = shallow(<TableBody>foo</TableBody>);
    assert.strictEqual(wrapper.instance().getChildContext().table.body, true);
  });
});
