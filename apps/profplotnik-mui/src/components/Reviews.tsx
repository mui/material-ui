import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const reviews = [
  {
    name: 'Андрей М.',
    location: 'Московская обл.',
    rating: 5,
    text: 'Построили дом из бруса 8x9. Качество работы отличное, бригада профессиональная. Сроки выдержали, материал хороший. Рекомендую!',
    initials: 'АМ',
    date: 'Март 2024',
  },
  {
    name: 'Елена К.',
    location: 'Ярославская обл.',
    rating: 5,
    text: 'Заказали баню 6x6. Ребята сделали всё аккуратно и в срок. Уже год пользуемся — никаких нареканий. Спасибо «Профплотнику»!',
    initials: 'ЕК',
    date: 'Январь 2024',
  },
  {
    name: 'Михаил В.',
    location: 'Костромская обл.',
    rating: 4,
    text: 'Дом 10x12, двухэтажный. Строительство заняло 3 месяца. Были небольшие доработки, но всё исправили оперативно. В целом доволен.',
    initials: 'МВ',
    date: 'Ноябрь 2023',
  },
  {
    name: 'Ольга С.',
    location: 'Тверская обл.',
    rating: 5,
    text: 'Каркасный дом под ключ. Очень тёплый, даже зимой расход на отопление минимальный. Бригадир Алексей — настоящий профессионал!',
    initials: 'ОС',
    date: 'Август 2023',
  },
];

export default function Reviews() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }} id="reviews">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Отзывы клиентов
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Более 800 довольных клиентов по всей России
        </Typography>

        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={3} key={review.name}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <FormatQuoteIcon sx={{ fontSize: 32, color: 'primary.light', mb: 1 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.7, minHeight: 80 }}
                  >
                    {review.text}
                  </Typography>
                  <Rating value={review.rating} size="small" readOnly sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.85rem' }}>
                      {review.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.location} &middot; {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
