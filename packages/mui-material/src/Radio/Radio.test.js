import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import Radio, { radioClasses as classes } from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import switchBaseClasses from '../internal/switchBaseClasses';
import describeConformance from '../../test/describeConformance';

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

  describe('WCAG 2.2 conformance', () => {
    it('2.1.1 Keyboard: Space selects the focused radio', async () => {
      const handleChange = spy();
      const { user } = render(<Radio value="a" onChange={handleChange} />);
      const radio = screen.getByRole('radio');

      await act(async () => {
        radio.focus();
      });

      await user.keyboard('[Space]');
      expect(radio).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.1.2 No Keyboard Trap: keyboard focus can enter and leave the radio', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">before</button>
          <Radio value="a" />
          <button type="button">after</button>
        </React.Fragment>,
      );
      const before = screen.getByRole('button', { name: 'before' });
      const after = screen.getByRole('button', { name: 'after' });
      const radio = screen.getByRole('radio');

      before.focus();
      await user.tab();
      expect(document.activeElement).to.equal(radio);
      await user.tab();
      expect(document.activeElement).to.equal(after);
      await user.tab({ shift: true });
      expect(document.activeElement).to.equal(radio);
    });

    it('2.4.3 Focus Order: is a single tab stop in DOM order', async () => {
      const { user } = render(
        <React.Fragment>
          <button type="button">first</button>
          <Radio value="a" />
          <button type="button">last</button>
        </React.Fragment>,
      );
      const first = screen.getByRole('button', { name: 'first' });
      const radio = screen.getByRole('radio');
      const last = screen.getByRole('button', { name: 'last' });

      first.focus();
      await user.tab();
      expect(document.activeElement).to.equal(radio);
      await user.tab();
      expect(document.activeElement).to.equal(last);
    });

    it('2.5.2 Pointer Cancellation: activates on the pointer up-event, not the down-event', async () => {
      const handleChange = spy();
      const { user } = render(<Radio value="a" onChange={handleChange} />);
      const radio = screen.getByRole('radio');

      // Press without releasing: the down-event must not select.
      await user.pointer({ keys: '[MouseLeft>]', target: radio });
      expect(radio).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);

      // Releasing over the target completes the activation.
      await user.pointer({ keys: '[/MouseLeft]', target: radio });
      expect(radio).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });

    it('2.5.3 Label in Name: the accessible name matches the visible label', () => {
      render(<FormControlLabel control={<Radio />} label="Express delivery" />);
      // getByRole with `name` only resolves if the accessible name matches the visible label.
      expect(screen.getByRole('radio', { name: 'Express delivery' })).to.have.property(
        'checked',
        false,
      );
    });

    it('3.2.1 On Focus: moving focus to the radio changes no context or state', async () => {
      const handleChange = spy();
      const { user } = render(<Radio value="a" onChange={handleChange} />);
      const radio = screen.getByRole('radio');

      await user.tab();

      expect(document.activeElement).to.equal(radio);
      expect(radio).to.have.property('checked', false);
      expect(handleChange.callCount).to.equal(0);
    });

    it('3.2.2 On Input: selecting changes only the value and fires onChange', async () => {
      const handleChange = spy();
      const { user } = render(<Radio value="a" onChange={handleChange} />);
      const radio = screen.getByRole('radio');

      await user.click(radio);

      expect(radio).to.have.property('checked', true);
      expect(handleChange.callCount).to.equal(1);
    });
  });
});
