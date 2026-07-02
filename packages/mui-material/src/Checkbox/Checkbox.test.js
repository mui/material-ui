import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import Checkbox, { checkboxClasses as classes } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  // Deterministic checks for the WCAG success criteria the report rates as
  // automatable. See packages/mui-material/src/Checkbox/accessibility.md.
  describe('WCAG 2.2 conformance', () => {
    it('2.1.1 Keyboard: toggles the checked state with the Space key', async () => {
      const handleChange = spy();
      const { user } = render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.keyboard('[Space]');
      expect(checkbox).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);

      await user.keyboard('[Space]');
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(2);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the checkbox', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">before</button>
          <Checkbox />
          <button type="button">after</button>
        </React.Fragment>,
      );
      const checkbox = screen.getByRole('checkbox');

      await user.tab();
      expect(screen.getByRole('button', { name: 'before' })).toHaveFocus();

      await user.tab();
      expect(checkbox).toHaveFocus();

      // Tab moves focus back out of the checkbox; it is never captured.
      await user.tab();
      expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();

      // Shift+Tab moves back onto it.
      await user.tab({ shift: true });
      expect(checkbox).toHaveFocus();
    });

    describe('2.4.3 Focus Order', () => {
      it('is a single tab stop in natural DOM order with no positive tabIndex', async () => {
        const { user } = render(
          <React.Fragment>
            <button type="button">first</button>
            <Checkbox />
            <button type="button">last</button>
          </React.Fragment>,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).to.have.property('tabIndex', 0);

        await user.tab();
        expect(screen.getByRole('button', { name: 'first' })).toHaveFocus();
        await user.tab();
        expect(checkbox).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'last' })).toHaveFocus();
      });

      it('removes a disabled checkbox from the tab order', async () => {
        const { user } = render(
          <React.Fragment>
            <Checkbox disabled />
            <button type="button">after</button>
          </React.Fragment>,
        );

        // Tab skips the disabled checkbox and lands on the next control.
        await user.tab();
        expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
      });
    });

    it('2.5.2 Pointer Cancellation: activates on click, but not when released off the target', async () => {
      const handleChange = spy();
      const { user } = render(
        <React.Fragment>
          <Checkbox onChange={handleChange} />
          <div data-testid="outside" />
        </React.Fragment>,
      );
      const checkbox = screen.getByRole('checkbox');

      // Press on the checkbox, move away, then release: nothing runs on the down
      // event, and releasing off the target cancels the activation.
      await user.pointer([
        { keys: '[MouseLeft>]', target: checkbox },
        { target: screen.getByTestId('outside') },
        { keys: '[/MouseLeft]' },
      ]);
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // A full click (press and release over the target) activates.
      await user.click(checkbox);
      expect(checkbox).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: exposes an accessible name matching the visible label', () => {
      render(<FormControlLabel control={<Checkbox />} label="Remember me" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('checkbox', { name: 'Remember me' })).to.have.property(
        'checked',
        false,
      );
    });

    it('3.2.1 On Focus: moving keyboard focus to the checkbox does not activate it', async () => {
      const handleChange = spy();
      const { user } = render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.tab();

      expect(checkbox).toHaveFocus();
      expect(checkbox).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);
    });
  });
});
