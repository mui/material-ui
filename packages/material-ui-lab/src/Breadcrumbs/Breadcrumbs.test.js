import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Breadcrumbs from './Breadcrumbs';
import Breadcrumb from '../Breadcrumb';

describe('<Breadcrumbs />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <Breadcrumbs>
        <Breadcrumb label="Hello World" />
      </Breadcrumbs>,
    );
  });

  it('should render a <div> element', () => {
    const wrapper = shallow(
      <Breadcrumbs>
        <Breadcrumb label="Hello World" />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render the root class', () => {
    const wrapper = shallow(
      <Breadcrumbs className="test-class-name">
        <Breadcrumb label="Hello World" />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <Breadcrumbs className="test-class-name">
        <Breadcrumb label="Hello World" />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });
});
