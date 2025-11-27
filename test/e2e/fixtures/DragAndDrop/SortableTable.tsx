import * as React from 'react';
import { DndContext, DragEndEvent } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableTableRow } from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Row {
  id: string;
  name: string;
  role: string;
  status: string;
}

export default function SortableTable() {
  const [rows, setRows] = React.useState<Row[]>([
    { id: '1', name: 'Alice', role: 'Engineer', status: 'Active' },
    { id: '2', name: 'Bob', role: 'Designer', status: 'Active' },
    { id: '3', name: 'Carol', role: 'Manager', status: 'Away' },
    { id: '4', name: 'David', role: 'Developer', status: 'Active' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
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
    <div data-testid="testcase">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={rows.map((r) => r.id)} strategy="vertical">
          <TableContainer component={Paper} data-testid="sortable-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <DraggableTableRow key={row.id} id={row.id} data-testid={`row-${row.id}`}>
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
      <div data-testid="row-order">{rows.map((r) => r.id).join(',')}</div>
    </div>
  );
}
