import React from 'react';
import { assert } from 'chai';
import { createMount, findOutermostIntrinsic, getClasses } from '@material-ui/core/test-utils';
import Container from './Container';

describe('<Container />', () => {
  let mount;
  let classes;
  const defaultProps = {
    children: <div />,
  };

  before(() => {
    mount = createMount();
    classes = getClasses(<Container {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      let wrapper;
      wrapper = mount(<Container {...defaultProps} />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.maxWidthLg), true);
      wrapper = mount(<Container {...defaultProps} maxWidth={false} />);
      assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.maxWidthLg), false);
    });
  });
});
