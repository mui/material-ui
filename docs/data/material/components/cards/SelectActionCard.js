import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import * as React from 'react';

const cards = [
  {
    id: 1,
    title: 'Plants',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are part of the nature and wildlife.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState();

  const selectedCardHandler = (cardData) => {
    setSelectedCard(cardData);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid2>
        {cards.map((card) => (
          <Card>
            <CardActionArea
              onClick={() => selectedCardHandler(card)}
              data-active={selectedCard?.id === card.id ? '' : undefined}
              sx={{
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid2>
      {selectedCard && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          {selectedCard.title}
        </Typography>
      )}
    </Container>
  );
}

export default SelectActionCard;
