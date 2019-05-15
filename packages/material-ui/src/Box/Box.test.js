import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Box from './Box';

describe('<Box />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Box />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = <div className="unique">Hello World</div>;

  it('renders children and box content', () => {
    const wrapper = mount(
      <Box component="span" m={1}>
        {testChildren}
      </Box>,
    );

    assert.strictEqual(wrapper.contains(testChildren), true);
    assert.strictEqual(wrapper.find('span').length, 1);
  });

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    // need fragment so that enzyme doesn't add a wrapper component
    mount(
      <React.Fragment>
        <Box
          color="primary.main"
          fontFamily="Comic Sans"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
          ref={elementRef}
        />
      </React.Fragment>,
    );

    const { current: element } = elementRef;
    assert.strictEqual(element.getAttribute('color'), null);
    assert.strictEqual(element.getAttribute('font-family'), null);
    assert.strictEqual(element.getAttribute('font-size'), null);
  });
});
