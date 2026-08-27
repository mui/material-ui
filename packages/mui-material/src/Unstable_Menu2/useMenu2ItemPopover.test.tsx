import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
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

    const describedBy = getItem('Restore version').getAttribute('aria-describedby');
    expect(describedBy).not.to.equal(null);
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

    await waitFor(() => {
      expect(screen.getByTestId('preview-card')).to.have.text(items[2].description);
    });
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
});
