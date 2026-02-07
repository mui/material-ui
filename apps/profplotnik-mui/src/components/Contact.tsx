import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const contactInfo = [
  {
    icon: <PhoneIcon color="primary" />,
    label: 'Телефон',
    value: '+7 (495) 445-25-35',
  },
  {
    icon: <EmailIcon color="primary" />,
    label: 'Email',
    value: 'info@profplotnik.ru',
  },
  {
    icon: <LocationOnIcon color="primary" />,
    label: 'Адрес',
    value: 'г. Кострома, ул. Советская, д. 128',
  },
  {
    icon: <AccessTimeIcon color="primary" />,
    label: 'Режим работы',
    value: 'Пн-Пт: 9:00 — 18:00, Сб: 10:00 — 15:00',
  },
];

export default function Contact() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }} id="contacts">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="primary">
          Контакты
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 500, mx: 'auto' }}
        >
          Свяжитесь с нами любым удобным способом — мы всегда рады помочь
        </Typography>

        <Grid container spacing={4}>
          {/* Contact info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {contactInfo.map((info) => (
                <Stack direction="row" spacing={2} alignItems="flex-start" key={info.label}>
                  <Box sx={{ mt: 0.3 }}>{info.icon}</Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {info.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {info.value}
                    </Typography>
                  </Box>
                </Stack>
              ))}

              {/* Map placeholder */}
              <Paper
                elevation={0}
                sx={{
                  height: 200,
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <LocationOnIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                  <Typography variant="body2" color="text.secondary">
                    Карта проезда
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Contact form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }} elevation={2}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Оставить заявку
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Заполните форму и мы перезвоним вам в течение 30 минут
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ваше имя" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Телефон" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Сообщение"
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Опишите ваш проект или задайте вопрос..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Отправить заявку
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
