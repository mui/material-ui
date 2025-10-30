import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, act, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import ChipDelete, { chipDeleteClasses as classes } from '@mui/joy/ChipDelete';
import describeConformance from '../../test/describeConformance';

describe('<ChipDelete />', () => {
  const { render } = createRenderer();

  describeConformance(<ChipDelete />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    ThemeProvider,
    muiName: 'JoyChipDelete',
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'soft' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('Chip context', () => {
    it('disabled', () => {
      render(
        <Chip disabled>
          <ChipDelete />
        </Chip>,
      );

      expect(screen.getByRole('button')).to.have.attr('disabled');
    });

    it('change variant according to the Chip', () => {
      render(
        <Chip variant="soft">
          <ChipDelete />
        </Chip>,
      );

      expect(screen.getByRole('button')).to.have.class(classes.variantSoft);
    });

    it('use variant prop if provided', () => {
      render(
        <Chip variant="soft">
          <ChipDelete variant="outlined" />
        </Chip>,
      );

      expect(screen.getByRole('button')).to.have.class(classes.variantOutlined);
    });

    it('change color according to the Chip', () => {
      render(
        <Chip color="danger">
          <ChipDelete />
        </Chip>,
      );

      expect(screen.getByRole('button')).to.have.class(classes.colorDanger);
    });

    it('use color prop if provided', () => {
      render(
        <Chip color="danger">
          <ChipDelete color="neutral" />
        </Chip>,
      );

      expect(screen.getByRole('button')).to.have.class(classes.colorNeutral);
    });
  });

  describe('Chip onDelete', () => {
    it('should call onDelete function when backspace, enter or delete is pressed', () => {
      const handleDelete = spy();
      render(<ChipDelete onDelete={handleDelete} onClick={() => {}} />);
      const chipDelete = screen.getByRole('button');
      act(() => {
        chipDelete.focus();
      });
      fireEvent.keyDown(chipDelete, { key: 'Backspace' });
      fireEvent.keyDown(chipDelete, { key: 'Enter' });
      fireEvent.keyDown(chipDelete, { key: 'Delete' });
      fireEvent.click(chipDelete);
      expect(handleDelete.callCount).to.equal(4);
    });

    it('should not call onDelete function when ChipDelete is disabled', () => {
      const handleDelete = spy();

      render(<ChipDelete disabled onDelete={handleDelete} onClick={() => {}} />);

      const chipDelete = screen.getByRole('button');
      act(() => {
        chipDelete.focus();
      });
      fireEvent.click(chipDelete);
      expect(handleDelete.callCount).to.equal(0);
    });
  });
});
