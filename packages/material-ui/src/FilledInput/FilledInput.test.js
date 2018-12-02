import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import InputBase from '../InputBase';
import FilledInput from './FilledInput';

describe('<FilledInput />', () => {
  let classes;
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ untilSelector: 'FilledInput' });
    mount = createMount();
    classes = getClasses(<FilledInput />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <div />', () => {
    const wrapper = shallow(<FilledInput />);
    assert.strictEqual(wrapper.type(), InputBase);
    assert.include(wrapper.props().classes.root, classes.underline);
  });

  it('should disable the underline', () => {
    const wrapper = shallow(<FilledInput disableUnderline />);
    assert.notInclude(wrapper.props().classes.root, classes.underline);
  });
});
