import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
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
    skip: ['componentProp', 'componentsProp', 'rootClass'],
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

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByTestId('IndeterminateCheckBoxIcon')).not.to.equal(null);
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

  describe('prop: error', () => {
    it('adds the error class to the root element when `error` is true', () => {
      render(<Checkbox error />);
      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class('Mui-error');
    });

    it('adds the error class when provided by FormControl context', () => {
      render(
        <FormControl error>
          <Checkbox />
        </FormControl>,
      );

      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class('Mui-error');
    });

    it('allows the `error` prop to override FormControl context', () => {
      render(
        <FormControl error>
          <Checkbox error={false} />
        </FormControl>,
      );

      const checkbox = screen.getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).not.to.have.class('Mui-error');
    });
  });

  describe('theme: customization', () => {
    it('should be customizable in the theme using the size prop.', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }

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
    });
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
});
