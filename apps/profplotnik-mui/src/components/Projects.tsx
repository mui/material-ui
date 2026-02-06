import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StraightenIcon from '@mui/icons-material/Straighten';
import BedIcon from '@mui/icons-material/Bed';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface Project {
  name: string;
  size: string;
  area: number;
  rooms: number;
  floors: number;
  price: string;
  popular?: boolean;
}

const projects: Project[] = [
  { name: 'ДБ-1', size: '8x9', area: 135, rooms: 4, floors: 2, price: '1 306 000', popular: true },
  { name: 'ДБ-2', size: '6x8', area: 90, rooms: 3, floors: 2, price: '876 000' },
  { name: 'ДБ-3', size: '7x7', area: 56, rooms: 2, floors: 1, price: '645 000' },
  { name: 'ДБ-4', size: '9x9', area: 150, rooms: 5, floors: 2, price: '1 520 000', popular: true },
  { name: 'ДБ-5', size: '8x10', area: 148, rooms: 4, floors: 2, price: '1 450 000' },
  { name: 'ДБ-6', size: '10x12', area: 207, rooms: 6, floors: 2, price: '2 100 000' },
  { name: 'ДБ-7', size: '6x6', area: 64, rooms: 2, floors: 2, price: '590 000' },
  { name: 'ДБ-8', size: '7x9', area: 115, rooms: 3, floors: 2, price: '1 050 000' },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {project.popular && (
        <Chip
          label="Хит продаж"
          color="secondary"
          size="small"
          sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1, fontWeight: 600 }}
        />
      )}

      {/* Placeholder for house image */}
      <Box
        sx={{
          height: 200,
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #8d6e63 0%, #5d4037 100%)',
        }}
      >
        <HomeWorkIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.3)' }} />
        <Typography
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 12,
            color: 'white',
            fontWeight: 700,
            fontSize: '1.1rem',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          Дом из бруса {project.name}
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StraightenIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.size} м
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SquareFootIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.area} м²
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <BedIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.rooms} комн.
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {project.floors === 1 ? 'Одноэтажный' : 'Двухэтажный'} дом из профилированного бруса
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="h5" color="secondary.dark" sx={{ fontWeight: 700 }}>
          от {project.price} ₽
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" color="primary" fullWidth>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Projects() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }} id="projects">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Популярные проекты домов
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Готовые проекты деревянных домов из бруса. Возможна доработка любого проекта под ваши пожелания.
        </Typography>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.name}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" color="primary" size="large">
            Все проекты домов
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
