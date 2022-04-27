import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import ChipDelete, { chipDeleteClasses as classes } from '@mui/joy/ChipDelete';

describe('<ChipDelete />', () => {
  const { render } = createRenderer();

  describeConformance(<ChipDelete />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    ThemeProvider,
    muiName: 'MuiChipDelete',
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'light' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('Chip context', () => {
    it('disabled', () => {
      const { getByRole } = render(
        <Chip disabled>
          <ChipDelete />
        </Chip>,
      );
      expect(getByRole('button')).to.have.attr('disabled');
    });

    it('change variant according to the Chip', () => {
      const { getByRole } = render(
        <Chip variant="light">
          <ChipDelete />
        </Chip>,
      );
      expect(getByRole('button')).to.have.class(classes.variantContained);
    });

    it('use variant prop if provided', () => {
      const { getByRole } = render(
        <Chip variant="light">
          <ChipDelete variant="outlined" />
        </Chip>,
      );
      expect(getByRole('button')).to.have.class(classes.variantOutlined);
    });

    it('change color according to the Chip', () => {
      const { getByRole } = render(
        <Chip color="danger">
          <ChipDelete />
        </Chip>,
      );
      expect(getByRole('button')).to.have.class(classes.colorDanger);
    });

    it('use color prop if provided', () => {
      const { getByRole } = render(
        <Chip color="danger">
          <ChipDelete color="neutral" />
        </Chip>,
      );
      expect(getByRole('button')).to.have.class(classes.colorNeutral);
    });
  });
});
