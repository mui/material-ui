import React from 'react';
import { assert } from 'chai';
import { createMount } from '../test-utils';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render nothing', () => {
    const wrapper = mount(<CssBaseline />);
    assert.strictEqual(wrapper.childAt(0).children().length, 0, 'should have no children');
  });

  it('should render a div with the root class', () => {
    const wrapper = mount(
      <CssBaseline>
        <div />
      </CssBaseline>,
    );
    assert.strictEqual(
      wrapper
        .childAt(0)
        .children()
        .name(),
      'div',
    );
  });
});
