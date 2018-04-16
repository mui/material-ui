// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from '../Paper';
import type { Breakpoint } from '../styles/createBreakpoints';
import Dialog from './Dialog';
import withMobileDialog from './withMobileDialog';

describe('withMobileDialog', () => {
  let shallow;
  let classes;
  const defaultProps = {
    open: false,
  };

  before(() => {
    shallow = createShallow({ untilSelector: 'Dialog' });
    classes = getClasses(<Dialog {...defaultProps}>foo</Dialog>);
  });

  function isFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is for width: ${width} <= ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), true);
      });
    });
  }

  function isNotFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is not for width: ${width} > ${breakpoint}`, () => {
        const ResponsiveDialog = withMobileDialog({ breakpoint })(Dialog);
        const wrapper = shallow(
          <ResponsiveDialog {...defaultProps} width={width}>
            foo
          </ResponsiveDialog>,
        );
        assert.strictEqual(wrapper.find(Paper).hasClass(classes.paperFullScreen), false);
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
