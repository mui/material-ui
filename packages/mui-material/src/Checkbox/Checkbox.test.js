import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  screen,
  isJsdom,
  simulatePointerDevice,
  focusVisible,
} from '@mui/internal-test-utils';
import Checkbox, { checkboxClasses as classes } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Checkbox />', () => {
  const { render } = createRenderer();

  function CustomRoot({ checkedIcon, ownerState, disableRipple, slots, slotProps, ...props }) {
    return <div {...props} />;
  }

  describeConformance(<Checkbox checked />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCheckbox',
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
    refInstanceof: window.HTMLSpanElement,
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: CustomRoot,
      },
      input: {
        expectedClassName: classes.input,
      },
    },
    skip: ['componentProp', 'rootClass'],
  }));

  it('should have the classes required for Checkbox', () => {
    expect(typeof classes.root).to.equal('string');
    expect(typeof classes.checked).to.equal('string');
    expect(typeof classes.disabled).to.equal('string');
  });

  it('renders an unchecked `checkbox` by default', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders an checked `checkbox` when `checked={true}`', () => {
    render(<Checkbox checked />);

    expect(screen.getByRole('checkbox')).to.have.property('checked', true);
  });

  it('flips the checked property when clicked and calls onchange with the checked state', () => {
    const handleChange = spy();
    render(<Checkbox onChange={handleChange} />);

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(screen.getByRole('checkbox')).to.have.property('checked', true);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.getCall(0).args[0].target).to.have.property('checked', true);

    act(() => {
      screen.getByRole('checkbox').click();
    });

    expect(screen.getByRole('checkbox')).to.have.property('checked', false);
    expect(handleChange.callCount).to.equal(2);
    expect(handleChange.getCall(1).args[0].target).to.have.property('checked', false);
  });

  describe('prop: readOnly', () => {
    it('prevents interaction', async () => {
      const changeSpy = spy();
      const { user } = render(<Checkbox readOnly defaultChecked onChange={changeSpy} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).to.have.attribute('readonly');
      expect(checkbox).to.have.attribute('checked');
      await user.click(checkbox);
      expect(checkbox).to.have.attribute('checked');
      expect(changeSpy.callCount).to.equal(0);
    });
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByTestId('IndeterminateCheckBoxIcon')).not.to.equal(null);
    });

    it('should set aria-checked to mixed', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByRole('checkbox')).to.have.attribute('aria-checked', 'mixed');
    });

    it('should set aria-checked to mixed even when checked', () => {
      render(<Checkbox indeterminate checked />);
      expect(screen.getByRole('checkbox')).to.have.attribute('aria-checked', 'mixed');
    });

    it('should not set aria-checked when not indeterminate', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).not.to.have.attribute('aria-checked');
    });
  });

  describe('prop: size', () => {
    it('add sizeSmall class to the root element when the size prop equals "small"', () => {
      render(<Checkbox size="small" />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeSmall);
    });

    it('add sizeMedium class to the root element when the size prop equals "medium"', () => {
      render(<Checkbox size="medium" />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });

    it('add sizeMedium class to the root element when the size is not expplicitly provided', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });
  });

  describe('theme: customization', () => {
    it.skipIf(isJsdom())(
      'should be customizable in the theme using the size prop.',
      function test() {
        const theme = createTheme({
          components: {
            MuiCheckbox: {
              styleOverrides: {
                sizeMedium: {
                  marginTop: 40,
                  paddingLeft: 20,
                },
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
            <Checkbox />
            <Checkbox size="small" />
          </ThemeProvider>,
        );

        expect(container.querySelector(`.${classes.sizeMedium}`)).toHaveComputedStyle({
          marginTop: '40px',
          paddingLeft: '20px',
        });

        expect(container.querySelector(`.${classes.sizeSmall}`)).toHaveComputedStyle({
          marginLeft: '-40px',
          paddingRight: '2px',
        });
      },
    );
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <Checkbox />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <Checkbox disabled />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <Checkbox />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <Checkbox disabled={false} />
          </FormControl>,
        );

        expect(screen.getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });

  it('should allow custom icon font sizes', () => {
    const fontSizeSpy = spy();
    function MyIcon(props) {
      const { fontSize, ...other } = props;

      React.useEffect(() => {
        fontSizeSpy(fontSize);
      });

      return <div {...other} />;
    }
    render(<Checkbox icon={<MyIcon fontSize="foo" />} />);

    expect(fontSizeSpy.args[0][0]).to.equal('foo');
  });

  it('should have a ripple', async () => {
    render(<Checkbox TouchRippleProps={{ className: 'touch-ripple' }} />);
    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('should not have ripple', async () => {
    render(<Checkbox disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />);

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should respect a global disableRipple from MuiButtonBase defaultProps', async () => {
    const theme = createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    });
    render(
      <ThemeProvider theme={theme}>
        <Checkbox TouchRippleProps={{ className: 'touch-ripple' }} />
      </ThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should let an explicit disableRipple={false} override a global disableRipple', async () => {
    const theme = createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    });
    render(
      <ThemeProvider theme={theme}>
        <Checkbox disableRipple={false} TouchRippleProps={{ className: 'touch-ripple' }} />
      </ThemeProvider>,
    );

    const checkbox = screen.getByRole('checkbox').parentElement;
    await ripple.startTouch(checkbox);
    expect(checkbox.querySelector('.touch-ripple')).not.to.equal(null);
  });

  describe('theme.focusVisible', () => {
    // Checkbox is an outer-ring exception to the shared ButtonBase rule: it opts the root out of
    // the theme ring and draws it on the icon svg instead, so the ring renders fully. Running both
    // var modes guards the shouldSkipGeneratingVar fix — the recipe stays inline on the svg.
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
              <Checkbox />
            </ThemeProvider>,
          );
          const input = screen.getByRole('checkbox');
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
