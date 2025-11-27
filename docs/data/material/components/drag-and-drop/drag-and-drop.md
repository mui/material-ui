# Drag and Drop

<p class="description">Native drag-and-drop system for Material UI with low-level hooks and pre-built component integrations.</p>

## Overview

Material UI's drag-and-drop system provides both low-level hooks (`useDraggable`, `useDroppable`, `useSortable`) for building custom drag interactions, and pre-built component integrations (`DraggableListItem`, `DraggableTableRow`, `DraggableGridItem`, `DraggableChip`) for common use cases.

### Key features

- **Zero dependencies**: Built into MUI, no additional packages required
- **Full accessibility**: Keyboard navigation and screen reader support
- **Touch support**: Native Pointer Events API for mobile
- **MUI theming**: Automatic integration with your theme
- **TypeScript**: Full type definitions included
- **Minimal bundle**: ~7KB gzipped for core functionality

## Getting Started

### Basic Sortable List

```tsx
import * as React from 'react';
import { DndContext, DragEndEvent } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableListItem } from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

function BasicSortableList() {
  const [items, setItems] = React.useState([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const reordered = [...prev];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);
        return reordered;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy="vertical">
        <List>
          {items.map((item) => (
            <DraggableListItem key={item.id} id={item.id}>
              <ListItemText primary={item.label} />
            </DraggableListItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}
```

## Core Hooks

### useDraggable

Low-level hook that makes any element draggable.

```tsx
import { useDraggable } from '@mui/material/useDraggable';

function DraggableBox() {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable-1',
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Drag me
    </div>
  );
}
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier for this draggable |
| `data` | `Record<string, unknown>` | `undefined` | Optional data attached to drag events |
| `disabled` | `boolean` | `false` | Disables drag functionality |

#### Return Value

| Name | Type | Description |
|------|------|-------------|
| `attributes` | `object` | ARIA attributes for accessibility |
| `listeners` | `object` | Event handlers for drag interactions |
| `setNodeRef` | `function` | Ref callback for the draggable element |
| `transform` | `{ x: number, y: number } \| null` | Current drag offset |
| `isDragging` | `boolean` | Whether this element is being dragged |

### useDroppable

Low-level hook that designates an element as a drop target.

```tsx
import { useDroppable } from '@mui/material/useDroppable';

function DropZone() {
  const { setNodeRef, isOver, active } = useDroppable({
    id: 'droppable-1',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? '#e3f2fd' : '#fafafa',
        border: '2px dashed #ccc',
        padding: 20,
      }}
    >
      {active ? `Drop ${active.id} here` : 'Drop zone'}
    </div>
  );
}
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier for this droppable |
| `data` | `Record<string, unknown>` | `undefined` | Optional data attached to this drop zone |
| `disabled` | `boolean` | `false` | Disables drop functionality |

#### Return Value

| Name | Type | Description |
|------|------|-------------|
| `setNodeRef` | `function` | Ref callback for the droppable element |
| `isOver` | `boolean` | Whether a draggable is currently over this zone |
| `active` | `Active \| null` | Information about the currently dragged item |

### useSortable

Higher-level hook combining draggable and droppable for sortable lists.

```tsx
import { useSortable } from '@mui/material/useSortable';

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
```

#### Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier for this sortable item |
| `data` | `Record<string, unknown>` | `undefined` | Optional data attached to drag events |
| `disabled` | `boolean` | `false` | Disables drag functionality |
| `transition` | `{ duration?: number, easing?: string }` | `{ duration: 200, easing: 'ease' }` | Animation configuration |

#### Return Value

| Name | Type | Description |
|------|------|-------------|
| `attributes` | `object` | ARIA attributes for accessibility |
| `listeners` | `object` | Event handlers for drag interactions |
| `setNodeRef` | `function` | Ref callback for the sortable element |
| `transform` | `{ x: number, y: number } \| null` | Current position offset |
| `transition` | `string \| undefined` | CSS transition string |
| `isDragging` | `boolean` | Whether this element is being dragged |
| `isSorting` | `boolean` | Whether a sort operation is in progress |

## Context Providers

### DndContext

Provider component that manages drag-and-drop state for all descendant draggables and droppables.

```tsx
import { DndContext } from '@mui/material/DndContext';

<DndContext
  onDragStart={(event) => console.log('Started dragging', event.active.id)}
  onDragMove={(event) => console.log('Moving', event.active.id)}
  onDragOver={(event) => console.log('Over', event.over?.id)}
  onDragEnd={(event) => console.log('Dropped', event.active.id, 'on', event.over?.id)}
  onDragCancel={(event) => console.log('Cancelled', event.active.id)}
>
  {children}
</DndContext>
```

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Child components |
| `onDragStart` | `(event: DragStartEvent) => void` | `undefined` | Called when drag starts |
| `onDragMove` | `(event: DragMoveEvent) => void` | `undefined` | Called during drag |
| `onDragOver` | `(event: DragOverEvent) => void` | `undefined` | Called when over a droppable |
| `onDragEnd` | `(event: DragEndEvent) => void` | `undefined` | Called when drag ends |
| `onDragCancel` | `(event: DragCancelEvent) => void` | `undefined` | Called when drag is cancelled |
| `collisionDetection` | `CollisionDetection` | `rectIntersection` | Collision detection algorithm |
| `accessibility` | `DndAccessibility` | `defaultAccessibility` | Accessibility configuration |

#### Event Objects

```typescript
interface DragStartEvent {
  active: Active;  // { id, data, rect }
}

interface DragMoveEvent {
  active: Active;
  over: Over | null;  // { id, data, rect }
  delta: { x: number, y: number };
}

interface DragEndEvent {
  active: Active;
  over: Over | null;
  delta: { x: number, y: number };
}
```

### SortableContext

Provider for sortable lists that tracks item order and provides sorting context.

```tsx
import { SortableContext } from '@mui/material/SortableContext';

<SortableContext
  items={['item-1', 'item-2', 'item-3']}
  strategy="vertical"
>
  {children}
</SortableContext>
```

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Child components |
| `items` | `UniqueIdentifier[]` | required | Array of item IDs in current order |
| `strategy` | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Sorting strategy |
| `columns` | `number` | `undefined` | Number of columns for grid strategy |

## Component Integrations

### DraggableListItem

Sortable list item with drag-and-drop functionality.

```tsx
import { DraggableListItem } from '@mui/material/ListItem';

<DraggableListItem
  id="item-1"
  dragDisabled={false}
  transition={{ duration: 200, easing: 'ease' }}
>
  <ListItemText primary="Draggable item" />
</DraggableListItem>
```

#### Props

Extends all `ListItemProps` plus:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier |
| `data` | `Record<string, unknown>` | `undefined` | Data attached to drag events |
| `dragDisabled` | `boolean` | `false` | Disables drag functionality |
| `transition` | `{ duration?: number, easing?: string }` | `{ duration: 200, easing: 'ease' }` | Animation configuration |

### DraggableTableRow

Sortable table row that preserves cell widths during drag.

```tsx
import { DraggableTableRow } from '@mui/material/TableRow';

<DraggableTableRow id="row-1">
  <TableCell>Name</TableCell>
  <TableCell>Status</TableCell>
</DraggableTableRow>
```

#### Props

Extends all `TableRowProps` plus:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier |
| `data` | `Record<string, unknown>` | `undefined` | Data attached to drag events |
| `dragDisabled` | `boolean` | `false` | Disables drag functionality |
| `transition` | `{ duration?: number, easing?: string }` | `{ duration: 200, easing: 'ease' }` | Animation configuration |

### DraggableGridItem

Sortable grid item for dashboard-style 2D layouts.

```tsx
import { DraggableGridItem } from '@mui/material/Grid';

<DraggableGridItem id="card-1" size={{ xs: 12, sm: 6, md: 4 }}>
  <Card>Dashboard card</Card>
</DraggableGridItem>
```

#### Props

Extends all `GridProps` (except `container`) plus:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier |
| `data` | `Record<string, unknown>` | `undefined` | Data attached to drag events |
| `dragDisabled` | `boolean` | `false` | Disables drag functionality |
| `transition` | `{ duration?: number, easing?: string }` | `{ duration: 200, easing: 'ease' }` | Animation configuration |

### DraggableChip

Sortable chip for tag management.

```tsx
import { DraggableChip } from '@mui/material/Chip';

<DraggableChip
  id="tag-1"
  label="React"
  color="primary"
  variant="outlined"
  onDelete={() => handleDelete('tag-1')}
/>
```

#### Props

Extends all `ChipProps` plus:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `UniqueIdentifier` | required | Unique identifier |
| `data` | `Record<string, unknown>` | `undefined` | Data attached to drag events |
| `dragDisabled` | `boolean` | `false` | Disables drag functionality |
| `transition` | `{ duration?: number, easing?: string }` | `{ duration: 200, easing: 'ease' }` | Animation configuration |

## Advanced Topics

### Collision Detection

MUI provides several collision detection algorithms:

```tsx
import {
  rectIntersection,
  pointerWithin,
  closestCenter,
  closestCorners,
} from '@mui/material/DndContext';

<DndContext collisionDetection={closestCenter}>
  {children}
</DndContext>
```

| Algorithm | Description | Best for |
|-----------|-------------|----------|
| `rectIntersection` | Triggers when rectangles overlap (default) | General use |
| `pointerWithin` | Triggers based on pointer position | Precise targeting |
| `closestCenter` | Finds droppable with closest center | Sortable lists |
| `closestCorners` | Finds droppable with closest corners | Grid layouts |

### Keyboard Navigation

All draggable components support keyboard interaction:

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Pick up or drop item |
| `Arrow keys` | Move item in that direction |
| `Escape` | Cancel drag operation |

Keyboard dragging is announced to screen readers automatically.

### Custom Screen Reader Announcements

```tsx
<DndContext
  accessibility={{
    announcements: {
      onDragStart: ({ active }) =>
        `Picked up draggable item ${active.id}.`,
      onDragOver: ({ active, over }) =>
        over
          ? `Draggable item ${active.id} is over droppable area ${over.id}.`
          : `Draggable item ${active.id} is no longer over a droppable area.`,
      onDragEnd: ({ active, over }) =>
        over
          ? `Draggable item ${active.id} was dropped over droppable area ${over.id}.`
          : `Draggable item ${active.id} was dropped.`,
      onDragCancel: ({ active }) =>
        `Dragging was cancelled. Draggable item ${active.id} was dropped.`,
    },
    screenReaderInstructions: {
      draggable: 'Press Enter or Space to start dragging. Use arrow keys to move. Press Enter or Space again to drop, or press Escape to cancel.',
    },
  }}
>
```

### Using Hooks with Custom Components

```tsx
import { useSortable } from '@mui/material/useSortable';
import { getTransformStyle } from '@mui/material/DndContext';

function CustomSortableCard({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <Card
      ref={setNodeRef}
      sx={{
        transform: transform ? getTransformStyle(transform.x, transform.y) : undefined,
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Card>
  );
}
```

### Monitoring Drag Events

Use `useDndMonitor` to observe drag events without being a draggable or droppable:

```tsx
import { useDndMonitor } from '@mui/material/DndContext';

function DragLogger() {
  useDndMonitor({
    onDragStart: (event) => console.log('Drag started:', event.active.id),
    onDragEnd: (event) => console.log('Drag ended:', event.active.id),
  });

  return null;
}
```

## Performance Optimization

### Large Lists

For lists with many items, consider:

1. **Virtualization**: Use `react-window` or `react-virtualized` for rendering only visible items
2. **Memoization**: Wrap sortable items in `React.memo`
3. **Stable IDs**: Ensure item IDs are stable across renders

```tsx
const MemoizedItem = React.memo(function SortableItem({ id, label }) {
  return (
    <DraggableListItem id={id}>
      <ListItemText primary={label} />
    </DraggableListItem>
  );
});
```

### Debouncing Move Events

For expensive operations during drag, debounce `onDragMove`:

```tsx
import { useMemo } from 'react';
import { debounce } from '@mui/material/utils';

function ExpensiveList() {
  const handleDragMove = useMemo(
    () => debounce((event) => {
      // Expensive operation
    }, 16),
    []
  );

  return (
    <DndContext onDragMove={handleDragMove}>
      {/* ... */}
    </DndContext>
  );
}
```

## Migration

Migrating from `react-beautiful-dnd`? See the [Migration Guide](/material-ui/guides/drag-and-drop-migration/).
