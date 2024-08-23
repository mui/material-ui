import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ModalDialog, { modalDialogClasses as classes } from '@mui/joy/ModalDialog';
import describeConformance from '../../test/describeConformance';

describe('<ModalDialog />', () => {
  const { render } = createRenderer();

  describeConformance(<ModalDialog />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyModalDialog',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
    testVariantProps: { variant: 'solid' },
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: variant', () => {
    it('plain by default', () => {
      const { getByRole } = render(<ModalDialog />);

      expect(getByRole('dialog')).to.have.class(classes.variantOutlined);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByRole } = render(<ModalDialog variant={variant} />);

        // @ts-ignore
        expect(getByRole('dialog')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByRole } = render(<ModalDialog />);

      expect(getByRole('dialog')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByRole } = render(<ModalDialog color={color} />);

        // @ts-ignore
        expect(getByRole('dialog')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });
});
