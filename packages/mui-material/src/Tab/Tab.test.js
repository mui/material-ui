import { expect } from 'chai';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, simulatePointerDevice } from '@mui/internal-test-utils';
import Tab, { tabClasses as classes } from '@mui/material/Tab';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<Tab />', () => {
  const { render } = createRenderer();

  describeConformance(<Tab textColor="inherit" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiTab',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should have a ripple', async () => {
    const { container } = render(<Tab TouchRippleProps={{ className: 'touch-ripple' }} />);
    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', async () => {
    const { container } = render(
      <Tab disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />,
    );

    await ripple.startTouch(container.querySelector('button'));
    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should have a focusRipple', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const { container } = render(
      <Tab TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }} />,
    );
    simulatePointerDevice();

    await ripple.startFocus(container.querySelector('button'));

    expect(container.querySelector('.focus-ripple')).not.to.equal(null);
  });

  it('can disable the focusRipple', async () => {
    const { container } = render(
      <Tab disableFocusRipple TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }} />,
    );
    simulatePointerDevice();

    await ripple.startFocus(container.querySelector('button'));

    expect(container.querySelector('.focus-ripple')).to.equal(null);
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const { getByRole } = render(<Tab selected textColor="secondary" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorSecondary);
      expect(tab).to.have.attribute('aria-selected', 'true');
    });
  });

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const { getByRole } = render(<Tab disabled textColor="secondary" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.disabled);
      expect(tab).to.have.class(classes.textColorSecondary);
    });
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const { getByRole } = render(<Tab onClick={handleClick} />);

      getByRole('tab').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('prop: label', () => {
    it('should render label', () => {
      const { getByRole } = render(<Tab label="foo" />);

      expect(getByRole('tab')).to.have.text('foo');
    });
  });

  describe('prop: wrapped', () => {
    it('should add the wrapped class', () => {
      const { getByRole } = render(<Tab wrapped />);

      expect(getByRole('tab')).to.have.class(classes.wrapped);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const { getByTestId } = render(<Tab icon={<div data-testid="icon" />} />);

      expect(getByTestId('icon')).not.to.equal(null);
    });

    it('should add a classname when passed together with label', () => {
      const { getByRole } = render(<Tab icon={<div className="test-icon" />} label="foo" />);
      const wrapper = getByRole('tab').children[0];
      expect(wrapper).to.have.class(classes.iconWrapper);
      expect(wrapper).to.have.class(classes.icon);
      expect(wrapper).to.have.class('test-icon');
    });

    it('should have bottom margin when passed together with label', () => {
      const { getByRole } = render(<Tab icon={<div />} label="foo" />);
      const wrapper = getByRole('tab').children[0];
      expect(wrapper).toHaveComputedStyle({ marginBottom: '6px' });
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const { getByRole } = render(<Tab selected textColor="inherit" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorInherit);
      expect(tab).to.have.class(classes.root);
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const { getByRole } = render(<Tab fullWidth />);

      expect(getByRole('tab')).to.have.class(classes.fullWidth);
    });
  });

  describe('prop: style', () => {
    it('should be able to override everything', () => {
      const { getByRole } = render(
        <Tab fullWidth style={{ width: '80%', color: 'red', alignText: 'center' }} />,
      );

      const { style } = getByRole('tab');
      expect(style).to.have.property('width', '80%');
      expect(style).to.have.property('color', 'red');
      expect(style).to.have.property('alignText', 'center');
    });
  });

  it('should apply iconWrapper styles from theme', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const theme = createTheme({
      components: {
        MuiTab: {
          styleOverrides: {
            iconWrapper: {
              backgroundColor: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Tab icon={<div>hello</div>} label="icon" />
      </ThemeProvider>,
    );
    const icon = getByRole('tab').querySelector(`.${classes.iconWrapper}`);
    expect(icon).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  it('should apply icon styles from theme', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const theme = createTheme({
      components: {
        MuiTab: {
          styleOverrides: {
            icon: {
              backgroundColor: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Tab icon={<div>hello</div>} label="icon" />
      </ThemeProvider>,
    );
    const icon = getByRole('tab').querySelector(`.${classes.icon}`);
    expect(icon).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  it('icon styles should override iconWrapper styles from theme', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const theme = createTheme({
      components: {
        MuiTab: {
          styleOverrides: {
            iconWrapper: {
              backgroundColor: 'rgb(255, 0, 0)',
            },
            icon: {
              backgroundColor: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Tab icon={<div>hello</div>} label="icon" />
      </ThemeProvider>,
    );
    const icon = getByRole('tab').querySelector(`.${classes.icon}`);
    const iconWrapper = getByRole('tab').querySelector(`.${classes.iconWrapper}`);
    expect(iconWrapper).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
    expect(icon).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });
});
