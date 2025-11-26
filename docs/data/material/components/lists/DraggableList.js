/**
 * Draggable List Demo
 *
 * This demo shows how to create a sortable list using MUI's native DnD system.
 *
 * ## Comparison with react-beautiful-dnd
 *
 * ### Before (react-beautiful-dnd):
 * ```jsx
 * import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
 *
 * <DragDropContext onDragEnd={handleDragEnd}>
 *   <Droppable droppableId="list">
 *     {(provided) => (
 *       <List ref={provided.innerRef} {...provided.droppableProps}>
 *         {items.map((item, index) => (
 *           <Draggable key={item.id} draggableId={item.id} index={index}>
 *             {(provided) => (
 *               <ListItem
 *                 ref={provided.innerRef}
 *                 {...provided.draggableProps}
 *                 {...provided.dragHandleProps}
 *               >
 *                 ...
 *               </ListItem>
 *             )}
 *           </Draggable>
 *         ))}
 *         {provided.placeholder}
 *       </List>
 *     )}
 *   </Droppable>
 * </DragDropContext>
 * ```
 *
 * ### After (MUI Native):
 * ```jsx
 * import { DndContext } from '@mui/material/DndContext';
 * import { SortableContext } from '@mui/material/SortableContext';
 * import { DraggableListItem } from '@mui/material/ListItem';
 *
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={items.map(i => i.id)}>
 *     <List>
 *       {items.map((item) => (
 *         <DraggableListItem key={item.id} id={item.id}>
 *           ...
 *         </DraggableListItem>
 *       ))}
 *     </List>
 *   </SortableContext>
 * </DndContext>
 * ```
 *
 * Key differences:
 * - No render props pattern (cleaner JSX)
 * - No `index` prop required
 * - No `provided.placeholder` needed
 * - Automatic MUI theming integration
 *
 * ## Accessibility
 * - Keyboard navigation: Enter/Space to grab, Arrow keys to move, Escape to cancel
 * - Screen reader announcements: automatic via DndContext
 * - Focus management: maintained during drag operations
 * - ARIA attributes: automatically applied by useSortable
 */
import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableListItem } from '@mui/material/ListItem';

const initialTasks = [
  { id: '1', title: 'Review pull request', completed: false },
  { id: '2', title: 'Update documentation', completed: true },
  { id: '3', title: 'Fix navigation bug', completed: false },
  { id: '4', title: 'Add unit tests', completed: false },
];

export default function DraggableList() {
  const [tasks, setTasks] = React.useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((prev) => {
        const oldIndex = prev.findIndex((t) => t.id === active.id);
        const newIndex = prev.findIndex((t) => t.id === over.id);
        const reordered = [...prev];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);
        return reordered;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy="vertical">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {tasks.map((task) => (
            <DraggableListItem key={task.id} id={task.id}>
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                secondary={task.completed ? 'Completed' : 'Pending'}
              />
            </DraggableListItem>
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}
