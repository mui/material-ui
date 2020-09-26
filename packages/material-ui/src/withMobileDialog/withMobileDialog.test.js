import * as React from 'react';
import { expect } from 'chai';
import { createShallow } from 'test/utils';
import Dialog from '../Dialog';
import withMobileDialog from './withMobileDialog';

describe('withMobileDialog', () => {
  let shallow;
  const defaultProps = {
    open: false,
  };

  before(() => {
    shallow = createShallow({ dive: true });
  });

  function isFullScreen(breakpoints, width) {
    breakpoints.forEach((breakpoint) => {
      it(`is for width: ${width} < ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        expect(wrapper.props().fullScreen).to.equal(true);
      });
    });
  }

  function isNotFullScreen(breakpoints, width) {
    breakpoints.forEach((breakpoint) => {
      it(`is not for width: ${width} >= ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        expect(wrapper.props().fullScreen).to.equal(false);
      });
    });
  }

  describe('screen width: xs', () => {
    isFullScreen(['sm', 'md', 'lg', 'xl'], 'xs');
    isNotFullScreen(['xs'], 'xs');
  });

  describe('screen width: sm (default)', () => {
    isFullScreen(['md', 'lg', 'xl'], 'sm');
    isNotFullScreen(['xs', 'sm'], 'sm');
  });

  describe('screen width: md', () => {
    isFullScreen(['lg', 'xl'], 'md');
    isNotFullScreen(['xs', 'sm', 'md'], 'md');
  });

  describe('screen width: lg', () => {
    isFullScreen(['xl'], 'lg');
    isNotFullScreen(['xs', 'sm', 'md', 'lg'], 'lg');
  });

  describe('screen width: xl', () => {
    isNotFullScreen(['xs', 'sm', 'md', 'lg', 'xl'], 'xl');
  });
});
