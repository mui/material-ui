import { describe, it, expect } from 'vitest';
import { __unsafe_useEmotionCache } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine';
import { createRenderer } from '@mui/internal-test-utils';

describe('[Emotion] StyledEngineProvider', () => {
  const { render } = createRenderer();

  it('should reuse the same cache', () => {
    let upperCache;
    let innerCache;
    function Upper() {
      const cache = __unsafe_useEmotionCache();
      upperCache = cache;
      return (
        <StyledEngineProvider injectFirst>
          <Inner />
        </StyledEngineProvider>
      );
    }
    function Inner() {
      const cache = __unsafe_useEmotionCache();
      innerCache = cache;
      return null;
    }
    render(
      <StyledEngineProvider injectFirst>
        <Upper />
      </StyledEngineProvider>,
    );
    expect(innerCache).to.equal(upperCache);
  });
});
