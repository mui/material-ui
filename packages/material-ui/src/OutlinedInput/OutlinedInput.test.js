import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import OutlinedInput from './OutlinedInput';
import NotchedOutline from './NotchedOutline';
import InputBase from '../InputBase';

describe('<OutlinedInput />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<OutlinedInput />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<OutlinedInput labelWidth={0} />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a NotchedOutline', () => {
    const wrapper = mount(<OutlinedInput labelWidth={0} />);
    assert.strictEqual(wrapper.find(NotchedOutline).length, 1);
  });
});
