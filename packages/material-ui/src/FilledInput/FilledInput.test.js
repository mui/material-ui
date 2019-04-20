import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import FilledInput from './FilledInput';
import InputBase from '../InputBase';

describe('<FilledInput />', () => {
  let classes;
  let mount;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<FilledInput />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<FilledInput open />, () => ({
    classes,
    inheritComponent: InputBase,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should have the underline class', () => {
    const wrapper = mount(<FilledInput />);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass(classes.underline), true);
  });

  it('can disable the underline', () => {
    const wrapper = mount(<FilledInput disableUnderline />);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass(classes.underline), false);
  });
});
