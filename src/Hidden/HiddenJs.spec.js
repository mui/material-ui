// @flow weak
/* eslint-disable no-loop-func */
import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import HiddenJs from './HiddenJs';
import type { Breakpoints } from '../styles/breakpoints';

describe('<HiddenJs />', () => {
  let shallowWithWidth;

  before(() => {
    const shallow = createShallow();
    shallowWithWidth = (node, options = {}) => shallow(node, options).dive().dive();
  });

  function resolveProp(upDownOnly, breakpoint) {
    if (upDownOnly === 'only') {
      return { only: breakpoint };
    }

    return { [`${breakpoint}${upDownOnly}`]: true };
  }

  function shouldNotRender(
    width: Breakpoints,
    upDownOnly: 'Up' | 'Down' | 'only',
    smallerBreakpoints: Array<Breakpoints>,
  ) {
    const descriptions = {
      Up: '(smaller)',
      Down: '(same or smaller)',
      only: '(exact match)',
    };
    smallerBreakpoints.forEach((breakpoint) => {
      const prop = resolveProp(upDownOnly, breakpoint);

      it(`should not render ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(<HiddenJs {...props}>foo</HiddenJs>);
        assert.strictEqual(wrapper.type(), null, 'should render nothing');
      });
    });
  }

  function shouldRender(
    width: Breakpoints,
    upDownOnly: 'Up' | 'Down' | 'only',
    sameOrLargerBreakpoints: Array<Breakpoints>,
  ) {
    const descriptions = {
      Up: '(same or larger)',
      Down: '(larger)',
      only: '(not exact match)',
    };
    sameOrLargerBreakpoints.forEach((breakpoint) => {
      const prop = resolveProp(upDownOnly, breakpoint);
      it(`should render ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(<HiddenJs {...props}>foo</HiddenJs>);
        assert.isNotNull(wrapper.type(), 'should render children');
        assert.strictEqual(wrapper.name(), 'div');
        assert.strictEqual(wrapper.first().text(), 'foo', 'should render children');
      });
    });
  }

  describe('screen width: xs', () => {
    describe('up', () => {
      shouldNotRender('xs', 'Up', ['xs', 'sm', 'md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender('xs', 'Down', ['xs']);
      shouldRender('xs', 'Down', ['sm', 'md', 'lg']);
    });

    describe('only', () => {
      shouldNotRender('xs', 'only', ['xs']);
      shouldRender('xs', 'only', ['sm', 'md', 'lg', 'xl']);
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

    describe('only', () => {
      shouldNotRender('sm', 'only', ['sm']);
      shouldRender('sm', 'only', ['xs', 'md', 'lg', 'xl']);
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

    describe('only', () => {
      shouldNotRender('md', 'only', ['md']);
      shouldRender('md', 'only', ['xs', 'sm', 'lg', 'xl']);
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

    describe('only', () => {
      shouldNotRender('lg', 'only', ['lg']);
      shouldRender('lg', 'only', ['xs', 'sm', 'md', 'xl']);
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

    describe('only', () => {
      shouldNotRender('xl', 'only', ['xl']);
      shouldRender('xl', 'only', ['xs', 'sm', 'md', 'lg']);
    });
  });
});
