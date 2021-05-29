import * as React from 'react';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const users = [
  {
    logo: 'nasa.svg',
    logoWidth: 49,
    logoHeight: 40,
    caption: 'NASA',
  },
  {
    logo: 'walmart-labs.svg',
    logoWidth: 205,
    logoHeight: 39,
    caption: 'Walmart Labs',
    class: 'walmart',
  },
  {
    logo: 'capgemini.svg',
    logoWidth: 180,
    logoHeight: 40,
    caption: 'Capgemini',
  },
  {
    logo: 'uniqlo.svg',
    logoWidth: 40,
    logoHeight: 40,
    caption: 'Uniqlo',
  },
  {
    logo: 'bethesda.svg',
    logoWidth: 196,
    logoHeight: 29,
    caption: 'Bethesda',
  },
  {
    logo: 'jpmorgan.svg',
    logoWidth: 198,
    logoHeight: 40,
    caption: 'J.P. Morgan',
  },
  {
    logo: 'shutterstock.svg',
    caption: 'Shutterstock',
    logoWidth: 205,
    logoHeight: 29,
  },
  {
    logo: 'netflix.svg',
    logoWidth: 111,
    logoHeight: 29,
    caption: 'Netflix',
  },
  {
    logo: 'coursera.svg',
    logoWidth: 169,
    logoHeight: 23,
    caption: 'Coursera',
    class: 'coursera',
  },
  {
    logo: 'amazon.svg',
    logoWidth: 119,
    logoHeight: 36,
    caption: 'Amazon',
    class: 'amazon',
  },
  {
    logo: 'unity.svg',
    logoWidth: 138,
    logoHeight: 50,
    caption: 'Unity',
    class: 'unity',
  },
];

const styles = {
  amazon: { mt: 2.4 },
  coursera: { mt: 2.3 },
  unity: { mt: 0.5 },
  walmart: { mt: '13px', mx: '4px', mb: '12px' },
};

export default function Users() {
  const t = useTranslate();

  return (
    <Box sx={{ p: 2, minHeight: 160, pt: 5 }}>
      <NoSsr defer>
        <Container sx={{ mb: 4 }} maxWidth="md" disableGutters>
          <Divider />
          <Box sx={{ pt: 10, px: 4 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              {t('whosUsing')}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              {t('joinThese')}
            </Typography>
            <Grid container justifyContent="center" sx={{ my: 5 }}>
              {users.map((user) => (
                <Box
                  component="img"
                  key={user.caption}
                  src={`/static/images/users/${user.logo}`}
                  alt={user.caption}
                  sx={{ my: 1.5, mx: 3, ...styles[user.class] }}
                  loading="lazy"
                  width={user.logoWidth}
                  height={user.logoHeight}
                />
              ))}
            </Grid>
            <Typography variant="body1" align="center" gutterBottom>
              {t('usingMui')}
            </Typography>
            <Grid container justifyContent="center">
              <Button
                variant="outlined"
                href="https://github.com/mui-org/material-ui/issues/22426"
                rel="noopener nofollow"
                target="_blank"
                sx={{ mt: 2 }}
              >
                {t('letUsKnow')}
              </Button>
            </Grid>
          </Box>
        </Container>
      </NoSsr>
    </Box>
  );
}
