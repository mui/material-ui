import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import Link, { linkClasses as classes } from '@mui/material/Link';
import Typography, { typographyClasses } from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

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
    muiName: 'MuiLink',
    refInstanceof: window.HTMLAnchorElement,
    testVariantProps: { color: 'secondary', variant: 'h1' },
    testStateOverrides: { prop: 'underline', value: 'always', styleKey: 'underlineAlways' },
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const { queryByText } = render(<Link href="/">Home</Link>);

    expect(queryByText('Home')).not.to.equal(null);
  });

  it('should pass props to the <Typography> component', () => {
    const { container } = render(
      <Link href="/" variant="body2" classes={{ body2: 'link-body2' }}>
        Test
      </Link>,
    );
    expect(container.firstChild).to.have.class(typographyClasses.body2);
    expect(container.firstChild).not.to.have.class('link-body2');
  });

  it('using sx color as a function should not crash', () => {
    expect(() =>
      render(
        <Link href="/" sx={{ color: (theme) => theme.palette.primary.light }}>
          Test
        </Link>,
      ),
    ).not.to.throw();
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
    it('should add the focusVisible class when focused', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }

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
});
