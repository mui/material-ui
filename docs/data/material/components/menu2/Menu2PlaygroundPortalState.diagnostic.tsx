import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import { menu2SubmenuPopupClasses } from '@mui/material/Unstable_Menu2SubmenuPopup';
import { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';
import traceFrames from './traceFrames';

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));

// TODO: Remove this diagnostic after the WebKit exit failure in CI is understood.
// Run only through MENU2_FRAME_CONTROL to keep this control out of normal tests.
describe.skipIf(isJsdom())('Menu2 playground unmocked portal', () => {
  const { render } = createRenderer();

  // Match the main file registrations. The name filter must exclude these bodies.
  [
    'uses a transparent click-away backdrop by default for Project',
    'omits the backdrop when None is selected for Project',
    'dims the backdrop only when Dimmed is selected for Project',
    'uses a transparent click-away backdrop by default for Successor',
    'omits the backdrop when None is selected for Successor',
    'dims the backdrop only when Dimmed is selected for Successor',
    'uses a modal click-away backdrop for the focus comparison',
    'does not force a backdrop on a non-modal menu with Default selected',
    'does not force a backdrop on a hover-opened menu with Default selected',
    'records render-only frames for plain div',
  ].forEach((testName) => {
    it(testName, () => {
      expect.fail('This registration must be excluded by the test-name filter.');
    });
  });

  it('records the real portal DOM without a Base UI mock', async () => {
    await traceFrames('unmocked portal before render');
    const { baseElement } = render(<MenuRfcExperiment />);
    await act(async () => {
      await traceFrames('unmocked portal after render');
    });

    // Read DOM only after the probe. Do not force layout with geometry or style reads.
    function readElements(selector: string) {
      const elements = Array.from(baseElement.querySelectorAll(selector));
      return {
        count: elements.length,
        elements: elements.slice(0, 20).map((element) => ({
          tag: element.tagName,
          id: element.id,
          className: element.getAttribute('class'),
          hidden: element.hasAttribute('hidden'),
          ariaHidden: element.getAttribute('aria-hidden'),
          open: element.hasAttribute('data-open'),
          closed: element.hasAttribute('data-closed'),
          starting: element.hasAttribute('data-starting-style'),
          ending: element.hasAttribute('data-ending-style'),
        })),
      };
    }

    const triggers = Array.from(
      baseElement.querySelectorAll(`.${menu2TriggerClasses.root}`),
      (trigger) => ({
        name: trigger.textContent?.trim(),
        expanded: trigger.getAttribute('aria-expanded'),
        controls: trigger.getAttribute('aria-controls'),
      }),
    );
    const dom = {
      basePortals: readElements('[data-base-ui-portal]'),
      portals: readElements(
        `.${menu2PopupClasses.portal}, .${menu2SubmenuPopupClasses.portal}`,
      ),
      positioners: readElements(
        `.${menu2PopupClasses.positioner}, .${menu2SubmenuPopupClasses.positioner}`,
      ),
      popups: readElements(
        `.${menu2PopupClasses.root}, .${menu2SubmenuPopupClasses.root}`,
      ),
      backdrops: readElements(`.${menu2PopupClasses.backdrop}`),
    };
    console.info(
      `Menu2 unmocked portal DOM after frame probe:\n${JSON.stringify({ dom, triggers })}`,
    );

    // Record unexpected mounted DOM as evidence, not as a timing assertion failure.
    expect(triggers.map((trigger) => trigger.name)).to.have.members([
      'Project',
      'Successor',
      'Open the successor menu',
      'Country',
    ]);
    expect(screen.getByRole('combobox', { name: 'animation' })).to.have.value(
      'grow',
    );
    expect(screen.getByRole('button', { name: 'Classic Menu' })).not.to.equal(null);
    expect(
      screen.getByRole('button', { name: 'Open the classic menu' }),
    ).not.to.equal(null);
    triggers.forEach((trigger) => {
      expect(trigger.expanded).to.equal('false');
    });
  });
});
