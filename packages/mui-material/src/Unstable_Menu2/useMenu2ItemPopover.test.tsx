import { describe, it, expect, beforeEach } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { type SxProps, type Theme } from '@mui/material/styles';
import Menu2, {
  useMenu2ItemPopover,
  type UseMenu2ItemPopoverItemHandlers,
  type UseMenu2ItemPopoverItemProps,
} from '@mui/material/Unstable_Menu2';
import { resetMenu2WarningFlags } from '@mui/material/Unstable_Menu2/menu2Utils';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

interface PreviewCardItem {
  id: string;
  label: string;
  description: string;
}

const items: PreviewCardItem[] = [
  { id: 'first', label: 'Template gallery', description: 'Start from a polished layout.' },
  { id: 'second', label: 'Publish to web', description: 'Create a public read-only page.' },
  {
    id: 'third',
    label: 'Restore version',
    description: 'Replace the document with an earlier one.',
  },
];

function TestPreviewCards(props: {
  cardSx?: SxProps<Theme>;
  closeSignal?: number;
  handlers?: UseMenu2ItemPopoverItemHandlers;
}) {
  const { cardSx, closeSignal = 0, handlers } = props;
  const { getItemProps, popover, close } = useMenu2ItemPopover<PreviewCardItem>();

  // `close` runs on a prop change, the way a menu runs it from `onOpenChange`.
  // A button would move the pointer and the focus off the item, which clears
  // the popover on its own and hides a broken `close`.
  React.useEffect(() => {
    if (closeSignal > 0) {
      close();
    }
  }, [close, closeSignal]);

  return (
    <div>
      {items.map((item) => (
        <button key={item.id} type="button" {...getItemProps(item, handlers)}>
          {item.label}
        </button>
      ))}
      {/* The anchor and the open state are not readable from the DOM, so report
          them for the assertions. */}
      <div
        data-testid="state"
        data-anchor={popover.props.anchorEl?.textContent ?? 'none'}
        data-open={String(popover.open)}
      />
      <Popper {...popover.props} sx={cardSx}>
        <Paper data-testid="preview-card">{popover.value?.description}</Paper>
      </Popper>
    </div>
  );
}

// The item unmounts from a state change of its own parent, so the component
// that owns the hook does not render again. A submenu that closes does this.
function UnmountableItem(props: { itemProps: React.ComponentProps<'button'> }) {
  const [mounted, setMounted] = React.useState(true);

  return (
    <div>
      {mounted ? (
        <button type="button" {...props.itemProps}>
          Template gallery
        </button>
      ) : null}
      <button data-testid="unmount" type="button" onClick={() => setMounted(false)}>
        unmount
      </button>
    </div>
  );
}

function TestUnmountingPreviewCard() {
  const { getItemProps, popover } = useMenu2ItemPopover<PreviewCardItem>();

  return (
    <div>
      <UnmountableItem itemProps={getItemProps(items[0])} />
      <div data-testid="state" data-open={String(popover.open)} />
      <Popper {...popover.props}>
        <Paper data-testid="preview-card">{popover.value?.description}</Paper>
      </Popper>
    </div>
  );
}

// Two items share one primitive value, which breaks the contract that a value
// identifies an item.
function TestSharedValuePreviewCards() {
  const { getItemProps, popover } = useMenu2ItemPopover<string>();

  return (
    <div>
      <button data-testid="first" type="button" {...getItemProps('Copy the link.')}>
        Copy link
      </button>
      <button data-testid="second" type="button" {...getItemProps('Copy the link.')}>
        Copy link again
      </button>
      <Popper {...popover.props}>
        <Paper data-testid="preview-card">{popover.value}</Paper>
      </Popper>
    </div>
  );
}

function TestMenu2PreviewCards() {
  const { getItemProps, popover, close } = useMenu2ItemPopover<PreviewCardItem>();

  return (
    <Menu2
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
      trigger={<Button disableRipple>Help cards</Button>}
    >
      {items.map((item) => (
        <Menu2Item key={item.id} {...getItemProps(item)}>
          {item.label}
        </Menu2Item>
      ))}
      <Popper {...popover.props}>
        <Paper data-testid="preview-card">{popover.value?.description}</Paper>
      </Popper>
    </Menu2>
  );
}

// The recipe of the docs: a `Popper` with a transition, and a `Grow`.
function TestMenu2GrowPreviewCards() {
  const { getItemProps, popover, close } = useMenu2ItemPopover<PreviewCardItem>();

  return (
    <Menu2
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
      trigger={<Button disableRipple>Help cards</Button>}
    >
      {items.map((item) => (
        <Menu2Item key={item.id} {...getItemProps(item)}>
          {item.label}
        </Menu2Item>
      ))}
      <Popper {...popover.props} transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout="auto">
            <Paper data-testid="preview-card">{popover.value?.description}</Paper>
          </Grow>
        )}
      </Popper>
    </Menu2>
  );
}

// An ancestor that the test animates, so it controls what the card waits for.
// The `Popper` portals out of it, so only the item sits below the animation.
function TestAnimatedAncestor(props: { style?: React.CSSProperties }) {
  const { getItemProps, popover } = useMenu2ItemPopover<string>();

  return (
    <div data-testid="ancestor" style={props.style}>
      <button data-testid="item" type="button" {...getItemProps('Alpha detail.')}>
        Alpha
      </button>
      <Popper {...popover.props}>
        <Paper data-testid="preview-card">{popover.value}</Paper>
      </Popper>
    </div>
  );
}

interface FrameSample {
  card: DOMRect | null;
  menu: DOMRect | null;
  overlap: number | null;
}

function readFrame(): FrameSample {
  const menu = document.querySelector('[role="menu"]');
  const card = document.querySelector('[data-testid="preview-card"]')?.parentElement ?? null;
  const menuRect = menu === null ? null : menu.getBoundingClientRect();
  const cardRect = card === null ? null : card.getBoundingClientRect();

  return {
    card: cardRect,
    menu: menuRect,
    overlap:
      menuRect === null || cardRect === null
        ? null
        : Math.min(menuRect.right, cardRect.right) - Math.max(menuRect.left, cardRect.left),
  };
}

// Records the menu and the card once per frame, so the assertions can look at
// the first frame the card paints in and at every frame after it.
function startFrameSampler() {
  const frames: FrameSample[] = [];
  let running = true;
  const tick = () => {
    frames.push(readFrame());
    if (running) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);

  return {
    stop: () => {
      running = false;
      return frames;
    },
  };
}

// React holds an update that starts outside its own event handlers until the
// act() call around it ends. A frame accurate measurement needs the update at
// the frame it happens in, so the act environment is off while it runs.
async function withoutActEnvironment<T>(callback: () => Promise<T>): Promise<T> {
  const globalScope = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
  globalScope.IS_REACT_ACT_ENVIRONMENT = false;
  try {
    return await callback();
  } finally {
    globalScope.IS_REACT_ACT_ENVIRONMENT = true;
  }
}

describe('useMenu2ItemPopover', () => {
  const { render } = createRenderer();

  beforeEach(() => {
    resetMenu2WarningFlags();
  });

  function getItem(label: string) {
    return screen.getByText(label);
  }

  function expectAnchor(label: string) {
    expect(screen.getByTestId('state')).to.have.attribute('data-open', 'true');
    expect(screen.getByTestId('state')).to.have.attribute('data-anchor', label);
  }

  async function expectClosed() {
    expect(screen.getByTestId('state')).to.have.attribute('data-open', 'false');
    expect(screen.getByTestId('state')).to.have.attribute('data-anchor', 'none');
    await waitFor(() => {
      expect(screen.queryByTestId('preview-card')).to.equal(null);
    });
  }

  // Reports the hidden ancestors by name, so a failure names the element that
  // left the accessibility tree.
  function ariaHiddenAncestors(element: Element) {
    const hidden: string[] = [];
    for (let node: Element | null = element; node !== null; node = node.parentElement) {
      if (node.getAttribute('aria-hidden') === 'true') {
        hidden.push(`${node.tagName.toLowerCase()}.${node.className || '(no class)'}`);
      }
    }
    return hidden;
  }

  it('opens the popover from focus with the focused item as the anchor', async () => {
    render(<TestPreviewCards />);

    const item = getItem('Template gallery');
    await act(async () => {
      item.focus();
    });

    expectAnchor('Template gallery');
    expect(await screen.findByTestId('preview-card')).to.have.text(items[0].description);
  });

  it('opens the popover from mouseenter with the hovered item as the anchor', async () => {
    const { user } = render(<TestPreviewCards />);

    await user.hover(getItem('Publish to web'));

    expectAnchor('Publish to web');
    expect(await screen.findByTestId('preview-card')).to.have.text(items[1].description);
  });

  it('clears the popover when the item loses focus', async () => {
    render(<TestPreviewCards />);

    const item = getItem('Template gallery');
    await act(async () => {
      item.focus();
    });

    expectAnchor('Template gallery');

    await act(async () => {
      item.blur();
    });

    await expectClosed();
  });

  it('clears the popover when the pointer leaves the item', async () => {
    const { user } = render(<TestPreviewCards />);

    const item = getItem('Publish to web');
    await user.hover(item);

    expectAnchor('Publish to web');

    await user.unhover(item);

    await expectClosed();
  });

  it('keeps the popover when another item already took it over', async () => {
    const { user } = render(<TestPreviewCards />);

    const first = getItem('Template gallery');
    await user.hover(first);
    // The keyboard hands the popover to the second item, so the pointer leaving
    // the first item must not close it.
    await act(async () => {
      getItem('Publish to web').focus();
    });
    await user.unhover(first);

    expectAnchor('Publish to web');
  });

  it('sets aria-describedby only on the active item, with the popover id', async () => {
    render(<TestPreviewCards />);

    items.forEach((item) => {
      expect(getItem(item.label)).not.to.have.attribute('aria-describedby');
    });

    await act(async () => {
      getItem('Restore version').focus();
    });

    // The attribute follows the focus through a render.
    await waitFor(() => {
      expect(getItem('Restore version')).to.have.attribute('aria-describedby');
    });
    const describedBy = getItem('Restore version').getAttribute('aria-describedby');
    expect(getItem('Template gallery')).not.to.have.attribute('aria-describedby');
    expect(getItem('Publish to web')).not.to.have.attribute('aria-describedby');

    const previewCard = await screen.findByTestId('preview-card');
    const popover = document.getElementById(describedBy!);
    expect(popover).not.to.equal(null);
    expect(popover!.contains(previewCard)).to.equal(true);
  });

  it('removes aria-describedby from the item that loses the popover', async () => {
    render(<TestPreviewCards />);

    const item = getItem('Template gallery');
    await act(async () => {
      item.focus();
    });

    expect(item).to.have.attribute('aria-describedby');

    await act(async () => {
      item.blur();
    });

    expect(item).not.to.have.attribute('aria-describedby');
  });

  // The value identifies the item, so two items with one value describe the
  // popover at the same time. The check reads the rendered result, so the card
  // has to open first.
  it('warns when two items share one value', () => {
    expect(() => {
      render(<TestSharedValuePreviewCards />);
      fireEvent.mouseEnter(screen.getByTestId('first'));
    }).toErrorDev('MUI: `useMenu2ItemPopover` received the same `value` twice in one render.');
  });

  it('does not warn when the values differ', () => {
    expect(() => {
      render(<TestPreviewCards />);
      fireEvent.mouseEnter(screen.getAllByRole('button')[0]);
    }).not.toErrorDev();
  });

  // `getItemProps` often runs in the render of a child that re-renders on its
  // own. Counting the calls of one render pass warned about correct code here.
  it('does not warn when a child re-renders and asks for its props again', () => {
    let bumpChild = () => {};

    function Item(props: {
      getItemProps: (value: string) => UseMenu2ItemPopoverItemProps;
      label: string;
    }) {
      const [, setTick] = React.useState(0);
      bumpChild = () => setTick((tick) => tick + 1);

      return (
        <button data-testid={props.label} type="button" {...props.getItemProps(props.label)}>
          {props.label}
        </button>
      );
    }

    function TestChildRenderedItems() {
      const { getItemProps, popover } = useMenu2ItemPopover<string>();

      return (
        <div>
          <Item getItemProps={getItemProps} label="first" />
          <Popper {...popover.props}>
            <Paper data-testid="preview-card">{popover.value}</Paper>
          </Popper>
        </div>
      );
    }

    expect(() => {
      render(<TestChildRenderedItems />);
      // The child renders again while the owner of the hook does not.
      act(() => {
        bumpChild();
      });
      fireEvent.mouseEnter(screen.getByTestId('first'));
    }).not.toErrorDev();
  });

  it('runs the handlers of the caller as well as its own', async () => {
    const handlers = {
      onBlur: spy(),
      onFocus: spy(),
      onMouseEnter: spy(),
      onMouseLeave: spy(),
    };
    const { user } = render(<TestPreviewCards handlers={handlers} />);

    const item = getItem('Template gallery');

    await user.hover(item);
    expect(handlers.onMouseEnter.callCount).to.equal(1);
    expectAnchor('Template gallery');

    await user.unhover(item);
    expect(handlers.onMouseLeave.callCount).to.equal(1);
    await expectClosed();

    await act(async () => {
      item.focus();
    });
    expect(handlers.onFocus.callCount).to.equal(1);
    expectAnchor('Template gallery');

    await act(async () => {
      item.blur();
    });
    expect(handlers.onBlur.callCount).to.equal(1);
    await expectClosed();
  });

  it('clears the popover when close runs', async () => {
    const { setProps, user } = render(<TestPreviewCards />);

    await user.hover(getItem('Template gallery'));
    expectAnchor('Template gallery');

    setProps({ closeSignal: 1 });

    await expectClosed();
  });

  it('shares one popover between the items', async () => {
    const { user } = render(<TestPreviewCards />);

    await user.hover(getItem('Template gallery'));
    expect(await screen.findByTestId('preview-card')).to.have.text(items[0].description);

    await user.hover(getItem('Restore version'));

    await waitFor(
      () => {
        expect(screen.getByTestId('preview-card')).to.have.text(items[2].description);
      },
      // The card waits for the ancestor animations before it paints.
      { timeout: 3000 },
    );
    expect(document.querySelectorAll('[data-testid="preview-card"]')).to.have.length(1);
    expectAnchor('Restore version');
  });

  it('clears the popover when the active item leaves the document', async () => {
    render(<TestUnmountingPreviewCard />);

    // `fireEvent` keeps the pointer and the focus where they are, so the item
    // unmounts without a mouseleave or a blur, the way a submenu closes.
    fireEvent.mouseEnter(getItem('Template gallery'));

    expect(await screen.findByTestId('preview-card')).to.have.text(items[0].description);

    fireEvent.click(screen.getByTestId('unmount'));

    await waitFor(() => {
      expect(screen.queryByTestId('preview-card')).to.equal(null);
    });
    expect(screen.getByTestId('state')).to.have.attribute('data-open', 'false');
  });

  it('keeps the popover non-interactive when the caller passes sx', async () => {
    render(<TestPreviewCards cardSx={{ pointerEvents: 'auto' }} />);

    await act(async () => {
      getItem('Template gallery').focus();
    });

    const previewCard = await screen.findByTestId('preview-card');
    const popper = previewCard.parentElement!;
    expect(window.getComputedStyle(popper).pointerEvents).to.equal('none');
    expect(window.getComputedStyle(previewCard).pointerEvents).to.equal('none');
  });

  // The measurement that decides the surface. A `Popover` renders a `Modal`,
  // and `ModalManager` sets `aria-hidden` on the siblings of the popup, which
  // takes the whole menu out of the accessibility tree.
  it('keeps the active menu item and the card in the accessibility tree', async () => {
    const { user } = render(<TestMenu2PreviewCards />);

    await user.click(screen.getByRole('button', { name: 'Help cards' }));

    const item = await screen.findByRole('menuitem', { name: items[0].label });
    await user.hover(item);

    const previewCard = await screen.findByTestId('preview-card');

    expect(ariaHiddenAncestors(item)).to.deep.equal([]);
    expect(ariaHiddenAncestors(previewCard)).to.deep.equal([]);
    expect(item).to.have.attribute('aria-describedby');
  });

  // React owns the attribute now. A caller that writes it after the spread
  // keeps its own value, which an imperative write from the hook would undo.
  it('keeps the aria-describedby that the caller writes after the spread', async () => {
    function TestCallerDescribedBy() {
      const { getItemProps, popover } = useMenu2ItemPopover<string>();

      return (
        <div>
          <button
            type="button"
            data-testid="item"
            {...getItemProps('Copy the link.')}
            aria-describedby="caller"
          >
            Copy
          </button>
          <Popper {...popover.props}>
            <Paper data-testid="preview-card">{popover.value}</Paper>
          </Popper>
        </div>
      );
    }

    render(<TestCallerDescribedBy />);
    const item = screen.getByTestId('item');

    fireEvent.mouseEnter(item);
    expect(await screen.findByTestId('preview-card')).to.have.text('Copy the link.');

    expect(item).to.have.attribute('aria-describedby', 'caller');
  });

  // The menu opens with a scale transition, so every item is smaller and closer
  // to the transform origin while it runs. Popper measures the item once, so a
  // card that opens at the first frame used to keep a position inside the
  // settled menu, then jump sideways when the transition ended.
  it.skipIf(isJsdom())('paints the first frame of the card beside the settled menu', async () => {
    const { user } = render(<TestMenu2GrowPreviewCards />);
    await act(async () => {
      screen.getByRole('button', { name: 'Help cards' }).focus();
    });

    // The frame sampler runs outside the act environment. Inside act, React
    // holds a state update that starts in a frame callback until act ends, so
    // the card would appear only after the sampled window.
    const frames = await withoutActEnvironment(async () => {
      const sampler = startFrameSampler();
      // The keyboard opens the menu and focuses the first item at once, so the
      // card activates at the first frame of the menu open animation.
      await user.keyboard('{Enter}');
      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });
      return sampler.stop();
    });

    const painted = frames.filter((frame) => frame.card !== null);
    expect(painted.length).to.be.greaterThan(0);

    // The menu stands still at the end of the window, so the last frame holds
    // the geometry the user ends up looking at.
    const settledMenu = frames[frames.length - 1]!.menu!;
    const first = painted[0]!;

    // The first frame of the card already sits beside the settled menu, and
    // keeps the 8px offset of the hook, so a card that misses the menu is not
    // a pass either.
    expect(first.card!.left).to.be.at.least(settledMenu.right);
    expect(first.card!.left).to.be.closeTo(settledMenu.right + 8, 2);

    // The card never moves after it paints, so it does not jump into place.
    painted.forEach((frame) => {
      expect(frame.card!.left).to.equal(first.card!.left);
    });
  });

  // The wait belongs to the menu open animation alone. An item that activates
  // on a menu that stands still keeps the card immediate.
  it.skipIf(isJsdom())('shows the card at once when the menu stands still', async () => {
    const { user } = render(<TestMenu2GrowPreviewCards />);

    // The pointer opens the menu without focusing an item, so no card opens
    // during the menu animation.
    await user.click(screen.getByRole('button', { name: 'Help cards' }));
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
    });
    expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

    await user.hover(screen.getByRole('menuitem', { name: 'Publish to web' }));

    // `user.hover` runs inside act, so the card is here as soon as it resolves
    // unless the hook waits for a frame that never comes.
    const card = document.querySelector('[data-testid="preview-card"]');
    expect(card).not.to.equal(null);

    const menuRect = screen.getByRole('menu').getBoundingClientRect();
    const cardRect = card!.parentElement!.getBoundingClientRect();
    expect(
      Math.min(menuRect.right, cardRect.right) - Math.max(menuRect.left, cardRect.left),
    ).to.be.at.most(0);
  });

  // A screen reader announces the item when it takes focus. The card waits for
  // the menu animation, but the description must not wait with it.
  it.skipIf(isJsdom())('describes the item before the card paints', async () => {
    function TestDeferredDescription() {
      const { getItemProps, popover, close } = useMenu2ItemPopover<string>();

      return (
        <Menu2
          trigger={<button type="button">Open</button>}
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
        >
          <Menu2Item {...getItemProps('Alpha detail.')}>Alpha</Menu2Item>
          <Popper {...popover.props}>
            <Paper data-testid="preview-card">{popover.value}</Paper>
          </Popper>
        </Menu2>
      );
    }

    const { user } = render(<TestDeferredDescription />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await act(async () => {
      trigger.focus();
    });

    // The keyboard opens the menu, so Base UI focuses the first item at once.
    await user.keyboard('{Enter}');
    const item = await screen.findByRole('menuitem', { name: 'Alpha' });

    expect(item).to.have.attribute('aria-describedby');
    expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

    // The card follows once the menu stops animating.
    await screen.findByTestId('preview-card');
    expect(item).to.have.attribute('aria-describedby');
  });

  // The browser cancels a transition whose target changes while it runs, which
  // rejects `Animation.finished`. A wait that ends on the rejection opens the
  // card mid-movement, and a wait with no rejection handler never opens it.
  it.skipIf(isJsdom())('waits for the animation that replaces a cancelled one', async () => {
    render(<TestAnimatedAncestor />);

    const ancestor = screen.getByTestId('ancestor');
    const keyframes = [{ transform: 'translateX(0px)' }, { transform: 'translateX(20px)' }];
    const first = ancestor.animate(keyframes, { duration: 400 });

    fireEvent.mouseEnter(screen.getByTestId('item'));
    expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

    // The replacement starts in the same task, the way the browser restarts a
    // transition it cancelled.
    first.cancel();
    const second = ancestor.animate(keyframes, { duration: 200 });

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 80);
      });
    });
    expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

    await act(async () => {
      await second.finished;
    });
    await screen.findByTestId('preview-card');
  });

  // The menu fades for longer than it moves, so a wait for every animation
  // costs the card about 75ms for a transition that places nothing.
  it.skipIf(isJsdom())('does not wait for a transition that cannot move the item', () => {
    render(<TestAnimatedAncestor style={{ opacity: 1, transition: 'opacity 300ms linear' }} />);

    const ancestor = screen.getByTestId('ancestor');
    // Resolve the current style, so that the change after it starts a
    // transition instead of landing in the same recalculation.
    ancestor.getBoundingClientRect();
    ancestor.style.opacity = '0.5';

    // A wait for every animation would hold the card while this transition runs.
    expect(ancestor.getAnimations()).to.have.length(1);

    fireEvent.mouseEnter(screen.getByTestId('item'));

    expect(document.querySelector('[data-testid="preview-card"]')).not.to.equal(null);
  });

  // The filter is a deny list, so a property that is not on it holds the card.
  it.skipIf(isJsdom())('waits for a transition of a property it does not know', async () => {
    render(
      <TestAnimatedAncestor style={{ marginLeft: 0, transition: 'margin-left 200ms linear' }} />,
    );

    const ancestor = screen.getByTestId('ancestor');
    ancestor.getBoundingClientRect();
    ancestor.style.marginLeft = '24px';

    expect(ancestor.getAnimations()).to.have.length(1);

    fireEvent.mouseEnter(screen.getByTestId('item'));
    expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

    // The card appears only when the transition ends.
    await screen.findByTestId('preview-card', undefined, { timeout: 3000 });
  });

  // The menu closes while the card still waits, so the wait has to end with it.
  it.skipIf(isJsdom())(
    'leaves no card behind when the menu closes during its open animation',
    async () => {
      const { user } = render(<TestMenu2GrowPreviewCards />);
      await act(async () => {
        screen.getByRole('button', { name: 'Help cards' }).focus();
      });

      await user.keyboard('{Enter}');
      expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);

      await user.keyboard('{Escape}');
      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 600);
        });
      });

      expect(document.querySelector('[data-testid="preview-card"]')).to.equal(null);
      expect(document.querySelector('[role="menu"]')).to.equal(null);
    },
  );

  // A paused animation holds the element still, and nothing promises that it
  // resumes. `Animation.finished` never settles while it is paused.
  it.skipIf(isJsdom())('does not wait for a paused ancestor animation', async () => {
    render(<TestAnimatedAncestor />);

    const item = screen.getByTestId('item');
    const ancestor = screen.getByTestId('ancestor');
    const animation = ancestor.animate(
      [{ transform: 'translateX(0px)' }, { transform: 'translateX(50px)' }],
      4000,
    );
    animation.pause();

    try {
      fireEvent.mouseEnter(item);

      await screen.findByTestId('preview-card');
      expect(animation.playState).to.equal('paused');
    } finally {
      animation.cancel();
    }
  });
});
