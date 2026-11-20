import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import { StyledEngineProvider } from '@mui/styled-engine-sc';

describe('[styled-components] StyledEngineProvider', () => {
  const { render } = createRenderer();

  it('warns when the removed injectFirst prop is passed', () => {
    const props = { injectFirst: true } as {};
    expect(() => {
      render(<StyledEngineProvider {...props} />);
    }).toErrorDev('MUI: The `injectFirst` prop of `StyledEngineProvider` was removed in v10.');
  });
});
