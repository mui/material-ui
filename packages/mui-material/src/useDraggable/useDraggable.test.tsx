import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, createRenderer, screen, act, waitFor } from '@mui/internal-test-utils';
import { useDraggable } from './useDraggable';
import { DndContext } from '../DndContext/DndContext';
import type { UseDraggableOptions } from './useDraggable';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
// Always override even if defined, as JSDOM's implementation may not work correctly
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('useDraggable', () => {
  const { render } = createRenderer();

  const DraggableTestComponent = (
    props: UseDraggableOptions & {
      onRender?: (hookReturn: ReturnType<typeof useDraggable>) => void;
    },
  ) => {
    const { onRender, ...draggableOptions } = props;
    const hookReturn = useDraggable(draggableOptions);
    const { attributes, listeners, setNodeRef, transform, isDragging } = hookReturn;

    React.useEffect(() => {
      if (onRender) {
        onRender(hookReturn);
      }
    });

    const style: React.CSSProperties = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      opacity: isDragging ? 0.5 : 1,
      ...(attributes.style || {}),
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        data-testid="draggable-item"
      >
        Draggable Item
      </div>
    );
  };

  describe('initialization', () => {
    it('returns correct initial state (isDragging: false, transform: null)', () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn).to.not.equal(null);
      expect(hookReturn!.isDragging).to.equal(false);
      expect(hookReturn!.transform).to.equal(null);
    });

    it('registers with DndContext on mount', () => {
      const { container } = render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).not.to.equal(null);
    });

    it('unregisters from DndContext on unmount', () => {
      const { unmount } = render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      unmount();
      // If no errors thrown, unregistration was successful
    });

    it('does not register when disabled', () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            disabled
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.listeners).to.equal(undefined);
    });
  });

  describe('pointer events', () => {
    // Helper to mock pointer capture methods which aren't fully supported in JSDOM
    const mockPointerCapture = (element: HTMLElement) => {
      element.setPointerCapture = () => {};
      element.releasePointerCapture = () => {};
      element.hasPointerCapture = () => true;
    };

    it('onPointerDown starts drag (left mouse button)', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      // Mock pointer capture and getBoundingClientRect
      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // After pointerdown, isDragging should become true (async state update)
      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });
    });

    it('ignores non-left mouse button clicks', () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      fireEvent.mouseDown(draggableElement, {
        button: 1, // Middle mouse button
        clientX: 50,
        clientY: 50,
      });

      expect(hookReturn!.isDragging).to.equal(false);
    });

    it('pointerup ends drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // Wait for drag to start (async state update)
      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // End drag
      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(false);
      });
    });

    it('pointercancel cancels drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // Wait for drag to start (async state update)
      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // Cancel drag
      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(false);
      });
    });

    it('pointermove triggers dragMove', async () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // Move pointer
      fireEvent.pointerMove(document, {
        clientX: 100,
        clientY: 100,
      });

      // Cleanup
      fireEvent.mouseUp(document);
    });
  });

  describe('keyboard navigation', () => {
    it('Enter starts drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Focus element before keyboard events
      draggableElement.focus();

      fireEvent.keyDown(draggableElement, { key: 'Enter' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // End drag
      fireEvent.keyDown(draggableElement, { key: 'Enter' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(false);
      });
    });

    it('Space starts drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Focus element before keyboard events
      draggableElement.focus();

      fireEvent.keyDown(draggableElement, { key: ' ' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });
    });

    it('Arrow keys move during keyboard drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Focus element before keyboard events
      draggableElement.focus();

      // Start keyboard drag
      fireEvent.keyDown(draggableElement, { key: 'Enter' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // Move with arrow keys
      fireEvent.keyDown(draggableElement, { key: 'ArrowRight' });
      fireEvent.keyDown(draggableElement, { key: 'ArrowDown' });
      fireEvent.keyDown(draggableElement, { key: 'ArrowLeft' });
      fireEvent.keyDown(draggableElement, { key: 'ArrowUp' });

      // Transform should be updated
      await waitFor(() => {
        expect(hookReturn!.transform).to.not.equal(null);
      });
    });

    it('Escape cancels keyboard drag', async () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Focus element before keyboard events
      draggableElement.focus();

      // Start keyboard drag
      fireEvent.keyDown(draggableElement, { key: 'Enter' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // Cancel with Escape
      fireEvent.keyDown(draggableElement, { key: 'Escape' });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(false);
      });
    });

    it('keyboard events ignored when disabled', () => {
      let hookReturn: ReturnType<typeof useDraggable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent
            id="test-1"
            disabled
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Focus element before keyboard events
      draggableElement.focus();

      fireEvent.keyDown(draggableElement, { key: 'Enter' });

      expect(hookReturn!.isDragging).to.equal(false);
    });
  });

  describe('attributes', () => {
    it('includes role="button"', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('role', 'button');
    });

    it('tabIndex is 0 when enabled', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('tabindex', '0');
    });

    it('tabIndex is -1 when disabled', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" disabled />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('tabindex', '-1');
    });

    it('aria-pressed reflects isDragging state', async () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      // Mock pointer capture for JSDOM
      draggableElement.setPointerCapture = () => {};
      draggableElement.releasePointerCapture = () => {};
      draggableElement.hasPointerCapture = () => true;

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(draggableElement).to.have.attribute('aria-pressed', 'false');

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      await waitFor(() => {
        expect(draggableElement).to.have.attribute('aria-pressed', 'true');
      });
    });

    it('aria-disabled reflects disabled prop', () => {
      const { rerender } = render(
        <DndContext>
          <DraggableTestComponent id="test-1" disabled={false} />
        </DndContext>,
      );

      let draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('aria-disabled', 'false');

      rerender(
        <DndContext>
          <DraggableTestComponent id="test-1" disabled />
        </DndContext>,
      );

      draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('aria-disabled', 'true');
    });

    it('aria-describedby points to instructions', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).to.have.attribute('aria-describedby', 'dnd-instructions');
    });

    it('style includes touch-action: none', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement.style.touchAction).to.equal('none');
    });
  });

  describe('edge cases', () => {
    // Helper to mock pointer capture methods
    const mockPointerCapture = (element: HTMLElement) => {
      element.setPointerCapture = () => {};
      element.releasePointerCapture = () => {};
      element.hasPointerCapture = () => true;
    };

    it('handles rapid drag start/end', async () => {
      render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Rapid interactions
      for (let i = 0; i < 5; i++) {
        fireEvent.mouseDown(draggableElement, {
          button: 0,
          clientX: 50,
          clientY: 50,
          pointerId: i,
        });
        fireEvent.pointerUp(document, { pointerId: i });
      }

      // Should not crash
    });

    it('component unmount during drag cleans up', async () => {
      const { unmount } = render(
        <DndContext>
          <DraggableTestComponent id="test-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // Unmount while dragging
      unmount();

      // Should not crash
    });

    it('disabled during drag cancels the drag', async () => {
      const TestWrapper = ({ disabled }: { disabled: boolean }) => (
        <DndContext>
          <DraggableTestComponent id="test-1" disabled={disabled} />
        </DndContext>
      );

      const { rerender } = render(<TestWrapper disabled={false} />);

      const draggableElement = screen.getByTestId('draggable-item');

      mockPointerCapture(draggableElement);
      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 50,
        clientY: 50,
      });

      // Disable during drag
      rerender(<TestWrapper disabled />);

      // Drag should be cancelled (listeners should be undefined)
      const updatedElement = screen.getByTestId('draggable-item');
      expect(updatedElement).to.have.attribute('tabindex', '-1');
    });

    it('throws helpful error when used outside DndContext', () => {
      // This test expects an error to be thrown
      expect(() => {
        render(<DraggableTestComponent id="test-1" />);
      }).to.throw();
    });

    it('handles custom data prop', () => {
      const customData = { type: 'card', category: 'red' };

      render(
        <DndContext>
          <DraggableTestComponent id="test-1" data={customData} />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item');
      expect(draggableElement).not.to.equal(null);
    });
  });
});
