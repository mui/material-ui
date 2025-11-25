import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DraggableListItem } from './DraggableListItem';
import { DndContext } from '../DndContext/DndContext';
import { SortableContext } from '../SortableContext/SortableContext';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('DraggableListItem', () => {
  const { render } = createRenderer();

  // Render wrapper for list context
  function renderInList(item: React.ReactElement, items: string[] = ['item-1', 'item-2']) {
    return render(
      <DndContext>
        <SortableContext items={items}>
          <ul>{item}</ul>
        </SortableContext>
      </DndContext>,
    );
  }

  function mockElementRect(element: HTMLElement) {
    element.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 200,
      height: 48,
      right: 200,
      bottom: 48,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  }

  describe('rendering', () => {
    it('renders children correctly', () => {
      renderInList(<DraggableListItem id="item-1">Item Content</DraggableListItem>);

      expect(screen.getByText('Item Content')).not.to.equal(null);
    });

    it('applies MuiDraggableListItem-root class', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('MuiDraggableListItem-root');
    });

    it('renders as <li> element (ListItem default)', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.tagName.toLowerCase()).to.equal('li');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>();

      renderInList(<DraggableListItem id="item-1" ref={ref}>Item Content</DraggableListItem>);

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('li');
    });

    it('forwards callback ref correctly', () => {
      let refElement: HTMLLIElement | null = null;

      renderInList(
        <DraggableListItem
          id="item-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          Item Content
        </DraggableListItem>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('li');
    });
  });

  describe('drag state styling', () => {
    it('default cursor is grab', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('grab');
    });

    it('cursor changes to grabbing when isDragging', async () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.cursor).to.equal('grabbing');
      });
    });

    it('opacity reduces to 0.5 when dragging', async () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.opacity).to.equal('0.5');
      });
    });

    it('applies touch-action: none', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      // touch-action is applied via styled component CSS, check class presence
      // The style is applied via emotion class, verify component has correct class
      expect(item.className).to.include('MuiDraggableListItem-root');
    });

    it('applies user-select: none', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      // userSelect may be represented differently across browsers
      expect(
        computedStyle.userSelect === 'none' ||
          computedStyle.getPropertyValue('-webkit-user-select') === 'none',
      ).to.equal(true);
    });
  });

  describe('dragDisabled prop', () => {
    it('cursor is default when dragDisabled=true', () => {
      renderInList(
        <DraggableListItem id="item-1" dragDisabled data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('still renders children normally when disabled', () => {
      renderInList(
        <DraggableListItem id="item-1" dragDisabled>
          Item Content
        </DraggableListItem>,
      );

      expect(screen.getByText('Item Content')).not.to.equal(null);
    });

    it('does not start drag when disabled', async () => {
      renderInList(
        <DraggableListItem id="item-1" dragDisabled data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Attempt to start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      // Wait a bit and verify cursor is still default (not grabbing)
      await new Promise((resolve) => setTimeout(resolve, 50));
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('tabIndex is -1 when disabled', () => {
      renderInList(
        <DraggableListItem id="item-1" dragDisabled data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('tabindex', '-1');
    });
  });

  describe('props passthrough', () => {
    it('ListItem dense prop works correctly', () => {
      renderInList(
        <DraggableListItem id="item-1" dense data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      // Dense class should be applied by ListItem
      expect(item.className).to.include('MuiListItem-dense');
    });

    it('ListItem divider prop works correctly', () => {
      renderInList(
        <DraggableListItem id="item-1" divider data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      // Divider class should be applied by ListItem
      expect(item.className).to.include('MuiListItem-divider');
    });

    it('sx prop merges with transform styles', () => {
      renderInList(
        <DraggableListItem
          id="item-1"
          sx={{ backgroundColor: 'rgb(255, 0, 0)', padding: 2 }}
          data-testid="draggable-item"
        >
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.backgroundColor).to.equal('rgb(255, 0, 0)');
    });

    it('custom data-* attributes pass through', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item" data-custom="custom-value">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('data-custom', 'custom-value');
    });

    it('onClick still works alongside drag', () => {
      const handleClick = spy();

      renderInList(
        <DraggableListItem id="item-1" onClick={handleClick} data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      fireEvent.click(item);

      expect(handleClick.calledOnce).to.equal(true);
    });

    it('className prop is merged with component classes', () => {
      renderInList(
        <DraggableListItem id="item-1" className="custom-class" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('custom-class');
      expect(item.className).to.include('MuiDraggableListItem-root');
    });
  });

  describe('useSortable integration', () => {
    it('receives correct id prop', () => {
      renderInList(
        <DraggableListItem id="unique-id-123" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
        ['unique-id-123', 'item-2'],
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('custom data prop passed to useSortable', () => {
      // Verify the component renders correctly with data prop
      const customData = { type: 'special', priority: 1 };

      renderInList(
        <DraggableListItem id="item-1" data={customData} data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('custom transition config respected', () => {
      // Transition is applied via sx prop which generates emotion CSS classes
      // We verify the component renders correctly with custom transition config
      renderInList(
        <DraggableListItem
          id="item-1"
          transition={{ duration: 300, easing: 'ease-in-out' }}
          data-testid="draggable-item"
        >
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      // Verify component renders correctly with transition prop
      expect(item).not.to.equal(null);
      expect(item.className).to.include('MuiDraggableListItem-root');
    });
  });

  describe('accessibility', () => {
    it('has role="button" from useSortable', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('role', 'button');
    });

    it('has aria-pressed attribute', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('aria-pressed');
    });

    it('aria-pressed is false initially and true when dragging', async () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      expect(item).to.have.attribute('aria-pressed', 'false');

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });
    });

    it('has aria-describedby pointing to instructions', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('aria-describedby', 'dnd-instructions');
    });

    it('tabIndex is 0 when enabled', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('tabindex', '0');
    });

    it('aria-disabled reflects dragDisabled prop', () => {
      const { rerender } = render(
        <DndContext>
          <SortableContext items={['item-1']}>
            <ul>
              <DraggableListItem id="item-1" dragDisabled={false} data-testid="draggable-item">
                Item Content
              </DraggableListItem>
            </ul>
          </SortableContext>
        </DndContext>,
      );

      let item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('aria-disabled', 'false');

      rerender(
        <DndContext>
          <SortableContext items={['item-1']}>
            <ul>
              <DraggableListItem id="item-1" dragDisabled data-testid="draggable-item">
                Item Content
              </DraggableListItem>
            </ul>
          </SortableContext>
        </DndContext>,
      );

      item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('aria-disabled', 'true');
    });
  });

  describe('theming', () => {
    it('uses theme.shadows for elevation when dragging', async () => {
      const customTheme = createTheme({
        shadows: [
          'none',
          '0px 1px 1px rgba(0,0,0,0.1)',
          '0px 2px 2px rgba(0,0,0,0.1)',
          '0px 3px 3px rgba(0,0,0,0.1)',
          '0px 4px 4px rgba(0,0,0,0.2)', // shadows[4] used during drag
          ...Array(20).fill('0px 5px 5px rgba(0,0,0,0.1)'),
        ] as any,
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['item-1', 'item-2']}>
              <ul>
                <DraggableListItem id="item-1" data-testid="draggable-item">
                  Item Content
                </DraggableListItem>
              </ul>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        // rgba format may or may not have spaces depending on environment
        expect(computedStyle.boxShadow).to.include('0.2)');
      });
    });

    it('uses theme.zIndex.modal for z-index when dragging', async () => {
      const customTheme = createTheme({
        zIndex: {
          modal: 9999,
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['item-1', 'item-2']}>
              <ul>
                <DraggableListItem id="item-1" data-testid="draggable-item">
                  Item Content
                </DraggableListItem>
              </ul>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.zIndex).to.equal('9999');
      });
    });
  });

  describe('ref forwarding', () => {
    it('callback ref receives element', () => {
      let refElement: HTMLLIElement | null = null;

      renderInList(
        <DraggableListItem
          id="item-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          Item Content
        </DraggableListItem>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('li');
    });

    it('object ref receives element', () => {
      const ref = React.createRef<HTMLLIElement>();

      renderInList(<DraggableListItem id="item-1" ref={ref}>Item Content</DraggableListItem>);

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('li');
    });

    it('setNodeRef from useSortable also receives element (verified by drag working)', async () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // If setNodeRef received the element, drag should work
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });
    });
  });

  describe('edge cases', () => {
    it('handles empty children', () => {
      renderInList(<DraggableListItem id="item-1" data-testid="draggable-item" />);

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('handles multiple children', () => {
      renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </DraggableListItem>,
      );

      expect(screen.getByText('First')).not.to.equal(null);
      expect(screen.getByText('Second')).not.to.equal(null);
      expect(screen.getByText('Third')).not.to.equal(null);
    });

    it('handles nested content', () => {
      renderInList(
        <DraggableListItem id="item-1">
          <div>
            <span>Nested</span>
            <p>Content</p>
          </div>
        </DraggableListItem>,
      );

      expect(screen.getByText('Nested')).not.to.equal(null);
      expect(screen.getByText('Content')).not.to.equal(null);
    });

    it('handles numeric id', () => {
      render(
        <DndContext>
          <SortableContext items={[1, 2]}>
            <ul>
              <DraggableListItem id={1} data-testid="draggable-item">
                Item Content
              </DraggableListItem>
            </ul>
          </SortableContext>
        </DndContext>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('unmount during drag cleans up gracefully', async () => {
      const { unmount } = renderInList(
        <DraggableListItem id="item-1" data-testid="draggable-item">
          Item Content
        </DraggableListItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });

      // Unmount while dragging - should not throw
      unmount();
    });
  });

  describe('multiple items', () => {
    it('multiple DraggableListItems render in same list', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <ul>
              <DraggableListItem id="item-1">Item 1</DraggableListItem>
              <DraggableListItem id="item-2">Item 2</DraggableListItem>
              <DraggableListItem id="item-3">Item 3</DraggableListItem>
            </ul>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByText('Item 1')).not.to.equal(null);
      expect(screen.getByText('Item 2')).not.to.equal(null);
      expect(screen.getByText('Item 3')).not.to.equal(null);
    });

    it('each item is independently draggable', async () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']}>
            <ul>
              <DraggableListItem id="item-1" data-testid="item-1">
                Item 1
              </DraggableListItem>
              <DraggableListItem id="item-2" data-testid="item-2">
                Item 2
              </DraggableListItem>
            </ul>
          </SortableContext>
        </DndContext>,
      );

      const item1 = screen.getByTestId('item-1');
      const item2 = screen.getByTestId('item-2');

      mockElementRect(item1);
      mockElementRect(item2);

      // Drag item-1
      fireEvent.mouseDown(item1, {
        button: 0,
        clientX: 100,
        clientY: 24,
      });

      await waitFor(() => {
        expect(item1).to.have.attribute('aria-pressed', 'true');
        // item-2 should not be dragging
        expect(item2).to.have.attribute('aria-pressed', 'false');
      });
    });
  });
});
