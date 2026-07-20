import { expect } from 'chai';
import {
  createRenderer,
  screen,
  isJsdom,
  simulatePointerDevice,
  focusVisible,
} from '@mui/internal-test-utils';
import Radio, { radioClasses as classes } from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import switchBaseClasses from '../internal/switchBaseClasses';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Radio />', () => {
  const { render } = createRenderer();

  function CustomRoot({ checkedIcon, ownerState, disableRipple, slots, slotProps, ...props }) {
    return <div {...props} />;
  }

  describeConformance(<Radio />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiRadio',
    testVariantProps: { color: 'secondary' },
    refInstanceof: window.HTMLSpanElement,
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomRoot,
      },
      input: {
        expectedClassName: switchBaseClasses.input,
      },
    },
    skip: ['componentProp'],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(typeof classes.root).to.equal('string');
      expect(typeof classes.checked).to.equal('string');
      expect(typeof classes.disabled).to.equal('string');
    });
  });

  describe('prop: unchecked', () => {
    it('should render an unchecked icon', () => {
      render(<Radio />);
      expect(screen.getAllByTestId('RadioButtonUncheckedIcon').length).to.equal(1);
    });
  });

  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      render(<Radio checked />);
      expect(screen.getAllByTestId('RadioButtonCheckedIcon').length).to.equal(1);
    });
  });

  describe('prop: size', () => {
    it('add sizeSmall class to the root element when the size prop equals "small"', () => {
      render(<Radio size="small" />);
      const radio = screen.getByRole('radio');
      const root = radio.parentElement;
      expect(root).to.have.class(classes.sizeSmall);
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <Radio />
          </FormControl>,
        );

        expect(screen.getByRole('radio')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <Radio disabled />
          </FormControl>,
        );

        expect(screen.getByRole('radio')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <Radio />
          </FormControl>,
        );

        expect(screen.getByRole('radio')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <Radio disabled={false} />
          </FormControl>,
        );

        expect(screen.getByRole('radio')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('theme: customization', () => {
    it.skipIf(isJsdom())(
      'should be customizable in the theme using the size prop.',
      function test() {
        const theme = createTheme({
          components: {
            MuiRadio: {
              styleOverrides: {
                sizeSmall: {
                  marginLeft: -40,
                  paddingRight: 2,
                },
              },
            },
          },
        });

        const { container } = render(
          <ThemeProvider theme={theme}>
            <Radio size="small" />
          </ThemeProvider>,
        );

        expect(container.querySelector(`.${classes.sizeSmall}`)).toHaveComputedStyle({
          marginLeft: '-40px',
          paddingRight: '2px',
        });
      },
    );
  });

  it('should pass slotProps.input to the input element', () => {
    render(<Radio slotProps={{ input: { 'aria-label': 'A' } }} />);

    expect(screen.queryByRole('radio', { name: 'A' })).not.to.equal(null);
  });

  describe('prop: disableRipple', () => {
    it('should have a ripple by default', async () => {
      render(<Radio TouchRippleProps={{ className: 'touch-ripple' }} />);

      const radio = screen.getByRole('radio').parentElement;
      await ripple.startTouch(radio);
      expect(radio.querySelector('.touch-ripple')).not.to.equal(null);
    });

    it('should not have a ripple when disableRipple is set', async () => {
      render(<Radio disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />);

      const radio = screen.getByRole('radio').parentElement;
      await ripple.startTouch(radio);
      expect(radio.querySelector('.touch-ripple')).to.equal(null);
    });

    it('should respect a global disableRipple from MuiButtonBase defaultProps', async () => {
      const theme = createTheme({
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      });
      render(
        <ThemeProvider theme={theme}>
          <Radio TouchRippleProps={{ className: 'touch-ripple' }} />
        </ThemeProvider>,
      );

      const radio = screen.getByRole('radio').parentElement;
      await ripple.startTouch(radio);
      expect(radio.querySelector('.touch-ripple')).to.equal(null);
    });

    it('should let an explicit disableRipple={false} override a global disableRipple', async () => {
      const theme = createTheme({
        components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
      });
      render(
        <ThemeProvider theme={theme}>
          <Radio disableRipple={false} TouchRippleProps={{ className: 'touch-ripple' }} />
        </ThemeProvider>,
      );

      const radio = screen.getByRole('radio').parentElement;
      await ripple.startTouch(radio);
      expect(radio.querySelector('.touch-ripple')).not.to.equal(null);
    });
  });

  describe('theme.focusVisible', () => {
    // Radio is an outer-ring exception to the shared ButtonBase rule: it opts the root out of the
    // theme ring and draws it on the icon svg instead, so the ring renders fully. Running both var
    // modes guards the shouldSkipGeneratingVar fix — the recipe stays inline on the svg.
    [false, true].forEach((cssVariables) => {
      it.skipIf(isJsdom())(
        `draws the focus ring on the icon svg, not the ButtonBase root (cssVariables: ${cssVariables})`,
        () => {
          const theme = createTheme({
            cssVariables,
            focusVisible: true,
            components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
          });
          render(
            <ThemeProvider theme={theme}>
              <Radio />
            </ThemeProvider>,
          );
          const input = screen.getByRole('radio');
          simulatePointerDevice();
          focusVisible(input);
          expect(input.parentElement.querySelector('svg')).toHaveComputedStyle({
            outlineStyle: 'solid',
            outlineWidth: '2px',
            outlineOffset: '2px',
          });
          // the shared ButtonBase root ring is off, so there is no double ring
          expect(input.parentElement).toHaveComputedStyle({ outlineStyle: 'none' });
        },
      );
    });
  });
});
