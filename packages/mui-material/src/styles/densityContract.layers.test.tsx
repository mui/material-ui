import { describe, test, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import {
  USER_COMPONENTS,
  overrideCases,
  sideBySide,
  userWins,
  winsExcept,
  withUser,
} from '../../test/densityContract';

describe.skipIf(isJsdom())('density contract with modularCssLayers', () => {
  const { render } = createRenderer();

  test('user slot styleOverrides win wherever they win on master', () => {
    render(
      sideBySide(
        withUser({ modularCssLayers: true, components: USER_COMPONENTS as any }),
        overrideCases(),
      ),
    );
    expect(userWins('master')).to.deep.equal(winsExcept({}));
    expect(userWins('enhanced')).to.deep.equal(userWins('master'));
  });
});
