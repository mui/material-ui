import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import BreadcrumbSeparator from './BreadcrumbSeparator';

describe('<BreadcrumbSeparator />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BreadcrumbSeparator />);
  });

  it('should render a <div> element', () => {
    const wrapper = shallow(<BreadcrumbSeparator />);

    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render the root class', () => {
    const wrapper = shallow(<BreadcrumbSeparator />);

    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
