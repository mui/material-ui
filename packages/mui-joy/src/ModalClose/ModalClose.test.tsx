import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
import { ThemeProvider } from '@mui/joy/styles';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose, { modalCloseClasses as classes } from '@mui/joy/ModalClose';
import describeConformance from '../../test/describeConformance';

describe('<ModalClose />', () => {
  const { render } = createRenderer();

  describeConformance(<ModalClose />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    ThemeProvider,
    muiName: 'JoyModalClose',
    refInstanceof: window.HTMLButtonElement,
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
      render(<ModalClose />);

      expect(screen.getByRole('button')).to.have.class(classes.variantPlain);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<ModalClose variant={variant} />);

        // @ts-ignore
        expect(screen.getByRole('button')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      render(<ModalClose />);

      expect(screen.getByRole('button')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<ModalClose color={color}>Hello World</ModalClose>);

        // @ts-ignore
        expect(screen.getByRole('button')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  it('inherit `size` from the context', () => {
    render(
      <ModalDialog size="sm">
        <ModalClose />
      </ModalDialog>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.sizeSm);
  });

  it('inherit `variant` from the context', () => {
    render(
      <ModalDialog variant="solid">
        <ModalClose />
      </ModalDialog>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.variantSolid);
  });

  it('inherit `color` from the context', () => {
    render(
      <ModalDialog color="danger">
        <ModalClose />
      </ModalDialog>,
    );

    expect(screen.getByRole('button')).to.have.class(classes.colorDanger);
  });

  it('call `onClick` together with close context from Modal', () => {
    const onClose = spy();

    render(
      <Modal open onClose={onClose}>
        <ModalClose />
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClose.callCount).to.equal(1);
  });
});
