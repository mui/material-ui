// @flow weak
/* eslint-disable no-loop-func */

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import HiddenJs from './HiddenJs';
import type { Breakpoint } from '../styles/breakpoints';
import Typography from '../Typography';

describe('<HiddenJs />', () => {
  let shallowWithWidth;

  before(() => {
    const shallow = createShallow();
    shallowWithWidth = (node, options = {}) => shallow(node, options).dive();
  });

  function resolveProp(upDownOnly, breakpoint) {
    if (upDownOnly === 'only') {
      return { only: breakpoint };
    }

    return { [`${breakpoint}${upDownOnly}`]: true };
  }

  function shouldNotRender(
    width: Breakpoint,
    upDownOnly: 'Up' | 'Down' | 'only',
    hiddenBreakpoints: Array<*>,
  ) {
    const descriptions = {
      Up: '(smaller)',
      Down: '(same or smaller)',
      only: '(exact match)',
    };
    hiddenBreakpoints.forEach((breakpoint) => {
      const prop = resolveProp(upDownOnly, breakpoint);

      it(`should not render children ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(<HiddenJs component="div" {...props}>foo</HiddenJs>);
        assert.isNull(wrapper.type(), 'should render null');
      });

      it(`should not render Element ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(
          <HiddenJs component={<Typography>foo</Typography>} {...props}>foo</HiddenJs>,
        );
        assert.isNull(wrapper.type(), 'should render null');
      });
    });
  }

  function shouldRender(
    width: Breakpoint,
    upDownOnly: 'Up' | 'Down' | 'only',
    visibleBreakpoints: Array<*>,
  ) {
    const descriptions = {
      Up: '(same or larger)',
      Down: '(larger)',
      only: '(not exact match)',
    };
    visibleBreakpoints.forEach((breakpoint) => {
      const prop = resolveProp(upDownOnly, breakpoint);
      it(`should render children ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(<HiddenJs {...props}><div>foo</div></HiddenJs>);
        assert.isNotNull(wrapper.type(), 'should render');
        assert.strictEqual(wrapper.name(), 'div');
        assert.strictEqual(wrapper.first().text(), 'foo', 'should render children');
      });

      it(`should render Element ${breakpoint} ${descriptions[upDownOnly]}`, () => {
        const props = { width, ...prop };
        const wrapper = shallowWithWidth(
          <HiddenJs {...props}>
            <Typography>foo</Typography>
          </HiddenJs>,
        );
        assert.isNotNull(wrapper.type(), 'should render');
        assert.strictEqual(wrapper.name(), 'Typography');
      });
    });
  }

  describe('screen width: xs', () => {
    const screenWidth = 'xs';
    describe('up', () => {
      shouldNotRender(screenWidth, 'Up', ['xs', 'sm', 'md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender(screenWidth, 'Down', ['xs']);
      shouldRender(screenWidth, 'Down', ['sm', 'md', 'lg']);
    });

    describe('only', () => {
      shouldNotRender(screenWidth, 'only', ['xs', ['xs', 'xl']]);
      shouldRender(screenWidth, 'only', ['sm', 'md', 'lg', 'xl', ['sm', 'md', 'lg', 'xl']]);
    });
  });

  describe('screen width: sm', () => {
    const screenWidth = 'sm';
    describe('up', () => {
      shouldRender(screenWidth, 'Up', ['xs']);
      shouldNotRender(screenWidth, 'Up', ['sm', 'md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender(screenWidth, 'Down', ['xs', 'sm']);
      shouldRender(screenWidth, 'Down', ['md', 'lg', 'xl']);
    });

    describe('only', () => {
      shouldNotRender(screenWidth, 'only', ['sm', ['sm', 'md']]);
      shouldRender(screenWidth, 'only', ['xs', 'md', 'lg', 'xl', ['xs', 'md', 'lg', 'xl']]);
    });
  });

  describe('screen width: md', () => {
    const screenWidth = 'md';
    describe('up', () => {
      shouldRender(screenWidth, 'Up', ['xs', 'sm']);
      shouldNotRender(screenWidth, 'Up', ['md', 'lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender(screenWidth, 'Down', ['xs', 'sm', 'md']);
      shouldRender(screenWidth, 'Down', ['lg', 'xl']);
    });

    describe('only', () => {
      shouldNotRender(screenWidth, 'only', ['md', ['md', 'lg']]);
      shouldRender(screenWidth, 'only', ['xs', 'sm', 'lg', 'xl', ['xs', 'sm', 'lg', 'xl']]);
    });
  });

  describe('screen width: lg', () => {
    const screenWidth = 'lg';
    describe('up', () => {
      shouldRender(screenWidth, 'Up', ['xs', 'sm', 'md']);
      shouldNotRender(screenWidth, 'Up', ['lg', 'xl']);
    });

    describe('down', () => {
      shouldNotRender(screenWidth, 'Down', ['xs', 'sm', 'md', 'lg']);
      shouldRender(screenWidth, 'Down', ['xl']);
    });

    describe('only', () => {
      shouldNotRender(screenWidth, 'only', ['lg', ['lg', 'xl']]);
      shouldRender(screenWidth, 'only', ['xs', 'sm', 'md', 'xl', ['xs', 'sm', 'md', 'xl']]);
    });
  });

  describe('screen width: xl', () => {
    const screenWidth = 'xl';
    describe('up', () => {
      shouldRender(screenWidth, 'Up', ['xs', 'sm', 'md', 'lg']);
      shouldNotRender(screenWidth, 'Up', ['xl']);
    });

    describe('down', () => {
      shouldNotRender(screenWidth, 'Down', ['xs', 'sm', 'md', 'lg', 'xl']);
    });

    describe('only', () => {
      shouldNotRender(screenWidth, 'only', ['xl', ['xl', 'xs']]);
      shouldRender(screenWidth, 'only', ['xs', 'sm', 'md', 'lg', ['xs', 'sm', 'md', 'lg']]);
    });
  });
});
