import * as React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { createRenderer } from 'test/utils';
import useThemeProps from './useThemeProps';
import ThemeProvider from './ThemeProvider';
import VariantOverride, { useVariantOverride, createSolidOverride } from './VariantOverride';

const Parent = ({ children, variant, enableVariantOverride }) => (
  <VariantOverride.Provider value={enableVariantOverride ? variant : undefined}>
    {children}
  </VariantOverride.Provider>
);

const Child = (inProps) => {
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const props = useThemeProps({ name: 'Child', props: inProps });
  const { getColor } = useVariantOverride(props.variant);
  const finalColor = getColor(inProps.color, props.color || 'default');
  return finalColor;
};

describe('VariantOverride', () => {
  const { render } = createRenderer();

  it('createSolidOverride automatically create solid override if the variable is in the correct format', () => {
    const result = createSolidOverride({
      prefix: 'foo',
      palette: {
        primary: {
          plainColor: '',
        },
        secondary: {
          softBg: '',
        },
        alternate: {
          solidBg: '',
        },
      },
    });
    // partially check the result
    sinon.assert.match(result, {
      primary: {
        '--foo-palette-text-primary': '#fff',
        '--variant-plainColor': 'var(--foo-palette-primary-50)',
      },
      secondary: {
        '--foo-palette-text-secondary': 'var(--foo-palette-secondary-100)',
        '--variant-softBg': 'var(--foo-palette-secondary-700)',
      },
      alternate: {
        '--foo-palette-text-tertiary': 'var(--foo-palette-alternate-200)',
        '--variant-solidBg': 'var(--foo-palette-alternate-50, rgba(0 0 0 / 0.16))',
      },
    });
  });

  it('use the default color if no provider', () => {
    const { container } = render(<Child variant="plain" />);
    expect(container.firstChild).to.have.text('default');
  });

  it('use the default color if not enable', () => {
    const { container } = render(
      <Parent variant="solid" enableVariantOverride={false}>
        <Child variant="plain" />
      </Parent>,
    );
    expect(container.firstChild).to.have.text('default');
  });

  describe('variant override enabled', () => {
    it('use instance color if provided', () => {
      const { container } = render(
        <Parent variant="solid" enableVariantOverride>
          <Child variant="plain" color="primary" />
        </Parent>,
      );
      expect(container.firstChild).to.have.text('primary');
    });

    describe('parent variant override', () => {
      it('solid', () => {
        const { container } = render(
          <Parent variant="solid" enableVariantOverride>
            <Child variant="plain" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
      });

      it('soft', () => {
        const { container } = render(
          <Parent variant="soft" enableVariantOverride>
            <Child variant="plain" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
      });

      it('soft variant has no affect on solid child', () => {
        const { container } = render(
          <Parent variant="soft" enableVariantOverride>
            <Child variant="solid" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('default');
      });
    });
  });

  describe('theme default props configured', () => {
    it('use the theme color if no provider', () => {
      const { container } = render(
        <ThemeProvider theme={{ components: { Child: { defaultProps: { color: 'primary' } } } }}>
          <Child />
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.text('primary');
    });

    it('use "context" color even though theme default props is configured', () => {
      const { container } = render(
        <ThemeProvider theme={{ components: { Child: { defaultProps: { color: 'primary' } } } }}>
          <Parent variant="solid" enableVariantOverride>
            <Child variant="plain" />
          </Parent>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.text('context');
    });
  });
});
