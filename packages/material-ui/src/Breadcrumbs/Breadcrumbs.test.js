import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
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

  it('should render seperators', () => {
    const wrapper = shallow(
      <Breadcrumbs>
        <span />
        <span />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 1);
  });

  it('should render an ellipse', () => {
    const wrapper = shallow(
      <Breadcrumbs>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 2);
    assert.strictEqual(wrapper.find(BreadcrumbCollapsed).length, 1);
  });

  it('should expand', () => {
    const wrapper = shallow(
      <Breadcrumbs>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 2);
    wrapper.find(BreadcrumbCollapsed).simulate('click');
    assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 8);
  });
});
