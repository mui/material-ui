import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NoSsr from '@mui/core/NoSsr';
import Box from '@mui/material/Box';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default function Themes() {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <Box sx={{ p: 2, minHeight: 160, mt: 8 }}>
      <NoSsr defer>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {t('themes')}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {t('themesDescr')}
          </Typography>
          <Link
            href="https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=home-store"
            data-ga-event-category="store"
            data-ga-event-action="click"
            data-ga-event-label="home"
            sx={{ mt: 1, display: 'block' }}
          >
            <NoSsr defer>
              <Box
                component="img"
                sx={{ maxWidth: 960, width: '100%', height: 'auto', mt: 4 }}
                alt={t('themesButton')}
                src={`/static/images/themes-${theme.palette.mode}.jpg`}
                loading="eager"
                width={500}
                height={307}
              />
            </NoSsr>
          </Link>
          <Grid container justifyContent="center">
            <Button
              variant="outlined"
              data-ga-event-category="store"
              data-ga-event-action="click"
              data-ga-event-label="home"
              href="https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=home-store"
              sx={{ mt: 4, mb: 6 }}
            >
              {t('themesButton')}
            </Button>
          </Grid>
        </Container>
      </NoSsr>
    </Box>
  );
}
