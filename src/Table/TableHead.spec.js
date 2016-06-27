/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import TableHead, {styleSheet} from './TableHead';
import {createShallowWithContext} from 'test/utils';

describe('<TableHead>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, {group: 'mui'});
  });

  it('should render a thead', () => {
    const wrapper = shallow(
      <TableHead />
    );
    assert.strictEqual(wrapper.is('thead'), true, 'should be a thead');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<TableHead className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children', () => {
    const children = <tr className="test"></tr>;
    const wrapper = shallow(<TableHead>{children}</TableHead>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
