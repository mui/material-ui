import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/system';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';

import { greyColor, brandColor } from '../getLPTheme';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    image:
      'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    image:
      'url("https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=3602&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Available in all platforms',
    description:
      'This item could let users know that the product is available on all platforms, such as web, mobile, and desktop.',
    image:
      'url("https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Box id="features" sx={{ mt: { xs: 0, sm: 4 } }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography component="h2" variant="h4" color="text.primary">
                Product features
              </Typography>
              <Typography variant="body1" color="text.secondary" component="p">
                Here you can provide a brief overview of the key features of the
                product. For example, you could list the number of features, the
                types of features (e.g., core features, add-ons), or the benefits of
                the features.
              </Typography>
            </Box>
            <Grid
              container
              item
              gap={1}
              sx={{ display: { xs: 'auto', sm: 'none' } }}
            >
              {items.map(({ title }, index) => (
                <Chip
                  key={index}
                  label={title}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? brandColor[300] : '';
                      }
                      return selectedItemIndex === index ? brandColor[200] : '';
                    },
                    background: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'none' : '';
                      }
                      return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor:
                      selectedItemIndex === index ? brandColor[500] : '',
                    '& .MuiChip-label': {
                      color: selectedItemIndex === index ? brandColor[50] : '',
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              sx={{
                display: { xs: 'auto', sm: 'none' },
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'light' ? greyColor[200] : greyColor[700],
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? greyColor[100] : greyColor[800],
                borderRadius: '8px',
                p: 2,
                mt: 4,
              }}
            >
              <Box
                sx={{
                  backgroundImage: items[selectedItemIndex].image,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '4px',
                  minHeight: '300px',
                  marginBottom: '16px',
                  outline: '1px solid',
                  outlineColor: (theme) =>
                    theme.palette.mode === 'light' ? greyColor[200] : greyColor[700],
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  component="span"
                  color="text.primary"
                  variant="body2"
                  fontWeight="bold"
                >
                  {selectedFeature.title}
                </Typography>
                <Typography
                  component="span"
                  color="text.secondary"
                  variant="body2"
                  fontWeight="regular"
                  sx={{ my: 0.5 }}
                >
                  {selectedFeature.description}
                </Typography>
                <Link
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    '& > svg': { transition: '0.2s' },
                    '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  <span>Learn more</span>
                  <ChevronRightRoundedIcon
                    fontSize="small"
                    sx={{ mt: '1px', ml: '2px' }}
                  />
                </Link>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
            >
              {items.map(({ icon, title, description }, index) => (
                <Card
                  variant="outlined"
                  key={index}
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    height: '33%',
                    backgroundColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? alpha(brandColor[100], 0.2)
                          : 'transparent';
                      }
                      return selectedItemIndex === index
                        ? alpha(brandColor[800], 0.2)
                        : 'transparent';
                    },
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? alpha(brandColor[300], 0.5)
                          : greyColor[200];
                      }
                      return selectedItemIndex === index
                        ? alpha(brandColor[700], 0.7)
                        : greyColor[800];
                    },
                    '&:hover': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? brandColor[300]
                          : brandColor[700],
                      boxShadow: (theme) =>
                        theme.palette.mode === 'light'
                          ? `0 0 24px ${brandColor[100]}`
                          : `0 0 24px ${brandColor[800]}`,
                    },
                    width: '100%',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      p: 2,
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === 'light') {
                            return selectedItemIndex === index
                              ? brandColor[500]
                              : greyColor[400];
                          }
                          return selectedItemIndex === index
                            ? brandColor[500]
                            : greyColor[600];
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <span>
                      <Typography
                        component="span"
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                        display="block"
                      >
                        {title}
                      </Typography>
                      <Typography
                        component="span"
                        color="text.secondary"
                        variant="body2"
                        fontWeight="regular"
                        display="block"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>Learn more</span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </span>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                backgroundImage: items[selectedItemIndex].image,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                height: '100%',
                minHeight: '400px',
                outline: '4px solid',
                outlineColor: `${alpha(brandColor[500], 0.2)}`,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
