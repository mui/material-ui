import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import useThemeProps from './useThemeProps';
import ThemeProvider from './ThemeProvider';
import { useVariantOverride, VariantOverrideProvider } from './VariantOverride';

const Parent = ({ children, variant, enableVariantOverride }) => (
  <VariantOverrideProvider variant={enableVariantOverride ? variant : undefined}>
    {children}
  </VariantOverrideProvider>
);

const Child = (inProps) => {
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const props = useThemeProps({ name: 'Child', props: inProps });
  const { getColor } = useVariantOverride(props.variant);
  const finalColor = getColor(inProps.color, props.color, 'default');
  return finalColor;
};

describe('VariantOverride', () => {
  const { render } = createRenderer();

  it('use the default color if no provider', () => {
    const { container } = render(<Child variant="text" />);
    expect(container.firstChild).to.have.text('default');
  });

  it('use the default color if not enable', () => {
    const { container } = render(
      <Parent variant="contained" enableVariantOverride={false}>
        <Child variant="text" />
      </Parent>,
    );
    expect(container.firstChild).to.have.text('default');
  });

  describe('variant override enabled', () => {
    it('use instance color if provided', () => {
      const { container } = render(
        <Parent variant="contained" enableVariantOverride>
          <Child variant="text" color="primary" />
        </Parent>,
      );
      expect(container.firstChild).to.have.text('primary');
    });

    describe('parent variant override', () => {
      it('contained', () => {
        const { container } = render(
          <Parent variant="contained" enableVariantOverride>
            <Child variant="text" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
      });

      it('light', () => {
        const { container } = render(
          <Parent variant="light" enableVariantOverride>
            <Child variant="text" />
          </Parent>,
        );
        expect(container.firstChild).to.have.text('context');
      });

      it('other variant should display error', () => {
        expect(() => {
          render(
            <Parent variant="outlined" enableVariantOverride>
              <Child variant="text" />
            </Parent>,
          );
        }).toErrorDev(
          'MUI: Variant override feature does not support "outlined" variant. Please use either "contained", or "light" instead.',
        );
      });

      it('light variant has no affect on contained child', () => {
        const { container } = render(
          <Parent variant="light" enableVariantOverride>
            <Child variant="contained" />
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
          <Parent variant="contained" enableVariantOverride>
            <Child variant="text" />
          </Parent>
        </ThemeProvider>,
      );
      expect(container.firstChild).to.have.text('context');
    });
  });
});
