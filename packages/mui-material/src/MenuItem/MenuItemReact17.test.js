import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';

// Simulate React 17, where `useId()` is `undefined` on the first render.
vi.mock('react', async (importOriginal) => ({
  ...(await importOriginal()),
  useId: undefined,
}));

// The browser cannot load a module again, so the module mock only works in jsdom.
describe.skipIf(!isJsdom())('<MenuItem /> React 17 fallback', () => {
  const { render } = createRenderer();
  let MenuList;
  let MenuItem;

  // CI runs test files without isolation, so load fresh modules with the mock and drop them after.
  beforeAll(async () => {
    vi.resetModules();
    MenuList = (await import('@mui/material/MenuList')).default;
    MenuItem = (await import('@mui/material/MenuItem')).default;
  });

  afterAll(() => {
    vi.resetModules();
  });

  it('does not focus the list container when autoFocusItem is true', () => {
    const handleFocus = spy();

    render(
      <MenuList autoFocus autoFocusItem onFocus={handleFocus}>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
      </MenuList>,
    );

    const list = screen.getByRole('menu');
    expect(screen.getByRole('menuitem', { name: 'one' })).toHaveFocus();
    expect(handleFocus.args.some(([event]) => event.target === list)).to.equal(false);
  });
});
