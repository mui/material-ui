import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Link from '@mui/joy/Link';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Add from '@mui/icons-material/AddOutlined';
import StarBorder from '@mui/icons-material/StarBorder';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import LinkIcon from '@mui/icons-material/Link';
import Comment from '@mui/icons-material/Comment';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Download from '@mui/icons-material/Download';
import Favorite from '@mui/icons-material/Favorite';
import Share from '@mui/icons-material/Share';
import Apps from '@mui/icons-material/Apps';
import DateRange from '@mui/icons-material/DateRange';
import LocationOn from '@mui/icons-material/LocationOnOutlined';
import Visibility from '@mui/icons-material/Visibility';
import CallMade from '@mui/icons-material/CallMade';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import Info from '@mui/icons-material/Info';

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
                src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=2835"
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
            variant={t === type ? 'solid' : 'soft'}
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
  return (
    <CssVarsProvider>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: 'var(--joy-palette-background-level2)',
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
                variant="plain"
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
              <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                <img
                  src="https://images.unsplash.com/photo-1501698335706-90b736210a61?auto=format&fit=crop&w=1674"
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
                src="https://images.unsplash.com/photo-1525630558331-067c957817a9?auto=format&fit=crop&w=2250"
                alt=""
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 30%), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 50%)',
              }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
              <Typography level="h2" sx={{ mb: 1, fontSize: 'lg' }}>
                <Link href="#the-beach" underline="none" overlay sx={{ color: 'neutral.50' }}>
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
            <CardCover
              sx={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 30%), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 50%)',
              }}
            />
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
          <Card component="li" size="lg">
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Sheet
                variant="solid"
                color="primary"
                sx={{ borderRadius: '20px', px: '0.5rem', py: '4px', fontSize: 'xs' }}
              >
                Research
              </Sheet>
              <IconButton size="sm" variant="plain" color="neutral">
                <Add />
              </IconButton>
              <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: 'auto' }}>
                <MoreHoriz />
              </IconButton>
            </Box>
            <AspectRatio
              variant="outlined"
              objectFit="contain"
              sx={{ my: 2, borderColor: 'rgba(0,0,0,0.12)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1464820453369-31d2c0b651af?auto=format&fit=crop&w=1180"
                alt=""
              />
            </AspectRatio>
            <Typography level="h2" sx={{ fontSize: 'lg', fontWeight: 'md', mb: 2 }}>
              Quality Assurance
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
              <AvatarGroup size="sm">
                <Avatar src="/static/images/avatar/1.jpg" />
                <Avatar src="/static/images/avatar/2.jpg" />
              </AvatarGroup>
              <Typography startDecorator={<Comment />} level="body3" sx={{ ml: 'auto' }}>
                4 Comments
              </Typography>
              <Typography startDecorator={<LinkIcon />} level="body3">
                1 Files
              </Typography>
            </Box>
          </Card>
          <Card component="li" variant="outlined" sx={{ '&:focus-within': { boxShadow: 'lg' } }}>
            <CardOverflow>
              <AspectRatio ratio="1">
                <img
                  src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=1770"
                  alt=""
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    borderRadius: '20px',
                    p: '0.5rem',
                    fontSize: 'xs',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                  }}
                >
                  04:26
                </Box>
              </AspectRatio>
              <IconButton
                size="lg"
                variant="solid"
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  right: '1rem',
                  bottom: '0px',
                  transform: 'translateY(50%)',
                }}
              >
                <PlayArrow />
              </IconButton>
            </CardOverflow>
            <Typography level="h2" sx={{ fontSize: 'lg', mt: 3 }}>
              <Link href="#minimal-photo" overlay>
                Minimal photography
              </Link>
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
              By <Link href="#sukjit">Sujith</Link>
            </Typography>
            <CardOverflow
              sx={{
                display: 'flex',
                gap: 1,
                py: 1.5,
                px: 'var(--Card-padding)',
                mt: 'auto',
                borderTopColor: 'background.level2',
                bgcolor: 'background.level1',
              }}
            >
              <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
                6.3k views
              </Typography>
              <Box sx={{ width: 2, bgcolor: 'divider' }} />
              <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
                1 hour ago
              </Typography>
            </CardOverflow>
          </Card>
          <Card size="sm">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(100px, 160px))',
                gap: 0.5,
                overflow: 'hidden',
                mx: 'calc(-1 * var(--Card-padding))',
                px: 1,
              }}
            >
              <AspectRatio ratio="1">
                <img
                  src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=1450"
                  alt=""
                />
              </AspectRatio>
              <AspectRatio ratio="1">
                <img
                  src="https://images.unsplash.com/photo-1597589022928-bb4002c099ec?auto=format&fit=crop&w=1180"
                  alt=""
                />
              </AspectRatio>
              <AspectRatio ratio="1">
                <img
                  src="https://images.unsplash.com/photo-1516073924210-ab16d9c03b13?auto=format&fit=crop&w=1706"
                  alt=""
                />
              </AspectRatio>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <StarBorder />
              </IconButton>
              <Avatar
                src="/static/images/avatar/2.jpg"
                size="lg"
                sx={{ '--Avatar-ring': '0 0 0 3px var(--joy-palette-background-body)', mt: -2 }}
              />
              <IconButton variant="plain" color="neutral" size="sm">
                <MoreHoriz />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography sx={{ fontWeight: 'md' }}>robert_ford</Typography>
                <Typography level="body2">Robert F. Ford</Typography>
              </div>
              <Typography level="body2">
                Lifestyle coach and photographer delivering best images onli...
              </Typography>
              <Box sx={{ height: 2, bgcolor: 'divider', width: 40 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <div>
                  <Typography sx={{ fontWeight: 'md' }}>1.2K</Typography>
                  <Typography level="body2">Media</Typography>
                </div>
                <div>
                  <Typography sx={{ fontWeight: 'md' }}>489.2K</Typography>
                  <Typography level="body2">Followers</Typography>
                </div>
                <div>
                  <Typography sx={{ fontWeight: 'md' }}>987K</Typography>
                  <Typography level="body2">Following</Typography>
                </div>
              </Box>
            </Box>
          </Card>
          <Card component="li" size="lg">
            <Typography component="div" level="h2" sx={{ color: 'text.secondary' }}>
              01
            </Typography>
            <Box sx={{ width: 24, height: 3, bgcolor: 'danger.500', mt: 1, mb: 3 }} />
            <Typography level="h2" sx={{ fontSize: 'lg' }}>
              <Link href="#buble-pop" overlay underline="none" sx={{ color: 'text.primary' }}>
                Bubble pop
              </Link>
            </Typography>
            <Typography level="body2">Kim Huyn A</Typography>
            <AspectRatio ratio="1" sx={{ my: 2 }}>
              <img
                src="https://i.pinimg.com/564x/13/af/69/13af694326b7b9f4ad59de639bd3488f--kim-hyuna-pop.jpg"
                alt="Kim hyunna"
              />
            </AspectRatio>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="sm" variant="plain" color="neutral">
                <Download />
              </IconButton>
              <IconButton size="sm" variant="plain" color="neutral">
                <Favorite />
              </IconButton>
              <IconButton size="sm" variant="plain" color="neutral">
                <Share />
              </IconButton>
              <IconButton size="sm" variant="plain" color="neutral">
                <MoreHoriz />
              </IconButton>
            </Box>
          </Card>
          <Card
            component="li"
            size="lg"
            sx={{ gridColumn: 'span 2', maxWidth: 360, '--Typography-gap': '0.5rem' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: -1, mr: -1 }}>
              <IconButton size="sm" variant="plain" color="neutral">
                <StarBorder />
              </IconButton>
              <IconButton size="sm" variant="plain" color="neutral">
                <MoreHoriz />
              </IconButton>
            </Box>
            <Avatar sx={{ mt: -2 }}>👩‍✈️</Avatar>
            <Typography level="h2" sx={{ fontSize: 'lg', fontWeight: 'md', mt: 2, mb: 1 }}>
              Friendly painters
            </Typography>
            <Typography level="body2" sx={{ mb: 2.5 }}>
              Within the exercises, we design a room in a Scandinavian style
            </Typography>
            <Typography level="body2" startDecorator={<Apps sx={{ color: 'text.primary' }} />}>
              Task: Practice
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                level="body2"
                startDecorator={<DateRange sx={{ color: 'text.primary' }} />}
              >
                Date: 01.07.2020
              </Typography>
              <AvatarGroup size="sm" sx={{ '--AvatarGroup-gap': '-0.5rem' }}>
                <Avatar src="/static/images/avatar/1.jpg" />
                <Avatar src="/static/images/avatar/2.jpg" />
                <Avatar src="/static/images/avatar/3.jpg" />
                <Avatar src="/static/images/avatar/4.jpg" />
              </AvatarGroup>
            </Box>
          </Card>
          <Card
            component="li"
            sx={{
              gridColumn: 'span 2',
              maxWidth: 340,
              bgcolor: 'initial',
              boxShadow: 'none',
              '--Card-padding': '0px',
            }}
          >
            <AspectRatio
              ratio="4/3"
              sx={{
                '&:hover, &:focus-within': {
                  '& .video-cover': {
                    display: 'block',
                  },
                  '& .gradient-cover': {
                    opacity: 1,
                  },
                },
              }}
            >
              <figure>
                <img
                  alt="Ooki Crypto Trade Platform 3d animation branding crypto cryptocurrency design illustration motion motion design trading ui web design zajno"
                  width="330"
                  height="247"
                  data-srcset="https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=320x240&amp;vertical=top 320w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=400x300&amp;vertical=top 400w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=450x338&amp;vertical=top 450w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=640x480&amp;vertical=top 640w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=700x525&amp;vertical=top 700w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=800x600&amp;vertical=top 800w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=840x630&amp;vertical=top 840w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=1000x750&amp;vertical=top 1000w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=1200x900&amp;vertical=top 1200w"
                  data-src="https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=400x300&amp;vertical=top"
                  data-sizes="auto"
                  src="https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=400x300&amp;vertical=top"
                  sizes="338px"
                  srcSet="https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=320x240&amp;vertical=top 320w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=400x300&amp;vertical=top 400w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=450x338&amp;vertical=top 450w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=640x480&amp;vertical=top 640w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=700x525&amp;vertical=top 700w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=800x600&amp;vertical=top 800w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=840x630&amp;vertical=top 840w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=1000x750&amp;vertical=top 1000w, https://cdn.dribbble.com/users/1468665/screenshots/17864400/shot_cut_2.png?compress=1&amp;resize=1200x900&amp;vertical=top 1200w"
                />
              </figure>
              <CardCover className="video-cover" sx={{ display: 'none' }}>
                <video
                  autoPlay
                  loop
                  muted
                  src="https://cdn.dribbble.com/users/1468665/screenshots/17864400/media/9e31a0251ab269d4d0785fbfbe0a782b.mp4"
                />
              </CardCover>
              <CardCover
                className="gradient-cover"
                sx={{
                  opacity: 0,
                  transition: '0.1s ease-in',
                  background:
                    'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
                      <Link
                        href="#Ooki Crypto Trade Platform"
                        overlay
                        underline="none"
                        sx={{
                          color: '#fff',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          display: 'block',
                        }}
                      >
                        Ooki Crypto Trade Platform
                      </Link>
                    </Typography>
                    <IconButton size="sm" color="neutral" sx={{ ml: 'auto' }}>
                      <CreateNewFolder />
                    </IconButton>
                    <IconButton size="sm" color="neutral">
                      <Favorite />
                    </IconButton>
                  </Box>
                </Box>
              </CardCover>
            </AspectRatio>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
              <Avatar
                src="https://cdn.dribbble.com/users/845499/avatars/mini/466762084bf3466293fba47c63ba55f7.jpg?1452183579"
                size="sm"
                sx={{ '--Avatar-size': '1.5rem' }}
              />
              <Typography sx={{ fontSize: 'sm' }}>Zajno Crew</Typography>
              <Sheet
                variant="solid"
                sx={{ px: 1, py: 0.5, borderRadius: 'xs', fontSize: 'xs', fontWeight: 'md' }}
              >
                TEAM
              </Sheet>
              <Link
                href="#unknown"
                level="body2"
                startDecorator={<Favorite />}
                sx={{ ml: 'auto', color: 'text.secondary' }}
              >
                117
              </Link>
              <Link
                href="#unknown"
                level="body2"
                startDecorator={<Visibility />}
                sx={{ color: 'text.secondary' }}
              >
                10.4k
              </Link>
            </Box>
          </Card>
          <Card
            component="li"
            variant="outlined"
            sx={(theme) => ({
              gridColumn: 'span 2',
              flexDirection: 'row',
              flexWrap: 'wrap',
              resize: 'horizontal',
              overflow: 'hidden',
              gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.text.primary,
                transform: 'translateY(-2px)',
              },
              '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
            })}
          >
            <AspectRatio
              variant="soft"
              sx={{
                flexGrow: 1,
                display: 'contents',
                '--AspectRatio-paddingBottom':
                  'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
              }}
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?auto=format&fit=crop&w=1450"
              />
            </AspectRatio>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '200px' }}>
              <Box sx={{ display: 'flex' }}>
                <div>
                  <Typography level="h2" sx={{ fontSize: 'lg' }}>
                    <Link
                      href="#showcase"
                      overlay
                      underline="none"
                      sx={{ color: 'text.primary', '&:after': { outlineOffset: '-4px' } }}
                    >
                      Showcase
                    </Link>
                  </Typography>
                  <Typography level="body3">A description of this widget.</Typography>
                </div>
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                >
                  <CallMade />
                </IconButton>
              </Box>
              <AspectRatio
                variant="soft"
                sx={{ '--AspectRatio-paddingBottom': 'clamp(0px, (100% - 200px) * 999, 200px)' }}
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?auto=format&fit=crop&w=1450"
                />
              </AspectRatio>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                <Avatar variant="solid" color="neutral">
                  S
                </Avatar>
                <div>
                  <Typography level="body3" sx={{ letterSpacing: '1px' }}>
                    CREATOR
                  </Typography>
                  <Typography>siriwatknp</Typography>
                </div>
              </Box>
            </Box>
          </Card>
          <Card component="li" variant="outlined" sx={{ '--Card-padding': '0px' }}>
            <AspectRatio variant="outlined" sx={{ display: 'flex' }}>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?auto=format&fit=crop&w=1450"
              />
            </AspectRatio>
          </Card>
          <Card
            component="li"
            variant="outlined"
            sx={{
              placeSelf: 'flex-start',
              minWidth: '300px',
              flexDirection: 'row',
              gap: 2,
              '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
            }}
          >
            <AspectRatio ratio="1" maxHeight={100} sx={{ minWidth: 80 }}>
              <img src="/static/images/cards/real-estate.png" alt="" />
            </AspectRatio>
            <Box>
              <Box sx={{ ml: 0.5, mb: 1 }}>
                <Typography
                  level="h2"
                  fontSize="sm"
                  aria-describedby="card-description"
                  mt={0.5}
                  mb={1}
                >
                  <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: 'text.tertiary' }}
                  >
                    123 Main St, Phoenix, AZ
                  </Link>
                </Typography>
                <Typography fontSize="md" fontWeight="lg" id="card-description">
                  $280k - $310k
                </Typography>
              </Box>
              <Chip
                variant="soft"
                startDecorator={<Info fontSize="md" />}
                size="sm"
                sx={{ pointerEvents: 'none' }}
              >
                Confidence score of 85%
              </Chip>
            </Box>
          </Card>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
