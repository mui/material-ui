import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Breadcrumbs, { breadcrumbsClasses as classes } from '@mui/joy/Breadcrumbs';
import { unstable_capitalize as capitalize } from '@mui/utils';
import Typography from '../Typography';
import Link from '../Link';

describe('<Breadcrumbs />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Breadcrumbs>
      {[
        <Link key="1" href="/">
          1
        </Link>,
        <Typography key="2">2</Typography>,
      ]}
    </Breadcrumbs>,
    () => ({
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
        li: { expectedClassName: classes.li },
        separator: { expectedClassName: classes.separator },
      },
      skip: ['classesRoot', 'componentsProp'],
    }),
  );

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(<Breadcrumbs />);

      expect(getByRole('navigation')).to.have.class(classes.sizeMd);
    });
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(<Breadcrumbs size={size} />);

        expect(getByRole('navigation')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });
});
