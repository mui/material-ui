import * as React from 'react';
import { DndContext, DragEndEvent } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableListItem } from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

interface Item {
  id: string;
  label: string;
}

export default function SortableList() {
  const [items, setItems] = React.useState<Item[]>([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
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
    <div data-testid="testcase">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy="vertical">
          <List data-testid="sortable-list">
            {items.map((item) => (
              <DraggableListItem key={item.id} id={item.id} data-testid={`item-${item.id}`}>
                <ListItemText primary={item.label} />
              </DraggableListItem>
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <div data-testid="item-order">{items.map((i) => i.id).join(',')}</div>
    </div>
  );
}
