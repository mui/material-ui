import * as React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { createRenderer } from 'test/utils';
import useThemeProps from './useThemeProps';
import ThemeProvider from './ThemeProvider';
import ColorInversion, { useColorInversion } from './ColorInversion';
import { createSolidInversion } from './variantUtils';

const OVERRIDABLE_VARIANT = ['plain', 'outlined', 'soft', 'solid'];

function Parent({ children, invertedColors }) {
  return (
    <ColorInversion.Provider value={invertedColors ? OVERRIDABLE_VARIANT : undefined}>
      {children}
    </ColorInversion.Provider>
  );
}

const Child = (inProps) => {
  const props = useThemeProps({ name: 'Child', props: inProps });
  const { getColor } = useColorInversion(props.variant);
  const finalColor = getColor(inProps.color, props.color || 'default');
  return finalColor;
};

describe('ColorInversion', () => {
  const { render } = createRenderer();

  it('createSolidInversion automatically create solid override if the variable is in the correct format', () => {
    const result = createSolidInversion({
      cssVarPrefix: 'foo',
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
        '--variant-plainColor': 'var(--foo-palette-primary-50)',
      },
      secondary: {
        '--variant-softBg': 'rgba(var(--foo-palette-secondary-lightChannel) / 0.24)',
      },
      alternate: {
        '--variant-solidBg': 'var(--foo-palette-common-white)',
      },
    });
  });

  it('use the default color if no provider', () => {
    const { container } = render(<Child variant="plain" />);
    expect(container.firstChild).to.have.text('default');
  });

  it('use the default color if not enable', () => {
    const { container } = render(
      <Parent variant="solid" invertedColors={false}>
        <Child variant="plain" />
      </Parent>,
    );
    expect(container.firstChild).to.have.text('default');
  });

  describe('variant override enabled', () => {
    it('use instance color if provided', () => {
      const { container } = render(
        <Parent variant="solid" invertedColors>
          <Child variant="plain" color="primary" />
        </Parent>,
      );
      expect(container.firstChild).to.have.text('primary');
    });

    describe('parent variant override', () => {
      it('solid', () => {
        const { container } = render(
          <Parent variant="solid" invertedColors>
            <Child variant="plain" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
      });

      it('soft', () => {
        const { container } = render(
          <Parent variant="soft" invertedColors>
            <Child variant="plain" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
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
          <Parent variant="solid" invertedColors>
            <Child variant="plain" />
          </Parent>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.text('context');
    });
  });
});
