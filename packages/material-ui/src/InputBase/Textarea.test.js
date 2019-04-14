import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance } from '@material-ui/core/test-utils';
import Textarea from './Textarea';

describe('<Textarea />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Textarea />, () => ({
    inheritComponent: 'textarea',
    mount,
    refInstanceof: window.HTMLTextAreaElement,
    skip: ['rootClass', 'componentProp'],
  }));

  it('should render 2 textareas', () => {
    const wrapper = mount(<Textarea />);
    assert.strictEqual(wrapper.find('textarea').length, 2);
  });
});
