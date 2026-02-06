import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';

const footerLinks = {
  'Проекты': ['Дома из бруса', 'Каркасные дома', 'Бани из бруса', 'Все проекты'],
  'Услуги': ['Фундаменты', 'Кровельные работы', 'Отделка', 'Строительство под ключ'],
  'Компания': ['О компании', 'Наши бригады', 'Фотоотчёты', 'Отзывы'],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2c1e17',
        color: 'rgba(255,255,255,0.8)',
        pt: { xs: 4, md: 6 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <HomeWorkIcon sx={{ fontSize: 28, color: 'white' }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                СК Профплотник
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7, lineHeight: 1.6 }}>
              Строительство деревянных домов и бань из Костромы. Работаем по всей России с 2011 года.
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PhoneIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                +7 (495) 445-25-35
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
              <EmailIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">info@profplotnik.ru</Typography>
            </Stack>
          </Grid>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} sm={4} md={2} key={title}>
              <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 1.5 }}>
                {title}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    sx={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '0.875rem',
                      '&:hover': { color: 'white' },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Social */}
          <Grid item xs={12} md={3}>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 1.5 }}>
              Мы в соцсетях
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}>
                <TelegramIcon />
              </IconButton>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.6, lineHeight: 1.6 }}>
              Подписывайтесь на наши каналы, чтобы следить за ходом строительства и новыми проектами.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            &copy; 2011–2024 СК «Профплотник». Все права защищены.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
              Политика конфиденциальности
            </Link>
            <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
              Договор оферты
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
