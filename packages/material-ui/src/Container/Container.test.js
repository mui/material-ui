import * as React from 'react';
import { expect } from 'chai';
import { findOutermostIntrinsic, getClasses, createMount, describeConformance } from 'test/utils';
import Container from './Container';

describe('<Container />', () => {
  const mount = createMount();
  let classes;
  const defaultProps = {
    children: <div />,
  };

  before(() => {
    classes = getClasses(<Container {...defaultProps} />);
  });

  describeConformance(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLElement,
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      let wrapper;
      wrapper = mount(<Container {...defaultProps} />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.maxWidthLg)).to.equal(true);
      wrapper = mount(<Container {...defaultProps} maxWidth={false} />);
      expect(findOutermostIntrinsic(wrapper).hasClass(classes.maxWidthLg)).to.equal(false);
    });
  });
});
