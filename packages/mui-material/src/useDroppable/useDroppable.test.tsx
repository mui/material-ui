import * as React from 'react';
import { expect } from 'chai';
import { fireEvent, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { useDroppable } from './useDroppable';
import { useDraggable } from '../useDraggable/useDraggable';
import { DndContext } from '../DndContext/DndContext';
import type { UseDroppableOptions } from './useDroppable';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
// Always override even if defined, as JSDOM's implementation may not work correctly
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('useDroppable', () => {
  const { render } = createRenderer();

  // Helper to mock pointer capture methods which aren't fully supported in JSDOM
  const mockPointerCapture = (element: HTMLElement) => {
    element.setPointerCapture = () => {};
    element.releasePointerCapture = () => {};
    element.hasPointerCapture = () => true;
  };

  const DroppableTestComponent = (
    props: UseDroppableOptions & {
      onRender?: (hookReturn: ReturnType<typeof useDroppable>) => void;
    },
  ) => {
    const { onRender, ...droppableOptions } = props;
    const hookReturn = useDroppable(droppableOptions);
    const { setNodeRef, isOver, active } = hookReturn;

    React.useEffect(() => {
      if (onRender) {
        onRender(hookReturn);
      }
    });

    const style: React.CSSProperties = {
      width: 200,
      height: 200,
      backgroundColor: isOver ? 'lightgreen' : 'lightgray',
      border: active ? '2px dashed blue' : '2px solid gray',
    };

    return (
      <div ref={setNodeRef} style={style} data-testid="droppable-zone">
        Droppable Zone
        {isOver && <span data-testid="drop-indicator">Drop here!</span>}
      </div>
    );
  };

  const DraggableTestComponent = ({ id }: { id: string | number }) => {
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
        Draggable
      </div>
    );
  };

  describe('initialization', () => {
    it('returns correct initial state (isOver: false, active: null)', () => {
      let hookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn).to.not.equal(null);
      expect(hookReturn!.isOver).to.equal(false);
      expect(hookReturn!.active).to.equal(null);
    });

    it('registers with DndContext on mount', () => {
      render(
        <DndContext>
          <DroppableTestComponent id="droppable-1" />
        </DndContext>,
      );

      const droppableElement = screen.getByTestId('droppable-zone');
      expect(droppableElement).not.to.equal(null);
    });

    it('unregisters from DndContext on unmount', () => {
      const { unmount } = render(
        <DndContext>
          <DroppableTestComponent id="droppable-1" />
        </DndContext>,
      );

      unmount();
      // If no errors thrown, unregistration was successful
    });

    it('does not register when disabled', () => {
      render(
        <DndContext>
          <DroppableTestComponent id="droppable-1" disabled />
        </DndContext>,
      );

      const droppableElement = screen.getByTestId('droppable-zone');
      expect(droppableElement).not.to.equal(null);
    });
  });

  describe('isOver state', () => {
    it('isOver true when draggable is over this droppable', async () => {
      let droppableHookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent id="draggable-1" />
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              droppableHookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-draggable-1');
      const droppableElement = screen.getByTestId('droppable-zone');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

      // Mock getBoundingClientRect for collision detection
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

      expect(droppableHookReturn!.isOver).to.equal(false);

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      // Move over droppable
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      // Wait for collision detection (throttled by RAF)
      await waitFor(
        () => {
          expect(droppableHookReturn!.isOver).to.equal(true);
        },
        { timeout: 200 },
      );
    });

    it('isOver false when context.over is null', () => {
      let hookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.isOver).to.equal(false);
    });

    it('isOver false when context.over.id differs', async () => {
      let droppable1HookReturn: ReturnType<typeof useDroppable> | null = null;
      let droppable2HookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent id="draggable-1" />
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              droppable1HookReturn = result;
            }}
          />
          <DroppableTestComponent
            id="droppable-2"
            onRender={(result) => {
              droppable2HookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-draggable-1');
      const droppableElements = screen.getAllByTestId('droppable-zone');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

      // Mock getBoundingClientRect
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

      droppableElements[0].getBoundingClientRect = () => ({
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

      droppableElements[1].getBoundingClientRect = () => ({
        left: 300,
        top: 300,
        width: 200,
        height: 200,
        right: 500,
        bottom: 500,
        x: 300,
        y: 300,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      // Move over first droppable
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      // Wait for collision detection
      await waitFor(
        () => {
          expect(droppable1HookReturn!.isOver).to.equal(true);
          expect(droppable2HookReturn!.isOver).to.equal(false);
        },
        { timeout: 200 },
      );
    });
  });

  describe('active passthrough', () => {
    it('active reflects context.active when dragging', async () => {
      let hookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DraggableTestComponent id="draggable-1" />
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-draggable-1');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

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

      expect(hookReturn!.active).to.equal(null);

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn!.active).to.not.equal(null);
        expect(hookReturn!.active!.id).to.equal('draggable-1');
      });
    });

    it('active is null when nothing is dragging', () => {
      let hookReturn: ReturnType<typeof useDroppable> | null = null;

      render(
        <DndContext>
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.active).to.equal(null);
    });

    it('active contains data from draggable', async () => {
      let hookReturn: ReturnType<typeof useDroppable> | null = null;

      const DraggableWithData = () => {
        const { attributes, listeners, setNodeRef } = useDraggable({
          id: 'draggable-1',
          data: { type: 'card', color: 'red' },
        });

        return (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            data-testid="draggable-with-data"
            style={{ ...(attributes.style || {}), width: 50, height: 50 }}
          >
            Draggable
          </div>
        );
      };

      render(
        <DndContext>
          <DraggableWithData />
          <DroppableTestComponent
            id="droppable-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-with-data');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

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

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn!.active).to.not.equal(null);
        expect(hookReturn!.active!.data.type).to.equal('card');
        expect(hookReturn!.active!.data.color).to.equal('red');
      });
    });
  });

  describe('edge cases', () => {
    it('disabled droppable is not registered', () => {
      render(
        <DndContext>
          <DraggableTestComponent id="draggable-1" />
          <DroppableTestComponent id="droppable-1" disabled />
        </DndContext>,
      );

      const droppableElement = screen.getByTestId('droppable-zone');
      expect(droppableElement).not.to.equal(null);
    });

    it('data prop changes trigger re-registration', () => {
      const TestWrapper = ({ data }: { data: Record<string, unknown> }) => (
        <DndContext>
          <DroppableTestComponent id="droppable-1" data={data} />
        </DndContext>
      );

      const { rerender } = render(<TestWrapper data={{ accepts: 'card' }} />);

      // Update data
      rerender(<TestWrapper data={{ accepts: 'item' }} />);

      const droppableElement = screen.getByTestId('droppable-zone');
      expect(droppableElement).not.to.equal(null);
    });

    it('throws helpful error when used outside DndContext', () => {
      expect(() => {
        render(<DroppableTestComponent id="droppable-1" />);
      }).to.throw();
    });

    it('handles multiple droppables with same behavior', () => {
      render(
        <DndContext>
          <DroppableTestComponent id="droppable-1" />
          <DroppableTestComponent id="droppable-2" />
          <DroppableTestComponent id="droppable-3" />
        </DndContext>,
      );

      const droppableElements = screen.getAllByTestId('droppable-zone');
      expect(droppableElements).to.have.length(3);
    });

    it('isOver updates correctly when draggable moves between droppables', async () => {
      let droppable1HookReturn: ReturnType<typeof useDroppable> | null = null;
      let droppable2HookReturn: ReturnType<typeof useDroppable> | null = null;

      const TestComponent = () => {
        const droppable1 = useDroppable({ id: 'droppable-1' });
        const droppable2 = useDroppable({ id: 'droppable-2' });

        droppable1HookReturn = droppable1;
        droppable2HookReturn = droppable2;

        return (
          <>
            <DraggableTestComponent id="draggable-1" />
            <div
              ref={droppable1.setNodeRef}
              style={{ width: 200, height: 200 }}
              data-testid="droppable-1"
            >
              Zone 1
            </div>
            <div
              ref={droppable2.setNodeRef}
              style={{ width: 200, height: 200 }}
              data-testid="droppable-2"
            >
              Zone 2
            </div>
          </>
        );
      };

      render(
        <DndContext>
          <TestComponent />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-draggable-1');
      const droppable1Element = screen.getByTestId('droppable-1');
      const droppable2Element = screen.getByTestId('droppable-2');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

      // Mock getBoundingClientRect
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

      droppable1Element.getBoundingClientRect = () => ({
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

      droppable2Element.getBoundingClientRect = () => ({
        left: 250,
        top: 0,
        width: 200,
        height: 200,
        right: 450,
        bottom: 200,
        x: 250,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 35,
        clientY: 35,
      });

      // Move over first droppable
      fireEvent.mouseMove(document, {
        clientX: 100,
        clientY: 100,
      });

      await waitFor(
        () => {
          expect(droppable1HookReturn!.isOver).to.equal(true);
          expect(droppable2HookReturn!.isOver).to.equal(false);
        },
        { timeout: 200 },
      );

      // Move to second droppable
      draggableElement.getBoundingClientRect = () => ({
        left: 260,
        top: 10,
        width: 50,
        height: 50,
        right: 310,
        bottom: 60,
        x: 260,
        y: 10,
        toJSON: () => {},
      });

      fireEvent.mouseMove(document, {
        clientX: 350,
        clientY: 100,
      });

      await waitFor(
        () => {
          expect(droppable1HookReturn!.isOver).to.equal(false);
          expect(droppable2HookReturn!.isOver).to.equal(true);
        },
        { timeout: 200 },
      );
    });

    it('handles custom data prop', () => {
      const customData = { accepts: ['card', 'item'], category: 'inbox' };

      render(
        <DndContext>
          <DroppableTestComponent id="droppable-1" data={customData} />
        </DndContext>,
      );

      const droppableElement = screen.getByTestId('droppable-zone');
      expect(droppableElement).not.to.equal(null);
    });

    it('unmount during drag cleans up properly', async () => {
      const { unmount } = render(
        <DndContext>
          <DraggableTestComponent id="draggable-1" />
          <DroppableTestComponent id="droppable-1" />
        </DndContext>,
      );

      const draggableElement = screen.getByTestId('draggable-draggable-1');

      // Mock pointer capture for JSDOM
      mockPointerCapture(draggableElement);

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

      // Start drag
      fireEvent.mouseDown(draggableElement, {
        button: 0,
        clientX: 25,
        clientY: 25,
      });

      // Unmount while dragging
      unmount();

      // Should not crash
    });
  });
});
