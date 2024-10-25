import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import AccordionGroup, { accordionGroupClasses as classes } from '@mui/joy/AccordionGroup';
import describeConformance from '../../test/describeConformance';

describe('<AccordionGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAccordionGroup',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('classes', () => {
    (
      [
        { size: 'sm', class: classes.sizeSm },
        { size: 'md', class: classes.sizeMd },
        { size: 'lg', class: classes.sizeLg },
      ] as const
    ).forEach((sizeConfig) => {
      it(`should have ${sizeConfig.class} class for ${sizeConfig.size} size `, () => {
        const { getByTestId } = render(
          <AccordionGroup data-testid="root" size={sizeConfig.size} />,
        );

        expect(getByTestId('root')).to.have.class(sizeConfig.class);
      });
    });

    (
      [
        { variant: 'outlined', class: classes.variantOutlined },
        { variant: 'plain', class: classes.variantPlain },
        { variant: 'soft', class: classes.variantSoft },
        { variant: 'solid', class: classes.variantSolid },
      ] as const
    ).forEach((variantConfig) => {
      it(`should have ${variantConfig.class} class for ${variantConfig.variant} variant `, () => {
        const { getByTestId } = render(
          <AccordionGroup data-testid="root" variant={variantConfig.variant} />,
        );

        expect(getByTestId('root')).to.have.class(variantConfig.class);
      });
    });

    (
      [
        { color: 'danger', class: classes.colorDanger },
        { color: 'neutral', class: classes.colorNeutral },
        { color: 'primary', class: classes.colorPrimary },
        { color: 'success', class: classes.colorSuccess },
      ] as const
    ).forEach((colorConfig) => {
      it(`should have ${colorConfig.class} class for ${colorConfig.color} color `, () => {
        const { getByTestId } = render(
          <AccordionGroup data-testid="root" color={colorConfig.color} />,
        );

        expect(getByTestId('root')).to.have.class(colorConfig.class);
      });
    });
  });

  it('should not warn when using custom color, variant, size', () => {
    expect(() => {
      // @ts-expect-error as `custom` color, varaint, size is not part of the type system
      render(<AccordionGroup color="custom" variant="custom" size="custom" />);
    }).not.toErrorDev();
  });
});
