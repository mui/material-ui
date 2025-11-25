# Task List for MUI Native Drag-and-Drop System

## Orchestration Metadata
**Generated for:** Lemegeton v1.0+
**Estimated Total Complexity:** 94
**Recommended Agent Configuration:**
- Haiku agents: 6 (for complexity 1-3)
- Sonnet agents: 10 (for complexity 4-7)
- Opus agents: 1 (for complexity 8-10)

---

## Block 0: Planning Setup (No dependencies)

### PR-000: Initialize Planning Documents

---
pr_id: PR-000
title: Initialize Planning Documents
cold_state: complete
priority: critical
complexity:
  score: 2
  estimated_minutes: 15
  suggested_model: haiku
  rationale: Simple document creation task
dependencies: []
estimated_files:
  - path: planning/prd.md
    action: create
    description: Product Requirements Document for DnD system
  - path: planning/task-list.md
    action: create
    description: This task list with all PRs
---

**Description:**
Create the foundational planning documents for the native drag-and-drop system. This establishes the PRD with requirements and the task list for tracking implementation progress.

**Acceptance Criteria:**
- [x] PRD complete with all requirements
- [x] Task list properly formatted with YAML frontmatter
- [x] Package structure clarified for component locations

**Notes:**
This PR is already complete. The planning documents have been created and approved.

---

## Block 1: Core DnD Infrastructure (Depends on PR-000)

### PR-001: Implement DndContext Provider

---
pr_id: PR-001
title: Implement DndContext Provider
cold_state: complete
priority: high
complexity:
  score: 6
  estimated_minutes: 50
  suggested_model: sonnet
  rationale: Core state management with event coordination, moderate architecture decisions
dependencies: [PR-000]
estimated_files:
  - path: packages/mui-material/src/DndContext/DndContext.tsx
    action: create
    description: Main context provider component
  - path: packages/mui-material/src/DndContext/DndContextTypes.ts
    action: create
    description: TypeScript type definitions
  - path: packages/mui-material/src/DndContext/useDndContext.ts
    action: create
    description: Hook for consuming DndContext
  - path: packages/mui-material/src/DndContext/useDndMonitor.ts
    action: create
    description: Hook for subscribing to drag events
  - path: packages/mui-material/src/DndContext/collision.ts
    action: create
    description: Collision detection algorithms (rectIntersection, pointerWithin)
  - path: packages/mui-material/src/DndContext/announcements.ts
    action: create
    description: Screen reader announcement utilities
  - path: packages/mui-material/src/DndContext/index.ts
    action: create
    description: Public exports
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add DndContext export
  - path: packages/mui-material/src/index.d.ts
    action: modify
    description: Add DndContext type export
---

**Description:**
Implement the core DndContext provider that manages global drag-and-drop state. This is the foundation that all draggable and droppable components will use. Handles drag lifecycle events (start, move, over, end, cancel), coordinates between draggables and droppables, and provides accessibility announcements.

**Acceptance Criteria:**
- [x] DndContext provider manages drag state
- [x] Event callbacks (onDragStart, onDragMove, onDragOver, onDragEnd, onDragCancel) work correctly
- [x] Context values accessible to child components
- [x] TypeScript types properly exported
- [x] Follows MUI component patterns (styled, classes, etc.)

**Notes:**
COMPLETED. Implementation includes:
- Full type system in DndContextTypes.ts
- DndContext provider with drag lifecycle management
- useDndContext hook for internal consumption
- useDndMonitor hook for external event subscription
- Two collision detection algorithms: rectIntersection, pointerWithin
- Screen reader announcements with customization support
- Live region for accessibility
- RequestAnimationFrame throttling for performance

---

### PR-002: Implement useDraggable Hook

---
pr_id: PR-002
title: Implement useDraggable Hook
cold_state: complete
priority: high
complexity:
  score: 6
  estimated_minutes: 55
  suggested_model: sonnet
  rationale: Core hook with pointer event handling, accessibility, and state management
dependencies: [PR-001]
estimated_files:
  - path: packages/mui-material/src/useDraggable/useDraggable.ts
    action: create
    description: Main hook implementation with types
  - path: packages/mui-material/src/useDraggable/index.ts
    action: create
    description: Public exports
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add useDraggable export (line ~397, after useAutocomplete)
  - path: packages/mui-material/src/index.d.ts
    action: modify
    description: Add useDraggable type export (line ~409, after useAutocomplete)
---

**Description:**
Implement the useDraggable hook that makes any element draggable via Pointer Events. Returns attributes, listeners, ref setter, transform position, and drag state. Supports keyboard activation (Enter/Space to grab, arrows to move, Escape to cancel).

**Acceptance Criteria:**
- [x] Hook returns attributes, listeners, setNodeRef, transform, isDragging
- [x] Pointer events (pointerdown, pointermove, pointerup, pointercancel) handled correctly
- [x] Keyboard navigation works (Enter/Space, arrows, Escape)
- [x] ARIA attributes provided for accessibility
- [x] Integrates with DndContext for state coordination
- [x] Works on touch and mouse devices

**Notes:**
Use MUI's useEventCallback for stable references. Ensure SSR compatibility with useEnhancedEffect.

**Planning Notes (PR-002):**

**API Design:**
```typescript
interface UseDraggableOptions {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: boolean;
}

interface UseDraggableReturn {
  attributes: {
    role: 'button';
    tabIndex: 0;
    'aria-describedby': string;
    'aria-pressed': boolean;
    'aria-disabled': boolean;
  };
  listeners: {
    onPointerDown: (e: PointerEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
  };
  setNodeRef: (node: HTMLElement | null) => void;
  transform: { x: number; y: number } | null;
  isDragging: boolean;
}
```

**Implementation Approach:**
1. Use `useDndContext()` to access DndContext API
2. Register on mount via `registerDraggable(id, node, data)`
3. Unregister on unmount via `unregisterDraggable(id)`
4. Pointer event flow:
   - `onPointerDown`: Call `dragStart(id)`, set pointer capture
   - Track `onPointerMove` on document: Call `dragMove({x, y})`
   - `onPointerUp/Cancel`: Call `dragEnd()` or `dragCancel()`
5. Keyboard flow:
   - Enter/Space: Toggle drag mode
   - Arrow keys (during drag): Move by fixed increment
   - Escape: Cancel drag
6. Derive `isDragging` from `active?.id === id`
7. Derive `transform` from tracking delta between initial and current pointer position

**CSS Considerations:**
- Set `touch-action: none` on draggable element
- Apply `cursor: grab` (idle) / `cursor: grabbing` (dragging)
- Consider `user-select: none` during drag

**Parallel Execution:**
- Can run in parallel with PR-003 and PR-004
- Minor merge conflict expected with PR-003 on index.ts/index.d.ts (different export lines)

---

### PR-003: Implement useDroppable Hook

---
pr_id: PR-003
title: Implement useDroppable Hook
cold_state: complete
priority: high
complexity:
  score: 5
  estimated_minutes: 40
  suggested_model: sonnet
  rationale: Simpler than useDraggable, primarily detection and state
dependencies: [PR-001]
estimated_files:
  - path: packages/mui-material/src/useDroppable/useDroppable.ts
    action: create
    description: Main hook implementation with types
  - path: packages/mui-material/src/useDroppable/index.ts
    action: create
    description: Public exports
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add useDroppable export (line ~398, after useDraggable alphabetically)
  - path: packages/mui-material/src/index.d.ts
    action: modify
    description: Add useDroppable type export (line ~410, after useDraggable)
---

**Description:**
Implement the useDroppable hook that designates an element as a drop target. Returns ref setter, isOver state, and information about the currently active draggable. Supports nested drop zones with proper event propagation.

**Acceptance Criteria:**
- [x] Hook returns setNodeRef, isOver, active
- [x] Correctly detects when draggable is over drop zone
- [x] Provides information about active draggable item
- [x] Handles nested drop zones correctly
- [x] Integrates with DndContext

**Notes:**
COMPLETED. Implementation includes:
- Simple hook that registers/unregisters with DndContext
- Derives isOver from context's over state
- Passes through active draggable info from context
- Uses MUI patterns: useEventCallback, useEnhancedEffect
- Full TypeScript types and JSDoc documentation
- Examples showing basic usage and custom data filtering

**Planning Notes (PR-003):**

**API Design:**
```typescript
interface UseDroppableOptions {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: boolean;
}

interface UseDroppableReturn {
  setNodeRef: (node: HTMLElement | null) => void;
  isOver: boolean;
  active: Active | null;  // Currently dragged item info
}
```

**Implementation Approach:**
1. Use `useDndContext()` to access:
   - `registerDroppable` / `unregisterDroppable`
   - `active` - currently dragged item
   - `over` - currently hovered drop target
2. Register on mount via `registerDroppable(id, node, data)`
3. Unregister on unmount via `unregisterDroppable(id)`
4. Derive `isOver` from `over?.id === id`
5. Pass through `active` from context

**Key Characteristics:**
- Much simpler than useDraggable - no event handling needed
- Purely registration + state derivation
- Collision detection happens in DndContext, not in this hook
- Nested droppables handled by collision detection algorithm (pointerWithin prioritizes later DOM elements)

**ARIA Considerations:**
- Consider adding `aria-dropeffect` (deprecated but still useful)
- Or use custom labeling via `aria-label`

**Parallel Execution:**
- Can run in parallel with PR-002 and PR-004
- Minor merge conflict expected with PR-002 on index.ts/index.d.ts (different export lines, simple rebase)

---

### PR-004: Implement Internal Utilities

---
pr_id: PR-004
title: Implement Internal Utilities
cold_state: complete
priority: high
complexity:
  score: 4
  estimated_minutes: 35
  suggested_model: sonnet
  rationale: Reduced scope - only additional collision algorithms and transform utilities needed
dependencies: [PR-001]
estimated_files:
  - path: packages/mui-material/src/DndContext/collision.ts
    action: modify
    description: Add closestCenter and closestCorners collision algorithms
  - path: packages/mui-material/src/DndContext/index.ts
    action: modify
    description: Export new collision algorithms
  - path: packages/mui-material/src/DndContext/transform.ts
    action: create
    description: Coordinate transform utilities for drag positioning
---

**Description:**
Implement additional collision detection algorithms and coordinate transform utilities. These extend the DndContext capabilities for advanced use cases.

**IMPORTANT SCOPE REVISION:**
PR-001 already implemented:
- `rectIntersection` collision detection (DndContext/collision.ts)
- `pointerWithin` collision detection (DndContext/collision.ts)
- Accessibility announcements (DndContext/announcements.ts)

This PR now focuses on:
1. Additional collision algorithms: `closestCenter`, `closestCorners`
2. Transform utilities for calculating visual offsets during drag

**Acceptance Criteria:**
- [x] closestCenter collision algorithm works correctly
- [x] closestCorners collision algorithm works correctly
- [x] Transform utilities calculate drag positions accurately
- [x] All utilities are tree-shakeable
- [x] Performance acceptable for 100+ items

**Notes:**
Export collision algorithms and transform utilities from DndContext for advanced users. Can be developed in parallel with PR-002 and PR-003.

**Planning Notes (PR-004):**

**closestCenter Algorithm:**
```typescript
export function closestCenter({
  active,
  droppables,
}: CollisionDetectionArgs): UniqueIdentifier | null {
  // Calculate center of active draggable
  const activeCenter = {
    x: active.rect.left + active.rect.width / 2,
    y: active.rect.top + active.rect.height / 2,
  };

  let minDistance = Infinity;
  let result: UniqueIdentifier | null = null;

  droppables.forEach((droppable, id) => {
    const rect = droppable.node.getBoundingClientRect();
    const droppableCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Euclidean distance
    const distance = Math.sqrt(
      Math.pow(activeCenter.x - droppableCenter.x, 2) +
      Math.pow(activeCenter.y - droppableCenter.y, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      result = id;
    }
  });

  return result;
}
```

**closestCorners Algorithm:**
- Calculate distances from all 4 corners of active to all 4 corners of each droppable
- Sum or average the minimum corner-to-corner distances
- Return droppable with smallest aggregate distance

**Transform Utilities:**
```typescript
// Get CSS transform string from coordinates
export function getTransformStyle(x: number, y: number): string {
  return `translate3d(${x}px, ${y}px, 0)`;
}

// Calculate relative position within a container
export function getRelativePosition(
  element: HTMLElement,
  container: HTMLElement
): Coordinates { ... }

// Apply transform to element (for drag overlay)
export function applyTransform(
  element: HTMLElement,
  transform: Coordinates
): void { ... }
```

**Parallel Execution:**
- NO file conflicts with PR-002 or PR-003
- Only touches DndContext files (collision.ts, index.ts, new transform.ts)
- Safe to run fully in parallel

---

## Block 2: Higher-Level Abstractions (Depends on Block 1)

### PR-005: Implement useSortable Hook

---
pr_id: PR-005
title: Implement useSortable Hook
cold_state: new
priority: high
complexity:
  score: 6
  estimated_minutes: 50
  suggested_model: sonnet
  rationale: Combines useDraggable and useDroppable with sort order calculation
dependencies: [PR-002, PR-003, PR-004]
estimated_files:
  - path: packages/mui-material/src/useSortable/useSortable.ts
    action: create
    description: Main hook implementation
  - path: packages/mui-material/src/useSortable/useSortable.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/useSortable/index.ts
    action: create
    description: Public exports
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add useSortable export
---

**Description:**
Implement the useSortable hook that combines useDraggable and useDroppable functionality for sortable lists. Calculates sort order based on pointer position and provides transition styles for smooth reordering animations.

**Acceptance Criteria:**
- [ ] Hook combines draggable and droppable functionality
- [ ] Returns all properties from both hooks plus transition
- [ ] Sort order calculation works for vertical, horizontal, and grid layouts
- [ ] Smooth animations during reordering
- [ ] Integrates with SortableContext for list management

**Notes:**
This is the primary hook most users will use for sortable lists. Ensure the API is intuitive.

---

### PR-006: Implement SortableContext Provider

---
pr_id: PR-006
title: Implement SortableContext Provider
cold_state: new
priority: high
complexity:
  score: 4
  estimated_minutes: 35
  suggested_model: sonnet
  rationale: Context provider with list order tracking
dependencies: [PR-001, PR-005]
estimated_files:
  - path: packages/mui-material/src/SortableContext/SortableContext.tsx
    action: create
    description: Sortable context provider component
  - path: packages/mui-material/src/SortableContext/SortableContext.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/SortableContext/index.ts
    action: create
    description: Public exports
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add SortableContext export
---

**Description:**
Implement the SortableContext provider that tracks item order for sortable lists. Manages the items array and provides sorting strategy (vertical, horizontal, grid) to child useSortable hooks.

**Acceptance Criteria:**
- [ ] Provider tracks item order
- [ ] Supports vertical, horizontal, and grid strategies
- [ ] Integrates with DndContext
- [ ] Provides context values to useSortable hooks
- [ ] TypeScript types properly exported

**Notes:**
Keep nested inside DndContext. Study how MUI handles nested contexts.

---

## Block 3: Core Tests (Adversarial - Depends on Block 2)

### PR-007: Unit Tests for Core Hooks

---
pr_id: PR-007
title: Unit Tests for Core Hooks
cold_state: new
priority: high
complexity:
  score: 5
  estimated_minutes: 60
  suggested_model: sonnet
  rationale: Comprehensive testing of hooks with mocking and edge cases
dependencies: [PR-002, PR-003, PR-004]
estimated_files:
  - path: packages/mui-material/src/useDraggable/useDraggable.test.ts
    action: create
    description: useDraggable unit tests
  - path: packages/mui-material/src/useDroppable/useDroppable.test.ts
    action: create
    description: useDroppable unit tests
  - path: packages/mui-material/src/DndContext/DndContext.test.tsx
    action: create
    description: DndContext unit tests
  - path: packages/mui-material/src/internal/collision/collision.test.ts
    action: create
    description: Collision detection tests
---

**Description:**
Comprehensive unit tests for core DnD hooks and utilities. Focus on edge cases, error scenarios, and accessibility requirements. Tests should actively try to break the implementation.

**Acceptance Criteria:**
- [ ] >90% code coverage for useDraggable
- [ ] >90% code coverage for useDroppable
- [ ] >90% code coverage for DndContext
- [ ] Collision detection algorithms thoroughly tested
- [ ] Keyboard navigation tested
- [ ] Touch and mouse events tested
- [ ] Error scenarios covered

**Notes:**
Adversarial testing - actively look for bugs. Test rapid interactions, edge cases, and accessibility.

---

### PR-008: Unit Tests for Sortable Abstractions

---
pr_id: PR-008
title: Unit Tests for Sortable Abstractions
cold_state: new
priority: high
complexity:
  score: 4
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Testing higher-level hooks with integration scenarios
dependencies: [PR-005, PR-006]
estimated_files:
  - path: packages/mui-material/src/useSortable/useSortable.test.ts
    action: create
    description: useSortable unit tests
  - path: packages/mui-material/src/SortableContext/SortableContext.test.tsx
    action: create
    description: SortableContext unit tests
---

**Description:**
Unit tests for useSortable hook and SortableContext provider. Test sorting behavior, animations, and integration between the two.

**Acceptance Criteria:**
- [ ] >90% code coverage for useSortable
- [ ] >90% code coverage for SortableContext
- [ ] Vertical, horizontal, and grid sorting tested
- [ ] Animation transitions tested
- [ ] Edge cases (empty list, single item, rapid reordering) tested

**Notes:**
These tests build on the core hook tests. Focus on the sortable-specific behavior.

---

## Block 4: Component Integrations (Depends on Block 2, Parallel)

### PR-009: Implement DraggableListItem

---
pr_id: PR-009
title: Implement DraggableListItem
cold_state: new
priority: medium
complexity:
  score: 5
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Component integration with existing MUI List patterns
dependencies: [PR-005, PR-006]
estimated_files:
  - path: packages/mui-material/src/ListItem/DraggableListItem.tsx
    action: create
    description: Draggable list item component
  - path: packages/mui-material/src/ListItem/DraggableListItem.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/ListItem/index.ts
    action: modify
    description: Add DraggableListItem export
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add DraggableListItem export
---

**Description:**
Implement DraggableListItem component that wraps ListItem with drag-and-drop functionality. Integrates with MUI theming and provides visual feedback during drag operations.

**Acceptance Criteria:**
- [ ] Extends ListItem props with draggable properties
- [ ] Works with useSortable for list reordering
- [ ] Visual feedback (elevation, opacity) during drag
- [ ] Inherits MUI theming
- [ ] Maintains backward compatibility with ListItem

**Notes:**
Co-located with ListItem. Follow MUI's component composition patterns.

---

### PR-010: Implement DraggableTableRow

---
pr_id: PR-010
title: Implement DraggableTableRow
cold_state: new
priority: medium
complexity:
  score: 5
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Table integration requires handling table-specific layout constraints
dependencies: [PR-005, PR-006]
estimated_files:
  - path: packages/mui-material/src/TableRow/DraggableTableRow.tsx
    action: create
    description: Draggable table row component
  - path: packages/mui-material/src/TableRow/DraggableTableRow.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/TableRow/index.ts
    action: modify
    description: Add DraggableTableRow export
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add DraggableTableRow export
---

**Description:**
Implement DraggableTableRow component for reorderable table rows. Must handle table layout constraints (cells, widths) while dragging.

**Acceptance Criteria:**
- [ ] Extends TableRow props with draggable properties
- [ ] Maintains cell widths during drag
- [ ] Visual feedback during drag
- [ ] Works within Table component structure
- [ ] Inherits MUI theming

**Notes:**
Tables are trickier due to layout constraints. May need to render a drag preview that maintains cell structure.

---

### PR-011: Implement DraggableGridItem

---
pr_id: PR-011
title: Implement DraggableGridItem
cold_state: new
priority: medium
complexity:
  score: 5
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Grid requires 2D sorting strategy
dependencies: [PR-005, PR-006]
estimated_files:
  - path: packages/mui-material/src/Grid/DraggableGridItem.tsx
    action: create
    description: Draggable grid item component
  - path: packages/mui-material/src/Grid/DraggableGridItem.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/Grid/index.ts
    action: modify
    description: Add DraggableGridItem export
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add DraggableGridItem export
---

**Description:**
Implement DraggableGridItem for dashboard-style layouts with 2D reordering. Uses grid sorting strategy for proper placement calculations.

**Acceptance Criteria:**
- [ ] Works with Grid component for dashboard layouts
- [ ] Supports 2D reordering (grid strategy)
- [ ] Visual feedback during drag
- [ ] Responsive behavior maintained
- [ ] Inherits MUI theming

**Notes:**
Grid sorting is more complex than vertical/horizontal. Ensure the grid strategy in SortableContext handles this.

---

### PR-012: Implement DraggableChip

---
pr_id: PR-012
title: Implement DraggableChip
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 35
  suggested_model: sonnet
  rationale: Simpler component, horizontal sorting
dependencies: [PR-005, PR-006]
estimated_files:
  - path: packages/mui-material/src/Chip/DraggableChip.tsx
    action: create
    description: Draggable chip component
  - path: packages/mui-material/src/Chip/DraggableChip.d.ts
    action: create
    description: TypeScript declarations
  - path: packages/mui-material/src/Chip/index.ts
    action: modify
    description: Add DraggableChip export
  - path: packages/mui-material/src/index.ts
    action: modify
    description: Add DraggableChip export
---

**Description:**
Implement DraggableChip for tag management use cases. Typically used in horizontal layouts for reordering tags/labels.

**Acceptance Criteria:**
- [ ] Extends Chip props with draggable properties
- [ ] Works well in horizontal chip lists
- [ ] Visual feedback during drag
- [ ] Works with Chip variants (outlined, filled)
- [ ] Inherits MUI theming

**Notes:**
Simplest of the component integrations. Good candidate for demonstrating the pattern.

---

## Block 5: Component Tests (Adversarial - Depends on Block 4)

### PR-013: Tests for DraggableListItem and DraggableTableRow

---
pr_id: PR-013
title: Tests for DraggableListItem and DraggableTableRow
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 50
  suggested_model: sonnet
  rationale: Integration testing for list and table components
dependencies: [PR-009, PR-010]
estimated_files:
  - path: packages/mui-material/src/ListItem/DraggableListItem.test.tsx
    action: create
    description: DraggableListItem integration tests
  - path: packages/mui-material/src/TableRow/DraggableTableRow.test.tsx
    action: create
    description: DraggableTableRow integration tests
---

**Description:**
Integration tests for DraggableListItem and DraggableTableRow. Test component behavior, theming integration, and edge cases.

**Acceptance Criteria:**
- [ ] Component rendering tests pass
- [ ] Drag interactions tested
- [ ] Theming integration verified
- [ ] Accessibility attributes present
- [ ] Edge cases (disabled, nested content) tested

**Notes:**
Focus on component-specific behavior, not duplicating core hook tests.

---

### PR-014: Tests for DraggableGridItem and DraggableChip

---
pr_id: PR-014
title: Tests for DraggableGridItem and DraggableChip
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Integration testing for grid and chip components
dependencies: [PR-011, PR-012]
estimated_files:
  - path: packages/mui-material/src/Grid/DraggableGridItem.test.tsx
    action: create
    description: DraggableGridItem integration tests
  - path: packages/mui-material/src/Chip/DraggableChip.test.tsx
    action: create
    description: DraggableChip integration tests
---

**Description:**
Integration tests for DraggableGridItem and DraggableChip. Test component behavior, grid sorting strategy, and theming.

**Acceptance Criteria:**
- [ ] Component rendering tests pass
- [ ] Grid 2D sorting behavior tested
- [ ] Chip horizontal reordering tested
- [ ] Theming integration verified
- [ ] Accessibility attributes present

**Notes:**
Ensure grid strategy works correctly for 2D layouts.

---

## Block 6: Documentation (Depends on Block 4)

### PR-015: Component Demo Pages

---
pr_id: PR-015
title: Component Demo Pages
cold_state: new
priority: medium
complexity:
  score: 5
  estimated_minutes: 60
  suggested_model: sonnet
  rationale: Multiple demo pages following MUI patterns, before/after comparisons
dependencies: [PR-009, PR-010, PR-011, PR-012]
estimated_files:
  - path: docs/data/material/components/lists/DraggableList.tsx
    action: create
    description: Draggable list demo
  - path: docs/data/material/components/lists/DraggableList.md
    action: create
    description: Draggable list documentation
  - path: docs/data/material/components/tables/DraggableTable.tsx
    action: create
    description: Draggable table demo
  - path: docs/data/material/components/tables/DraggableTable.md
    action: create
    description: Draggable table documentation
  - path: docs/data/material/components/grid/DraggableGrid.tsx
    action: create
    description: Draggable grid demo
  - path: docs/data/material/components/grid/DraggableGrid.md
    action: create
    description: Draggable grid documentation
  - path: docs/data/material/components/chips/DraggableChips.tsx
    action: create
    description: Draggable chips demo
  - path: docs/data/material/components/chips/DraggableChips.md
    action: create
    description: Draggable chips documentation
---

**Description:**
Create demo pages for each draggable component following MUI documentation patterns. Each demo includes basic usage, customization examples, accessibility notes, and before/after code comparisons with react-beautiful-dnd.

**Acceptance Criteria:**
- [ ] Demo pages for all four component types
- [ ] Follow MUI documentation patterns
- [ ] Include before/after code snippets (react-beautiful-dnd vs native)
- [ ] Accessibility guidance included
- [ ] Interactive demos work correctly

**Notes:**
These are the permanent demo pages that will be included in the PR to upstream MUI.

---

### PR-016: Video Demo Playground

---
pr_id: PR-016
title: Video Demo Playground
cold_state: new
priority: medium
complexity:
  score: 3
  estimated_minutes: 30
  suggested_model: haiku
  rationale: Single consolidated page, temporary, straightforward
dependencies: [PR-009, PR-010, PR-011, PR-012]
estimated_files:
  - path: docs/pages/experiments/drag-and-drop-playground.tsx
    action: create
    description: Consolidated demo playground for video recording
---

**Description:**
Create a temporary consolidated playground page for recording the demo video. Shows all four component types side-by-side with react-beautiful-dnd comparison. This page will be removed before PR submission to upstream.

**Acceptance Criteria:**
- [ ] All four draggable components demonstrated
- [ ] Side-by-side comparison with react-beautiful-dnd
- [ ] Performance metrics visible
- [ ] Clean, presentable layout for video
- [ ] Clearly marked as temporary/experimental

**Notes:**
This is for the assignment video only. Remove before upstream PR.

---

### PR-017: Migration Guide and API Docs

---
pr_id: PR-017
title: Migration Guide and API Docs
cold_state: new
priority: medium
complexity:
  score: 4
  estimated_minutes: 45
  suggested_model: sonnet
  rationale: Technical writing with code examples
dependencies: [PR-015]
estimated_files:
  - path: docs/data/material/guides/drag-and-drop-migration.md
    action: create
    description: Migration guide from react-beautiful-dnd
  - path: docs/data/material/components/drag-and-drop/drag-and-drop.md
    action: create
    description: Main DnD documentation page
---

**Description:**
Create migration guide showing how to convert from react-beautiful-dnd to native MUI DnD. Include API reference documentation with all hooks and components.

**Acceptance Criteria:**
- [ ] Step-by-step migration guide
- [ ] Common patterns mapped between libraries
- [ ] API reference for all hooks
- [ ] API reference for all components
- [ ] Troubleshooting section

**Notes:**
This helps adoption. Users with existing react-beautiful-dnd implementations need a clear upgrade path.

---

## Block 7: E2E Tests and Final (Depends on all above)

### PR-018: E2E Tests

---
pr_id: PR-018
title: E2E Tests
cold_state: new
priority: medium
complexity:
  score: 6
  estimated_minutes: 60
  suggested_model: sonnet
  rationale: Cross-browser E2E tests with Playwright, touch simulation
dependencies: [PR-007, PR-008, PR-013, PR-014]
estimated_files:
  - path: test/e2e/drag-and-drop.spec.ts
    action: create
    description: E2E tests for DnD functionality
  - path: test/e2e/drag-and-drop-accessibility.spec.ts
    action: create
    description: Accessibility E2E tests
---

**Description:**
End-to-end tests using Playwright for cross-browser verification. Test mouse, touch, and keyboard interactions. Run accessibility audits with axe-core.

**Acceptance Criteria:**
- [ ] Mouse drag operations tested across browsers
- [ ] Touch drag operations tested
- [ ] Keyboard navigation tested
- [ ] Accessibility audit passes (axe-core)
- [ ] Visual regression tests for drag states
- [ ] Performance benchmarks documented

**Notes:**
These are the final quality gate before the feature is complete.

---

### PR-019: Architecture Documentation

---
pr_id: PR-019
title: Generate Comprehensive Architecture Documentation
cold_state: new
priority: medium
complexity:
  score: 8
  estimated_minutes: 90
  suggested_model: opus
  rationale: Requires system-wide understanding and synthesis of all implementation decisions
dependencies: [PR-001, PR-002, PR-003, PR-004, PR-005, PR-006, PR-009, PR-010, PR-011, PR-012, PR-015, PR-017, PR-018]
estimated_files:
  - path: docs/architecture.md
    action: create
    description: Comprehensive technical documentation
  - path: docs/diagrams/dnd-system-overview.mmd
    action: create
    description: Mermaid diagram for system architecture
  - path: docs/diagrams/dnd-data-flow.mmd
    action: create
    description: Mermaid diagram for data flow
---

**Description:**
Create detailed technical documentation that serves as the definitive reference for the DnD system's design, implementation, and operational characteristics. This is for the assignment deliverables, not necessarily for upstream PR.

**Acceptance Criteria:**
- [ ] Complete system architecture documented
- [ ] All design decisions explained with rationale
- [ ] Mermaid diagrams for visual representation
- [ ] Hook and component relationships documented
- [ ] Performance characteristics documented
- [ ] Integration patterns explained

**Notes:**
High complexity task requiring comprehensive system understanding. Opus recommended. This is the final PR in the dependency graph and synthesizes all the work done.

---

## Dependency Graph Summary

```
PR-000 (Planning)
   │
   ├── PR-001 (DndContext)
   │      │
   │      ├── PR-002 (useDraggable) ──┬── PR-005 (useSortable) ──┬── PR-009 (DraggableListItem) ── PR-013 (Tests)
   │      │                           │                          ├── PR-010 (DraggableTableRow) ── PR-013 (Tests)
   │      ├── PR-003 (useDroppable) ──┤                          ├── PR-011 (DraggableGridItem) ── PR-014 (Tests)
   │      │                           │                          └── PR-012 (DraggableChip) ────── PR-014 (Tests)
   │      └── PR-004 (Internal Utils) ┘                                      │
   │                                                                         │
   │      PR-006 (SortableContext) ──────────────────────────────────────────┘
   │
   ├── PR-007 (Core Hook Tests)
   ├── PR-008 (Sortable Tests)
   │
   ├── PR-015 (Demo Pages) ── PR-017 (Migration Guide)
   ├── PR-016 (Video Playground)
   │
   └── PR-018 (E2E Tests) ── PR-019 (Architecture Docs)
```

## Parallel Execution Opportunities

**Block 1** (after PR-000):
- PR-002, PR-003, PR-004 can run in parallel

**Block 4** (after PR-005, PR-006):
- PR-009, PR-010, PR-011, PR-012 can run in parallel

**Block 5** (after Block 4):
- PR-013, PR-014 can run in parallel

**Block 6** (after Block 4):
- PR-015, PR-016, PR-017 can run in parallel with Block 5
