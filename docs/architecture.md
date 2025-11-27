# MUI Native Drag-and-Drop System Architecture

## Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Core Architecture](#core-architecture)
4. [Context Providers](#context-providers)
5. [Core Hooks](#core-hooks)
6. [Collision Detection Strategies](#collision-detection-strategies)
7. [Sorting Strategies](#sorting-strategies)
8. [Component Integrations](#component-integrations)
9. [Data Flow](#data-flow)
10. [Accessibility](#accessibility)
11. [Performance Considerations](#performance-considerations)
12. [Design Decisions & Rationale](#design-decisions--rationale)

---

## Introduction

### Purpose

The MUI Native Drag-and-Drop system provides built-in drag-and-drop functionality for Material UI without requiring third-party libraries. The API is inspired by [dnd-kit](https://dndkit.com/) while being fully integrated with MUI's theming, styling, and accessibility systems.

### Goals

- **Native MUI Integration**: Automatic theming, consistent styling patterns, and familiar API conventions
- **Full Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **High Performance**: 60fps drag operations with RAF-throttled updates
- **Flexible Architecture**: Low-level hooks for custom implementations, pre-built components for common use cases
- **Zero External Dependencies**: No additional bundle size from third-party DnD libraries

### Comparison with react-beautiful-dnd

| Aspect | react-beautiful-dnd | Native MUI DnD |
|--------|---------------------|----------------|
| Bundle size | +45KB gzipped | +7KB gzipped |
| Setup code | ~30 lines | ~10 lines |
| Theming | Manual integration | Automatic |
| TypeScript | Separate @types package | Built-in |
| Touch support | Good | Native (Pointer Events) |
| Accessibility | Good | Integrated with MUI |

---

## System Overview

The drag-and-drop system follows a layered architecture with three distinct tiers:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Component Layer                             │
│  DraggableListItem │ DraggableTableRow │ DraggableGridItem │ ... │
├─────────────────────────────────────────────────────────────────┤
│                        Hook Layer                                │
│       useDraggable │ useDroppable │ useSortable                  │
├─────────────────────────────────────────────────────────────────┤
│                      Context Layer                               │
│              DndContext │ SortableContext                        │
└─────────────────────────────────────────────────────────────────┘
```

See [dnd-system-overview.mmd](./diagrams/dnd-system-overview.mmd) for the complete diagram.

---

## Core Architecture

### State Management Model

The system uses a centralized state model managed by `DndContext`:

```typescript
interface DndState {
  active: Active | null;    // Currently dragged item
  over: Over | null;        // Current drop target
}

interface Active {
  id: UniqueIdentifier;
  data: Record<string, unknown>;
  rect: DOMRect;  // Virtual rect updated during drag
}

interface Over {
  id: UniqueIdentifier;
  data: Record<string, unknown>;
  rect: DOMRect;
}
```

### Registries

Two Map-based registries track draggable and droppable elements:

```typescript
// In DndContext
const draggablesRef = useRef<Map<UniqueIdentifier, DraggableEntry>>(new Map());
const droppablesRef = useRef<Map<UniqueIdentifier, DroppableEntry>>(new Map());

interface DraggableEntry {
  id: UniqueIdentifier;
  node: HTMLElement;
  data: Record<string, unknown>;
}
```

Elements register on mount via their hooks and unregister on unmount, ensuring the registry stays synchronized with the React component tree.

### Event Lifecycle

The drag-and-drop operation follows this lifecycle:

1. **dragStart** - User initiates drag (pointer down or Enter/Space key)
2. **dragMove** - Continuous updates during drag (pointer move or arrow keys)
3. **dragOver** - Fires when entering a new droppable target
4. **dragEnd** - User completes drag (pointer up or Enter/Space key)
5. **dragCancel** - User cancels drag (Escape key or pointer cancel)

Each lifecycle event:
- Updates internal state synchronously for immediate visual feedback
- Dispatches to registered monitors
- Triggers user-provided callbacks
- Announces to screen readers

---

## Context Providers

### DndContext

The central coordinator for all drag-and-drop operations.

**Location**: `packages/mui-material/src/DndContext/DndContext.tsx`

**Props**:
```typescript
interface DndContextProps {
  children: React.ReactNode;
  collisionDetection?: CollisionDetection;  // Default: rectIntersection
  accessibility?: DndAccessibility;
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
}
```

**Responsibilities**:
- Manages global drag state (`active`, `over`)
- Maintains draggable/droppable registries
- Runs collision detection on each drag move
- Coordinates state updates across all consumers
- Renders live region for screen reader announcements
- Renders hidden instructions element (`#dnd-instructions`)

**Context Value Provided**:
```typescript
interface DndContextValue {
  active: Active | null;
  over: Over | null;
  registerDraggable: (id, node, data?) => void;
  unregisterDraggable: (id) => void;
  registerDroppable: (id, node, data?) => void;
  unregisterDroppable: (id) => void;
  dragStart: (id) => void;
  dragMove: (coordinates) => void;
  dragEnd: () => void;
  dragCancel: () => void;
}
```

### SortableContext

Provides sorting intelligence for reorderable lists.

**Location**: `packages/mui-material/src/SortableContext/SortableContext.tsx`

**Props**:
```typescript
interface SortableContextProps {
  children: React.ReactNode;
  items: UniqueIdentifier[];           // Ordered array of item IDs
  strategy?: 'vertical' | 'horizontal' | 'grid';
  columns?: number;                     // Required for 'grid' strategy
}
```

**Responsibilities**:
- Tracks item order and indices
- Calculates transforms for non-dragged items (to make room for dragged item)
- Registers item rects from useSortable hooks
- Provides sorting strategy to child hooks

**Context Value Provided**:
```typescript
interface SortableContextValue {
  items: UniqueIdentifier[];
  strategy: SortingStrategy;
  columns?: number;
  getIndex: (id) => number;
  getItemTransform: (id) => Coordinates | null;
  isSorting: boolean;
  getNewIndex: (activeId, overId) => number;
  registerItemRect: (id, rect) => void;
  unregisterItemRect: (id) => void;
}
```

---

## Core Hooks

### useDraggable

Makes any element draggable via pointer and keyboard interactions.

**Location**: `packages/mui-material/src/useDraggable/useDraggable.ts`

**Options**:
```typescript
interface UseDraggableOptions {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: boolean;
}
```

**Returns**:
```typescript
interface UseDraggableReturn {
  attributes: {
    role: 'button';
    tabIndex: number;
    'aria-describedby': string;
    'aria-pressed': boolean;
    'aria-disabled': boolean;
    style?: { touchAction: 'none' };
  };
  listeners: {
    onPointerDown: (event) => void;
    onKeyDown: (event) => void;
  } | undefined;
  setNodeRef: (node: HTMLElement | null) => void;
  transform: Coordinates | null;
  isDragging: boolean;
}
```

**Behavior**:
- Registers element with DndContext on mount
- Captures pointer events for drag tracking
- Handles keyboard navigation (Enter/Space to grab, arrows to move, Escape to cancel)
- Calculates transform delta from initial position
- Uses `setPointerCapture` for reliable move/up event tracking

### useDroppable

Designates an element as a drop target.

**Location**: `packages/mui-material/src/useDroppable/useDroppable.ts`

**Options**:
```typescript
interface UseDroppableOptions {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: boolean;
}
```

**Returns**:
```typescript
interface UseDroppableReturn {
  setNodeRef: (node: HTMLElement | null) => void;
  isOver: boolean;
  active: Active | null;
}
```

**Behavior**:
- Registers element with DndContext on mount
- Provides `isOver` state derived from DndContext's collision detection
- Exposes `active` for conditional styling based on dragged item type

### useSortable

Combines draggable and droppable for sortable list items.

**Location**: `packages/mui-material/src/useSortable/useSortable.ts`

**Options**:
```typescript
interface UseSortableOptions {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: boolean;
  transition?: {
    duration?: number;   // Default: 200ms
    easing?: string;     // Default: 'ease'
  };
}
```

**Returns**:
```typescript
interface UseSortableReturn {
  // From useDraggable
  attributes: { ... };
  listeners: { ... } | undefined;
  isDragging: boolean;

  // From useDroppable
  isOver: boolean;
  active: Active | null;

  // Combined/computed
  setNodeRef: (node) => void;
  transform: Coordinates | null;
  transition: string | undefined;
  isSorting: boolean;
}
```

**Composition Pattern**:
```typescript
function useSortable(options) {
  const draggable = useDraggable({ id, data, disabled });
  const droppable = useDroppable({ id, data, disabled });

  // Merge refs
  const setNodeRef = (node) => {
    draggable.setNodeRef(node);
    droppable.setNodeRef(node);
    sortableContext?.registerItemRect(id, node.getBoundingClientRect());
  };

  // Transform: dragged item follows pointer, others shift via SortableContext
  const transform = isDragging
    ? draggable.transform
    : sortableContext?.getItemTransform(id);

  return { ...draggable, ...droppable, setNodeRef, transform, transition };
}
```

---

## Collision Detection Strategies

**Location**: `packages/mui-material/src/DndContext/collision.ts`

All strategies implement:
```typescript
type CollisionDetection = (args: {
  active: Active;
  droppables: Map<UniqueIdentifier, DroppableEntry>;
  pointerCoordinates: Coordinates;
}) => UniqueIdentifier | null;
```

### rectIntersection (Default)

Returns the droppable with the largest intersection area with the dragged item's virtual rect.

**Algorithm**:
1. For each droppable, check if rectangles intersect
2. Calculate intersection area: `width * height` of overlapping region
3. Return ID of droppable with maximum intersection area

**Best for**: General-purpose drag-and-drop, lists, tables

### pointerWithin

Returns the droppable that contains the pointer coordinates.

**Algorithm**:
1. Iterate droppables in reverse DOM order (prioritize elements on top)
2. Check if pointer (x, y) is within droppable bounds
3. Return first matching droppable ID

**Best for**: Small drop targets, precise placement requirements

### closestCenter

Returns the droppable whose center is closest to the dragged item's center.

**Algorithm**:
1. Calculate center of active draggable
2. For each droppable, calculate Euclidean distance between centers
3. Return ID of droppable with minimum distance

**Best for**: Grid layouts, dashboards with uniform item sizes

### closestCorners

Returns the droppable with the smallest aggregate corner distance.

**Algorithm**:
1. Get all 4 corners of active draggable
2. For each droppable, get all 4 corners
3. For each active corner, find minimum distance to any droppable corner
4. Sum these minimum distances for aggregate score
5. Return ID of droppable with smallest aggregate

**Best for**: Complex layouts, overlapping elements, precise alignment

---

## Sorting Strategies

**Location**: `packages/mui-material/src/SortableContext/strategies.ts`

All strategies implement:
```typescript
type SortingStrategyFn = (args: SortingStrategyArgs) => Coordinates | null;

interface SortingStrategyArgs {
  id: UniqueIdentifier;           // Item to calculate transform for
  activeId: UniqueIdentifier;     // Dragged item
  overId: UniqueIdentifier | null; // Current hover target
  items: UniqueIdentifier[];      // Ordered item list
  itemRects: Map<UniqueIdentifier, DOMRect>;
  columns?: number;               // For grid strategy
}
```

### verticalListSortingStrategy

Items shift up or down by the height of the dragged item.

```
Dragging item 1 to position 3:
Before:  [1] [2] [3]     After:  [_] [2↑] [3↑] ... [1]
               ↑ shifted up by item 1's height
```

### horizontalListSortingStrategy

Items shift left or right by the width of the dragged item.

```
Dragging item 1 to position 3:
Before:  [1] [2] [3]     After:  [_] [2←] [3←] ... [1]
               ← shifted left by item 1's width
```

### gridSortingStrategy

Items reflow based on column count, potentially shifting both horizontally and vertically.

```
3-column grid, dragging item 1 to position 5:
Before:         After:
[1] [2] [3]     [_] [2←] [3←]
[4] [5] [6]     [4↑←] [5↑←] [1]
```

---

## Component Integrations

All draggable components follow a consistent pattern:

1. **Wrap base component** with `styled()` for drag state styles
2. **Use `useSortable`** hook for drag functionality
3. **Apply transforms** via CSS `transform: translate3d()`
4. **Expose `ownerState`** for styling customization

### DraggableListItem

**Location**: `packages/mui-material/src/ListItem/DraggableListItem.tsx`

Wraps `ListItem` for sortable lists.

### DraggableTableRow

**Location**: `packages/mui-material/src/TableRow/DraggableTableRow.tsx`

Wraps `TableRow` with special handling for cell width preservation:

```typescript
// Capture cell widths on drag start
useEffect(() => {
  if (isDragging && rowRef.current) {
    const cells = rowRef.current.querySelectorAll(':scope > td, :scope > th');
    cellMetadataRef.current = Array.from(cells).map((cell) => ({
      width: cell.getBoundingClientRect().width,
      colSpan: cell.colSpan || 1,
    }));
  }
}, [isDragging]);

// Apply fixed widths to cells during drag
const processedChildren = Children.map(children, (child, index) => {
  if (!isDragging) return child;
  const metadata = cellMetadataRef.current[index];
  return cloneElement(child, {
    style: { width: metadata.width, minWidth: metadata.width, maxWidth: metadata.width },
  });
});
```

### DraggableGridItem

**Location**: `packages/mui-material/src/Grid/DraggableGridItem.tsx`

Wraps `Grid` item for dashboard layouts.

### DraggableChip

**Location**: `packages/mui-material/src/Chip/DraggableChip.tsx`

Wraps `Chip` for horizontal tag management with smaller dimensions.

---

## Data Flow

See [dnd-data-flow.mmd](./diagrams/dnd-data-flow.mmd) for the complete sequence diagram.

### Drag Start Flow

1. User triggers `pointerdown` or `keydown` (Enter/Space) on draggable
2. `useDraggable` calls `dragStart(id)` on DndContext
3. DndContext:
   - Looks up draggable in registry
   - Captures initial rect
   - Sets `active` state
   - Announces to screen reader
   - Calls `onDragStart` callback
4. Components re-render with `active !== null`

### Drag Move Flow (on each frame)

1. Pointer move or arrow key triggers `dragMove(coordinates)`
2. DndContext:
   - Calculates delta from start position
   - Computes virtual rect (initial rect + delta)
   - Runs collision detection synchronously
   - Updates `over` state immediately
   - Throttles callback dispatch with RAF
3. If `over` changed, announces new target to screen reader
4. SortableContext:
   - Recalculates transforms for all items based on new `activeId`/`overId`
5. Components re-render with new transforms

### Drag End Flow

1. User triggers `pointerup` or `keydown` (Enter/Space)
2. DndContext:
   - Runs final collision detection
   - Calls `onDragEnd({ active, over })`
   - Clears `active` and `over` state
   - Announces completion to screen reader
3. Application code in `onDragEnd` reorders data

---

## Accessibility

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus draggable element |
| Enter / Space | Pick up or drop item |
| Arrow Keys | Move item (25px per press) |
| Escape | Cancel drag operation |

### ARIA Attributes

Applied by `useDraggable`:
```typescript
{
  role: 'button',
  tabIndex: 0,
  'aria-describedby': 'dnd-instructions',
  'aria-pressed': isDragging,
  'aria-disabled': disabled,
}
```

### Screen Reader Announcements

DndContext renders a visually hidden live region:
```tsx
<div role="status" aria-live="assertive" aria-atomic="true" style={visuallyHidden}>
  {announcement}
</div>
```

Default announcements:
- **onDragStart**: "Picked up draggable item {id}."
- **onDragOver**: "Draggable item {id} is over droppable area {overId}."
- **onDragEnd**: "Draggable item {id} was dropped over droppable area {overId}."
- **onDragCancel**: "Dragging of item {id} was cancelled."

### Instructions Element

Hidden instructions referenced by `aria-describedby`:
```tsx
<div id="dnd-instructions" style={visuallyHidden}>
  To pick up a draggable item, press space or enter...
</div>
```

### Touch Accessibility

- `touchAction: 'none'` prevents browser gestures from interfering
- Touch targets meet 44x44px minimum via component sizing

---

## Performance Considerations

### RAF Throttling

Event callbacks are throttled with `requestAnimationFrame` to prevent excessive updates:

```typescript
const dragMove = useCallback((coordinates) => {
  // State updates are synchronous for immediate visual feedback
  setOver(newOver);

  // Callbacks are throttled
  if (rafRef.current !== null) {
    cancelAnimationFrame(rafRef.current);
  }
  rafRef.current = requestAnimationFrame(() => {
    onDragMoveProp?.(event);
    dispatchMonitorEvent('onDragMove', event);
  });
}, []);
```

### Virtual Rect Calculation

During drag, the active item's rect is calculated mathematically rather than querying the DOM:

```typescript
const virtualRect = {
  left: initialRect.left + delta.x,
  top: initialRect.top + delta.y,
  // ... no getBoundingClientRect() during drag
};
```

### Transform-Based Positioning

All drag movements use CSS transforms for GPU acceleration:

```typescript
const getTransformStyle = (x: number, y: number) =>
  `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
```

### Memoization

Context values are memoized to prevent unnecessary re-renders:

```typescript
const contextValue = useMemo(() => ({
  active,
  over,
  // ... methods are stable via useCallback
}), [active, over, ...]);
```

### Pointer Capture

`setPointerCapture` ensures reliable move/up event tracking even when pointer leaves the element:

```typescript
handlePointerDown = (event) => {
  event.currentTarget.setPointerCapture(event.pointerId);
  // Now pointermove/pointerup fire on this element regardless of pointer position
};
```

---

## Design Decisions & Rationale

### Pointer Events API

**Decision**: Use Pointer Events instead of separate mouse/touch handlers.

**Rationale**:
- Unified handling for mouse, touch, and pen input
- Wide browser support (all MUI-supported browsers)
- Built-in features like `setPointerCapture`
- Simpler codebase with single event path

### Single DndContext

**Decision**: One DndContext manages all drag state; no nested contexts.

**Rationale**:
- Simpler mental model for developers
- Avoids context propagation complexity
- Single source of truth for drag state
- Cross-container drag possible in future without architecture changes

### Composition in useSortable

**Decision**: `useSortable` internally composes `useDraggable` + `useDroppable` rather than being a separate implementation.

**Rationale**:
- DRY principle - no duplicated drag/drop logic
- Users can use hooks independently for custom scenarios
- Consistent behavior guaranteed between standalone and composed usage
- Easier maintenance - fixes in base hooks propagate automatically

### Cell Width Preservation (DraggableTableRow)

**Decision**: Capture and lock cell widths when drag starts.

**Rationale**:
- Table cells normally derive width from table layout algorithm
- When row is transformed, it loses table layout context
- Without fixed widths, cells collapse to content width
- Preserving colSpan ensures spanning cells render correctly

### Transform-Based Positioning

**Decision**: Use CSS transforms instead of absolute positioning.

**Rationale**:
- GPU-accelerated via compositor layer
- Doesn't affect document flow
- Works with CSS transitions out of the box
- No layout thrashing from repeated position changes

### Registry Pattern

**Decision**: Elements register themselves on mount rather than DndContext discovering them.

**Rationale**:
- No DOM traversal needed
- Works with any component structure
- Immediate registration when ref is set
- Clean unregistration on unmount via cleanup effect

### Synchronous Collision Detection, Async Callbacks

**Decision**: Update state synchronously but throttle callback dispatch.

**Rationale**:
- Immediate visual feedback is critical for drag UX
- User code in callbacks may be expensive
- RAF throttling prevents callback queue buildup
- State is always consistent for React renders

---

## File Structure Reference

```
packages/mui-material/src/
├── DndContext/
│   ├── DndContext.tsx           # Main provider component
│   ├── DndContextTypes.ts       # Type definitions
│   ├── useDndContext.ts         # Context consumer hook
│   ├── useDndMonitor.ts         # Monitor hook for observing events
│   ├── collision.ts             # Collision detection strategies
│   ├── transform.ts             # Transform utilities
│   ├── announcements.ts         # Screen reader announcements
│   └── index.ts                 # Public exports
├── SortableContext/
│   ├── SortableContext.tsx      # Sortable provider component
│   ├── strategies.ts            # Sorting strategies
│   └── index.ts                 # Public exports
├── useDraggable/
│   ├── useDraggable.ts          # Core draggable hook
│   └── index.ts
├── useDroppable/
│   ├── useDroppable.ts          # Core droppable hook
│   └── index.ts
├── useSortable/
│   ├── useSortable.ts           # Composed sortable hook
│   └── index.ts
├── ListItem/
│   ├── DraggableListItem.tsx    # Sortable list item component
│   └── draggableListItemClasses.ts
├── TableRow/
│   ├── DraggableTableRow.tsx    # Sortable table row component
│   └── draggableTableRowClasses.ts
├── Grid/
│   ├── DraggableGridItem.tsx    # Sortable grid item component
│   └── draggableGridItemClasses.ts
├── Chip/
│   ├── DraggableChip.tsx        # Sortable chip component
│   └── draggableChipClasses.ts
└── index.ts                     # Package public exports
```
