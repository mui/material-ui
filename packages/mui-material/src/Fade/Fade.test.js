import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Fade from '@mui/material/Fade';
import Transition from '../Transition/Transition';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

describe('<Fade />', () => {
  const { clock, render } = createRenderer();

  const defaultProps = {
    in: true,
    children: <div />,
  };

  describeConformance(<Fade {...defaultProps} />, () => ({
    render,
    classes: {},
    inheritComponent: Transition,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
  }));

  describeTransitionConformance('Fade', () => ({
    Component: Fade,
    render,
    clock,
    lifecycle: {
      assertEnter: (node) => {
        expect(node.style.transition).to.match(
          /opacity 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
      assertExit: (node) => {
        expect(node.style.transition).to.match(
          /opacity 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
    },
    themeDuration: {
      testPropTimeout: true,
      renderElement: (props) => (
        <Fade in appear {...props}>
          <div data-testid="child">Foo</div>
        </Fade>
      ),
    },
  }));

  describe('prop: appear', () => {
    it('should work when initially hidden, appear=true', () => {
      const { container } = render(
        <Fade in={false} appear>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });

    it('should work when initially hidden, appear=false', () => {
      const { container } = render(
        <Fade in={false} appear={false}>
          <div>Foo</div>
        </Fade>,
      );

      const element = container.querySelector('div');

      expect(element).toHaveInlineStyle({ opacity: '0' });
      expect(element).toHaveInlineStyle({ visibility: 'hidden' });
    });
  });
});
