import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import BreadcrumbSeparator from './BreadcrumbSeparator';

describe('<BreadcrumbSeparator />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BreadcrumbSeparator>/</BreadcrumbSeparator>);
  });

  it('should render a <li> element', () => {
    const wrapper = shallow(<BreadcrumbSeparator>/</BreadcrumbSeparator>);

    assert.strictEqual(wrapper.type(), 'li');
  });

  it('should render the root class', () => {
    const wrapper = shallow(<BreadcrumbSeparator>/</BreadcrumbSeparator>);

    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
