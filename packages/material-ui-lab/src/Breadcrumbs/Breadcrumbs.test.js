import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Breadcrumbs from './Breadcrumbs';
import Typography from '@material-ui/core/Typography';

describe('<Breadcrumbs />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <Breadcrumbs>
        <span>Hello World</span>
      </Breadcrumbs>,
    );
  });

  it('should render a <nav> element', () => {
    const wrapper = shallow(
      <Breadcrumbs>
        <span>Hello World</span>
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.type(), Typography);
    assert.strictEqual(wrapper.props().component, 'nav');
  });

  it('should render the root class', () => {
    const wrapper = shallow(
      <Breadcrumbs className="test-class-name">
        <span>Hello World</span>
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Breadcrumbs className="test-class-name">
        <span>Hello World</span>
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
