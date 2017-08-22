// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import SnackbarContent from './SnackbarContent';

describe('<SnackbarContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'withStyles(Paper)' });
    classes = getClasses(<SnackbarContent message="message" />);
  });

  it('should render a Paper with classes', () => {
    const wrapper = shallow(<SnackbarContent message="message" />);
    assert.strictEqual(wrapper.name(), 'Paper');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('prop: action', () => {
    it('should render the action', () => {
      const action = <span>action</span>;
      const wrapper = shallow(<SnackbarContent message="message" action={action} />);
      assert.strictEqual(wrapper.childAt(1).hasClass(classes.action), true);
      assert.strictEqual(wrapper.childAt(1).contains(action), true);
    });
  });

  describe('prop: message', () => {
    it('should render the message', () => {
      const message = <span>message</span>;
      const wrapper = shallow(<SnackbarContent message={message} />);
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.message), true);
      assert.strictEqual(wrapper.childAt(0).contains(message), true);
    });
  });
});
