import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import BottomNavigationAction from '../BottomNavigationAction';
import Icon from '../Icon';
import BottomNavigation from './BottomNavigation';

describe('<BottomNavigation />', () => {
  let shallow;
  let mount;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    // StrictModeViolation: uses BottomNavigationAction
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(
    <BottomNavigation>
      <BottomNavigationAction label="One" />
    </BottomNavigation>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
    }),
  );

  it('renders with a null child', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction label="One" />
        {null}
        <BottomNavigationAction label="Three" />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.find(BottomNavigationAction).length, 2);
  });

  it('should pass selected prop to children', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().selected, false);
    assert.strictEqual(wrapper.childAt(1).props().selected, true);
  });

  it('should overwrite parent showLabel prop', () => {
    const wrapper = shallow(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} showLabel={false} />
      </BottomNavigation>,
    );
    assert.strictEqual(wrapper.childAt(0).props().showLabel, true);
    assert.strictEqual(wrapper.childAt(1).props().showLabel, false);
  });

  it('should forward the click', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value={0} onChange={handleChange}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(handleChange.callCount, 1);
    assert.strictEqual(handleChange.args[0][1], 1);
  });

  it('should use custom action values', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value={'first'} onChange={handleChange}>
        <BottomNavigationAction value="first" icon={icon} />
        <BottomNavigationAction value="second" icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(
      handleChange.args[0][1],
      'second',
      'should have been called with value second',
    );
  });

  it('should handle also empty action value', () => {
    const handleChange = spy();
    const wrapper = mount(
      <BottomNavigation showLabels value="val" onChange={handleChange}>
        <BottomNavigationAction value="" icon={icon} />
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction value={null} icon={icon} />
      </BottomNavigation>,
    );
    wrapper
      .find(BottomNavigationAction)
      .at(0)
      .simulate('click');
    assert.strictEqual(handleChange.args[0][1], '');
    wrapper
      .find(BottomNavigationAction)
      .at(1)
      .simulate('click');
    assert.strictEqual(handleChange.args[1][1], 1);
    wrapper
      .find(BottomNavigationAction)
      .at(2)
      .simulate('click');
    assert.strictEqual(handleChange.args[2][1], null);
  });
});
