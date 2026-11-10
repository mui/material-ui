import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  act,
  createRenderer,
  isJsdom,
  screen,
  waitFor,
} from '@mui/internal-test-utils';
import { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import MenuRfcExperiment from '../../../../pages/experiments/menu2-playground';

vi.mock('next/link', () => ({ __esModule: true, default: 'a' }));
vi.mock('@mui/internal-core-docs/AppLayout', () => ({ AppLayoutHead: () => null }));

// TODO: Remove this probe after the WebKit exit failure in CI is understood.
async function traceFrames(stage: string) {
  const parent = window.parent;
  const startedAt = performance.now();
  const result: { childMs: number | null; parentMs: number | null } = {
    childMs: null,
    parentMs: null,
  };
  let childFrame: number | undefined;
  let parentFrame: number | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    await new Promise<void>((resolve) => {
      function finishWhenReady() {
        if (result.childMs !== null && result.parentMs !== null) {
          resolve();
        }
      }

      timeout = setTimeout(resolve, 250);
      childFrame = window.requestAnimationFrame(() => {
        result.childMs = performance.now() - startedAt;
        finishWhenReady();
      });
      parentFrame = parent.requestAnimationFrame(() => {
        result.parentMs = performance.now() - startedAt;
        finishWhenReady();
      });
    });
  } finally {
    clearTimeout(timeout);
    if (childFrame !== undefined) {
      window.cancelAnimationFrame(childFrame);
    }
    if (parentFrame !== undefined) {
      parent.cancelAnimationFrame(parentFrame);
    }
  }

  // Log passing runs too: waiting for these frames can change the test timing.
  console.info(
    `Menu2 frames ${stage}:\n${JSON.stringify({
      ...result,
      elapsedMs: performance.now() - startedAt,
      childVisibility: document.visibilityState,
      parentVisibility: parent.document.visibilityState,
      fakeTimers: vi.isFakeTimers(),
    })}`,
  );
}

// TODO: Remove this trace after the WebKit exit failure in CI is understood.
function tracePopupExit(popup: HTMLElement, trigger: HTMLElement) {
  const startedAt = performance.now();
  const events: object[] = [];
  const animationIds = new Map<Animation, number>();
  const observedPromises = new Set<Promise<Animation>>();
  const eventLog = document
    .getElementById('playground')
    ?.closest('section')
    ?.querySelector('pre');
  let active = true;
  let frame: number | undefined;
  let frameRan = false;

  function record(event: string, details: object = {}) {
    if (active && events.length < 100) {
      events.push({ ms: performance.now() - startedAt, event, ...details });
    }
  }

  function popupState() {
    return {
      connected: popup.isConnected,
      starting: popup.hasAttribute('data-starting-style'),
      ending: popup.hasAttribute('data-ending-style'),
      closed: popup.hasAttribute('data-closed'),
      expanded: trigger.getAttribute('aria-expanded'),
    };
  }

  function animationState(animation: Animation) {
    if (!animationIds.has(animation)) {
      animationIds.set(animation, animationIds.size + 1);
    }
    return {
      id: animationIds.get(animation),
      playState: animation.playState,
      pending: animation.pending,
      currentTime: String(animation.currentTime),
      transitionProperty:
        'transitionProperty' in animation ? animation.transitionProperty : undefined,
      animationName:
        'animationName' in animation ? animation.animationName : undefined,
      timing: animation.effect?.getTiming(),
    };
  }

  function frameState() {
    const parent = window.parent;
    const ancestors = [];
    let element = window.frameElement;
    while (element) {
      const rect = element.getBoundingClientRect();
      const style = parent.getComputedStyle(element);
      ancestors.push({
        tag: element.tagName,
        id: element.id,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        transform: style.transform,
        overflow: style.overflow,
        contentVisibility: style.contentVisibility,
      });
      element = element.parentElement;
    }
    return {
      child: {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        focused: document.hasFocus(),
        raf: Function.prototype.toString.call(window.requestAnimationFrame),
      },
      parent: {
        width: parent.innerWidth,
        height: parent.innerHeight,
        scrollX: parent.scrollX,
        scrollY: parent.scrollY,
        visibility: parent.document.visibilityState,
        focused: parent.document.hasFocus(),
        raf: Function.prototype.toString.call(parent.requestAnimationFrame),
      },
      ancestors,
    };
  }

  const getAnimations = popup.getAnimations.bind(popup);
  const spy = vi.spyOn(popup, 'getAnimations').mockImplementation((options) => {
    const animations = getAnimations(options);
    record('getAnimations', {
      ...popupState(),
      animations: animations.map(animationState),
    });
    animations.forEach((animation) => {
      const finished = animation.finished;
      if (!observedPromises.has(finished)) {
        observedPromises.add(finished);
        finished.then(
          () => record('animation finished', { id: animationIds.get(animation) }),
          () => record('animation canceled', { id: animationIds.get(animation) }),
        );
      }
    });
    return animations;
  });
  record('before backdrop click', { ...popupState(), log: eventLog?.textContent });

  return {
    record,
    afterClick() {
      record('after backdrop click', {
        ...popupState(),
        log: eventLog?.textContent,
      });
      // Do not replace requestAnimationFrame: Base UI checks its identity.
      frame = requestAnimationFrame(() => {
        frameRan = true;
        record('native animation frame', popupState());
      });
    },
    onTimeout(error: Error) {
      // Snapshot only on failure. Style reads can change animation timing.
      try {
        const style = getComputedStyle(popup);
        const snapshot = {
          ms: performance.now() - startedAt,
          ...popupState(),
          frameRan,
          visibility: document.visibilityState,
          fakeTimers: vi.isFakeTimers(),
          frame: frameState(),
          menus: screen.queryAllByRole('menu').map((menu) => ({
            id: menu.id,
            labelledBy: menu.getAttribute('aria-labelledby'),
          })),
          transition: style.transition,
          animation: style.animation,
          animations: getAnimations().map(animationState),
          log: eventLog?.textContent,
        };
        error.message += `\nMenu2 exit diagnostics:\n${JSON.stringify(
          { events, snapshot },
          (_key, value) =>
            typeof value === 'number' && !Number.isFinite(value)
              ? String(value)
              : value,
        )}`;
      } catch (snapshotError) {
        error.message += `\nMenu2 exit diagnostics:\n${JSON.stringify({
          events,
          snapshotError: String(snapshotError),
        })}`;
      }
      return error;
    },
    async afterFailure(error: unknown) {
      // Probe the parent only after failure: its frame request can wake the iframe.
      const probeStartedAt = performance.now();
      const result: { childMs: number | null; parentMs: number | null } = {
        childMs: null,
        parentMs: null,
      };
      let childFrame: number | undefined;
      let parentFrame: number | undefined;
      try {
        await act(async () => {
          childFrame = requestAnimationFrame(() => {
            result.childMs = performance.now() - probeStartedAt;
          });
          parentFrame = window.parent.requestAnimationFrame(() => {
            result.parentMs = performance.now() - probeStartedAt;
          });
          await new Promise((resolve) => {
            setTimeout(resolve, 250);
          });
        });
        if (error instanceof Error) {
          error.message += `\nMenu2 frames after failure:\n${JSON.stringify({
            ...result,
            ...popupState(),
            elapsedMs: performance.now() - probeStartedAt,
          })}`;
        }
      } catch (probeError) {
        if (error instanceof Error) {
          error.message += `\nMenu2 frame probe failed: ${String(probeError)}`;
        }
      } finally {
        if (childFrame !== undefined) {
          cancelAnimationFrame(childFrame);
        }
        if (parentFrame !== undefined) {
          window.parent.cancelAnimationFrame(parentFrame);
        }
      }
    },
    cleanup() {
      active = false;
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
      spy.mockRestore();
    },
  };
}

describe.skipIf(isJsdom())('Menu2 playground backdrop settings', () => {
  const { render } = createRenderer();

  async function renderPlayground({ traceAfterRender = false } = {}) {
    const view = render(<MenuRfcExperiment />);
    if (traceAfterRender) {
      await act(async () => {
        await traceFrames('after render before selectOptions');
      });
    }
    await view.user.selectOptions(
      screen.getByRole('combobox', { name: 'animation' }),
      'off',
    );
    return view;
  }

  ['Project', 'Successor'].forEach((triggerName) => {
    it(`uses a transparent click-away backdrop by default for ${triggerName}`, async () => {
      if (triggerName === 'Project') {
        await traceFrames('before first render');
      }
      const { baseElement, user } = await renderPlayground({
        traceAfterRender: triggerName === 'Project',
      });
      expect(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
      ).to.have.value('default');
      const trigger = screen.getByRole('button', { name: triggerName });

      if (triggerName === 'Project') {
        await act(async () => {
          await traceFrames('after playground setup');
        });
      }
      await user.click(trigger);
      const popup = await screen.findByRole('menu', { name: triggerName });

      const backdrop = baseElement.querySelector<HTMLElement>(
        `.${menu2PopupClasses.backdrop}`,
      )!;
      expect(backdrop).not.to.equal(null);
      expect(getComputedStyle(backdrop).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0)',
      );
      expect(getComputedStyle(backdrop).pointerEvents).to.equal('auto');

      const trace = tracePopupExit(popup, trigger);
      try {
        await user.click(backdrop);
        trace.afterClick();

        await waitFor(
          () => {
            const queryStartedAt = performance.now();
            const menu = screen.queryByRole('menu');
            trace.record('queryByRole', {
              durationMs: performance.now() - queryStartedAt,
              menuId: menu?.id ?? null,
            });
            expect(menu).to.equal(null);
          },
          { onTimeout: trace.onTimeout },
        );
        expect(trigger).to.have.attribute('aria-expanded', 'false');
      } catch (error) {
        await trace.afterFailure(error);
        throw error;
      } finally {
        trace.cleanup();
      }
    });

    it(`omits the backdrop when None is selected for ${triggerName}`, async () => {
      const { baseElement, user } = await renderPlayground();
      await user.selectOptions(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
        'none',
      );

      await user.click(screen.getByRole('button', { name: triggerName }));
      await screen.findByRole('menu', { name: triggerName });

      expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
        null,
      );
    });

    it(`dims the backdrop only when Dimmed is selected for ${triggerName}`, async () => {
      const { baseElement, user } = await renderPlayground();
      await user.selectOptions(
        screen.getByRole('combobox', { name: 'visual backdrop' }),
        'dimmed',
      );

      await user.click(screen.getByRole('button', { name: triggerName }));
      await screen.findByRole('menu', { name: triggerName });

      const backdrop = baseElement.querySelector<HTMLElement>(
        `.${menu2PopupClasses.backdrop}`,
      )!;
      expect(backdrop).not.to.equal(null);
      expect(getComputedStyle(backdrop).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0.5)',
      );
    });
  });

  it('uses a modal click-away backdrop for the focus comparison', async () => {
    const { baseElement, user } = await renderPlayground();
    const initialOverflow = document.body.style.overflowY;
    const classicTrigger = screen.getByRole('button', {
      name: 'Open the classic menu',
    });
    const successorTrigger = screen.getByRole('button', {
      name: 'Open the successor menu',
    });
    classicTrigger.scrollIntoView({ block: 'center' });

    await user.click(successorTrigger);
    await screen.findByRole('menu', { name: 'Open the successor menu' });

    const backdrop = baseElement.querySelector<HTMLElement>(
      `.${menu2PopupClasses.backdrop}`,
    )!;
    expect(backdrop).not.to.equal(null);
    expect(getComputedStyle(backdrop).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(backdrop).pointerEvents).to.equal('auto');
    await waitFor(() => expect(document.body.style.overflowY).to.equal('hidden'));

    const classicRect = classicTrigger.getBoundingClientRect();
    const clientX = classicRect.left + classicRect.width / 2;
    const clientY = classicRect.top + classicRect.height / 2;
    const clickTarget = document.elementFromPoint(clientX, clientY)!;
    expect(clickTarget).to.equal(backdrop);
    await user.pointer({
      keys: '[MouseLeft]',
      target: clickTarget,
      coords: { clientX, clientY },
    });

    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    expect(successorTrigger).to.have.attribute('aria-expanded', 'false');
    expect(document.body.style.overflowY).to.equal(initialOverflow);
  });

  it('does not force a backdrop on a non-modal menu with Default selected', async () => {
    const { baseElement, user } = await renderPlayground();
    await user.click(screen.getByRole('checkbox', { name: 'modal' }));

    await user.click(screen.getByRole('button', { name: 'Project' }));
    await screen.findByRole('menu', { name: 'Project' });

    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
      null,
    );
  });

  it('does not force a backdrop on a hover-opened menu with Default selected', async () => {
    const { baseElement, user } = await renderPlayground();
    await user.click(
      screen.getByRole('checkbox', { name: 'openOnHover (trigger)' }),
    );

    await user.hover(screen.getByRole('button', { name: 'Project' }));
    await screen.findByRole('menu', { name: 'Project' });

    expect(baseElement.querySelector(`.${menu2PopupClasses.backdrop}`)).to.equal(
      null,
    );
  });

  // TODO: Remove these render-only controls with the frame probes above.
  ['plain div', 'full playground'].forEach((content) => {
    it(`records render-only frames for ${content}`, async () => {
      await traceFrames(`render-only ${content} before render`);
      const { container } = render(
        content === 'plain div' ? (
          <div>Frame delivery control</div>
        ) : (
          <MenuRfcExperiment />
        ),
      );
      await act(async () => {
        await traceFrames(`render-only ${content} after render`);
      });
      // Record frame delivery without asserting a timing limit.
      expect(container.firstElementChild).not.to.equal(null);
    });
  });
});
