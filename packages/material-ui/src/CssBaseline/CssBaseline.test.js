import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  let mount;

  before(() => {
    // StrictModeViolation: makeStyles will retain the styles in the head in strict mode
    // which becomes an issue for global styles
    mount = createMount({ strict: false });
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

  it('renders its children when scoped', () => {
    const scopedWrapper = mount(
      <CssBaseline scopeToChildren>
        <div id="child" />
      </CssBaseline>,
    );
    assert.strictEqual(scopedWrapper.find('#child').type(), 'div');
  });
});
