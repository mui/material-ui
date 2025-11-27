import * as React from 'react';
import { DndContext, DragEndEvent } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableChip } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

interface Tag {
  id: string;
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export default function SortableChips() {
  const [tags, setTags] = React.useState<Tag[]>([
    { id: '1', label: 'React', color: 'primary' },
    { id: '2', label: 'TypeScript', color: 'secondary' },
    { id: '3', label: 'Material UI', color: 'info' },
    { id: '4', label: 'JavaScript', color: 'warning' },
    { id: '5', label: 'Node.js', color: 'success' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
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

  const handleDelete = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div data-testid="testcase">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={tags.map((t) => t.id)} strategy="horizontal">
          <Box data-testid="sortable-chips">
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tags.map((tag) => (
                <DraggableChip
                  key={tag.id}
                  id={tag.id}
                  label={tag.label}
                  color={tag.color}
                  variant="outlined"
                  onDelete={() => handleDelete(tag.id)}
                  data-testid={`chip-${tag.id}`}
                />
              ))}
            </Stack>
          </Box>
        </SortableContext>
      </DndContext>
      <div data-testid="chip-order">{tags.map((t) => t.id).join(',')}</div>
    </div>
  );
}
