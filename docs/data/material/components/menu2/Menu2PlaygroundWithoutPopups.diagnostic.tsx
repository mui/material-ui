import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import type * as Menu2PopupModule from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';
import traceFrames from './traceFrames';

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));
vi.mock('@mui/material/Unstable_Menu2Popup', async (importOriginal) => {
  const original = await importOriginal<typeof Menu2PopupModule>();
  return { ...original, default: vi.fn(() => null) };
});

// TODO: Remove this control after the WebKit exit failure in CI is understood.
// Run only through MENU2_FRAME_CONTROL so the mock cannot affect normal tests.
describe.skipIf(isJsdom())('Menu2 playground without popup subtrees', () => {
  const { render } = createRenderer();

  it('records render-only frames without popup subtrees', async () => {
    await traceFrames('render-only without popups before render');
    const { container } = render(<MenuRfcExperiment />);
    await act(async () => {
      await traceFrames('render-only without popups after render');
    });

    // Check the reduction only after the probes, without changing focus or layout.
    expect(Menu2Popup).toHaveBeenCalled();
    expect(screen.getByRole('combobox', { name: 'animation' })).to.have.value(
      'grow',
    );
    expect(screen.getByRole('button', { name: 'Classic Menu' })).not.to.equal(null);
    expect(
      screen.getByRole('button', { name: 'Open the classic menu' }),
    ).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Open (controlled)' })).not.to.equal(
      null,
    );
    ['Project', 'Successor', 'Open the successor menu', 'Country'].forEach(
      (name) => {
        const trigger = screen.getByRole('button', { name });
        expect(trigger).to.have.attribute('aria-haspopup', 'menu');
        expect(trigger).to.have.attribute('aria-expanded', 'false');
      },
    );
    expect(container.querySelector(`.${menu2PopupClasses.root}`)).to.equal(null);
    expect(container.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(null);
  });
});
