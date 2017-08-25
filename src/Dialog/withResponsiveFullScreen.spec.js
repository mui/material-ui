// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Paper from '../Paper';
import type { Breakpoint } from '../styles/createBreakpoints';
import Dialog from './Dialog';
import withResponsiveFullScreen from './withResponsiveFullScreen';

describe('withResponsiveFullScreen', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({
      untilSelector: 'Dialog',
    });
    classes = getClasses(<Dialog />);
  });

  function isFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is for width: ${width} <= ${breakpoint}`, () => {
        const ResponsiveDialog = withResponsiveFullScreen({ breakpoint })(Dialog);
        const wrapper = shallow(<ResponsiveDialog width={width} />);
        // the fullscreen class on the Paper element
        assert.strictEqual(wrapper.find(Paper).hasClass(classes.fullScreen), true);
      });
    });
  }

  function isNotFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is not for width: ${width} > ${breakpoint}`, () => {
        const ResponsiveDialog = withResponsiveFullScreen({ breakpoint })(Dialog);
        const wrapper = shallow(<ResponsiveDialog width={width} />);
        assert.strictEqual(wrapper.find(Paper).hasClass(classes.fullScreen), false);
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
