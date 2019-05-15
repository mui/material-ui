import React from 'react';
import { assert } from 'chai';
import { createMount, describeConformance, getClasses } from '@material-ui/core/test-utils';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('<Breadcrumbs />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(
      <Breadcrumbs>
        <span>Hello World</span>
      </Breadcrumbs>,
    );
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Breadcrumbs>Conformance?</Breadcrumbs>, () => ({
    classes,
    inheritComponent: 'nav',
    mount,
    refInstanceof: window.HTMLElement,
    testComponentPropWith: 'div',
  }));

  it('should render seperators', () => {
    const wrapper = mount(
      <Breadcrumbs>
        <span />
        <span />
      </Breadcrumbs>,
    );
    assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 1);
  });

  it('should render an ellipse', () => {
    const wrapper = mount(
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

  it('should expand when `BreadcrumbCollapsed` is clicked', () => {
    const wrapper = mount(
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

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should support invalid input', () => {
      const wrapper = mount(
        <Breadcrumbs maxItems={3} itemsAfterCollapse={2} itemsBeforeCollapse={2}>
          <span />
          <span />
          <span />
          <span />
        </Breadcrumbs>,
      );
      assert.strictEqual(wrapper.find(BreadcrumbSeparator).length, 3);
      assert.strictEqual(wrapper.find(BreadcrumbCollapsed).length, 0);
      assert.strictEqual(consoleErrorMock.callCount(), 2);
      assert.include(
        consoleErrorMock.args()[0][0],
        'you have provided an invalid combination of properties to the',
      );
    });
  });
});
