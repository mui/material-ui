import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Radio, { radioClasses as classes } from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Radio />', () => {
  const { render } = createRenderer();

  describeConformance(<Radio />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiRadio',
    testVariantProps: { color: 'secondary' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
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
      const { getAllByTestId } = render(<Radio />);
      expect(getAllByTestId('RadioButtonUncheckedIcon').length).to.equal(1);
    });
  });

  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      const { getAllByTestId } = render(<Radio checked />);
      expect(getAllByTestId('RadioButtonCheckedIcon').length).to.equal(1);
    });
  });

  describe('prop: size', () => {
    it('add sizeSmall class to the root element when the size prop equals "small"', () => {
      const { getByRole } = render(<Radio size="small" />);
      const radio = getByRole('radio');
      const root = radio.parentElement;
      expect(root).to.have.class(classes.sizeSmall);
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByRole } = render(
          <FormControl>
            <Radio />
          </FormControl>,
        );

        expect(getByRole('radio')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl>
            <Radio disabled />
          </FormControl>,
        );

        expect(getByRole('radio')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Radio />
          </FormControl>,
        );

        expect(getByRole('radio')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Radio disabled={false} />
          </FormControl>,
        );

        expect(getByRole('radio')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('theme: customization', () => {
    it('should be customizable in the theme using the size prop.', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

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
    });
  });
});
