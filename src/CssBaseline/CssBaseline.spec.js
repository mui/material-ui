import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import CssBaseline from './CssBaseline';

describe('<CssBaseline />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render nothing', () => {
    const wrapper = shallow(<CssBaseline />);
    assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(
      <CssBaseline>
        <div />
      </CssBaseline>,
    );
    assert.strictEqual(wrapper.name(), 'div');
  });
});
