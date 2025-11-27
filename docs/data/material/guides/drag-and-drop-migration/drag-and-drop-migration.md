# Migrating from react-beautiful-dnd

<p class="description">A guide for migrating from react-beautiful-dnd to Material UI's native drag-and-drop system.</p>

## Overview

Material UI now provides a native drag-and-drop system that integrates seamlessly with MUI's styling, theming, and accessibility features. This guide will help you migrate existing code from `react-beautiful-dnd` to the native MUI implementation.

### Benefits of migrating

- **Smaller bundle size**: ~7KB vs ~45KB for react-beautiful-dnd
- **Native theming**: Automatic integration with MUI's theme system
- **Built-in TypeScript**: Full type definitions included
- **Simplified API**: Less boilerplate code required
- **Accessibility**: Integrated ARIA attributes and keyboard navigation

## Concept Mapping

| react-beautiful-dnd | MUI Native DnD | Notes |
|---------------------|----------------|-------|
| `<DragDropContext>` | `<DndContext>` | Similar API, no render props |
| `<Droppable>` | `<SortableContext>` or `useDroppable` | Simplified, no render props |
| `<Draggable>` | `<DraggableListItem>`, `useSortable` | Component-specific wrappers |
| `provided.innerRef` | `setNodeRef` | Ref callback |
| `provided.droppableProps` | Automatic | No manual spreading needed |
| `provided.draggableProps` | `attributes` | ARIA attributes |
| `provided.dragHandleProps` | `listeners` | Event handlers |
| `provided.placeholder` | Not needed | Layout handled internally |
| `snapshot.isDragging` | `isDragging` (from hook) | Returned from useSortable |
| `snapshot.isDropAnimating` | `isSorting` (from hook) | Similar concept |
| `result.source.index` | `event.active` | Drag source info |
| `result.destination.index` | `event.over` | Drop target info |

## Step-by-Step Migration

### Step 1: Update Imports

**Before (react-beautiful-dnd):**
```tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
```

**After (MUI):**
```tsx
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableListItem } from '@mui/material/ListItem';
// Or for other components:
import { DraggableTableRow } from '@mui/material/TableRow';
import { DraggableGridItem } from '@mui/material/Grid';
import { DraggableChip } from '@mui/material/Chip';
```

### Step 2: Convert DragDropContext to DndContext

**Before:**
```tsx
<DragDropContext onDragEnd={onDragEnd}>
  {children}
</DragDropContext>
```

**After:**
```tsx
<DndContext onDragEnd={handleDragEnd}>
  {children}
</DndContext>
```

The event structure is slightly different. See [Step 5](#step-5-update-event-handlers) for handler conversion.

### Step 3: Convert Droppable to SortableContext

**Before:**
```tsx
<Droppable droppableId="list">
  {(provided) => (
    <ul ref={provided.innerRef} {...provided.droppableProps}>
      {items.map((item, index) => (
        // Draggable items...
      ))}
      {provided.placeholder}
    </ul>
  )}
</Droppable>
```

**After:**
```tsx
<SortableContext items={items.map(item => item.id)} strategy="vertical">
  <List>
    {items.map((item) => (
      // DraggableListItem items...
    ))}
  </List>
</SortableContext>
```

Note that:
- No render props needed
- No ref spreading required
- No placeholder element needed
- The `strategy` prop replaces direction inference (`"vertical"`, `"horizontal"`, or `"grid"`)

### Step 4: Convert Draggable Items

#### For Lists

**Before:**
```tsx
<Draggable draggableId={item.id} index={index}>
  {(provided, snapshot) => (
    <li
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? 0.5 : 1,
      }}
    >
      {item.content}
    </li>
  )}
</Draggable>
```

**After:**
```tsx
<DraggableListItem id={item.id}>
  <ListItemText primary={item.content} />
</DraggableListItem>
```

The drag styling (opacity, cursor, elevation) is handled automatically by the component.

#### For Tables

**Before:**
```tsx
<Draggable draggableId={row.id} index={index}>
  {(provided) => (
    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <td>{row.name}</td>
      <td>{row.status}</td>
    </tr>
  )}
</Draggable>
```

**After:**
```tsx
<DraggableTableRow id={row.id}>
  <TableCell>{row.name}</TableCell>
  <TableCell>{row.status}</TableCell>
</DraggableTableRow>
```

Cell widths are automatically preserved during drag operations.

#### For Grids

**Before:**
```tsx
<Draggable draggableId={card.id} index={index}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="grid-item"
    >
      <Card>{card.content}</Card>
    </div>
  )}
</Draggable>
```

**After:**
```tsx
<DraggableGridItem id={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
  <Card>{card.content}</Card>
</DraggableGridItem>
```

For grid layouts, use `strategy="grid"` with `columns` prop on SortableContext:
```tsx
<SortableContext items={cards.map(c => c.id)} strategy="grid" columns={3}>
```

#### For Chips

**After (no direct react-beautiful-dnd equivalent):**
```tsx
<DraggableChip
  id={tag.id}
  label={tag.name}
  color="primary"
  variant="outlined"
  onDelete={() => handleDelete(tag.id)}
/>
```

### Step 5: Update Event Handlers

**Before (react-beautiful-dnd):**
```tsx
const onDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(list);
  const [reordered] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reordered);

  setList(items);
};
```

**After (MUI):**
```tsx
const handleDragEnd = (event) => {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    setList((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const reordered = [...items];
      const [removed] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, removed);

      return reordered;
    });
  }
};
```

Key differences:
- Access `active` and `over` objects instead of `source` and `destination`
- Use item IDs to find indices rather than receiving indices directly
- Check `over` exists and IDs differ before reordering

## Common Patterns

### Sortable List (Complete Example)

**Before (react-beautiful-dnd):**
```tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SortableList() {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reordered] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reordered);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      background: snapshot.isDragging ? '#e3f2fd' : 'white',
                    }}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

**After (MUI):**
```tsx
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableListItem } from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

function SortableList() {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);

  const handleDragEnd = (event) => {
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
              <ListItemText primary={item.content} />
            </DraggableListItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}
```

### Sortable Table

**After (MUI):**
```tsx
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableTableRow } from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function SortableTable() {
  const [rows, setRows] = useState([
    { id: '1', name: 'Alice', role: 'Engineer' },
    { id: '2', name: 'Bob', role: 'Designer' },
    { id: '3', name: 'Carol', role: 'Manager' },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRows((prev) => {
        const oldIndex = prev.findIndex((r) => r.id === active.id);
        const newIndex = prev.findIndex((r) => r.id === over.id);
        const reordered = [...prev];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);
        return reordered;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={rows.map((r) => r.id)} strategy="vertical">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <DraggableTableRow key={row.id} id={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
              </DraggableTableRow>
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}
```

### Cross-Container Drag

:::info
Cross-container drag (moving items between different lists) is not supported in the initial release. This is planned for a future update.
:::

## Troubleshooting

### "Cannot find module" Errors

Ensure you're importing from the correct paths:
```tsx
// Correct
import { DndContext } from '@mui/material/DndContext';
import { DraggableListItem } from '@mui/material/ListItem';

// Also correct (named exports from main entry)
import { DndContext, DraggableListItem } from '@mui/material';
```

### Items Not Dragging

1. **Verify DndContext wrapper**: Ensure all draggable items are descendants of a `DndContext` provider.

2. **Check SortableContext**: For sortable lists, items must also be wrapped in `SortableContext`.

3. **Verify item IDs**: The `items` prop of `SortableContext` must contain the same IDs used by the draggable components.

4. **Check `dragDisabled` prop**: Ensure you haven't accidentally set `dragDisabled={true}`.

5. **Ensure unique IDs**: Each draggable item must have a unique `id` prop.

### Animation Issues

1. **Verify transition config**: The default transition works for most cases, but you can customize it:
   ```tsx
   <DraggableListItem id={item.id} transition={{ duration: 200, easing: 'ease' }}>
   ```

2. **Check for CSS conflicts**: Ensure no parent elements have `transform` or `transition` properties that might interfere.

3. **Avoid inline style conflicts**: Don't override `transform` or `transition` in the `sx` prop.

### Table Cell Widths Collapsing

`DraggableTableRow` automatically preserves cell widths during drag. If you're experiencing issues:

1. Ensure cells have explicit or natural widths before drag starts.
2. For auto-width tables, cells will maintain their computed widths during drag.

### Accessibility

Material UI's drag-and-drop system includes built-in accessibility features:

- **ARIA attributes**: Automatically applied via `attributes` from hooks
- **Keyboard navigation**:
  - `Enter` or `Space` to pick up an item
  - Arrow keys to move
  - `Enter` or `Space` to drop
  - `Escape` to cancel
- **Screen reader announcements**: Automatic announcements for drag start, move, and end

To customize announcements:
```tsx
<DndContext
  accessibility={{
    announcements: {
      onDragStart: ({ active }) => `Picked up ${active.id}`,
      onDragOver: ({ active, over }) => over
        ? `${active.id} is over ${over.id}`
        : `${active.id} is not over a droppable area`,
      onDragEnd: ({ active, over }) => over
        ? `Dropped ${active.id} on ${over.id}`
        : `${active.id} was dropped`,
      onDragCancel: ({ active }) => `Dragging ${active.id} was cancelled`,
    },
  }}
>
```

## API Differences Summary

| Feature | react-beautiful-dnd | MUI Native |
|---------|---------------------|------------|
| Render props | Required | Not needed |
| Placeholder | Required | Automatic |
| Type support | Separate package | Built-in |
| Theming | Manual | Automatic |
| Bundle size | ~45KB | ~7KB |
| Drag handle | Via `dragHandleProps` | Via `listeners` |
| Keyboard nav | Built-in | Built-in |
| Touch support | Built-in | Built-in |
| Grid reordering | Limited | Native support |
