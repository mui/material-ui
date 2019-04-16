import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Paper from './Paper';

describe('<Paper />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Paper />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Paper />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
  }));

  describe('prop: square', () => {
    it('can disable the rounded class', () => {
      const wrapper = mount(<Paper square>Hello World</Paper>);
      assert.strictEqual(wrapper.find(`.${classes.root}`).some(`.${classes.rounded}`), false);
    });

    it('adds a rounded class to the root when omitted', () => {
      const wrapper = mount(<Paper>Hello World</Paper>);
      assert.strictEqual(wrapper.find(`.${classes.root}`).every(`.${classes.rounded}`), true);
    });
  });

  it('should set the elevation elevation class', () => {
    const wrapper = shallow(<Paper elevation={16}>Hello World</Paper>);
    assert.strictEqual(
      wrapper.hasClass(classes.elevation16),
      true,
      'should have the 16 elevation class',
    );
    wrapper.setProps({ elevation: 24 });
    assert.strictEqual(
      wrapper.hasClass(classes.elevation24),
      true,
      'should have the 24 elevation class',
    );
    wrapper.setProps({ elevation: 2 });
    assert.strictEqual(
      wrapper.hasClass(classes.elevation2),
      true,
      'should have the 2 elevation class',
    );
  });
});
