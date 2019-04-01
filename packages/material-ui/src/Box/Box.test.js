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
});
