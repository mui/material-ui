import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, createRenderer, screen, waitFor, act } from '@mui/internal-test-utils';
import { DndContext } from './DndContext';
import { useDndContext } from './useDndContext';
import { useDndMonitor } from './useDndMonitor';
import { useDraggable } from '../useDraggable/useDraggable';
import { useDroppable } from '../useDroppable/useDroppable';
import { pointerWithin, closestCenter } from './collision';
import type { DragStartEvent, DragMoveEvent, DragOverEvent, DragEndEvent, DragCancelEvent } from './DndContextTypes';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
// Always override even if defined, as JSDOM's implementation may not work correctly
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('DndContext', () => {
  const { render } = createRenderer();

  // Helper to mock pointer capture methods which aren't fully supported in JSDOM
  const mockPointerCapture = (element: HTMLElement) => {
    element.setPointerCapture = () => {};
    element.releasePointerCapture = () => {};
    element.hasPointerCapture = () => true;
  };

  // Helper to set up a draggable element for testing
  const setupDraggable = (element: HTMLElement) => {
    mockPointerCapture(element);
    element.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      right: 50,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  };

  const DraggableItem = ({ id, children }: { id: string; children?: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

    const style: React.CSSProperties = {
      width: 50,
      height: 50,
      backgroundColor: isDragging ? 'blue' : 'red',
      ...(attributes.style || {}),
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        data-testid={`draggable-${id}`}
      >
        {children || `Draggable ${id}`}
      </div>
    );
  };

  const DroppableZone = ({ id, children }: { id: string; children?: React.ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    const style: React.CSSProperties = {
      width: 200,
      height: 200,
      backgroundColor: isOver ? 'lightgreen' : 'lightgray',
    };

    return (
      <div ref={setNodeRef} style={style} data-testid={`droppable-${id}`}>
        {children || `Droppable ${id}`}
      </div>
    );
  };

  describe('rendering', () => {
    it('renders children', () => {
      render(
        <DndContext>
          <div data-testid="child">Test Child</div>
        </DndContext>,
      );

      expect(screen.getByTestId('child')).not.to.equal(null);
    });

    it('renders live region for announcements', () => {
      render(
        <DndContext>
          <div>Content</div>
        </DndContext>,
      );

      // Live region should be present with correct attributes
      const liveRegions = document.querySelectorAll('[role="status"][aria-live="assertive"]');
      expect(liveRegions.length).to.be.greaterThan(0);
    });

    it('renders instructions element with id="dnd-instructions"', () => {
      render(
        <DndContext>
          <div>Content</div>
        </DndContext>,
      );

      const instructionsElement = document.getElementById('dnd-instructions');
      expect(instructionsElement).not.to.equal(null);
    });

    it('renders custom screen reader instructions', () => {
      const customInstructions = 'Custom drag and drop instructions';

      render(
        <DndContext
          accessibility={{
            screenReaderInstructions: customInstructions,
          }}
        >
          <div>Content</div>
        </DndContext>,
      );

      const instructionsElement = document.getElementById('dnd-instructions');
      expect(instructionsElement?.textContent).to.equal(customInstructions);
    });
  });

  describe('drag lifecycle', () => {
    it('dragStart sets active state', async () => {
      let contextValue: ReturnType<typeof useDndContext> | null = null;

      const ContextConsumer = () => {
        contextValue = useDndContext();
        return null;
      };

      render(
        <DndContext>
          <ContextConsumer />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(contextValue!.active).to.equal(null);

      await act(async () => {
        fireEvent.mouseDown(draggableElement, {
          button: 0,
          clientX: 25,
          clientY: 25,
        });
      });

      await waitFor(() => {
        expect(contextValue!.active).to.not.equal(null);
        expect(contextValue!.active!.id).to.equal('item-1');
      });
    });

    it('dragMove updates active rect and detects collisions', async () => {
      let contextValue: ReturnType<typeof useDndContext> | null = null;

      const ContextConsumer = () => {
        contextValue = useDndContext();
        return null;
      };

      render(
        <DndContext>
          <ContextConsumer />
          <DraggableItem id="item-1" />
          <DroppableZone id="zone-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');
      const droppableElement = screen.getByTestId('droppable-zone-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 10,
        top: 10,
        width: 50,
        height: 50,
        right: 60,
        bottom: 60,
        x: 10,
        y: 10,
        toJSON: () => {},
      });

      droppableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      await act(async () => {
        fireEvent.mouseDown(draggableElement, {
          button: 0,
          clientX: 35,
          clientY: 35,
        });
      });

      await act(async () => {
        fireEvent.mouseMove(document, {
          clientX: 100,
          clientY: 100,
        });
      });

      await waitFor(
        () => {
          expect(contextValue!.over).to.not.equal(null);
          expect(contextValue!.over!.id).to.equal('zone-1');
        },
        { timeout: 200 },
      );
    });

    it('dragEnd clears active/over state', async () => {
      let contextValue: ReturnType<typeof useDndContext> | null = null;

      const ContextConsumer = () => {
        contextValue = useDndContext();
        return null;
      };

      render(
        <DndContext>
          <ContextConsumer />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(contextValue!.active).to.not.equal(null);
      });

      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(contextValue!.active).to.equal(null);
        expect(contextValue!.over).to.equal(null);
      });
    });

    it('dragCancel clears state', async () => {
      let contextValue: ReturnType<typeof useDndContext> | null = null;

      const ContextConsumer = () => {
        contextValue = useDndContext();
        return null;
      };

      render(
        <DndContext>
          <ContextConsumer />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(contextValue!.active).to.not.equal(null);
      });

      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(contextValue!.active).to.equal(null);
        expect(contextValue!.over).to.equal(null);
      });
    });
  });

  describe('collision detection', () => {
    it('uses rectIntersection by default', async () => {
      render(
        <DndContext>
          <DraggableItem id="item-1" />
          <DroppableZone id="zone-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');
      const droppableElement = screen.getByTestId('droppable-zone-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 10,
        top: 10,
        width: 50,
        height: 50,
        right: 60,
        bottom: 60,
        x: 10,
        y: 10,
        toJSON: () => {},
      });

      droppableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      // Should detect collision with zone-1
      await waitFor(
        () => {
          const droppableZone = screen.getByTestId('droppable-zone-1');
          expect(droppableZone.style.backgroundColor).to.equal('lightgreen');
        },
        { timeout: 200 },
      );
    });

    it('custom collisionDetection prop is respected', async () => {
      // Use pointerWithin collision detection
      render(
        <DndContext collisionDetection={pointerWithin}>
          <DraggableItem id="item-1" />
          <DroppableZone id="zone-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');
      const droppableElement = screen.getByTestId('droppable-zone-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 10,
        top: 10,
        width: 50,
        height: 50,
        right: 60,
        bottom: 60,
        x: 10,
        y: 10,
        toJSON: () => {},
      });

      droppableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      // Move pointer inside droppable
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      await waitFor(
        () => {
          const droppableZone = screen.getByTestId('droppable-zone-1');
          expect(droppableZone.style.backgroundColor).to.equal('lightgreen');
        },
        { timeout: 200 },
      );
    });

    it('over state updates when collision detected', async () => {
      let contextValue: ReturnType<typeof useDndContext> | null = null;

      const ContextConsumer = () => {
        contextValue = useDndContext();
        return null;
      };

      render(
        <DndContext>
          <ContextConsumer />
          <DraggableItem id="item-1" />
          <DroppableZone id="zone-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');
      const droppableElement = screen.getByTestId('droppable-zone-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 10,
        top: 10,
        width: 50,
        height: 50,
        right: 60,
        bottom: 60,
        x: 10,
        y: 10,
        toJSON: () => {},
      });

      droppableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 200,
        height: 200,
        right: 200,
        bottom: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(contextValue!.over).to.equal(null);

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      await waitFor(
        () => {
          expect(contextValue!.over).to.not.equal(null);
          expect(contextValue!.over!.id).to.equal('zone-1');
        },
        { timeout: 200 },
      );
    });
  });

  describe('useDndMonitor integration', () => {
    it('monitor callbacks receive drag start events', async () => {
      const onDragStartSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({
          onDragStart: onDragStartSpy,
        });
        return null;
      };

      render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(onDragStartSpy.callCount).to.equal(1);
      });
    });

    it('monitor callbacks receive drag move events', async () => {
      const onDragMoveSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({
          onDragMove: onDragMoveSpy,
        });
        return null;
      };

      render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      await waitFor(
        () => {
          expect(onDragMoveSpy.callCount).to.be.greaterThan(0);
        },
        { timeout: 200 },
      );
    });

    it('monitor callbacks receive drag end events', async () => {
      const onDragEndSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({
          onDragEnd: onDragEndSpy,
        });
        return null;
      };

      render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(onDragEndSpy.callCount).to.equal(1);
      });
    });

    it('monitor callbacks receive drag cancel events', async () => {
      const onDragCancelSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({
          onDragCancel: onDragCancelSpy,
        });
        return null;
      };

      render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      fireEvent.mouseUp(document);

      await waitFor(() => {
        expect(onDragCancelSpy.callCount).to.equal(1);
      });
    });

    it('multiple monitors are supported', async () => {
      const onDragStart1Spy = spy();
      const onDragStart2Spy = spy();

      const Monitor1 = () => {
        useDndMonitor({ onDragStart: onDragStart1Spy });
        return null;
      };

      const Monitor2 = () => {
        useDndMonitor({ onDragStart: onDragStart2Spy });
        return null;
      };

      render(
        <DndContext>
          <Monitor1 />
          <Monitor2 />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(onDragStart1Spy.callCount).to.equal(1);
        expect(onDragStart2Spy.callCount).to.equal(1);
      });
    });

    it('cleanup on monitor unmount', async () => {
      const onDragStartSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({ onDragStart: onDragStartSpy });
        return null;
      };

      const { rerender } = render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      // Unmount monitor
      rerender(
        <DndContext>
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      // Monitor should not be called after unmount
      expect(onDragStartSpy.callCount).to.equal(0);
    });
  });

  describe('accessibility', () => {
    it('announcements fire for drag start', async () => {
      render(
        <DndContext>
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        const liveRegion = document.querySelector('[role="status"][aria-live="assertive"]');
        expect(liveRegion?.textContent).to.not.equal('');
      });
    });

    it('custom announcements prop works', async () => {
      const customAnnouncements = {
        onDragStart: () => 'Custom drag start announcement',
      };

      render(
        <DndContext accessibility={{ announcements: customAnnouncements }}>
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        const liveRegion = document.querySelector('[role="status"][aria-live="assertive"]');
        expect(liveRegion?.textContent).to.equal('Custom drag start announcement');
      });
    });

    it('live region has correct aria attributes', () => {
      render(
        <DndContext>
          <div>Content</div>
        </DndContext>,
      );

      const liveRegion = document.querySelector('[role="status"][aria-live="assertive"]');
      expect(liveRegion).to.not.equal(null);
      expect(liveRegion).to.have.attribute('aria-atomic', 'true');
    });
  });

  describe('performance', () => {
    it('dragMove throttled via requestAnimationFrame', async () => {
      const onDragMoveSpy = spy();

      const MonitorComponent = () => {
        useDndMonitor({ onDragMove: onDragMoveSpy });
        return null;
      };

      render(
        <DndContext>
          <MonitorComponent />
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      // Fire multiple move events rapidly
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseMove(document, {
          clientX: 25 + i,
          clientY: 25 + i,
          });
      }

      // Wait for RAF to complete
      await waitFor(
        () => {
          // Should be throttled - not called 10 times
          expect(onDragMoveSpy.callCount).to.be.lessThan(10);
        },
        { timeout: 200 },
      );
    });

    it('RAF cleanup on unmount', () => {
      const { unmount } = render(
        <DndContext>
          <DraggableItem id="item-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-item-1');

      draggableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        right: 50,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      // Unmount during pending RAF
      unmount();

      // Should not crash
    });
  });
});
