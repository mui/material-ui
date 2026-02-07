import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

const teamMembers = [
  {
    name: 'Алексей Петров',
    role: 'Бригадир',
    experience: '12 лет',
    rating: 5,
    projects: 120,
    initials: 'АП',
  },
  {
    name: 'Сергей Иванов',
    role: 'Бригадир',
    experience: '10 лет',
    rating: 5,
    projects: 95,
    initials: 'СИ',
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Бригадир',
    experience: '8 лет',
    rating: 4.5,
    projects: 78,
    initials: 'ДК',
  },
  {
    name: 'Николай Смирнов',
    role: 'Бригадир',
    experience: '9 лет',
    rating: 5,
    projects: 85,
    initials: 'НС',
  },
  {
    name: 'Владимир Фёдоров',
    role: 'Бригадир',
    experience: '7 лет',
    rating: 4.5,
    projects: 62,
    initials: 'ВФ',
  },
];

export default function Team() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }} id="team">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Наши бригады
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 600, mx: 'auto' }}
        >
          Опытные бригадиры и мастера, которые построили сотни домов по всей России
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={member.name}>
              <Card sx={{ textAlign: 'center', height: '100%' }}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {member.initials}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Rating
                    value={member.rating}
                    precision={0.5}
                    size="small"
                    readOnly
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={`Стаж ${member.experience}`}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                    <Chip
                      label={`${member.projects} объектов`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      sx={{ mb: 0.5 }}
                    />
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
