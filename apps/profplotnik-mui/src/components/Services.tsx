import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import HomeIcon from '@mui/icons-material/Home';
import CabinIcon from '@mui/icons-material/Cabin';
import HotTubIcon from '@mui/icons-material/HotTub';
import FoundationIcon from '@mui/icons-material/Foundation';
import RoofingIcon from '@mui/icons-material/Roofing';
import ConstructionIcon from '@mui/icons-material/Construction';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const services = [
  {
    icon: <HomeIcon sx={{ fontSize: 48 }} />,
    title: 'Дома из бруса',
    description:
      'Строительство домов из профилированного бруса камерной сушки и естественной влажности.',
    color: '#5d4037',
  },
  {
    icon: <CabinIcon sx={{ fontSize: 48 }} />,
    title: 'Каркасные дома',
    description: 'Энергоэффективные каркасные дома по финской и канадской технологии.',
    color: '#33691e',
  },
  {
    icon: <HotTubIcon sx={{ fontSize: 48 }} />,
    title: 'Бани из бруса',
    description: 'Русские бани из профилированного бруса с полной комплектацией.',
    color: '#bf360c',
  },
  {
    icon: <FoundationIcon sx={{ fontSize: 48 }} />,
    title: 'Фундаменты',
    description: 'Ленточные, свайно-винтовые и монолитные фундаменты под ключ.',
    color: '#4e342e',
  },
  {
    icon: <RoofingIcon sx={{ fontSize: 48 }} />,
    title: 'Кровельные работы',
    description: 'Монтаж кровли любой сложности: металлочерепица, мягкая кровля, ондулин.',
    color: '#1565c0',
  },
  {
    icon: <ConstructionIcon sx={{ fontSize: 48 }} />,
    title: 'Строительство',
    description: 'Полный цикл строительных работ от проектирования до сдачи под ключ.',
    color: '#e65100',
  },
  {
    icon: <FormatPaintIcon sx={{ fontSize: 48 }} />,
    title: 'Отделка',
    description: 'Внутренняя и наружная отделка деревянных домов: вагонка, блок-хаус, покраска.',
    color: '#7b1fa2',
  },
];

export default function Services() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }} id="services">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Наши услуги
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Полный спектр услуг по строительству деревянных домов — от фундамента до чистовой отделки
        </Typography>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={service.title}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea sx={{ height: '100%', p: 1 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: service.color, mb: 2 }}>{service.icon}</Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
