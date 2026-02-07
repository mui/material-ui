import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForestIcon from '@mui/icons-material/Forest';
import VerifiedIcon from '@mui/icons-material/Verified';

const stats = [
  { icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />, value: '12+', label: 'Лет на рынке' },
  { icon: <GroupsIcon sx={{ fontSize: 40 }} />, value: '15', label: 'Бригад мастеров' },
  { icon: <HomeIcon sx={{ fontSize: 40 }} />, value: '800+', label: 'Построенных домов' },
  { icon: <ThumbUpIcon sx={{ fontSize: 40 }} />, value: '98%', label: 'Довольных клиентов' },
];

const advantages = [
  {
    icon: <ForestIcon color="secondary" sx={{ fontSize: 32 }} />,
    title: 'Собственное производство',
    text: 'Используем северный лес из Костромской области. Контролируем качество на каждом этапе — от заготовки до строительства.',
  },
  {
    icon: <VerifiedIcon color="secondary" sx={{ fontSize: 32 }} />,
    title: 'Гарантия качества',
    text: 'Предоставляем гарантию 3 года на все виды работ. Работаем по договору с фиксированной сметой.',
  },
  {
    icon: <GroupsIcon color="secondary" sx={{ fontSize: 32 }} />,
    title: 'Опытные бригады',
    text: 'Наши плотники — мастера своего дела с многолетним стажем. Все бригады работают в компании не менее 5 лет.',
  },
];

export default function About() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }} id="about">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          О компании
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}
        >
          СК «Профплотник» — строительная компания из Костромы, работающая с 2011 года.
          Специализируемся на строительстве деревянных домов и бань из профилированного бруса.
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ mb: 1, opacity: 0.85 }}>{stat.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Advantages */}
        <Grid container spacing={4}>
          {advantages.map((adv) => (
            <Grid item xs={12} md={4} key={adv.title}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ flexShrink: 0, mt: 0.5 }}>{adv.icon}</Box>
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {adv.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {adv.text}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
