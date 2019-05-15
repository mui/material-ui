import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow, describeConformance, getClasses } from '../test-utils';
import DialogContentText from './DialogContentText';
import Typography from '../Typography';

describe('<DialogContentText />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogContentText />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentProp'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <p />;
      const wrapper = shallow(<DialogContentText>{children}</DialogContentText>);
      assert.strictEqual(wrapper.children().equals(children), true);
    });
  });
});
