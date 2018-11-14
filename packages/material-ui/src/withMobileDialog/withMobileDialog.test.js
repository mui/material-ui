import React from 'react';
import { assert } from 'chai';
import { createShallow } from '@material-ui/core/test-utils';
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
    breakpoints.forEach(breakpoint => {
      it(`is for width: ${width} <= ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        assert.strictEqual(
          wrapper
            .find('WithMobileDialog')
            .shallow()
            .props().fullScreen,
          true,
        );
      });
    });
  }

  function isNotFullScreen(breakpoints, width) {
    breakpoints.forEach(breakpoint => {
      it(`is not for width: ${width} > ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        assert.strictEqual(
          wrapper
            .find('WithMobileDialog')
            .shallow()
            .props().fullScreen,
          false,
        );
      });
    });
  }

  describe('screen width: xs', () => {
    isFullScreen(['xs', 'sm', 'md', 'lg', 'xl'], 'xs');
  });

  describe('screen width: sm (default)', () => {
    isFullScreen(['sm', 'md', 'lg', 'xl'], 'sm');
    isNotFullScreen(['xs'], 'sm');
  });

  describe('screen width: md', () => {
    isFullScreen(['md', 'lg', 'xl'], 'md');
    isNotFullScreen(['xs', 'sm'], 'md');
  });

  describe('screen width: lg', () => {
    isFullScreen(['lg', 'xl'], 'lg');
    isNotFullScreen(['xs', 'sm', 'md'], 'lg');
  });

  describe('screen width: xl', () => {
    isFullScreen(['xl'], 'xl');
    isNotFullScreen(['xs', 'sm', 'md', 'lg'], 'xl');
  });
});
