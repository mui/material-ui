import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  describeConformance,
  describeJoyColorInversion,
} from 'test/utils';
import Link, { linkClasses as classes } from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { ThemeProvider } from '@mui/joy/styles';
import { unstable_capitalize as capitalize } from '@mui/utils';

function focusVisible(element) {
  act(() => {
    element.blur();
    document.dispatchEvent(new window.Event('keydown'));
    element.focus();
  });
}

describe('<Link />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Link href="/" startDecorator="1" endDecorator="1">
      Home
    </Link>,
    () => ({
      classes,
      inheritComponent: 'a',
      render,
      ThemeProvider,
      muiName: 'JoyLink',
      refInstanceof: window.HTMLAnchorElement,
      testVariantProps: { color: 'primary', variant: 'plain' },
      testCustomVariant: true,
      slots: {
        root: { expectedClassName: classes.root },
        startDecorator: { expectedClassName: classes.startDecorator },
        endDecorator: { expectedClassName: classes.endDecorator },
      },
      skip: ['classesRoot', 'componentsProp'],
    }),
  );

  describeJoyColorInversion(<Link href="/" variant="soft" />, { muiName: 'JoyLink', classes });

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

      expect(getByTestId('root')).not.to.have.class(classes.variantPlain);
      expect(getByTestId('root')).not.to.have.class(classes.variantOutlined);
      expect(getByTestId('root')).not.to.have.class(classes.variantSoft);
      expect(getByTestId('root')).not.to.have.class(classes.variantSolid);
    });

    ['plain', 'outlined', 'soft', 'solid'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Link href="/" data-testid="root" variant={variant}>
            Hello World
          </Link>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
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

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <Link href="/" data-testid="root" color={color}>
            Hello World
          </Link>,
        );

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
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

    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'].forEach((level) => {
      it(`should render ${level}`, () => {
        const { getByTestId } = render(
          <Link href="/" data-testid="root" level={level}>
            Hello World
          </Link>,
        );

        expect(getByTestId('root')).to.have.class(classes[level]);
      });
    });
  });

  describe('prop: underline', () => {
    it('hover by default', () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="root">
          Hello World
        </Link>,
      );

      expect(getByTestId('root')).have.class(classes.underlineHover);
    });

    ['none', 'always', 'hover'].forEach((underline) => {
      it(`should render ${underline}`, () => {
        const { getByTestId } = render(
          <Link href="/" data-testid="root" underline={underline}>
            Hello World
          </Link>,
        );

        expect(getByTestId('root')).to.have.class(classes[`underline${capitalize(underline)}`]);
      });
    });
  });

  describe('Typography', () => {
    it('should be a span by default', () => {
      const { container } = render(
        <Link href="/">
          hello <Typography>test</Typography>
        </Link>,
      );
      expect(container.querySelector('span')).to.have.text('test');
    });
  });
});
