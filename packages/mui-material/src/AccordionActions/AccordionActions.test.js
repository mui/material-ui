import { createRenderer } from '@mui/internal-test-utils';
import AccordionActions, {
  accordionActionsClasses as classes,
} from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import { expect } from 'chai';
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
    skip: ['componentProp', 'componentsProp'],
  }));

  it.skipIf(window.navigator.userAgent.includes('jsdom'))(
    'should apply margin to all children but the first one',
    function test() {
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

      const children = container.querySelectorAll('[data-testid^="child-"]');
      expect(children[0]).toHaveComputedStyle({ marginLeft: '0px' });
      expect(children[1]).toHaveComputedStyle({ marginLeft: '8px' });
      expect(children[2]).toHaveComputedStyle({ marginLeft: '8px' });
      expect(children[3]).toHaveComputedStyle({ marginLeft: '8px' });
    },
  );
});
