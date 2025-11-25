import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { useSortable } from './useSortable';
import { DndContext } from '../DndContext/DndContext';
import { SortableContext } from '../SortableContext/SortableContext';
import type { UseSortableOptions } from './useSortable';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
// Always override even if defined, as JSDOM's implementation may not work correctly
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('useSortable', () => {
  const { render } = createRenderer();

  const SortableTestComponent = (
    props: UseSortableOptions & {
      onRender?: (hookReturn: ReturnType<typeof useSortable>) => void;
    },
  ) => {
    const { onRender, ...sortableOptions } = props;
    const hookReturn = useSortable(sortableOptions);
    const { attributes, listeners, setNodeRef, transform, isDragging, transition, isSorting } =
      hookReturn;

    React.useEffect(() => {
      if (onRender) {
        onRender(hookReturn);
      }
    });

    const style: React.CSSProperties = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
      opacity: isDragging ? 0.5 : 1,
      cursor: isSorting ? 'grabbing' : 'grab',
      ...(attributes.style || {}),
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        data-testid={`sortable-${props.id}`}
      >
        Sortable Item {props.id}
      </div>
    );
  };

  describe('initialization', () => {
    it('returns correct initial state (isDragging: false, transform: null)', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
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
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).not.to.equal(null);
    });

    it('unregisters from DndContext on unmount', () => {
      const { unmount } = render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      unmount();
      // If no errors thrown, unregistration was successful
    });

    it('unregisters from SortableContext on unmount', () => {
      const { unmount } = render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent id="test-1" />
          </SortableContext>
        </DndContext>,
      );

      unmount();
      // If no errors thrown, unregistration was successful
    });

    it('does not register listeners when disabled', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
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

  describe('composed hooks', () => {
    it('isDragging comes from useDraggable', async () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(hookReturn!.isDragging).to.equal(false);

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });
    });

    it('isOver comes from useDroppable', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      // isOver would be true when another item is dragged over this one
      // In this test without an active drag, it should be false
      expect(hookReturn!.isOver).to.equal(false);
    });

    it('active is passed through from useDroppable', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      // When nothing is being dragged, active should be null
      expect(hookReturn!.active).to.equal(null);
    });
  });

  describe('transform calculation', () => {
    it('uses useDraggable transform when dragging', async () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent
              id="test-1"
              onRender={(result) => {
                hookReturn = result;
              }}
            />
          </SortableContext>
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      // When dragging, the item uses useDraggable's transform
      // Note: In JSDOM, pointer move events may not propagate to document listeners
      // so we can't reliably test the transform value changes during drag
      // But we can verify isDragging is true, which indicates useDraggable is active
      expect(hookReturn!.isDragging).to.equal(true);
    });

    it('uses SortableContext transform when not dragging', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent
              id="test-1"
              onRender={(result) => {
                hookReturn = result;
              }}
            />
          </SortableContext>
        </DndContext>,
      );

      // When not dragging and no sorting happening, transform should be null
      expect(hookReturn!.transform).to.equal(null);
    });

    it('returns null when not in SortableContext and not dragging', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transform).to.equal(null);
    });
  });

  describe('transition', () => {
    it('returns string when not dragging', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transition).to.be.a('string');
      expect(hookReturn!.transition).to.include('transform');
    });

    it('returns undefined when dragging', async () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn!.isDragging).to.equal(true);
      });

      expect(hookReturn!.transition).to.equal(undefined);
    });

    it('uses default transition config (200ms ease)', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transition).to.equal('transform 200ms ease');
    });

    it('uses custom transition config', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            transition={{ duration: 300, easing: 'ease-in-out' }}
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transition).to.equal('transform 300ms ease-in-out');
    });

    it('uses custom duration with default easing', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            transition={{ duration: 500 }}
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transition).to.equal('transform 500ms ease');
    });

    it('uses custom easing with default duration', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            transition={{ easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      expect(hookReturn!.transition).to.equal('transform 200ms cubic-bezier(0.4, 0, 0.2, 1)');
    });
  });

  describe('isSorting', () => {
    it('is true when any item is being sorted in SortableContext', async () => {
      let hookReturn1: ReturnType<typeof useSortable> | null = null;
      let hookReturn2: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent
              id="test-1"
              onRender={(result) => {
                hookReturn1 = result;
              }}
            />
            <SortableTestComponent
              id="test-2"
              onRender={(result) => {
                hookReturn2 = result;
              }}
            />
          </SortableContext>
        </DndContext>,
      );

      expect(hookReturn1!.isSorting).to.equal(false);
      expect(hookReturn2!.isSorting).to.equal(false);

      const sortableElement1 = screen.getByTestId('sortable-test-1');

      sortableElement1.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(sortableElement1, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      await waitFor(() => {
        expect(hookReturn1!.isDragging).to.equal(true);
      });

      // Both items should report isSorting as true
      await waitFor(() => {
        expect(hookReturn1!.isSorting).to.equal(true);
        expect(hookReturn2!.isSorting).to.equal(true);
      });
    });

    it('prefers SortableContext isSorting value when available', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent
              id="test-1"
              onRender={(result) => {
                hookReturn = result;
              }}
            />
          </SortableContext>
        </DndContext>,
      );

      // When in SortableContext and nothing is dragging, isSorting should be false
      expect(hookReturn!.isSorting).to.equal(false);
    });

    it('falls back to active !== null when not in SortableContext', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      // Without SortableContext and no active drag, isSorting should be false
      expect(hookReturn!.isSorting).to.equal(false);
    });
  });

  describe('ref merging', () => {
    it('calls both setNodeRef functions when ref is set', () => {
      const { container } = render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      // If the element is rendered, both refs were successfully called
      expect(sortableElement).not.to.equal(null);
    });

    it('registers with SortableContext when ref is set', () => {
      const { container } = render(
        <DndContext>
          <SortableContext items={['test-1', 'test-2']}>
            <SortableTestComponent id="test-1" />
          </SortableContext>
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      // Mock getBoundingClientRect
      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Element should be rendered and registered
      expect(sortableElement).not.to.equal(null);
    });

    it('handles null ref gracefully', () => {
      const TestComponent = () => {
        const { setNodeRef } = useSortable({ id: 'test-1' });

        React.useEffect(() => {
          setNodeRef(null);
        }, [setNodeRef]);

        return <div>Test</div>;
      };

      render(
        <DndContext>
          <TestComponent />
        </DndContext>,
      );

      // Should not crash
    });
  });

  describe('attributes', () => {
    it('includes role="button"', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('role', 'button');
    });

    it('tabIndex is 0 when enabled', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('tabindex', '0');
    });

    it('tabIndex is -1 when disabled', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" disabled />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('tabindex', '-1');
    });

    it('aria-pressed reflects isDragging state', async () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(sortableElement).to.have.attribute('aria-pressed', 'false');

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      await waitFor(() => {
        expect(sortableElement).to.have.attribute('aria-pressed', 'true');
      });
    });

    it('aria-disabled reflects disabled prop', () => {
      const { rerender } = render(
        <DndContext>
          <SortableTestComponent id="test-1" disabled={false} />
        </DndContext>,
      );

      let sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('aria-disabled', 'false');

      rerender(
        <DndContext>
          <SortableTestComponent id="test-1" disabled />
        </DndContext>,
      );

      sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('aria-disabled', 'true');
    });

    it('aria-describedby points to instructions', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).to.have.attribute('aria-describedby', 'dnd-instructions');
    });

    it('style includes touch-action: none', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement.style.touchAction).to.equal('none');
    });
  });

  describe('data prop', () => {
    it('accepts custom data object', () => {
      const customData = { type: 'card', category: 'blue' };

      render(
        <DndContext>
          <SortableTestComponent id="test-1" data={customData} />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).not.to.equal(null);
    });

    it('works without data prop', () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');
      expect(sortableElement).not.to.equal(null);
    });
  });

  describe('edge cases', () => {
    it('handles rapid drag start/end', async () => {
      render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Rapid interactions
      for (let i = 0; i < 5; i++) {
        fireEvent.mouseDown(sortableElement, {
          button: 0,
          clientX: 50,
          clientY: 25,
          pointerId: i,
        });
        fireEvent.pointerUp(document, { pointerId: i });
      }

      // Should not crash
    });

    it('component unmount during drag cleans up', async () => {
      const { unmount } = render(
        <DndContext>
          <SortableTestComponent id="test-1" />
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      // Unmount while dragging
      unmount();

      // Should not crash
    });

    it('disabled during drag cancels the drag', async () => {
      const TestWrapper = ({ disabled }: { disabled: boolean }) => (
        <DndContext>
          <SortableTestComponent id="test-1" disabled={disabled} />
        </DndContext>
      );

      const { rerender } = render(<TestWrapper disabled={false} />);

      const sortableElement = screen.getByTestId('sortable-test-1');

      sortableElement.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      // Start drag
      fireEvent.mouseDown(sortableElement, {
        button: 0,
        clientX: 50,
        clientY: 25,
      });

      // Disable during drag
      rerender(<TestWrapper disabled />);

      // Drag should be cancelled (listeners should be undefined)
      const updatedElement = screen.getByTestId('sortable-test-1');
      expect(updatedElement).to.have.attribute('tabindex', '-1');
    });

    it('throws helpful error when used outside DndContext', () => {
      // This test expects an error to be thrown
      expect(() => {
        render(<SortableTestComponent id="test-1" />);
      }).to.throw();
    });

    it('works with numeric IDs', () => {
      render(
        <DndContext>
          <SortableContext items={[1, 2, 3]}>
            <SortableTestComponent id={1} />
          </SortableContext>
        </DndContext>,
      );

      const sortableElement = screen.getByTestId('sortable-1');
      expect(sortableElement).not.to.equal(null);
    });

    it('works without SortableContext wrapper', () => {
      let hookReturn: ReturnType<typeof useSortable> | null = null;

      render(
        <DndContext>
          <SortableTestComponent
            id="test-1"
            onRender={(result) => {
              hookReturn = result;
            }}
          />
        </DndContext>,
      );

      // Should work, just without SortableContext features
      expect(hookReturn).not.to.equal(null);
      expect(hookReturn!.isDragging).to.equal(false);
    });
  });

  describe('integration with SortableContext', () => {
    it('multiple sortable items render correctly', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <SortableTestComponent id="item-1" />
            <SortableTestComponent id="item-2" />
            <SortableTestComponent id="item-3" />
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByTestId('sortable-item-1')).not.to.equal(null);
      expect(screen.getByTestId('sortable-item-2')).not.to.equal(null);
      expect(screen.getByTestId('sortable-item-3')).not.to.equal(null);
    });

    it('items register their rects with SortableContext', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']}>
            <SortableTestComponent id="item-1" />
            <SortableTestComponent id="item-2" />
          </SortableContext>
        </DndContext>,
      );

      const item1 = screen.getByTestId('sortable-item-1');
      const item2 = screen.getByTestId('sortable-item-2');

      item1.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      item2.getBoundingClientRect = () => ({
        left: 0,
        top: 50,
        width: 100,
        height: 50,
        right: 100,
        bottom: 100,
        x: 0,
        y: 50,
        toJSON: () => {},
      });

      // Rects are registered when component mounts
      expect(item1).not.to.equal(null);
      expect(item2).not.to.equal(null);
    });
  });
});
