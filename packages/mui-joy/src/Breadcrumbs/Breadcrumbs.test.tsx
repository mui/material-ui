import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import Breadcrumbs, {
  BreadcrumbsClassKey,
  breadcrumbsClasses as classes,
} from '@mui/joy/Breadcrumbs';
import describeConformance from '../../test/describeConformance';

describe('<Breadcrumbs />', () => {
  const { render } = createRenderer();

  describeConformance(<Breadcrumbs />, () => ({
    classes,
    inheritComponent: 'nav',
    render,
    ThemeProvider,
    muiName: 'JoyBreadcrumbs',
    refInstanceof: window.HTMLElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      ol: { expectedClassName: classes.ol },
    },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: size', () => {
    it('md by default', () => {
      render(<Breadcrumbs />);

      expect(screen.getByRole('navigation')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        render(<Breadcrumbs size={size} />);

        expect(screen.getByRole('navigation')).to.have.class(
          classes[`size${capitalize(size)}` as BreadcrumbsClassKey],
        );
      });
    });
  });
});
