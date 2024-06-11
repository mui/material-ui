import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
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
      const { getByRole } = render(<Breadcrumbs />);

      expect(getByRole('navigation')).to.have.class(classes.sizeMd);
    });
    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(<Breadcrumbs size={size} />);

        expect(getByRole('navigation')).to.have.class(
          classes[`size${capitalize(size)}` as BreadcrumbsClassKey],
        );
      });
    });
  });
});
