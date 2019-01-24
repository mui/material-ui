import React from 'react';
import { assert } from 'chai';
import { createRender, createShallow, getClasses } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Breadcrumb from './Breadcrumb';

describe('<Breadcrumb />', () => {
  let shallow;
  let render;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    render = createRender();
    classes = getClasses(<Breadcrumb />);
  });

  it('should render a <Typography> element', () => {
    const wrapper = shallow(<Breadcrumb />);
    assert.strictEqual(wrapper.type(), Typography);
  });

  it('should render the root & gutter classes', () => {
    const wrapper = shallow(<Breadcrumb className="test-class-name" />);
    assert.strictEqual(wrapper.is('.test-class-name'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    it('should server-side render', () => {
      const markup = render(<Breadcrumb>Hello World</Breadcrumb>);
      assert.strictEqual(markup.text(), 'Hello World');
    });
  });
});
