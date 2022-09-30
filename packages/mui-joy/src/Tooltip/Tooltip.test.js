import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Tooltip, { tooltipClasses as classes } from '@mui/joy/Tooltip';
import { unstable_capitalize as capitalize } from '@mui/utils';
import Button from '../Button';

describe('<Tooltip />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Tooltip title="Hello World" open>
      <button>Hello World</button>
    </Tooltip>,
    () => ({
      classes,
      inheritComponent: 'button',
      render,
      ThemeProvider,
      muiName: 'JoyTooltip',
      refInstanceof: window.HTMLButtonElement,
      testComponentPropWith: 'span',
      testVariantProps: { variant: 'solid' },
      testCustomVariant: true,
      skip: ['componentProp', 'componentsProp', 'rootClass', 'reactTestRenderer', 'themeVariants'],
    }),
  );

  describe('prop: variant', () => {
    it('solid by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <Button>button</Button>
        </Tooltip>,
      );
      expect(getByRole('tooltip')).to.have.class(classes.variantSolid);
    });

    ['outlined', 'soft', 'plain', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" variant={variant} open>
            <Button>button</Button>
          </Tooltip>,
        );
        expect(getByRole('tooltip')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <Button>button</Button>
        </Tooltip>,
      );

      expect(getByRole('tooltip')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" color={color} open>
            <Button>button</Button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: size', () => {
    it('md by default', () => {
      const { getByRole } = render(
        <Tooltip title="Add" open>
          <Button>button</Button>
        </Tooltip>,
      );

      expect(getByRole('tooltip')).to.have.class(classes.sizeMd);
    });

    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should render ${size}`, () => {
        const { getByRole } = render(
          <Tooltip title="Add" size={size} open>
            <Button>button</Button>
          </Tooltip>,
        );

        expect(getByRole('tooltip')).to.have.class(classes[`size${capitalize(size)}`]);
      });
    });
  });
});
