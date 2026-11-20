import { describe, it, expect } from 'vitest';
import { __unsafe_useEmotionCache } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createRenderer } from '@mui/internal-test-utils';

describe('[Emotion] StyledEngineProvider', () => {
  const { render } = createRenderer();

  it('keeps the Emotion cache of its parent', () => {
    let outerCache;
    let innerCache;
    function Outer() {
      outerCache = __unsafe_useEmotionCache();
      return (
        <StyledEngineProvider>
          <Inner />
        </StyledEngineProvider>
      );
    }
    function Inner() {
      innerCache = __unsafe_useEmotionCache();
      return null;
    }
    render(<Outer />);
    expect(innerCache).to.equal(outerCache);
  });

  it('warns when the removed enableCssLayer prop is passed', () => {
    const props = { enableCssLayer: true } as {};
    expect(() => {
      render(<StyledEngineProvider {...props} />);
    }).toErrorDev('MUI: The `enableCssLayer` prop of `StyledEngineProvider` was removed in v10.');
  });

  it('warns when the removed injectFirst prop is passed', () => {
    const props = { injectFirst: true } as {};
    expect(() => {
      render(<StyledEngineProvider {...props} />);
    }).toErrorDev('MUI: The `injectFirst` prop of `StyledEngineProvider` was removed in v10.');
  });
});
