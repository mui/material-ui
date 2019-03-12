import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders its children', () => {
    const wrapper = mount(
      <CssBaseline>
        <div id="child" />
      </CssBaseline>,
    );
    assert.strictEqual(wrapper.find('#child').type(), 'div');
  });
});
