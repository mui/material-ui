import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createRenderer } from 'test/utils';
import createStyled, { getShouldForwardProp } from './createStyled';

describe('createStyled', () => {
  const { render } = createRenderer();

  describe('getShouldForwardProp', () => {
    describe('without custom shouldForwardProp', () => {
      it('does not forward mui props', () => {
        const shouldForwardProp = getShouldForwardProp();
        expect(shouldForwardProp('theme')).to.equal(false);
        expect(shouldForwardProp('ownerState')).to.equal(false);
        expect(shouldForwardProp('sx')).to.equal(false);
        expect(shouldForwardProp('as')).to.equal(false);

        expect(shouldForwardProp('id')).to.equal(true);
      });

      it('does not forward invalid html props & mui props if tag is string & no slot is provided', () => {
        const shouldForwardProp = getShouldForwardProp({
          tag: 'a',
        });

        expect(shouldForwardProp('id')).to.equal(true);

        expect(shouldForwardProp('foo')).to.equal(false);
        expect(shouldForwardProp('sx')).to.equal(false);
        expect(shouldForwardProp('as')).to.equal(false);
      });

      it('use rootShouldForwardProp if slot is "Root"', () => {
        const shouldForwardProp = getShouldForwardProp({
          slot: 'Root',
          rootShouldForwardProp: (prop) => prop !== 'foo',
        });

        expect(shouldForwardProp('id')).to.equal(true);
        expect(shouldForwardProp('foo')).to.equal(false);
      });

      it('use slot if slot exists but is not "Root"', () => {
        const shouldForwardProp = getShouldForwardProp({
          slot: 'Something',
          rootShouldForwardProp: (prop) => prop !== 'foo',
          slotShouldForwardProp: (prop) => prop !== 'bar',
        });

        expect(shouldForwardProp('id')).to.equal(true);
        expect(shouldForwardProp('foo')).to.equal(true);
        expect(shouldForwardProp('bar')).to.equal(false);
      });
    });

    describe('with custom shouldForwardProp', () => {
      it('forward mui props', () => {
        const shouldForwardProp = getShouldForwardProp({
          shouldForwardProp: (prop) => prop !== 'foo',
        });
        expect(shouldForwardProp('theme')).to.equal(true);
        expect(shouldForwardProp('ownerState')).to.equal(true);
        expect(shouldForwardProp('sx')).to.equal(true);
        expect(shouldForwardProp('as')).to.equal(true);
        expect(shouldForwardProp('id')).to.equal(true);

        expect(shouldForwardProp('foo')).to.equal(false);
      });
    });
  });

  describe('displayName', () => {
    // These tests rely on implementation details (namely `displayName`)
    // Ideally we'd just test if the proper name appears in a React warning.
    // But React warnings are deduplicated during module lifetime.
    // We would need to reset modules to make the tests work in watchmode.
    before(function beforeHook() {
      // display names are dev-only
      if (process.env.NODE_ENV === 'production') {
        this.skip();
      }
    });

    it('uses the `componentName` if set', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div', { name: 'SomeMuiComponent' })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'SomeMuiComponent');
    });

    it('falls back to the decorated tag name', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div')({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(div)');
    });

    it('falls back to the decorated computed displayName', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(function SomeMuiComponent() {
        return null;
      })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(SomeMuiComponent)');
    });

    it('has a fallback name if the display name cannot be computed', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(() => null)({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(Component)');
    });

    it('does not forward invalid props to DOM', () => {
      const styled = createStyled({});
      const Anchor = styled('a')({});

      const { container } = render(
        <Anchor href="/" color="red" shouldBeRemoved data-foo="bar">
          Link
        </Anchor>,
      );
      expect(container.firstChild).to.have.property('href', '/');
      expect(container.firstChild.getAttribute('data-foo')).to.equal('bar');
      expect(container.firstChild.getAttribute('color')).to.equal('red'); // color is for Safari mask-icon link
      expect(container.firstChild.getAttribute('shouldBeRemoved')).not.to.equal('true');
    });
  });

  describe('styles', () => {
    it('styles of pseudo classes of variants are merged', () => {
      const theme = createTheme({
        components: {
          MuiButton: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  '&.Mui-disabled': {
                    width: '300px',
                  },
                },
              },
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  '&.Mui-disabled': {
                    height: '200px',
                  },
                },
              },
            ],
          },
        },
      });
      const styled = createStyled({});
      const Button = styled('button', {
        shouldForwardProp: (prop) => prop !== 'color' && prop !== 'contained',
        name: 'MuiButton',
        slot: 'Root',
        overridesResolver: (props, styles) => styles.root,
      })({
        display: 'flex',
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Button color="primary" variant="contained" className="Mui-disabled">
            Hello
          </Button>
        </ThemeProvider>,
      );

      expect(container.getElementsByTagName('button')[0]).toHaveComputedStyle({
        width: '300px',
        height: '200px',
      });
    });
  });
});
