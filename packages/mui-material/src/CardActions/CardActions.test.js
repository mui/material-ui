import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import CardActions, { cardActionsClasses as classes } from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import describeConformance from '../../test/describeConformance';

describe('<CardActions />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp'],
  }));

  it.skipIf(isJsdom())('should space children with gap', function test() {
    const { container } = render(
      <CardActions>
        <Button data-testid="child-1">Agree</Button>
        <Button data-testid="child-2" href="#">
          Agree
        </Button>
        <Button data-testid="child-3" component="span">
          Agree
        </Button>
        <div data-testid="child-4" />
      </CardActions>,
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
        <div>
          <CardActions>
            <span style={{ position: 'fixed' }} />
            <Button data-testid="with-guard-1">Agree</Button>
            <span style={{ position: 'fixed' }} />
            <Button data-testid="with-guard-2">Agree</Button>
          </CardActions>
          <CardActions>
            <Button data-testid="without-guard-1">Agree</Button>
            <Button data-testid="without-guard-2">Agree</Button>
          </CardActions>
        </div>,
      );

      [1, 2].forEach((index) => {
        expect(screen.getByTestId(`with-guard-${index}`).getBoundingClientRect().left).to.equal(
          screen.getByTestId(`without-guard-${index}`).getBoundingClientRect().left,
        );
      });
    },
  );

  it.skipIf(isJsdom())('should not apply a gap when disableSpacing is true', function test() {
    const { container } = render(
      <CardActions disableSpacing>
        <Button>Agree</Button>
        <Button>Agree</Button>
      </CardActions>,
    );

    expect(container.firstChild).toHaveComputedStyle({ columnGap: 'normal' });
  });
});
