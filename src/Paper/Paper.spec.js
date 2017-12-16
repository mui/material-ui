import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '../test-utils';
import Paper from './Paper';

describe('<Paper />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
    classes = getClasses(<Paper />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<Paper>Hello World</Paper>);
    assert.strictEqual(wrapper.name(), 'Paper');
    assert.strictEqual(wrapper.dive().name(), 'div');
  });

  it('should render with the root class, default depth class, and rounded', () => {
    const wrapper = mount(<Paper>Hello World</Paper>)
      .find('Paper')
      .childAt(0);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
    assert.strictEqual(wrapper.hasClass(classes.rounded), true, 'should be rounded by default');
  });

  it('should disable the rounded class', () => {
    const wrapper = mount(<Paper square>Hello World</Paper>)
      .find('Paper')
      .childAt(0);
    assert.strictEqual(wrapper.hasClass(classes.rounded), false, 'should not be rounded');
  });

  it('should set the elevation shadow class', () => {
    const root = mount(<Paper elevation={16}>Hello World</Paper>);
    let wrapper = root.find('Paper').childAt(0);
    assert.strictEqual(wrapper.hasClass(classes.shadow16), true, 'should have the 16 shadow class');
    root.setProps({ elevation: 24 });
    wrapper = root.find('Paper').childAt(0);
    assert.strictEqual(wrapper.hasClass(classes.shadow24), true, 'should have the 24 shadow class');
    root.setProps({ elevation: 2 });
    wrapper = root.find('Paper').childAt(0);
    assert.strictEqual(wrapper.hasClass(classes.shadow2), true, 'should have the 2 shadow class');
  });

  describe('prop: component', () => {
    it('should render a header', () => {
      const wrapper = mount(<Paper component="header">Hello World</Paper>)
        .find('Paper')
        .childAt(0);
      assert.strictEqual(wrapper.name(), 'header');
    });
  });
});
