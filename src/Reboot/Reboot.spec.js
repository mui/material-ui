import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Reboot from './Reboot';

describe('<Reboot />', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render nothing', () => {
    const wrapper = shallow(<Reboot />);
    assert.strictEqual(wrapper.children().length, 0, 'should have no children');
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(
      <Reboot>
        <div />
      </Reboot>,
    );
    assert.strictEqual(wrapper.name(), 'div');
  });
});
