// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import TableBody, { styleSheet } from './TableBody';

describe('<TableBody />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a tbody', () => {
    const wrapper = shallow(
      <TableBody />,
    );
    assert.strictEqual(wrapper.name(), 'tbody');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<TableBody className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render children', () => {
    const children = <tr className="test" />;
    const wrapper = shallow(<TableBody>{children}</TableBody>);
    assert.strictEqual(wrapper.childAt(0).equals(children), true);
  });
});
