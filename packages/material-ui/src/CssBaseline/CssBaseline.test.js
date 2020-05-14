import * as React from 'react';
import { expect } from 'chai';
import createMount from 'test/utils/createMount';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  // StrictModeViolation: makeStyles will retain the styles in the head in strict mode
  // which becomes an issue for global styles
  const mount = createMount({ strict: false });

  it('renders its children', () => {
    const wrapper = mount(
      <CssBaseline>
        <div id="child" />
      </CssBaseline>,
    );
    expect(wrapper.find('#child').type()).to.equal('div');
  });
});
