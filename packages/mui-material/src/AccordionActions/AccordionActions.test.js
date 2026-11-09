import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import describeConformance from '../../test/describeConformance';

describe('<AccordionActions />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionActions>Conformance</AccordionActions>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiAccordionActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp'],
  }));

  it.skipIf(isJsdom())('should space children with gap', function test() {
    const { container } = render(
      <AccordionActions>
        <Button data-testid="child-1">Agree</Button>
        <Button data-testid="child-2" href="#">
          Agree
        </Button>
        <Button data-testid="child-3" component="span">
          Agree
        </Button>
        <div data-testid="child-4" />
      </AccordionActions>,
    );

    expect(container.firstChild).toHaveComputedStyle({ columnGap: '8px', rowGap: '8px' });
    const children = container.querySelectorAll('[data-testid^="child-"]');
    children.forEach((child) => {
      expect(child).toHaveComputedStyle({ marginLeft: '0px' });
    });
  });

  it.skipIf(isJsdom())(
    'should not shift children when an out-of-flow element is inserted',
    function test() {
      render(
        <AccordionActions>
          <Button data-testid="child-1">Agree</Button>
          <span data-testid="focus-guard" style={{ position: 'fixed' }} />
          <Button data-testid="child-2">Agree</Button>
        </AccordionActions>,
      );

      expect(screen.getByTestId('focus-guard')).toHaveComputedStyle({ marginLeft: '0px' });
      expect(screen.getByTestId('child-2')).toHaveComputedStyle({ marginLeft: '0px' });
    },
  );

  it.skipIf(isJsdom())('should not apply a gap when disableSpacing is true', function test() {
    const { container } = render(
      <AccordionActions disableSpacing>
        <Button>Agree</Button>
        <Button>Agree</Button>
      </AccordionActions>,
    );

    expect(container.firstChild).toHaveComputedStyle({ columnGap: 'normal' });
  });
});
