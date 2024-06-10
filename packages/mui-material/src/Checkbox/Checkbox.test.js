import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer } from '@mui/internal-test-utils';
import Checkbox, { checkboxClasses as classes } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Checkbox />', () => {
  const { render } = createRenderer();

  describeConformance(<Checkbox checked />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiCheckbox',
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'rootClass'],
  }));

  it('should have the classes required for Checkbox', () => {
    expect(typeof classes.root).to.equal('string');
    expect(typeof classes.checked).to.equal('string');
    expect(typeof classes.disabled).to.equal('string');
  });

  it('renders an unchecked `checkbox` by default', () => {
    const { getByRole } = render(<Checkbox />);

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders an checked `checkbox` when `checked={true}`', () => {
    const { getByRole } = render(<Checkbox checked />);

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  it('flips the checked property when clicked and calls onchange with the checked state', () => {
    const handleChange = spy();
    const { getByRole } = render(<Checkbox onChange={handleChange} />);

    act(() => {
      getByRole('checkbox').click();
    });

    expect(getByRole('checkbox')).to.have.property('checked', true);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.getCall(0).args[0].target).to.have.property('checked', true);

    act(() => {
      getByRole('checkbox').click();
    });

    expect(getByRole('checkbox')).to.have.property('checked', false);
    expect(handleChange.callCount).to.equal(2);
    expect(handleChange.getCall(1).args[0].target).to.have.property('checked', false);
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const { getByTestId } = render(<Checkbox indeterminate />);
      expect(getByTestId('IndeterminateCheckBoxIcon')).not.to.equal(null);
    });
  });

  describe('prop: size', () => {
    it('add sizeSmall class to the root element when the size prop equals "small"', () => {
      const { getByRole } = render(<Checkbox size="small" />);
      const checkbox = getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeSmall);
    });

    it('add sizeMedium class to the root element when the size prop equals "medium"', () => {
      const { getByRole } = render(<Checkbox size="medium" />);
      const checkbox = getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });

    it('add sizeMedium class to the root element when the size is not expplicitly provided', () => {
      const { getByRole } = render(<Checkbox />);
      const checkbox = getByRole('checkbox');
      const root = checkbox.parentElement;

      expect(root).to.have.class(classes.sizeMedium);
    });
  });

  describe('theme: customization', () => {
    it('should be customizable in the theme using the size prop.', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
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
        const { getByRole } = render(
          <FormControl>
            <Checkbox />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl>
            <Checkbox disabled />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Checkbox />
          </FormControl>,
        );

        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Checkbox disabled={false} />
          </FormControl>,
        );

        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
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
});
