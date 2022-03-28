/* eslint-disable react/style-prop-object */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import StarBorder from '@mui/icons-material/StarBorder';
import LocationOn from '@mui/icons-material/LocationOnOutlined';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const Covers = () => {
  const TYPES = ['image', 'nextjs', 'video'];
  const [type, setType] = React.useState(TYPES[1]);
  return (
    <Card component="li" sx={{ minHeight: 400 }}>
      <CardCover>
        {
          {
            image: (
              <img
                src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80"
                alt=""
              />
            ),
            nextjs: (
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  overflow: 'hidden',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: '1',
                  border: '0px',
                  margin: '0px',
                  padding: '0px',
                  position: 'absolute',
                  inset: '0px',
                }}
              >
                <img
                  alt="Mountains"
                  sizes="100vw"
                  srcSet="https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=640&amp;q=75 640w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=750&amp;q=75 750w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=828&amp;q=75 828w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=1080&amp;q=75 1080w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=1200&amp;q=75 1200w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=1920&amp;q=75 1920w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=2048&amp;q=75 2048w, https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=3840&amp;q=75 3840w"
                  src="https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&amp;w=3840&amp;q=75"
                  decoding="async"
                  data-nimg="fill"
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'border-box',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                  }}
                />
              </span>
            ),
            video: (
              <video
                src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/blurry-trees.mov"
                autoPlay
                loop
                playsInline
                muted
              />
            ),
          }[type]
        }
      </CardCover>
      <CardContent sx={{ justifyContent: 'center', gap: 1 }}>
        {TYPES.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={t === type ? 'contained' : 'light'}
            color={t === type ? 'primary' : 'neutral'}
            onClick={() => setType(t)}
          >
            {t}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default function JoySvgIcon() {
  const gradient = (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 30%), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 50%)',
      }}
    />
  );
  return (
    <CssVarsProvider>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'var(--joy-palette-background-level1)',
          },
        }}
      />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ my: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          component="ul"
          sx={{
            p: 0,
            m: 0,
            display: 'grid',
            gap: 3,
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          }}
        >
          <Card size="lg" component="li" sx={{ '--Card-radius': '8px' }}>
            <CardContent>
              <Typography level="h2" sx={{ fontSize: 'lg', mb: 1, alignSelf: 'flex-start' }}>
                Bahamas Islands
              </Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="text"
                color="neutral"
                sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
              >
                <BookmarkAdd />
              </IconButton>
              <Typography level="body2">24 April - 02 May, 2021</Typography>
              <Typography level="body3">Category/Ocean</Typography>
              <Typography sx={{ mt: 3 }}>Avarage Temperature</Typography>
              <Box sx={{ width: 24, height: 2, bgcolor: 'text.primary', mt: 0.5, mb: 1.5 }} />
              <Typography
                level="h5"
                endDecorator={<Sun sx={{ color: '#f3be77' }} />}
                sx={{ fontWeight: 'md' }}
              >
                +18°C
              </Typography>
              <AspectRatio min="120px" max="200px" sx={{ my: 2 }}>
                <img
                  src="https://images.unsplash.com/photo-1501698335706-90b736210a61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                  alt=""
                />
              </AspectRatio>
              <Box sx={{ display: 'flex' }}>
                <div>
                  <Typography level="body3">Total Price</Typography>
                  <Typography level="h5" sx={{ fontWeight: 'lg' }}>
                    $2950
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  color="neutral"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto' }}
                >
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card
            component="li"
            size="lg"
            sx={{ minHeight: '360px', '&:hover': { boxShadow: 'xl' } }}
          >
            <CardCover>
              <img
                src="https://images.unsplash.com/photo-1525630558331-067c957817a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2250&q=80"
                alt=""
              />
              {gradient}
            </CardCover>
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography level="h2" sx={{ mb: 1, fontSize: 'lg', color: 'neutral.50' }}>
                <Link href="#the-beach" underline="none" overlay sx={{ color: 'inherit' }}>
                  The Beach
                </Link>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography startDecorator={<LocationOn />} sx={{ color: 'neutral.300' }}>
                  Tarifa, Spain
                </Typography>
                <Typography startDecorator={<StarBorder />} sx={{ color: 'neutral.300' }}>
                  4.8
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Covers />
          <Card component="li">
            <CardCover sx={{ display: { xs: 'none', md: 'block' } }}>
              <video autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
                <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
              </video>
            </CardCover>
            <CardCover sx={{ display: { md: 'none' } }}>
              <img src="https://assets.codepen.io/6093409/river.jpg" alt="" />
            </CardCover>
            <CardCover>{gradient}</CardCover>
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography sx={{ fontWeight: 'lg', display: { md: 'none' }, color: '#fff' }}>
                Renders IMAGE
              </Typography>
              <Typography
                sx={{ fontWeight: 'lg', display: { xs: 'none', md: 'block' }, color: '#fff' }}
              >
                Renders VIDEO
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
