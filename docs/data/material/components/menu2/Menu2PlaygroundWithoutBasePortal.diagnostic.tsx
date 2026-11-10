import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import type * as BaseMenuModule from '@base-ui/react/menu';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';
import traceFrames from './traceFrames';

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));
vi.mock('@base-ui/react/menu', async (importOriginal) => {
  const original = await importOriginal<typeof BaseMenuModule>();
  return {
    ...original,
    Menu: { ...original.Menu, Portal: vi.fn(() => null) },
  };
});

// TODO: Remove this control after the WebKit exit failure in CI is understood.
// Run only through MENU2_FRAME_CONTROL so the mock cannot affect normal tests.
describe.skipIf(isJsdom())('Menu2 playground without the Base UI portal', () => {
  const { render } = createRenderer();

  it('records render-only frames without the Base UI portal', async () => {
    await traceFrames('render-only without Base UI portal before render');
    const { baseElement } = render(<MenuRfcExperiment />);
    await act(async () => {
      await traceFrames('render-only without Base UI portal after render');
    });

    // Check the reduction only after the probes, without changing focus or layout.
    expect(BaseMenu.Portal).toHaveBeenCalled();
    expect(vi.mocked(BaseMenu.Portal).mock.calls[0][0]).to.have.property(
      'className',
      menu2PopupClasses.portal,
    );
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
    expect(baseElement.querySelector(`.${menu2PopupClasses.portal}`)).to.equal(null);
    expect(baseElement.querySelector(`.${menu2PopupClasses.root}`)).to.equal(null);
    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
      null,
    );
  });
});
