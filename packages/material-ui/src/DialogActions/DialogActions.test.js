import React from 'react';
import { assert } from 'chai';
import { createMount, getClasses, findOutermostIntrinsic } from '@material-ui/core/test-utils';
import DialogActions from './DialogActions';

describe('<DialogActions />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount();
    classes = getClasses(<DialogActions />);
  });

  it('should render a div', () => {
    const wrapper = mount(<DialogActions />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = mount(<DialogActions data-my-prop="woofDialogActions" />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).props()['data-my-prop'],
      'woofDialogActions',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = mount(<DialogActions className="woofDialogActions" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofDialogActions'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });
});
