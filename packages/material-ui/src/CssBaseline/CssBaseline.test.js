import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  // StrictModeViolation: makeStyles will retain the styles in the head in strict mode
  // which becomes an issue for global styles
  const render = createClientRender({ strict: false });

  it('renders its children', () => {
    const { container } = render(
      <CssBaseline>
        <div id="child" />
      </CssBaseline>,
    );

    const child = container.querySelector('#child');

    expect(child.tagName).to.equal('DIV');
  });
});
