/**
 * Draggable Chips Demo
 *
 * This demo shows how to create reorderable chips/tags using MUI's native DnD system.
 *
 * ## Comparison with react-beautiful-dnd
 *
 * ### Before (react-beautiful-dnd):
 * ```jsx
 * import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
 *
 * <DragDropContext onDragEnd={handleDragEnd}>
 *   <Droppable droppableId="chips" direction="horizontal">
 *     {(provided) => (
 *       <Stack
 *         direction="row"
 *         ref={provided.innerRef}
 *         {...provided.droppableProps}
 *       >
 *         {tags.map((tag, index) => (
 *           <Draggable key={tag.id} draggableId={tag.id} index={index}>
 *             {(provided) => (
 *               <Chip
 *                 ref={provided.innerRef}
 *                 {...provided.draggableProps}
 *                 {...provided.dragHandleProps}
 *                 label={tag.label}
 *                 onDelete={() => handleDelete(tag.id)}
 *               />
 *             )}
 *           </Draggable>
 *         ))}
 *         {provided.placeholder}
 *       </Stack>
 *     )}
 *   </Droppable>
 * </DragDropContext>
 * ```
 *
 * ### After (MUI Native):
 * ```jsx
 * import { DndContext } from '@mui/material/DndContext';
 * import { SortableContext } from '@mui/material/SortableContext';
 * import { DraggableChip } from '@mui/material/Chip';
 *
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={tags.map(t => t.id)} strategy="horizontal">
 *     <Stack direction="row" spacing={1}>
 *       {tags.map((tag) => (
 *         <DraggableChip
 *           key={tag.id}
 *           id={tag.id}
 *           label={tag.label}
 *           onDelete={() => handleDelete(tag.id)}
 *         />
 *       ))}
 *     </Stack>
 *   </SortableContext>
 * </DndContext>
 * ```
 *
 * Key differences:
 * - No render props pattern
 * - Horizontal strategy for inline tag lists
 * - Delete and click interactions preserved during drag
 * - Color variants work seamlessly
 *
 * ## Use Case
 * Tag ordering, filter arrangement, priority labels, skill tags
 *
 * ## Accessibility
 * - Keyboard navigation: Enter/Space to grab, Arrow keys to move, Escape to cancel
 * - Screen reader announcements: automatic via DndContext
 * - Focus management: maintained during drag operations
 */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableChip } from '@mui/material/Chip';

const initialTags = [
  { id: '1', label: 'React', color: 'primary' },
  { id: '2', label: 'TypeScript', color: 'secondary' },
  { id: '3', label: 'Material UI', color: 'success' },
  { id: '4', label: 'Drag & Drop', color: 'info' },
  { id: '5', label: 'Accessible', color: 'warning' },
];

export default function DraggableChips() {
  const [tags, setTags] = React.useState(initialTags);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTags((prev) => {
        const oldIndex = prev.findIndex((t) => t.id === active.id);
        const newIndex = prev.findIndex((t) => t.id === over.id);
        const reordered = [...prev];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);
        return reordered;
      });
    }
  };

  const handleDelete = (id) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Drag chips to reorder, or click the delete icon to remove.
      </Typography>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={tags.map((t) => t.id)} strategy="horizontal">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tags.map((tag) => (
              <DraggableChip
                key={tag.id}
                id={tag.id}
                label={tag.label}
                color={tag.color}
                variant="outlined"
                onDelete={() => handleDelete(tag.id)}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>
    </Box>
  );
}
