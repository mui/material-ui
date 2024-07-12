import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import HiddenJs from './HiddenJs';

describe('<HiddenJs />', () => {
  const { render } = createRenderer();

  function resolvePropName(upDownOnly, breakpoint) {
    if (upDownOnly === 'only') {
      return 'only';
    }

    return `${breakpoint}${upDownOnly}`;
  }

  function isHidden(hiddenBreakpoints, upDownOnly, width) {
    hiddenBreakpoints.forEach((breakpoint) => {
      const prop = resolvePropName(upDownOnly, breakpoint);
      const descriptions = {
        Up: `${prop} is hidden for width: ${width} >= ${breakpoint}`,
        Down: `${prop} is hidden for width: ${width} < ${breakpoint}`,
        only: `${prop} is hidden for width: ${width} === ${breakpoint}`,
      };
      const props = { [prop]: upDownOnly === 'only' ? breakpoint : true };

      it(descriptions[upDownOnly], () => {
        const { container } = render(
          <HiddenJs width={width} {...props}>
            <div>foo</div>
          </HiddenJs>,
        );

        expect(container.firstChild).to.equal(null);
      });
    });
  }

  function isVisible(visibleBreakpoints, upDownOnly, width) {
    visibleBreakpoints.forEach((breakpoint) => {
      const prop = resolvePropName(upDownOnly, breakpoint);
      const descriptions = {
        Up: `${prop} is visible for width: ${width} < ${breakpoint}`,
        Down: `${prop} is visible for width: ${width} >= ${breakpoint}`,
        only: `${prop} is visible for width: ${width} !== ${breakpoint}`,
      };
      const props = { [prop]: upDownOnly === 'only' ? breakpoint : true };

      it(descriptions[upDownOnly], () => {
        const { container, queryByText } = render(
          <HiddenJs width={width} {...props}>
            <div>foo</div>
          </HiddenJs>,
        );

        expect(container.firstChild).to.have.tagName('div');
        expect(queryByText('foo')).not.to.equal(null);
      });
    });
  }

  describe('screen width: xs', () => {
    describe('up', () => {
      isHidden(['xs'], 'Up', 'xs');
      isVisible(['sm', 'md', 'lg', 'xl', 'uw'], 'Up', 'xs');
    });

    describe('down', () => {
      isHidden(['sm', 'md', 'lg', 'xl', 'uw'], 'Down', 'xs');
      isVisible(['xs'], 'Down', 'xs');
    });

    describe('only', () => {
      isHidden(['xs', ['xs', 'xl']], 'only', 'xs');
      isVisible(['sm', 'md', 'lg', 'xl', 'uw', ['sm', 'md', 'lg', 'xl', 'uw']], 'only', 'xs');
    });
  });

  describe('screen width: sm', () => {
    describe('up', () => {
      isHidden(['xs', 'sm'], 'Up', 'sm');
      isVisible(['md', 'lg', 'xl', 'uw'], 'Up', 'sm');
    });

    describe('down', () => {
      isHidden(['md', 'lg', 'xl', 'uw'], 'Down', 'sm');
      isVisible(['xs', 'sm'], 'Down', 'sm');
    });

    describe('only', () => {
      isHidden(['sm', ['sm', 'md']], 'only', 'sm');
      isVisible(['xs', 'md', 'lg', 'xl', 'uw', ['xs', 'md', 'lg', 'xl', 'uw']], 'only', 'sm');
    });
  });

  describe('screen width: md', () => {
    describe('up', () => {
      isHidden(['xs', 'sm', 'md'], 'Up', 'md');
      isVisible(['lg', 'xl', 'uw'], 'Up', 'md');
    });

    describe('down', () => {
      isHidden(['lg', 'xl', 'uw'], 'Down', 'md');
      isVisible(['xs', 'sm', 'md'], 'Down', 'md');
    });

    describe('only', () => {
      isHidden(['md', ['md', 'lg']], 'only', 'md');
      isVisible(['xs', 'sm', 'lg', 'xl', 'uw', ['xs', 'sm', 'lg', 'xl', 'uw']], 'only', 'md');
    });
  });

  describe('screen width: lg', () => {
    describe('up', () => {
      isHidden(['xs', 'sm', 'md', 'lg'], 'Up', 'lg');
      isVisible(['xl', 'uw'], 'Up', 'lg');
    });

    describe('down', () => {
      isHidden(['xl', 'uw'], 'Down', 'lg');
      isVisible(['xs', 'sm', 'md', 'lg'], 'Down', 'lg');
    });

    describe('only', () => {
      isHidden(['lg', ['lg', 'xl']], 'only', 'lg');
      isVisible(['xs', 'sm', 'md', 'xl', 'uw', ['xs', 'sm', 'md', 'xl', 'uw']], 'only', 'lg');
    });
  });

  describe('screen width: xl', () => {
    describe('up', () => {
      isHidden(['xs', 'sm', 'md', 'lg', 'xl'], 'Up', 'xl');
      isVisible(['uw'], 'Up', 'xl');
    });

    describe('down', () => {
      isHidden(['uw'], 'Down', 'md');
      isVisible(['xs', 'sm', 'md', 'lg', 'xl'], 'Down', 'xl');
    });

    describe('only', () => {
      isHidden(['xl', ['xl', 'uw']], 'only', 'xl');
      isVisible(['xs', 'sm', 'md', 'lg', 'uw', ['xs', 'sm', 'md', 'lg', 'uw']], 'only', 'xl');
    });
  });

  describe('screen width: uw', () => {
    describe('up', () => {
      // Everything up to and including uw is hidden
      isHidden(['xs', 'sm', 'md', 'lg', 'xl', 'uw'], 'Up', 'uw');
    });

    describe('down', () => {
      // Everything is visible since uw is the largest breakpoint
      isVisible(['xs', 'sm', 'md', 'lg', 'xl'], 'Down', 'uw');
    });

    describe('only', () => {
      // Only uw is hidden
      isHidden(['uw', ['uw', 'xs']], 'only', 'uw');
      // All other breakpoints are visible
      isVisible(['xs', 'sm', 'md', 'lg', 'xl'], 'only', 'uw');
    });
  });
});
