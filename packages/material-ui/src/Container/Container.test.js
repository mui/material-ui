import * as React from 'react';
import { expect } from 'chai';
import { findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
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
