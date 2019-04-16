import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Box from './Box';

describe('<Box />', () => {
  let mount;

  before(() => {
    mount = createMount();
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

  it('forwards style props as DOM attributes', () => {
    const elementRef = React.createRef();
    mount(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    assert.strictEqual(element.getAttribute('color'), 'primary.main');
    assert.strictEqual(element.getAttribute('font-family'), 'Comic Sans');
    assert.strictEqual(element.getAttribute('font-size'), '[object Object]');
  });
});
