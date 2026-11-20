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
});
