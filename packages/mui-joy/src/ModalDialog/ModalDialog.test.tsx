import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import capitalize from '@mui/utils/capitalize';
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
      render(<ModalDialog />);

      expect(screen.getByRole('dialog')).to.have.class(classes.variantOutlined);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        render(<ModalDialog variant={variant} />);

        // @ts-ignore
        expect(screen.getByRole('dialog')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      render(<ModalDialog />);

      expect(screen.getByRole('dialog')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        render(<ModalDialog color={color} />);

        // @ts-ignore
        expect(screen.getByRole('dialog')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });
});
