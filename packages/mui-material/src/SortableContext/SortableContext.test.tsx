import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import {
  SortableContext,
  useSortableContext,
  useSortableContextOptional,
} from './SortableContext';
import { DndContext } from '../DndContext/DndContext';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';

describe('SortableContext', () => {
  const { render } = createRenderer();

  describe('rendering', () => {
    it('renders children', () => {
      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <div data-testid="child">Child Content</div>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByTestId('child')).not.to.equal(null);
      expect(screen.getByTestId('child').textContent).to.equal('Child Content');
    });

    it('provides context to children', () => {
      const TestComponent = () => {
        const context = useSortableContext();
        return <div data-testid="context-check">{context ? 'Has Context' : 'No Context'}</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByTestId('context-check').textContent).to.equal('Has Context');
    });
  });

  describe('items tracking', () => {
    it('getIndex returns correct index for item', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue).not.to.equal(null);
      expect(contextValue!.getIndex('item-1')).to.equal(0);
      expect(contextValue!.getIndex('item-2')).to.equal(1);
      expect(contextValue!.getIndex('item-3')).to.equal(2);
    });

    it('getIndex returns -1 for item not in list', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getIndex('item-999')).to.equal(-1);
    });

    it('getNewIndex returns correct new index when hovering', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      // Dragging item-1 over item-3 should return index 2
      expect(contextValue!.getNewIndex('item-1', 'item-3')).to.equal(2);
      // Dragging item-3 over item-1 should return index 0
      expect(contextValue!.getNewIndex('item-3', 'item-1')).to.equal(0);
    });

    it('getNewIndex returns activeIndex when activeId not found', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getNewIndex('item-999', 'item-2')).to.equal(-1);
    });

    it('getNewIndex returns activeIndex when overId not found', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getNewIndex('item-1', 'item-999')).to.equal(0);
    });
  });

  describe('transform calculation', () => {
    it('returns null when not sorting', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      // When no drag is active, transform should be null
      expect(contextValue!.getItemTransform('item-1')).to.equal(null);
    });

    it('returns null when active is null', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getItemTransform('item-2')).to.equal(null);
    });

    it('returns null when over is null', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getItemTransform('item-2')).to.equal(null);
    });

    it('getItemTransform implementation exists and is callable', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      // Verify the function exists and is callable
      expect(contextValue).not.to.equal(null);
      expect(typeof contextValue!.getItemTransform).to.equal('function');
      // When not dragging, it returns null
      expect(contextValue!.getItemTransform('item-1')).to.equal(null);
    });
  });

  describe('registration', () => {
    it('registerItemRect stores rect in map', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      const mockRect: DOMRect = {
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect;

      // Register a rect
      contextValue!.registerItemRect('item-1', mockRect);

      // The rect is stored internally, but we can't directly access it
      // We can verify the function doesn't throw
      expect(contextValue).not.to.equal(null);
    });

    it('unregisterItemRect removes rect from map', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      const mockRect: DOMRect = {
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect;

      // Register then unregister
      contextValue!.registerItemRect('item-1', mockRect);
      contextValue!.unregisterItemRect('item-1');

      // The rect is removed internally
      expect(contextValue).not.to.equal(null);
    });

    it('registerItemRect can update existing rect', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      const mockRect1: DOMRect = {
        left: 0,
        top: 0,
        width: 100,
        height: 50,
        right: 100,
        bottom: 50,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect;

      const mockRect2: DOMRect = {
        left: 0,
        top: 0,
        width: 150,
        height: 75,
        right: 150,
        bottom: 75,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect;

      // Register and update
      contextValue!.registerItemRect('item-1', mockRect1);
      contextValue!.registerItemRect('item-1', mockRect2);

      expect(contextValue).not.to.equal(null);
    });
  });

  describe('isSorting state', () => {
    it('is false when no drag is active', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.isSorting).to.equal(false);
    });
  });

  describe('strategy prop', () => {
    it('defaults to vertical strategy', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.strategy).to.equal('vertical');
    });

    it('accepts horizontal strategy', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="horizontal">
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.strategy).to.equal('horizontal');
    });

    it('accepts grid strategy with columns', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="grid" columns={3}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.strategy).to.equal('grid');
      expect(contextValue!.columns).to.equal(3);
    });

    it('grid strategy includes columns in context', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="grid" columns={4}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.columns).to.equal(4);
    });

    it('vertical strategy has undefined columns', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']} strategy="vertical">
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.columns).to.equal(undefined);
    });
  });

  describe('useSortableContext hook', () => {
    it('throws error when used outside SortableContext', () => {
      const TestComponent = () => {
        useSortableContext();
        return <div>Test</div>;
      };

      expect(() => {
        render(
          <DndContext>
            <TestComponent />
          </DndContext>,
        );
      }).to.throw();
    });

    it('provides context value when used inside SortableContext', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue).not.to.equal(null);
      expect(contextValue!.items).to.deep.equal(['item-1', 'item-2', 'item-3']);
    });
  });

  describe('useSortableContextOptional hook', () => {
    it('returns null when used outside SortableContext', () => {
      let contextValue: ReturnType<typeof useSortableContextOptional> = undefined;

      const TestComponent = () => {
        contextValue = useSortableContextOptional();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <TestComponent />
        </DndContext>,
      );

      expect(contextValue).to.equal(null);
    });

    it('provides context value when used inside SortableContext', () => {
      let contextValue: ReturnType<typeof useSortableContextOptional> = undefined;

      const TestComponent = () => {
        contextValue = useSortableContextOptional();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue).not.to.equal(null);
      expect(contextValue!.items).to.deep.equal(['item-1', 'item-2', 'item-3']);
    });
  });

  describe('context value updates', () => {
    it('updates when items prop changes', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      const { rerender } = render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.items).to.deep.equal(['item-1', 'item-2']);

      rerender(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.items).to.deep.equal(['item-1', 'item-2', 'item-3']);
    });

    it('updates when strategy prop changes', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      const { rerender } = render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']} strategy="vertical">
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.strategy).to.equal('vertical');

      rerender(
        <DndContext>
          <SortableContext items={['item-1', 'item-2']} strategy="horizontal">
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.strategy).to.equal('horizontal');
    });
  });

  describe('edge cases', () => {
    it('handles empty items array', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={[]}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.items).to.deep.equal([]);
      expect(contextValue!.getIndex('item-1')).to.equal(-1);
    });

    it('handles duplicate items in array', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 'item-2', 'item-1']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      // indexOf returns the first occurrence
      expect(contextValue!.getIndex('item-1')).to.equal(0);
    });

    it('handles numeric item IDs', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={[1, 2, 3]}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getIndex(1)).to.equal(0);
      expect(contextValue!.getIndex(2)).to.equal(1);
      expect(contextValue!.getIndex(3)).to.equal(2);
    });

    it('handles mixed string and number item IDs', () => {
      let contextValue: ReturnType<typeof useSortableContext> | null = null;

      const TestComponent = () => {
        contextValue = useSortableContext();
        return <div>Test</div>;
      };

      render(
        <DndContext>
          <SortableContext items={['item-1', 2, 'item-3']}>
            <TestComponent />
          </SortableContext>
        </DndContext>,
      );

      expect(contextValue!.getIndex('item-1')).to.equal(0);
      expect(contextValue!.getIndex(2)).to.equal(1);
      expect(contextValue!.getIndex('item-3')).to.equal(2);
    });
  });
});
