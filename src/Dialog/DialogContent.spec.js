// @flow

import * as React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import DialogContent from './DialogContent';

describe('<DialogContent />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogContent />);
  });

  it('should render a div', () => {
    const wrapper = shallow(<DialogContent />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should spread custom props on the root node', () => {
    const wrapper = shallow(<DialogContent data-my-prop="woofDialogContent" />);
    assert.strictEqual(
      wrapper.prop('data-my-prop'),
      'woofDialogContent',
      'custom prop should be woofDialogContent',
    );
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<DialogContent className="woofDialogContent" />);
    assert.strictEqual(wrapper.hasClass('woofDialogContent'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render children', () => {
    const children = <p />;
    const wrapper = shallow(
      <DialogContent>
        {children}
      </DialogContent>,
    );
    assert.strictEqual(wrapper.children().equals(children), true);
  });
});
