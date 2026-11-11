import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import type * as BaseMenuModule from '@base-ui/react/menu';
import { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import { menu2SubmenuPopupClasses } from '@mui/material/Unstable_Menu2SubmenuPopup';
import { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';
import traceFrames from './traceFrames';

interface PortalInput {
  keepMounted: boolean | 'undefined';
  className: string;
}

const portalTrace = vi.hoisted(() => {
  const inputs: PortalInput[] = [];
  return { inputs, renderCount: 0 };
});

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));
vi.mock('@base-ui/react/menu', async (importOriginal) => {
  const original = await importOriginal<typeof BaseMenuModule>();
  const { createElement, forwardRef } = await import('react');
  const ObservedPortal = forwardRef<
    HTMLDivElement,
    BaseMenuModule.Menu.Portal.Props
  >(function ObservedPortal(props, ref) {
    portalTrace.renderCount += 1;
    if (portalTrace.inputs.length < 100) {
      portalTrace.inputs.push({
        keepMounted:
          props.keepMounted === undefined ? 'undefined' : props.keepMounted,
        className:
          typeof props.className === 'string'
            ? props.className
            : typeof props.className,
      });
    }
    return createElement(original.Menu.Portal, { ...props, ref });
  });
  return { ...original, Menu: { ...original.Menu, Portal: ObservedPortal } };
});

// TODO: Remove this diagnostic after the WebKit exit failure in CI is understood.
// Run only through MENU2_FRAME_CONTROL so the wrapper cannot affect normal tests.
describe.skipIf(isJsdom())('Menu2 playground real portal state', () => {
  const { render } = createRenderer();

  it('records the real portal inputs and DOM while menus start closed', async () => {
    portalTrace.inputs.length = 0;
    portalTrace.renderCount = 0;
    await traceFrames('real portal state before render');
    const { baseElement } = render(<MenuRfcExperiment />);
    await act(async () => {
      await traceFrames('real portal state after render');
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
      `Menu2 real portal state after frame probe:\n${JSON.stringify({
        wrapperRenderCount: portalTrace.renderCount,
        inputsTruncated: portalTrace.renderCount > portalTrace.inputs.length,
        inputs: portalTrace.inputs,
        dom,
        triggers,
      })}`,
    );

    // Record unexpected mounted DOM as evidence, not as a timing assertion failure.
    expect(portalTrace.renderCount).to.be.greaterThan(0);
    expect(portalTrace.inputs[0]).to.have.property(
      'className',
      menu2PopupClasses.portal,
    );
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
