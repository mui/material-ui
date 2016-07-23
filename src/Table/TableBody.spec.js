// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import TableBody, { styleSheet } from './TableBody';
import { createShallowWithContext } from 'test/utils';

describe('<TableBody>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet, { group: 'mui' });
  });

  it('should render a tbody', () => {
    const wrapper = shallow(
      <TableBody />
    );
    assert.strictEqual(wrapper.is('tbody'), true, 'should be a tbody');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<TableBody className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children', () => {
    const children = <tr className="test"></tr>;
    const wrapper = shallow(<TableBody>{children}</TableBody>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
