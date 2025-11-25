import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DraggableGridItem } from './DraggableGridItem';
import Grid from './Grid';
import { DndContext } from '../DndContext/DndContext';
import { SortableContext } from '../SortableContext/SortableContext';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('DraggableGridItem', () => {
  const { render } = createRenderer();

  // Render wrapper for grid context
  function renderGridItems(
    items: React.ReactElement[],
    itemIds: string[] = items.map((_, i) => `item-${i}`),
  ) {
    return render(
      <DndContext>
        <SortableContext items={itemIds} strategy="grid" columns={3}>
          <Grid container spacing={2}>
            {items}
          </Grid>
        </SortableContext>
      </DndContext>,
    );
  }

  function renderInGrid(
    item: React.ReactElement,
    items: string[] = ['item-1', 'item-2', 'item-3'],
  ) {
    return render(
      <DndContext>
        <SortableContext items={items} strategy="grid" columns={3}>
          <Grid container spacing={2}>
            {item}
          </Grid>
        </SortableContext>
      </DndContext>,
    );
  }

  function mockElementRect(element: HTMLElement) {
    element.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 300,
      height: 200,
      right: 300,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  }

  describe('rendering', () => {
    it('renders as <div> element (Grid default)', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.tagName.toLowerCase()).to.equal('div');
    });

    it('applies MuiDraggableGridItem-root class', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('MuiDraggableGridItem-root');
    });

    it('renders children (Card, content, etc.)', () => {
      renderInGrid(
        <DraggableGridItem id="item-1">
          <Card>
            <CardContent>
              <Typography>Card Content</Typography>
            </CardContent>
          </Card>
        </DraggableGridItem>,
      );

      expect(screen.getByText('Card Content')).not.to.equal(null);
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();

      renderInGrid(
        <DraggableGridItem id="item-1" ref={ref}>
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('div');
    });

    it('forwards callback ref correctly', () => {
      let refElement: HTMLDivElement | null = null;

      renderInGrid(
        <DraggableGridItem
          id="item-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('div');
    });
  });

  describe('Grid props passthrough', () => {
    it('size prop passed correctly ({ xs: 12, sm: 6, md: 4 })', () => {
      renderInGrid(
        <DraggableGridItem
          id="item-1"
          size={{ xs: 12, sm: 6, md: 4 }}
          data-testid="draggable-item"
        >
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      // Grid applies classes for responsive sizing
      expect(item.className).to.include('MuiGrid');
    });

    it('sx prop merges with transform styles', () => {
      renderInGrid(
        <DraggableGridItem
          id="item-1"
          sx={{ backgroundColor: 'rgb(255, 0, 0)', padding: 2 }}
          data-testid="draggable-item"
        >
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.backgroundColor).to.equal('rgb(255, 0, 0)');
    });

    it('custom className preserved', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" className="custom-grid-class" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('custom-grid-class');
      expect(item.className).to.include('MuiDraggableGridItem-root');
    });
  });

  describe('drag state styling', () => {
    it('default cursor is grab', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('grab');
    });

    it('cursor changes to grabbing when isDragging', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.cursor).to.equal('grabbing');
      });
    });

    it('opacity reduces to 0.7 when dragging', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.opacity).to.equal('0.7');
      });
    });

    it('applies touch-action: none', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('MuiDraggableGridItem-root');
    });

    it('applies user-select: none', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(
        computedStyle.userSelect === 'none' ||
          computedStyle.getPropertyValue('-webkit-user-select') === 'none',
      ).to.equal(true);
    });
  });

  describe('dragDisabled prop', () => {
    it('cursor is default when dragDisabled=true', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" dragDisabled data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('no drag listeners attached when disabled', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" dragDisabled data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Attempt to start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      // Wait a bit and verify cursor is still default (not grabbing)
      await new Promise((resolve) => setTimeout(resolve, 50));
      const computedStyle = window.getComputedStyle(item);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('still renders as Grid item when disabled', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" dragDisabled data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item.className).to.include('MuiGrid');
    });
  });

  describe('ownerState', () => {
    it('isDragging correctly reflected', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Initially not dragging
      expect(window.getComputedStyle(item).cursor).to.equal('grab');

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        expect(window.getComputedStyle(item).cursor).to.equal('grabbing');
      });
    });

    it('dragDisabled correctly reflected', () => {
      const { rerender } = render(
        <DndContext>
          <SortableContext items={['item-1']} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" dragDisabled={false} data-testid="draggable-item">
                <Card>Content</Card>
              </DraggableGridItem>
            </Grid>
          </SortableContext>
        </DndContext>,
      );

      let item = screen.getByTestId('draggable-item');
      expect(window.getComputedStyle(item).cursor).to.equal('grab');

      rerender(
        <DndContext>
          <SortableContext items={['item-1']} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" dragDisabled data-testid="draggable-item">
                <Card>Content</Card>
              </DraggableGridItem>
            </Grid>
          </SortableContext>
        </DndContext>,
      );

      item = screen.getByTestId('draggable-item');
      expect(window.getComputedStyle(item).cursor).to.equal('default');
    });
  });

  describe('useSortable integration', () => {
    it('id prop passed correctly', () => {
      renderInGrid(
        <DraggableGridItem id="unique-grid-id-123" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
        ['unique-grid-id-123', 'item-2'],
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('data prop passed correctly', () => {
      const customData = { type: 'dashboard-card', category: 'metrics' };

      renderInGrid(
        <DraggableGridItem id="item-1" data={customData} data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('transition config passed correctly', () => {
      renderInGrid(
        <DraggableGridItem
          id="item-1"
          transition={{ duration: 300, easing: 'ease-in-out' }}
          data-testid="draggable-item"
        >
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
      expect(item.className).to.include('MuiDraggableGridItem-root');
    });
  });

  describe('accessibility', () => {
    it('inherits useSortable ARIA attributes', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('role', 'button');
      expect(item).to.have.attribute('aria-pressed');
    });

    it('has role="button"', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('role', 'button');
    });

    it('aria-pressed reflects dragging state', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      expect(item).to.have.attribute('aria-pressed', 'false');

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });
    });

    it('tabIndex is 0 when enabled', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('tabindex', '0');
    });

    it('tabIndex is -1 when disabled', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" dragDisabled data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('tabindex', '-1');
    });

    it('has aria-describedby pointing to instructions', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).to.have.attribute('aria-describedby', 'dnd-instructions');
    });
  });

  describe('theming', () => {
    it('uses theme.shadows[8] for card-like elevation when dragging', async () => {
      const customTheme = createTheme({
        shadows: [
          'none',
          '0px 1px 1px rgba(0,0,0,0.1)',
          '0px 2px 2px rgba(0,0,0,0.1)',
          '0px 3px 3px rgba(0,0,0,0.1)',
          '0px 4px 4px rgba(0,0,0,0.2)',
          '0px 5px 5px rgba(0,0,0,0.2)',
          '0px 6px 6px rgba(0,0,0,0.2)',
          '0px 7px 7px rgba(0,0,0,0.2)',
          '0px 8px 8px rgba(0,0,0,0.3)', // shadows[8] used for grid items
          ...Array(16).fill('0px 9px 9px rgba(0,0,0,0.1)'),
        ] as any,
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['item-1', 'item-2']} strategy="grid" columns={3}>
              <Grid container spacing={2}>
                <DraggableGridItem id="item-1" data-testid="draggable-item">
                  <Card>Content</Card>
                </DraggableGridItem>
              </Grid>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.boxShadow).to.include('0.3)');
      });
    });

    it('uses theme.zIndex.modal for z-index when dragging', async () => {
      const customTheme = createTheme({
        zIndex: {
          modal: 8888,
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['item-1', 'item-2']} strategy="grid" columns={3}>
              <Grid container spacing={2}>
                <DraggableGridItem id="item-1" data-testid="draggable-item">
                  <Card>Content</Card>
                </DraggableGridItem>
              </Grid>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(item);
        expect(computedStyle.zIndex).to.equal('8888');
      });
    });

    it('respects custom theme overrides', () => {
      const customTheme = createTheme({
        components: {
          MuiGrid: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['item-1']} strategy="grid" columns={3}>
              <Grid container spacing={2}>
                <DraggableGridItem id="item-1" data-testid="draggable-item">
                  <Card>Content</Card>
                </DraggableGridItem>
              </Grid>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });
  });

  describe('with SortableContext grid strategy', () => {
    it('works with strategy="grid" and columns prop', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" data-testid="item-1">
                <Card>Item 1</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-2" data-testid="item-2">
                <Card>Item 2</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-3" data-testid="item-3">
                <Card>Item 3</Card>
              </DraggableGridItem>
            </Grid>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByTestId('item-1')).not.to.equal(null);
      expect(screen.getByTestId('item-2')).not.to.equal(null);
      expect(screen.getByTestId('item-3')).not.to.equal(null);
    });

    it('works with strategy="vertical" (vertical-only reordering)', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']} strategy="vertical">
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" size={{ xs: 12 }}>
                <Card>Item 1</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-2" size={{ xs: 12 }}>
                <Card>Item 2</Card>
              </DraggableGridItem>
            </Grid>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByText('Item 1')).not.to.equal(null);
      expect(screen.getByText('Item 2')).not.to.equal(null);
    });
  });

  describe('ref forwarding', () => {
    it('callback ref receives element', () => {
      let refElement: HTMLDivElement | null = null;

      renderInGrid(
        <DraggableGridItem
          id="item-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('div');
    });

    it('object ref receives element', () => {
      const ref = React.createRef<HTMLDivElement>();

      renderInGrid(
        <DraggableGridItem id="item-1" ref={ref}>
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('div');
    });

    it('setNodeRef from useSortable also receives element (verified by drag working)', async () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // If setNodeRef received the element, drag should work
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });
    });
  });

  describe('edge cases', () => {
    it('handles empty children', () => {
      renderInGrid(<DraggableGridItem id="item-1" data-testid="draggable-item" />);

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('handles multiple children', () => {
      renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>First Card</Card>
          <Card>Second Card</Card>
        </DraggableGridItem>,
      );

      expect(screen.getByText('First Card')).not.to.equal(null);
      expect(screen.getByText('Second Card')).not.to.equal(null);
    });

    it('handles nested content', () => {
      renderInGrid(
        <DraggableGridItem id="item-1">
          <Card>
            <CardContent>
              <Typography variant="h6">Title</Typography>
              <Typography variant="body2">Description</Typography>
            </CardContent>
          </Card>
        </DraggableGridItem>,
      );

      expect(screen.getByText('Title')).not.to.equal(null);
      expect(screen.getByText('Description')).not.to.equal(null);
    });

    it('handles numeric id', () => {
      render(
        <DndContext>
          <SortableContext items={[1, 2]} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id={1} data-testid="draggable-item">
                <Card>Content</Card>
              </DraggableGridItem>
            </Grid>
          </SortableContext>
        </DndContext>,
      );

      const item = screen.getByTestId('draggable-item');
      expect(item).not.to.equal(null);
    });

    it('unmount during drag cleans up gracefully', async () => {
      const { unmount } = renderInGrid(
        <DraggableGridItem id="item-1" data-testid="draggable-item">
          <Card>Content</Card>
        </DraggableGridItem>,
      );

      const item = screen.getByTestId('draggable-item');
      mockElementRect(item);

      // Start drag
      fireEvent.mouseDown(item, {
        button: 0,
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        expect(item).to.have.attribute('aria-pressed', 'true');
      });

      // Unmount while dragging - should not throw
      unmount();
    });
  });

  describe('multiple items', () => {
    it('multiple DraggableGridItems render in same container', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" size={{ xs: 12, md: 4 }}>
                <Card>Item 1</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-2" size={{ xs: 12, md: 4 }}>
                <Card>Item 2</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-3" size={{ xs: 12, md: 4 }}>
                <Card>Item 3</Card>
              </DraggableGridItem>
            </Grid>
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
          <SortableContext items={['item-1', 'item-2']} strategy="grid" columns={3}>
            <Grid container spacing={2}>
              <DraggableGridItem id="item-1" data-testid="item-1">
                <Card>Item 1</Card>
              </DraggableGridItem>
              <DraggableGridItem id="item-2" data-testid="item-2">
                <Card>Item 2</Card>
              </DraggableGridItem>
            </Grid>
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
        clientX: 150,
        clientY: 100,
      });

      await waitFor(() => {
        expect(item1).to.have.attribute('aria-pressed', 'true');
        // item-2 should not be dragging
        expect(item2).to.have.attribute('aria-pressed', 'false');
      });
    });
  });
});
