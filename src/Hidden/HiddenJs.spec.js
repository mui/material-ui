// @flow weak
/* eslint-disable no-loop-func */
import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils/index';
import { HiddenJs } from './HiddenJs';
import type { Breakpoints } from '../styles/breakpoints';

describe('<HiddenJs />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  function shouldNotRender(
    width: Breakpoints, upOrDown: 'Up' | 'Down', smallerBreakpoints: Array<Breakpoints>) {
    for (let i = 0; i < smallerBreakpoints.length; i += 1) {
      const breakpoint = smallerBreakpoints[i];
      const up = upOrDown === 'Up';
      it(`should not render ${breakpoint} ${up ? '(smaller)' : '(same or smaller)'}`, () => {
        const props = { width, [`${breakpoint}${upOrDown}`]: true };
        const wrapper = shallow(<HiddenJs {...props}>foo</HiddenJs>);
        assert.strictEqual(wrapper.type(), null, 'should render nothing');
      });
    }
  }

  function shouldRender(
    width: Breakpoints, upOrDown: 'Up' | 'Down', sameOrLargerBreakpoints: Array<Breakpoints>) {
    for (let i = 0; i < sameOrLargerBreakpoints.length; i += 1) {
      const breakpoint = sameOrLargerBreakpoints[i];
      const up = upOrDown === 'Up';
      it(`should render ${breakpoint} ${up ? '(same or larger)' : '(larger)'}`, () => {
        const props = { width, [`${breakpoint}${upOrDown}`]: true };
        const wrapper = shallow(<HiddenJs {...props}>foo</HiddenJs>);
        assert.isNotNull(wrapper.type(), 'should render children');
        assert.strictEqual(wrapper.name(), 'div');
        assert.strictEqual(wrapper.first().text(), 'foo', 'should render children');
      });
    }
  }

  describe('screen width: xs', () => {
    describe('up', () => {
      shouldNotRender('xs', 'Up', ['xs', 'sm', 'md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender('xs', 'Down', ['xs']);
      shouldRender('xs', 'Down', ['sm', 'md', 'lg']);
    });
  });

  describe('screen width: sm', () => {
    describe('up', () => {
      shouldRender('sm', 'Up', ['xs']);
      shouldNotRender('sm', 'Up', ['sm', 'md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender('sm', 'Down', ['xs', 'sm']);
      shouldRender('sm', 'Down', ['md', 'lg', 'xl']);
    });
  });

  describe('screen width: md', () => {
    describe('up', () => {
      shouldRender('md', 'Up', ['xs', 'sm']);
      shouldNotRender('md', 'Up', ['md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender('md', 'Down', ['xs', 'sm', 'md']);
      shouldRender('md', 'Down', ['lg', 'xl']);
    });
  });

  describe('screen width: lg', () => {
    describe('up', () => {
      shouldRender('lg', 'Up', ['xs', 'sm', 'md']);
      shouldNotRender('lg', 'Up', ['lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender('lg', 'Down', ['xs', 'sm', 'md', 'lg']);
      shouldRender('lg', 'Down', ['xl']);
    });
  });

  describe('screen width: xl', () => {
    describe('up', () => {
      shouldRender('xl', 'Up', ['xs', 'sm', 'md', 'lg']);
      shouldNotRender('xl', 'Up', ['xl']);
    });

    describe('down', () => {
      shouldNotRender('xl', 'Down', ['xs', 'sm', 'md', 'lg', 'xl']);
    });
  });
});
