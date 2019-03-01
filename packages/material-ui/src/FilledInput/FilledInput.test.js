import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import FilledInput from './FilledInput';

describe('<FilledInput />', () => {
  let classes;
  let mount;

  before(() => {
    mount = createMount();
    classes = getClasses(<FilledInput />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a <div />', () => {
    const wrapper = mount(<FilledInput />);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.type(), 'div');
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.underline), true);
  });

  it('should disable the underline', () => {
    const wrapper = mount(<FilledInput disableUnderline />);
    const root = findOutermostIntrinsic(wrapper);
    assert.strictEqual(root.hasClass(classes.root), true);
    assert.strictEqual(root.hasClass(classes.underline), false);
  });
});
