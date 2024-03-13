import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import userEvent from '@testing-library/user-event';
import {
  act,
  createRenderer,
  fireEvent,
  focusVisible,
  simulatePointerDevice,
  programmaticFocusTriggersFocusVisible,
} from '@mui-internal/test-utils';
import { hexToRgb } from '@mui/system';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip, { chipClasses as classes } from '@mui/material-next/Chip';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
import CheckBox from '../internal/svg-icons/CheckBox';
import { ChipProps } from './Chip.types';
import describeConformance from '../../test/describeConformance';

// TODO: remove after migrating SvgIcon to support Material Design 3 colors
const MaterialV5DefaultTheme = createTheme();

describe('<Chip />', () => {
  let originalMatchmedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    window.matchMedia = () =>
      ({
        addListener: () => {},
        removeListener: () => {},
      }) as unknown as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  const { render } = createRenderer();

  describeConformance(<Chip />, () => ({
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiChip',
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testVariantProps: { variant: 'outlined' },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp'],
  }));

  describe('text only', () => {
    it('is not in tab order', () => {
      const { container } = render(<Chip label="My text Chip" />);

      expect(container.querySelectorAll('[tabindex]')).to.have.length(0);
    });

    it('should renders certain classes and contains a label', () => {
      const { container } = render(<Chip label="My text Chip" />);

      const chip = container.querySelector(`.${classes.root}`);
      const label = container.querySelector(`.${classes.label}`);

      expect(label).to.have.tagName('span');
      expect(label).to.have.text('My text Chip');

      expect(chip).to.have.class(classes.root);
      expect(chip).not.to.have.class(classes.colorPrimary);
      expect(chip).not.to.have.class(classes.colorSecondary);
      expect(chip).not.to.have.class(classes.clickable);
      expect(chip).not.to.have.class(classes.deletable);
    });

    it('should render with the color class name based on the color prop', () => {
      const colorOptions: NonNullable<ChipProps['color']>[] = [
        'primary',
        'secondary',
        'info',
        'error',
        'warning',
        'success',
      ];
      colorOptions.forEach((color) => {
        const { container } = render(<Chip color={color} />);
        const chip = container.querySelector(`.${classes.root}`);
        expect(chip).to.have.class(classes[`color${capitalize(color)}` as keyof typeof classes]);
      });
    });
  });

  describe('clickable chip', () => {
    it('renders as a button in taborder with the label as the accessible name', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} />);

      const button = getByRole('button');
      expect(button).to.have.property('tabIndex', 0);
      expect(button).toHaveAccessibleName('My Chip');
    });

    it('should render link with the button base', () => {
      const { getByTestId } = render(
        <Chip data-testid="root" component="a" clickable label="My text Chip" />,
      );

      const chipRoot = getByTestId('root');

      expect(chipRoot).to.have.class('MuiButtonBase-root');
      expect(chipRoot).to.have.tagName('a');
    });

    it('should render ripple', () => {
      const { getByTestId } = render(
        <Chip data-testid="root" component="a" clickable label="My text Chip" />,
      );

      const chipRoot = getByTestId('root');

      expect(chipRoot.querySelector('.MuiTouchRipple-root')).not.to.equal(null);
    });

    it('should disable ripple when MuiButtonBase has disableRipple in theme', () => {
      const theme = extendTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
      });

      const { getByTestId } = render(
        <CssVarsProvider theme={theme}>
          <Chip data-testid="root" clickable label="My Chip" />
        </CssVarsProvider>,
      );

      const chipRoot = getByTestId('root');

      expect(chipRoot).to.have.class('MuiButtonBase-root');
      expect(chipRoot.querySelector('.MuiTouchRipple-root')).to.equal(null);
    });

    it('should apply user value of tabIndex', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} tabIndex={5} />);

      expect(getByRole('button')).to.have.property('tabIndex', 5);
    });

    it('should render with the root and clickable class', () => {
      const { container } = render(<Chip label="My Chip" onClick={() => {}} />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.clickable);
    });

    it('should render with the root, clickable, and colorPrimary class', () => {
      const { getByRole } = render(<Chip label="My Chip" onClick={() => {}} color="primary" />);

      const button = getByRole('button');
      expect(button).to.have.class(classes.root);
      expect(button).to.have.class(classes.colorPrimary);
      expect(button).to.have.class(classes.clickable);
    });

    it('should render with the root, outlined, clickable, and colorPrimary class', () => {
      const { container } = render(
        <Chip color="primary" label="My Chip" onClick={() => {}} variant="outlined" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.clickable);
      expect(chip).to.have.class(classes.outlined);
    });

    it('should render with the root, outlined, clickable, and colorSecondary class', () => {
      const { getByRole } = render(
        <Chip color="secondary" label="My Chip" onClick={() => {}} variant="outlined" />,
      );

      const button = getByRole('button');
      expect(button).to.have.class(classes.root);
      expect(button).to.have.class(classes.colorSecondary);
      expect(button).to.have.class(classes.clickable);
      expect(button).to.have.class(classes.outlined);
    });

    it('should render with the root, filled, clickable, and colorPrimary class', () => {
      const { getByRole } = render(
        <Chip color="primary" label="My Chip" onClick={() => {}} variant="filled" />,
      );

      const chip = getByRole('button');
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.clickable);
      expect(chip).to.have.class(classes.filled);
    });

    it('should not be focused when a deletable chip is disabled', () => {
      const { getByTestId } = render(
        <Chip label="My Chip" disabled data-testid="chip" onDelete={() => {}} />,
      );

      const chip = getByTestId('chip');

      simulatePointerDevice();
      act(() => {
        fireEvent.keyDown(document.body, { key: 'Tab' });
      });

      expect(chip).to.have.class(classes.root);
      expect(chip).not.to.have.class(classes.focusVisible);
    });

    it('should render with the root, filled, clickable, and colorSecondary class', () => {
      const { getByRole } = render(
        <Chip color="secondary" label="My Chip" onClick={() => {}} variant="filled" />,
      );

      const chip = getByRole('button');
      expect(chip).to.have.class(classes.root);
      expect(chip).to.have.class(classes.colorSecondary);
      expect(chip).to.have.class(classes.clickable);
      expect(chip).to.have.class(classes.filled);
    });
  });

  describe('deletable Avatar chip', () => {
    it('should render a button in tab order with the avatar', () => {
      const { container, getByRole } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
        />,
      );

      expect(getByRole('button')).to.have.property('tabIndex', 0);
      expect(container.querySelector('#avatar')).not.to.equal(null);
    });

    it('should not create ripples', () => {
      const { getByTestId } = render(
        <Chip data-testid="root" avatar={<Avatar id="avatar">MB</Avatar>} onDelete={() => {}} />,
      );

      const chipRoot = getByTestId('root');

      expect(chipRoot.querySelector('.MuiTouchRipple-root')).to.equal(null);
    });

    it('should apply user value of tabIndex', () => {
      const { container, getByRole } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          tabIndex={5}
        />,
      );

      expect(getByRole('button')).to.have.property('tabIndex', 5);
      const elementsInTabOrder = Array.from(container.querySelectorAll('[tabIndex]')).filter(
        (element) => (element as HTMLElement).tabIndex >= 0,
      );
      expect(elementsInTabOrder).to.have.length(1);
    });

    it('fires onDelete when clicking the delete icon', () => {
      const handleDelete = spy();
      const { getByTestId } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={handleDelete}
          deleteIcon={<div data-testid="delete-icon" />}
        />,
      );
      const deleteIcon = getByTestId('delete-icon');

      fireEvent.click(deleteIcon);

      expect(handleDelete.callCount).to.equal(1);
    });

    it('should stop propagation when clicking the delete icon', () => {
      const handleClick = spy();
      const { getByTestId } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onClick={handleClick}
          onDelete={() => {}}
          deleteIcon={<div data-testid="delete-icon" />}
        />,
      );
      const deleteIcon = getByTestId('delete-icon');

      fireEvent.click(deleteIcon);

      expect(handleClick.callCount).to.equal(0);
    });

    it('should render with the root, deletable classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar id="avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.deletable);
    });

    it('should render with the root, deletable, and colorPrimary classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar className="my-Avatar">MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          color="primary"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
    });

    it('should render with the root, deletable, and colorSecondary classes', () => {
      const { container } = render(
        <Chip
          avatar={<Avatar>MB</Avatar>}
          label="Text Avatar Chip"
          onDelete={() => {}}
          color="secondary"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorSecondary);
      expect(chip).to.have.class(classes.deletable);
    });
  });

  describe('prop: deleteIcon', () => {
    it('should render a default icon with the root, deletable and deleteIcon classes', () => {
      const { getByRole, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} />,
      );

      const chip = getByRole('button');
      const icon = getByTestId('ClearIcon');

      expect(chip).to.have.class(classes.deletable);
      expect(chip).to.contain(icon);
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render default icon with the root, deletable, colorPrimary, and deleteIcon classes', () => {
      const { container, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="primary" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
      const icon = getByTestId('ClearIcon');
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render default icon with the root, deletable, colorSecondary, and deleteIcon classes', () => {
      const { container, getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="secondary" />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorSecondary);
      expect(chip).to.have.class(classes.deletable);
      const icon = getByTestId('ClearIcon');
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render default icon with the root, deletable, deleteIcon primary class and deleteIcon filled primary class', () => {
      const { container, getByTestId } = render(
        <Chip
          label="Custom delete icon Chip"
          onDelete={() => {}}
          color="primary"
          variant="filled"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
      const icon = getByTestId('ClearIcon');
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('should render default icon with the root, deletable, deleteIcon primary class and deleteIcon outlined primary class', () => {
      const { container, getByTestId } = render(
        <Chip
          label="Custom delete icon Chip"
          onDelete={() => {}}
          color="primary"
          variant="outlined"
        />,
      );

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.colorPrimary);
      expect(chip).to.have.class(classes.deletable);
      const icon = getByTestId('ClearIcon');
      expect(icon).to.have.class(classes.deleteIcon);
    });

    it('accepts a custom icon', () => {
      const handleDelete = spy();
      const { getByTestId } = render(
        <Chip label="Custom delete icon Chip" onDelete={handleDelete} deleteIcon={<CheckBox />} />,
      );

      fireEvent.click(getByTestId('CheckBoxIcon'));

      expect(handleDelete.callCount).to.equal(1);
    });
  });

  describe('reacts to keyboard chip', () => {
    it('should call onKeyDown when a key is pressed', () => {
      const handleKeydown = stub().callsFake((event) => event.key);
      const { getByRole } = render(<Chip onClick={() => {}} onKeyDown={handleKeydown} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyDown(chip, { key: 'p' });

      expect(handleKeydown.callCount).to.equal(1);
      expect(handleKeydown.firstCall.returnValue).to.equal('p');
    });

    it('should unfocus when a esc key is pressed', () => {
      const handleBlur = spy();
      const { getByRole } = render(<Chip onBlur={handleBlur} onClick={() => {}} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      fireEvent.keyUp(chip, { key: 'Escape' });

      expect(handleBlur.callCount).to.equal(1);
      expect(chip).not.toHaveFocus();
    });

    it('should call onClick when `space` is released ', async function test() {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      // userEvent.setup() requires Safari 14 or up to work
      // We can remove this check once we drop support for Safari 13
      if (isSafari) {
        this.skip();
      }

      const user = userEvent.setup();
      const handleClick = spy();
      const { getByRole } = render(<Chip onClick={handleClick} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      await user.keyboard('{ >}'); // press space without releasing

      expect(handleClick.callCount).to.equal(0);

      await user.keyboard('{/ }'); // release space

      expect(handleClick.callCount).to.equal(1);
    });

    it('should call onClick when `enter` is pressed ', async () => {
      const handleClick = spy();
      const { getByRole } = render(<Chip onClick={handleClick} />);
      const chip = getByRole('button');
      act(() => {
        chip.focus();
      });

      await userEvent.keyboard('{enter}');

      expect(handleClick.callCount).to.equal(1);
    });

    describe('prop: onDelete', () => {
      ['Backspace', 'Delete'].forEach((key) => {
        it(`should call onDelete '${key}' is released`, () => {
          const handleDelete = spy();
          const handleKeyDown = spy();
          const { getAllByRole } = render(
            <Chip onClick={() => {}} onKeyDown={handleKeyDown} onDelete={handleDelete} />,
          );
          const chip = getAllByRole('button')[0];
          act(() => {
            chip.focus();
          });

          fireEvent.keyDown(chip, { key });

          // defaultPrevented?
          expect(handleKeyDown.callCount).to.equal(1);
          expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', true);
          expect(handleDelete.callCount).to.equal(0);

          fireEvent.keyUp(chip, { key });

          expect(handleDelete.callCount).to.equal(1);
        });
      });

      it('should not prevent default on input', () => {
        const handleKeyDown = spy();
        const { getByTestId } = render(
          <Chip label={<input data-testid="input" />} onKeyDown={handleKeyDown} />,
        );
        const input = getByTestId('input');

        act(() => {
          input.focus();
        });
        fireEvent.keyDown(input, { key: 'Backspace' });

        expect(handleKeyDown.callCount).to.equal(1);
        expect(handleKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });

    describe('with children that generate events', () => {
      ['Backspace', 'Delete'].forEach((key) => {
        it(`should not call onDelete for child keyup event when '${key}' is released`, () => {
          const handleDelete = spy();
          const handleKeyUp = spy();
          const { getByTestId } = render(
            <Chip
              onDelete={handleDelete}
              label={
                <input
                  data-testid="input"
                  autoFocus
                  className="child-input"
                  onKeyUp={handleKeyUp}
                />
              }
            />,
          );

          fireEvent.keyUp(getByTestId('input'), { key });

          expect(handleKeyUp.callCount).to.equal(1);
          expect(handleDelete.callCount).to.equal(0);
        });
      });

      it(`should not call onClick for child keyup event when 'Space' is released`, () => {
        const handleClick = spy();
        const handleKeyUp = spy();
        const { getByTestId } = render(
          <Chip
            onClick={handleClick}
            label={
              <input data-testid="input" autoFocus className="child-input" onKeyUp={handleKeyUp} />
            }
          />,
        );

        fireEvent.keyUp(getByTestId('input'), { key: ' ' });
        expect(handleKeyUp.callCount).to.equal(1);
        expect(handleClick.callCount).to.equal(0);
      });

      it(`should not call onClick for child keydown event when 'Enter' is pressed`, () => {
        const handleClick = spy();
        const handleKeyDown = spy();
        const { getByTestId } = render(
          <Chip
            onClick={handleClick}
            label={
              <input
                data-testid="input"
                autoFocus
                className="child-input"
                onKeyDown={handleKeyDown}
              />
            }
          />,
        );

        fireEvent.keyDown(getByTestId('input'), { key: 'Enter' });
        expect(handleKeyDown.callCount).to.equal(1);
        expect(handleClick.callCount).to.equal(0);
      });

      it('should not call onClick for child event when `space` is released', () => {
        const handleClick = spy();
        const handleKeyUp = spy();
        const { getByTestId } = render(
          <Chip
            onClick={handleClick}
            label={
              <input data-testid="input" autoFocus className="child-input" onKeyUp={handleKeyUp} />
            }
          />,
        );

        fireEvent.keyUp(getByTestId('input'), { key: ' ' });

        expect(handleClick.callCount).to.equal(0);
        expect(handleKeyUp.callCount).to.equal(1);
      });

      it('should not call onClick for child event when `enter` is pressed', () => {
        const handleClick = spy();
        const handleKeyDown = spy();
        const { getByTestId } = render(
          <Chip
            onClick={handleClick}
            label={
              <input
                data-testid="input"
                autoFocus
                className="child-input"
                onKeyDown={handleKeyDown}
              />
            }
          />,
        );

        fireEvent.keyDown(getByTestId('input'), { key: 'Enter' });

        expect(handleClick.callCount).to.equal(0);
        expect(handleKeyDown.callCount).to.equal(1);
      });
    });
  });

  describe('prop: icon', () => {
    it('should render the icon', () => {
      const { getByTestId } = render(<Chip icon={<span data-testid="test-icon" />} />);

      expect(getByTestId('test-icon')).to.have.class(classes.icon);
    });

    it("should not override the icon's custom color", () => {
      const { getByTestId } = render(
        <React.Fragment>
          <Chip icon={<CheckBox data-testid="test-icon" color="success" />} />,
          <Chip icon={<CheckBox data-testid="test-icon2" color="success" />} color="error" />,
        </React.Fragment>,
      );

      expect(getByTestId('test-icon')).toHaveComputedStyle({
        color: hexToRgb(MaterialV5DefaultTheme.palette.success.main),
      });
      expect(getByTestId('test-icon2')).toHaveComputedStyle({
        color: hexToRgb(MaterialV5DefaultTheme.palette.success.main),
      });
    });
  });

  describe('prop: size', () => {
    it('should render with the sizeSmall class', () => {
      const { container } = render(<Chip size="small" />);

      const chip = container.querySelector(`.${classes.root}`);
      expect(chip).to.have.class(classes.sizeSmall);
    });
  });

  describe('event: focus', () => {
    it('has a focus-visible polyfill', () => {
      const { getByTestId } = render(
        <Chip data-testid="root" label="Test Chip" onClick={() => {}} />,
      );
      const chip = getByTestId('root');
      simulatePointerDevice();

      expect(chip).not.to.have.class(classes.focusVisible);

      act(() => {
        chip.focus();
      });

      if (programmaticFocusTriggersFocusVisible()) {
        expect(chip).to.have.class(classes.focusVisible);
      } else {
        expect(chip).not.to.have.class(classes.focusVisible);
      }

      focusVisible(chip);

      expect(chip).to.have.class(classes.focusVisible);
    });

    it('should reset the focused state', () => {
      const { getByTestId, setProps } = render(
        <Chip data-testid="root" label="Test Chip" onClick={() => {}} />,
      );
      const chip = getByTestId('root');

      simulatePointerDevice();
      focusVisible(chip);

      expect(chip).to.have.class(classes.focusVisible);

      setProps({ disabled: true });

      expect(chip).not.to.have.class(classes.focusVisible);
    });
  });

  describe('CSS vars', () => {
    it('should not throw when there is theme value is CSS variable', () => {
      const theme = extendTheme();
      theme.palette = theme.colorSchemes.light.palette;
      theme.palette.text = {
        ...theme.palette.text,
        primary: 'var(--mui-palette-grey-900)',
      };
      expect(() =>
        render(
          <CssVarsProvider theme={theme}>
            <Chip label="Test Chip" />
          </CssVarsProvider>,
        ),
      ).not.to.throw();
    });
  });
});
