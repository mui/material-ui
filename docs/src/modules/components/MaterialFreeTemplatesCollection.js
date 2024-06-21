/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useTranslate } from '@mui/docs/i18n';
import { useTheme } from '@mui/material/styles';

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(translation, theme) {
  const imageSuffix = theme.palette.mode === 'dark' ? '-dark' : '-light';
  return [
    {
      title: translation('dashboardTitle'),
      description: translation('dashboardDescr'),
      src: `/static/images/templates/dashboard${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
    },
    {
      title: translation('landingPageTitle'),
      description: translation('landingPageDescr'),
      src: `/static/images/templates/landing-page${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/landing-page/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/landing-page`,
    },
    {
      title: translation('checkoutTitle'),
      description: translation('checkoutDescr'),
      src: `/static/images/templates/checkout${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
    },
    {
      title: translation('signInTitle'),
      description: translation('signInDescr'),
      src: `/static/images/templates/sign-in${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
    },
    {
      title: translation('signInSideTitle'),
      description: translation('signInSideDescr'),
      src: `/static/images/templates/sign-in-side${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
    },
    {
      title: translation('signUpTitle'),
      description: translation('signUpDescr'),
      src: `/static/images/templates/sign-up${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
    },
    {
      title: translation('blogTitle'),
      description: translation('blogDescr'),
      src: `/static/images/templates/blog${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
    },
    {
      title: translation('stickyFooterTitle'),
      description: translation('stickyFooterDescr'),
      src: `/static/images/templates/sticky-footer${imageSuffix}.png`,
      href: '/material-ui/getting-started/templates/sticky-footer/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sticky-footer`,
    },
  ];
}

export default function Templates() {
  const translation = useTranslate();
  const theme = useTheme();
  const [templateTheme, setTemplateTheme] = React.useState('');

  const handleChange = (event) => {
    setTemplateTheme(event.target.value);
  };

  return (
    <Stack gap={4}>
      {layouts(translation, theme).map((layout) => (
        <Stack gap={1} key={layout.title}>
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 'semiBold' }}>
            {layout.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {layout.description}
          </Typography>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                '&:hover button': {
                  opacity: 1,
                },
                '&:hover img': {
                  filter: 'brightness(0.5)',
                  transition: 'filter 0.5s',
                },
              }}
            >
              <CardMedia
                component="img"
                image={layout.src}
                title={layout.title}
                sx={{
                  aspectRatio: '16 / 9',
                  objectPosition: 'top',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                Live preview
              </Button>
            </Box>
            <Box
              sx={{
                p: 2,
                pt: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 'auto',
                }}
              >
                <Button
                  component="a"
                  href={layout.href}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={<Visibility sx={{ mr: 0.5 }} />}
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                >
                  Live preview
                </Button>
                <Button
                  component="a"
                  href={layout.source}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  startIcon={<CodeRoundedIcon sx={{ mr: 0.5 }} />}
                >
                  Source code
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 'auto',
                }}
              >
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  startIcon={<DownloadRoundedIcon sx={{ mr: 0.5 }} />}
                  data-ga-event-category="material-ui-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="download-theme"
                >
                  Download theme
                </Button>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={templateTheme}
                  size="small"
                  displayEmpty
                  onChange={handleChange}
                  sx={{ width: '180px' }}
                >
                  <MenuItem value="">Material Design 2</MenuItem>
                  <MenuItem value={1}>Sober</MenuItem>
                  <MenuItem value={2}>Sleek</MenuItem>
                </Select>
              </Box>
            </Box>
          </Card>
        </Stack>
      ))}
    </Stack>
  );
}
