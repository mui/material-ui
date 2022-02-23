import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, describeConformance } from 'test/utils';
import Typography from '@mui/joy/Typography';
import Link, { linkClasses as classes } from '@mui/joy/Link';
import { ThemeProvider } from '@mui/joy/styles';

function focusVisible(element) {
  act(() => {
    element.blur();
    document.dispatchEvent(new window.Event('keydown'));
    element.focus();
  });
}

describe('<Link />', () => {
  const { render } = createRenderer();

  describeConformance(<Link href="/">Home</Link>, () => ({
    classes,
    inheritComponent: Typography,
    render,
    ThemeProvider,
    muiName: 'MuiLink',
    refInstanceof: window.HTMLAnchorElement,
    testVariantProps: { color: 'primary', variant: 'text' },
    testStateOverrides: { prop: 'underline', value: 'always', styleKey: 'underlineAlways' },
    skip: ['classesRoot', 'componentsProp', 'themeDefaultProps', 'propsSpread'],
  }));

  it('should render children', () => {
    const { queryByText } = render(<Link href="/">Home</Link>);

    expect(queryByText('Home')).not.to.equal(null);
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onBlur', 'onFocus'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const { container } = render(
        <Link href="/" {...handlers}>
          Home
        </Link>,
      );
      const anchor = container.querySelector('a');

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        fireEvent[event](anchor);
        expect(handlers[n].callCount).to.equal(1);
      });
    });
  });

  describe('keyboard focus', () => {
    it('should add the focusVisible class when focused', () => {
      const { container } = render(<Link href="/">Home</Link>);
      const anchor = container.querySelector('a');

      expect(anchor).not.to.have.class(classes.focusVisible);

      focusVisible(anchor);

      expect(anchor).to.have.class(classes.focusVisible);

      act(() => {
        anchor.blur();
      });

      expect(anchor).not.to.have.class(classes.focusVisible);
    });
  });

  describe('prop: variant', () => {
    it('undefined by default', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).not.to.have.class(classes.variantText);
      expect(getByTestId('root')).not.to.have.class(classes.variantOutlined);
      expect(getByTestId('root')).not.to.have.class(classes.variantLight);
      expect(getByTestId('root')).not.to.have.class(classes.variantContained);
    });

    it('adds a text class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" variant="text">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantText);
    });

    it('adds a outlined class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" variant="outlined">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantOutlined);
    });

    it('adds a light class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" variant="light">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantLight);
    });

    it('adds a contained class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" variant="contained">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantContained);
    });
  });

  describe('prop: color', () => {
    it('adds a primary class by default', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
    });

    it('adds a primary class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="primary">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorPrimary);
    });

    it('adds a neutral class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="neutral">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    it('adds a info class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="info">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorInfo);
    });

    it('adds a success class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="success">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorSuccess);
    });

    it('adds a warning class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="warning">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorWarning);
    });

    it('adds a danger class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" color="danger">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorDanger);
    });
  });

  describe('prop: level', () => {
    it('body1 by default', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).have.class(classes.body1);
    });

    it('adds a body2 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="body2">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.body2);
    });

    it('adds a body3 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="body3">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.body3);
    });

    it('adds a h1 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h1">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h1);
    });

    it('adds a h2 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h2">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h2);
    });

    it('adds a h3 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h3">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h3);
    });

    it('adds a h4 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h4">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h4);
    });

    it('adds a h5 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h5">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h5);
    });

    it('adds a h6 class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" level="h6">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).to.have.class(classes.h6);
    });
  });

  describe('prop: underline', () => {
    it('always by default', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).have.class(classes.underlineAlways);
    });

    it('adds a none class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" underline="none">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).have.class(classes.underlineNone);
    });

    it('adds a hover class', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root" underline="hover">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).have.class(classes.underlineHover);
    });
  });
});
