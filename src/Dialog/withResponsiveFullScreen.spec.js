// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import Paper from '../Paper';
import Dialog, { styleSheet } from './Dialog';
import withResponsiveFullScreen from './withResponsiveFullScreen';
import type { Breakpoint } from '../styles/breakpoints';

describe('withResponsiveFullScreen', () => {
  let shallowWithWidth;
  let classes;

  before(() => {
    const shallow = createShallow();
    shallowWithWidth = (node, options = {}) => {
      return shallow(node, options).dive().dive().dive();
    };
    classes = shallow.context.styleManager.render(styleSheet);
  });

  function isFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is for width: ${width} <= ${breakpoint}`, () => {
        const ResponsiveDialog = withResponsiveFullScreen({ breakpoint })(Dialog);
        const wrapper = shallowWithWidth(<ResponsiveDialog width={width} />);
        // the fullscreen class on the Paper element
        assert.strictEqual(wrapper.find(Paper).hasClass(classes.fullScreen), true);
      });
    });
  }

  function isNotFullScreen(breakpoints: Array<Breakpoint>, width: Breakpoint) {
    breakpoints.forEach(breakpoint => {
      it(`is not for width: ${width} > ${breakpoint}`, () => {
        const ResponsiveDialog = withResponsiveFullScreen({ breakpoint })(Dialog);
        const wrapper = shallowWithWidth(<ResponsiveDialog width={width} />);
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
