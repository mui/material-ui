/**
 * Draggable Grid Demo
 *
 * This demo shows how to create a dashboard with reorderable cards using MUI's native DnD system.
 *
 * ## Comparison with react-beautiful-dnd
 *
 * ### Before (react-beautiful-dnd):
 * ```jsx
 * import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
 *
 * <DragDropContext onDragEnd={handleDragEnd}>
 *   <Droppable droppableId="grid" direction="horizontal">
 *     {(provided) => (
 *       <Grid container ref={provided.innerRef} {...provided.droppableProps}>
 *         {cards.map((card, index) => (
 *           <Draggable key={card.id} draggableId={card.id} index={index}>
 *             {(provided) => (
 *               <Grid
 *                 item
 *                 ref={provided.innerRef}
 *                 {...provided.draggableProps}
 *                 {...provided.dragHandleProps}
 *               >
 *                 <Card>...</Card>
 *               </Grid>
 *             )}
 *           </Draggable>
 *         ))}
 *         {provided.placeholder}
 *       </Grid>
 *     )}
 *   </Droppable>
 * </DragDropContext>
 * ```
 *
 * ### After (MUI Native):
 * ```jsx
 * import { DndContext } from '@mui/material/DndContext';
 * import { SortableContext } from '@mui/material/SortableContext';
 * import { DraggableGridItem } from '@mui/material/Grid';
 *
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={cards.map(c => c.id)} strategy="grid" columns={3}>
 *     <Grid container spacing={2}>
 *       {cards.map((card) => (
 *         <DraggableGridItem key={card.id} id={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
 *           <Card>...</Card>
 *         </DraggableGridItem>
 *       ))}
 *     </Grid>
 *   </SortableContext>
 * </DndContext>
 * ```
 *
 * Key differences:
 * - Native 2D grid sorting with `strategy="grid"`
 * - No render props pattern
 * - Works with responsive Grid sizing
 * - Automatic elevation and scale effects during drag
 *
 * ## Use Case
 * Dashboard customization, widget arrangement, card reordering
 *
 * ## Accessibility
 * - Keyboard navigation: Enter/Space to grab, Arrow keys to move, Escape to cancel
 * - Screen reader announcements: automatic via DndContext
 * - Focus management: maintained during drag operations
 */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableGridItem } from '@mui/material/Grid';

const initialCards = [
  { id: '1', title: 'Revenue', value: '$12,345', color: '#e3f2fd' },
  { id: '2', title: 'Users', value: '1,234', color: '#f3e5f5' },
  { id: '3', title: 'Orders', value: '567', color: '#e8f5e9' },
  { id: '4', title: 'Conversion', value: '12.3%', color: '#fff3e0' },
  { id: '5', title: 'Growth', value: '+15%', color: '#fce4ec' },
  { id: '6', title: 'Rating', value: '4.8/5', color: '#e0f7fa' },
];

export default function DraggableGrid() {
  const [cards, setCards] = React.useState(initialCards);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCards((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === active.id);
        const newIndex = prev.findIndex((c) => c.id === over.id);
        const reordered = [...prev];
        const [removed] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, removed);
        return reordered;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={cards.map((c) => c.id)} strategy="grid" columns={3}>
        <Grid container spacing={2}>
          {cards.map((card) => (
            <DraggableGridItem
              key={card.id}
              id={card.id}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card sx={{ bgcolor: card.color, height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </DraggableGridItem>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
}
