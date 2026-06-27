import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Switch, { switchClasses as classes } from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import describeConformance from '../../test/describeConformance';

describe('<Switch />', () => {
  const { render } = createRenderer();

  function CustomSwitchBase({ centerRipple, focusRipple, ownerState, ...props }) {
    return <div data-testid="custom" {...props} />;
  }

  describeConformance(<Switch />, () => ({
    classes,
    render,
    muiName: 'MuiSwitch',
    testDeepOverrides: [
      { slotName: 'track', slotClassName: classes.track },
      { slotName: 'input', slotClassName: classes.input },
    ],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      track: {
        expectedClassName: classes.track,
      },
      thumb: {
        expectedClassName: classes.thumb,
      },
      switchBase: {
        expectedClassName: classes.switchBase,
        testWithElement: CustomSwitchBase,
      },
      input: {
        expectedClassName: classes.input,
      },
    },
    refInstanceof: window.HTMLSpanElement,
    skip: [
      'componentProp',
      'themeDefaultProps',
      'themeVariants',
      // Props are spread to the root's child but className is added to the root
      // We cannot use the standard mergeClassName test which relies on data-testid on the root
      // We should fix this when refactoring with Base UI
      'mergeClassName',
    ],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
    });
  });

  it.skipIf(isJsdom())('disables CSS transitions when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Switch />
      </ThemeProvider>,
    );

    expect(container.querySelector(`.${classes.switchBase}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
    expect(container.querySelector(`.${classes.track}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
  });

  it('should render an .thumb element inside the .switchBase element', () => {
    const { container } = render(
      <Switch classes={{ thumb: 'thumb', switchBase: 'switch-base' }} />,
    );

    expect(container.querySelector('.switch-base .thumb')).not.to.equal(null);
  });

  it('should render the track as the 2nd child', () => {
    const {
      container: { firstChild: root },
    } = render(<Switch />);

    expect(root.childNodes[1]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[1]).to.have.class(classes.track);
  });

  it('renders a `role="switch"` with the Unchecked state by default', () => {
    render(<Switch />);

    expect(screen.getByRole('switch')).to.have.property('checked', false);
  });

  it('preserves `role="switch"` when input slotProps are provided as an object', () => {
    render(<Switch slotProps={{ input: { 'aria-label': 'Dark mode' } }} />);

    expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
  });

  it('preserves `role="switch"` when input slotProps are provided as a function', () => {
    render(<Switch slotProps={{ input: () => ({ 'aria-label': 'Dark mode' }) }} />);

    expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
  });

  it('renders a switch with the Checked state when checked', () => {
    render(<Switch defaultChecked />);

    expect(screen.getByRole('switch')).to.have.property('checked', true);
  });

  it('the switch can be disabled', () => {
    render(<Switch disabled />);

    expect(screen.getByRole('switch')).to.have.property('disabled', true);
  });

  it('the switch can be readonly', () => {
    render(<Switch readOnly />);

    expect(screen.getByRole('switch')).to.have.property('readOnly', true);
  });

  it('renders a custom icon when provided', () => {
    render(<Switch icon={<span data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeVisible();
  });

  it('renders a custom checked icon when provided', () => {
    render(<Switch defaultChecked checkedIcon={<span data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeVisible();
  });

  it('the Checked state changes after change events', () => {
    render(<Switch defaultChecked />);

    // how a user would trigger it
    act(() => {
      screen.getByRole('switch').click();
    });
    fireEvent.change(screen.getByRole('switch'), { target: { checked: '' } });

    expect(screen.getByRole('switch')).to.have.property('checked', false);
  });

  it('should not show warnings when custom `type` is provided', () => {
    expect(() => render(<Switch type="submit" />)).not.toErrorDev();
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        render(
          <FormControl>
            <Switch />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl>
            <Switch disabled />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        render(
          <FormControl disabled>
            <Switch />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        render(
          <FormControl disabled>
            <Switch disabled={false} />
          </FormControl>,
        );

        expect(screen.getByRole('switch')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('mergeClassName', () => {
    it('should merge the className', () => {
      const { container } = render(<Switch className="test-class-name" />);

      expect(container.firstChild).to.have.class('test-class-name');
    });
  });

  // Deterministic checks for the WCAG success criteria the report rates as
  // automatable. See packages/mui-material/src/Switch/accessibility.md.
  describe('WCAG conformance', () => {
    it('toggles the checked state with the Space key (2.1.1 Keyboard)', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      await act(async () => {
        switchControl.focus();
      });

      await user.keyboard('[Space]');
      expect(switchControl).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);

      await user.keyboard('[Space]');
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(2);
    });

    it('does not trap keyboard focus (2.1.2 No Keyboard Trap)', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">before</button>
          <Switch />
          <button type="button">after</button>
        </React.Fragment>,
      );
      const before = screen.getByRole('button', { name: 'before' });
      const after = screen.getByRole('button', { name: 'after' });
      const switchControl = screen.getByRole('switch');

      before.focus();
      await user.tab();
      expect(document.activeElement).to.equal(switchControl);
      await user.tab();
      expect(document.activeElement).to.equal(after);
      await user.tab({ shift: true });
      expect(document.activeElement).to.equal(switchControl);
    });

    it('is a single tab stop in DOM order (2.4.3 Focus Order)', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">first</button>
          <Switch />
          <button type="button">last</button>
        </React.Fragment>,
      );
      const first = screen.getByRole('button', { name: 'first' });
      const switchControl = screen.getByRole('switch');
      const last = screen.getByRole('button', { name: 'last' });

      first.focus();
      await user.tab();
      expect(document.activeElement).to.equal(switchControl);
      await user.tab();
      expect(document.activeElement).to.equal(last);
    });

    it('activates on the pointer up-event, not the down-event (2.5.2 Pointer Cancellation)', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      // Press without releasing: the down-event must not toggle.
      await user.pointer({ keys: '[MouseLeft>]', target: switchControl });
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // Releasing over the target completes the activation.
      await user.pointer({ keys: '[/MouseLeft]', target: switchControl });
      expect(switchControl).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('exposes an accessible name matching the visible label (2.5.3 Label in Name)', () => {
      render(<FormControlLabel control={<Switch />} label="Dark mode" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('switch', { name: 'Dark mode' })).to.have.property('checked', false);
    });

    it('does not change context or state on focus (3.2.1 On Focus)', async () => {
      const handleChange = spy();
      const { user } = render(<Switch onChange={handleChange} />);
      const switchControl = screen.getByRole('switch');

      await user.tab();

      expect(document.activeElement).to.equal(switchControl);
      expect(switchControl).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);
    });
  });
});
