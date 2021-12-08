import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import MuiLink from '@mui/material/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingProvider from 'docs/src/BrandingProvider';

export default function Careers() {
  return (
    <BrandingProvider>
      <Head
        title="Blog - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <Box
          sx={{
            maxHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
            textAlign: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(90deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                : `linear-gradient(90deg, ${theme.palette.grey[50]} 0%, #FFFFFF 100%)`,
          }}
        >
          <Box sx={{ mt: 8 }}>
            <Typography variant="body2" color="primary.600" fontWeight="bold">
              Blog
            </Typography>
            <Typography component="h1" variant="h2" sx={{ my: 1 }}>
              The <GradientText>latest</GradientText> about MUI
            </Typography>
          </Box>

          <Box
            sx={{
              maxWidth: '1200px',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(2, 1fr)',
              position: 'relative',
              top: 60,
            }}
          >
            <Box
              sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200],
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                    : '#fff',
                textAlign: 'left',
                maxWidth: 'sm',
              }}
            >
              <Box>
                <Box
                  sx={{
                    mb: 2,
                    width: '100%',
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    border: 1,
                    borderRadius: 0.5,
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                        : theme.palette.grey[200],
                    overflow: 'auto',
                  }}
                >
                  <img src="/static/blog/mui-core-v5/card.png" />
                </Box>
                <Chip
                  label="News"
                  size="small"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.success[100]
                        : theme.palette.success[900],
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.success[900]
                        : theme.palette.success[100],
                  }}
                />
                <Box>
                  <Typography variant="body1" color="text.primary" fontWeight={700} sx={{ mb: 1 }}>
                    Introducing MUI Core v5.0
                  </Typography>
                  <Typography color="text.secondary">
                    After over 400 days of development and over 40 canary releases, we are excited
                    to introduce MUI Core v5.0.0!
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 4,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup total={3} sx={{ mr: 0.5 }}>
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                  </AvatarGroup>
                  <Typography variant="body2" fontWeight="500" color="text.primary">
                    Olivier Tassinari, Marija Najdova, and more.
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Thursday, Sep 15, 2021
                </Typography>
              </Box>
              <MuiLink component="span" variant="body1" sx={{ mt: 2 }}>
                Read more
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </MuiLink>
            </Box>
            <Box
              sx={{
                p: 2,
                border: 1,
                borderRadius: 1,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200],
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                    : '#fff',
                textAlign: 'left',
                maxWidth: 'sm',
              }}
            >
              <Box>
                <Box
                  sx={{
                    mb: 2,
                    width: '100%',
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    border: 1,
                    borderRadius: 0.5,
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                        : theme.palette.grey[200],
                    overflow: 'auto',
                  }}
                >
                  <img src="/static/blog/mui-core-v5/card.png" />
                </Box>
                <Chip
                  label="News"
                  size="small"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.success[100]
                        : theme.palette.success[900],
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.success[900]
                        : theme.palette.success[100],
                  }}
                />
                <Box>
                  <Typography variant="body1" color="text.primary" fontWeight={700} sx={{ mb: 1 }}>
                    Introducing MUI Core v5.0
                  </Typography>
                  <Typography color="text.secondary">
                    After over 400 days of development and over 40 canary releases, we are excited
                    to introduce MUI Core v5.0.0!
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 4,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup total={3} sx={{ mr: 0.5 }}>
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                    <Avatar
                      src="/static/branding/about/danilo.png"
                      sx={{
                        width: '28px',
                        height: '28px',
                        border: 2,
                        borderColor: '#fff',
                        backgroundColor: '#00baff',
                      }}
                    />
                  </AvatarGroup>
                  <Typography variant="body2" fontWeight="500" color="text.primary">
                    Olivier Tassinari, Marija Najdova, and more.
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Thursday, Sep 15, 2021
                </Typography>
              </Box>
              <MuiLink component="span" variant="body1" sx={{ mt: 2 }}>
                Read more
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </main>
      {/* <Divider />
      <AppFooter /> */}
    </BrandingProvider>
  );
}
