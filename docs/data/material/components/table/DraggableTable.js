/**
 * Draggable Table Demo
 *
 * This demo shows how to create a table with reorderable rows using MUI's native DnD system.
 *
 * ## Comparison with react-beautiful-dnd
 *
 * ### Before (react-beautiful-dnd):
 * ```jsx
 * import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
 *
 * <DragDropContext onDragEnd={handleDragEnd}>
 *   <Table>
 *     <TableHead>...</TableHead>
 *     <Droppable droppableId="table">
 *       {(provided) => (
 *         <TableBody ref={provided.innerRef} {...provided.droppableProps}>
 *           {rows.map((row, index) => (
 *             <Draggable key={row.id} draggableId={row.id} index={index}>
 *               {(provided, snapshot) => (
 *                 <TableRow
 *                   ref={provided.innerRef}
 *                   {...provided.draggableProps}
 *                   {...provided.dragHandleProps}
 *                   style={{
 *                     ...provided.draggableProps.style,
 *                     // Manual width fixing required
 *                   }}
 *                 >
 *                   ...
 *                 </TableRow>
 *               )}
 *             </Draggable>
 *           ))}
 *           {provided.placeholder}
 *         </TableBody>
 *       )}
 *     </Droppable>
 *   </Table>
 * </DragDropContext>
 * ```
 *
 * ### After (MUI Native):
 * ```jsx
 * import { DndContext } from '@mui/material/DndContext';
 * import { SortableContext } from '@mui/material/SortableContext';
 * import { DraggableTableRow } from '@mui/material/TableRow';
 *
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={rows.map(r => r.id)} strategy="vertical">
 *     <Table>
 *       <TableHead>...</TableHead>
 *       <TableBody>
 *         {rows.map((row) => (
 *           <DraggableTableRow key={row.id} id={row.id}>
 *             <TableCell>...</TableCell>
 *           </DraggableTableRow>
 *         ))}
 *       </TableBody>
 *     </Table>
 *   </SortableContext>
 * </DndContext>
 * ```
 *
 * Key differences:
 * - No render props pattern
 * - Cell widths automatically preserved during drag
 * - No manual style fixes needed
 * - Works with all MUI table features (sorting, selection, etc.)
 *
 * ## Features
 * - Preserves cell widths during drag to prevent layout collapse
 * - Handles cells with colSpan correctly
 * - Works with fixed-width and auto-width tables
 *
 * ## Accessibility
 * - Keyboard navigation: Enter/Space to grab, Arrow keys to move, Escape to cancel
 * - Screen reader announcements: automatic via DndContext
 * - Focus management: maintained during drag operations
 */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndContext } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableTableRow } from '@mui/material/TableRow';

const initialRows = [
  { id: '1', name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { id: '2', name: 'Bob Smith', role: 'Designer', status: 'Active' },
  { id: '3', name: 'Carol Williams', role: 'Manager', status: 'Away' },
  { id: '4', name: 'David Brown', role: 'Engineer', status: 'Active' },
  { id: '5', name: 'Eve Davis', role: 'Designer', status: 'Busy' },
];

export default function DraggableTable() {
  const [rows, setRows] = React.useState(initialRows);

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="draggable table">
            <TableHead>
              <TableCell sx={{ width: 50 }} />
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <DraggableTableRow key={row.id} id={row.id}>
                  <TableCell sx={{ width: 50 }}>
                    <DragIndicatorIcon color="action" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </DraggableTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SortableContext>
    </DndContext>
  );
}
