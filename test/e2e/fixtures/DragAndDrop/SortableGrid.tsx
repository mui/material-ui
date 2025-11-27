import * as React from 'react';
import { DndContext, DragEndEvent } from '@mui/material/DndContext';
import { SortableContext } from '@mui/material/SortableContext';
import { DraggableGridItem } from '@mui/material/Grid';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardItem {
  id: string;
  title: string;
  content: string;
}

export default function SortableGrid() {
  const [cards, setCards] = React.useState<CardItem[]>([
    { id: '1', title: 'Card 1', content: 'First card content' },
    { id: '2', title: 'Card 2', content: 'Second card content' },
    { id: '3', title: 'Card 3', content: 'Third card content' },
    { id: '4', title: 'Card 4', content: 'Fourth card content' },
    { id: '5', title: 'Card 5', content: 'Fifth card content' },
    { id: '6', title: 'Card 6', content: 'Sixth card content' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
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
    <div data-testid="testcase">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((c) => c.id)} strategy="grid" columns={3}>
          <Grid container spacing={2} data-testid="sortable-grid">
            {cards.map((card) => (
              <DraggableGridItem
                key={card.id}
                id={card.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                data-testid={`card-${card.id}`}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.content}
                    </Typography>
                  </CardContent>
                </Card>
              </DraggableGridItem>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <div data-testid="card-order">{cards.map((c) => c.id).join(',')}</div>
    </div>
  );
}
