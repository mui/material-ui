/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import OpenInNew from '@mui/icons-material/OpenInNew';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Info from '@mui/icons-material/InfoOutlined';
import Code from '@mui/icons-material/Code';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import Edit from '@mui/icons-material/Edit';
import ViewCompact from '@mui/icons-material/ViewCompact';
import PermMedia from '@mui/icons-material/PermMedia';
import Extension from '@mui/icons-material/Extension';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Settings from '@mui/icons-material/Settings';
import { IconFrame } from '../joy/Sheet';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level1',
        display: 'flex',
        my: '5rem',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 225,
          flexShrink: 0,
          borderWidth: '0 1px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, py: '1.25rem', px: '0.75rem' }}>
          <Box
            component="img"
            alt=""
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '4px',
              width: 32,
              height: 32,
              display: 'block',
            }}
          />
          <div>
            <Typography level="bodyHighlight" sx={{ fontWeight: 'bold' }}>
              Strapi Website
            </Typography>
            <Typography level="smallText">Workplace</Typography>
          </div>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        />
        <Box component="nav" aria-label="Navigation" sx={{ flexGrow: 1, minHeight: 0 }}>
          <List
            size="sm"
            sx={{
              '--List-item-radius': '4px',
              '--List-padding': '0.75rem',
              '--List-nestedInsetStart': '0px',
              '--List-item-paddingLeft': '0.75rem',
              '--List-gap': '16px',
              '[data-mui-color-scheme="light"] &': {
                '--joy-palette-neutral-textColor': 'var(--joy-palette-neutral-600)',
              },
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Edit />
                </ListItemDecorator>
                Content
              </ListItemButton>
            </ListItem>
            <ListItem nested>
              <ListItem
                component="div"
                id="plugins"
                sx={{ typography: 'tableLabel', color: 'text.secondary' }}
              >
                Plugins
              </ListItem>
              <List aria-labelledby="plugins" sx={{ '--List-gap': '8px' }}>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <ViewCompact />
                    </ListItemDecorator>
                    Builder
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <PermMedia />
                    </ListItemDecorator>
                    Media Library
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Info />
                    </ListItemDecorator>
                    Documentation
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>
            <ListItem nested>
              <ListItem
                component="div"
                id="general"
                sx={{ typography: 'tableLabel', color: 'text.secondary' }}
              >
                General
              </ListItem>
              <List aria-labelledby="general" sx={{ '--List-gap': '8px' }}>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Extension />
                    </ListItemDecorator>
                    Plugins
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <ShoppingCart />
                    </ListItemDecorator>
                    Marketplace
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Settings />
                    </ListItemDecorator>
                    Settings
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        />
        <Box sx={{ display: 'flex', px: '1.5rem', py: '1.5rem', gap: 1, alignItems: 'center' }}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '26px',
              bgcolor: 'var(--joy-palette-background-level2)',
            }}
          />
          <Typography sx={{ color: 'var(--joy-palette-text-secondary)' }}>Kai Doe</Typography>
          <Button variant="outlined" color="neutral" size="sm" sx={{ ml: 'auto', px: 0 }}>
            <KeyboardArrowLeft />
          </Button>
        </Box>
      </Sheet>
      <Box sx={{ flexGrow: 1, minWidth: 0, px: '3.5rem', py: '2rem' }}>
        <Box sx={{ pl: 4, mb: 5.5 }}>
          <Typography level="h3" sx={{ fontWeight: 'bold', mb: 1.5 }}>
            Welcome 👋
          </Typography>
          <Typography level="subtitle">
            We hope you are making good progress on your project! Feel free to read the latest news
            about Strapi. We are giving our best to improve the product based on your feedback.
          </Typography>
          <Link
            href="#blog"
            endDecorator={<OpenInNew />}
            sx={{ mt: 2, typography: 'tableLabel', color: 'primary.textColor' }}
          >
            SEE MORE ON THE BLOG
          </Link>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 352px' },
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              '& > div': {
                display: 'flex',
                gap: 3,
                p: 3,
                alignItems: 'center',
              },
            }}
          >
            <Sheet
              sx={{
                flexDirection: 'row',
                borderRadius: 'sm',
                boxShadow: 'sm',
              }}
            >
              <IconFrame color="primary">
                <Info />
              </IconFrame>
              <div>
                <Typography level="bodyHighlight" sx={{ fontSize: '1rem', mb: '3px' }}>
                  Read the documentation
                </Typography>
                <Typography level="subtitle">
                  Discover the concepts, reference, guides and tutorials.
                </Typography>
              </div>
            </Sheet>
            <Sheet
              sx={{
                flexDirection: 'row',
                borderRadius: 'sm',
                boxShadow: 'sm',
              }}
            >
              <IconFrame color="warning">
                <Code />
              </IconFrame>
              <div>
                <Typography level="bodyHighlight" sx={{ fontSize: '1rem', mb: '3px' }}>
                  Code example
                </Typography>
                <Typography level="subtitle">
                  Learn by testing real project developed by the community
                </Typography>
              </div>
            </Sheet>
            <Sheet
              sx={{
                flexDirection: 'row',
                borderRadius: 'sm',
                boxShadow: 'sm',
              }}
            >
              <IconFrame color="secondary">
                <PlayArrow />
              </IconFrame>
              <div>
                <Typography level="bodyHighlight" sx={{ fontSize: '1rem', mb: '3px' }}>
                  Tutorial
                </Typography>
                <Typography level="subtitle">
                  Discover the concepts, reference, guides and tutorials.
                </Typography>
              </div>
            </Sheet>
            <Sheet
              sx={{
                flexDirection: 'row',
                borderRadius: 'sm',
                boxShadow: 'sm',
              }}
            >
              <IconFrame color="alternate">
                <HistoryEdu />
              </IconFrame>
              <div>
                <Typography level="bodyHighlight" sx={{ fontSize: '1rem', mb: '3px' }}>
                  Blog
                </Typography>
                <Typography level="subtitle">
                  Discover the concepts, reference, guides and tutorials.
                </Typography>
              </div>
            </Sheet>
          </Box>
          <Box>
            <Sheet
              sx={{
                gap: 1.5,
                p: 3,
                borderRadius: 'sm',
                boxShadow: 'sm',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Join the community</Typography>
              <Typography level="subtitle">
                Discuss with team members, contributors and developers on different channels.
              </Typography>
              <Button
                variant="text"
                size="sm"
                endIcon={<ArrowForward fontSize="md" />}
                sx={{ alignSelf: 'flex-start' }}
              >
                SEE OUR ROAD MAP
              </Button>
              <Box
                sx={{
                  pt: 1.5,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                  '& > .MuiButton-root': { justifyContent: 'flex-start' },
                  '& img': {
                    width: 24,
                    height: 24,
                  },
                }}
              >
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt=""
                    />
                  }
                >
                  Github
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Square-1024x1024.png"
                      alt=""
                    />
                  }
                >
                  Slack
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
                      alt=""
                    />
                  }
                >
                  Reddit
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://www.pngkey.com/png/full/2-27646_twitter-logo-png-transparent-background-logo-twitter-png.png"
                      alt=""
                    />
                  }
                >
                  Twitter
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png"
                      alt=""
                    />
                  }
                >
                  Medium
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  startIcon={
                    <Box
                      component="img"
                      src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/92_Discourse_logo_logos-512.png"
                      alt=""
                    />
                  }
                >
                  Discourse
                </Button>
              </Box>
            </Sheet>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
