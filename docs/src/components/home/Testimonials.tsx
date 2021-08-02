import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

const data = [
  { title: '2M', metadata: 'Weekly downloads on npm' },
  { title: '70k', metadata: 'Stars on GitHub' },
  { title: '2k', metadata: 'Open-source contributors' },
  { title: '13k', metadata: 'Followers on Twitter' },
];

const UserFeedback = ({
  quote,
  profile,
}: {
  quote: string;
  profile: { avatar: string; name: string; role: string; company?: React.ReactElement };
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="#fff" sx={{ mb: 2 }}>
        {quote}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Avatar
          src={profile.avatar}
          alt={`Picture of ${profile.name}`}
          sx={{ width: 60, height: 60, border: '1px solid', borderColor: '#fff' }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography color="#fff" fontWeight="bold" sx={{ mb: 1 }}>
            {profile.name},{' '}
            <Box component="span" sx={{ color: 'grey.500', fontWeight: 'regular' }}>
              {profile.role}
            </Box>
          </Typography>
          {profile.company}
        </Box>
      </Box>
    </Box>
  );
};

const TESTIMONIALS = [
  {
    quote:
      "“Material-UI offers a wide variety of high quality components that have allowed us to ship features faster. Material-UI has been used by more than a hundred engineers in our organization. What’s more, Material-UI's well architected customization system has allowed us to differentiate ourselves in the marketplace.”",
    profile: {
      avatar: 'https://avatars.githubusercontent.com/u/28296253?v=4',
      name: 'Joona Rahko',
      role: 'Staff Software Engineer',
      company: (
        <img
          src="/static/branding/companies/unity-blue.svg"
          width="56"
          height="21"
          alt="Unity logo"
          loading="lazy"
        />
      ),
    },
  },
  {
    quote:
      "“Material UI looks great and lets us deliver fast, thanks to their solid API design and documentation - it's refreshing to use a component library where you get everything you need from their site rather than Stack Overflow. We think the upcoming version, with extra themes and customizability, will make Material UI even more of a game changer. We're extremely grateful to the team for the time and effort spent maintaining the project.”",
    profile: {
      avatar: 'https://avatars.githubusercontent.com/u/197016?v=4',
      name: 'Jean-Laurent de Morlhon',
      role: 'VP of Engineering',
      company: (
        <img
          src="/static/branding/companies/docker-blue.svg"
          width="81"
          height="21"
          alt="Docker logo"
          loading="lazy"
        />
      ),
    },
  },
  {
    quote:
      '“After much research on React component libraries, we decided to ditch our in-house library for Material UI, using its powerful customization system to implement our Design System. This simple move did a rare thing in engineering: it lowered our maintenance costs while enhancing both developer and customer experience. All of this was done without sacrificing the organization’s branding and visual identity.”',
    profile: {
      avatar: 'https://avatars.githubusercontent.com/u/732422?v=4',
      name: 'Gustavo de Paula',
      role: 'Specialist Software Engineer',
      company: (
        <img
          src="/static/branding/companies/loggi-blue.svg"
          width="61"
          height="20"
          alt="Loggi logo"
          loading="lazy"
        />
      ),
    },
  },
];

const Testimonials = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  return (
    <Box sx={{ bgcolor: 'primaryDark.700' }}>
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
            <Box sx={{ maxWidth: 500 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    '& .MuiIconButton-root': {
                      color: '#fff',
                      border: '1px solid',
                      borderColor: 'primaryDark.300',
                      '&.Mui-disabled': {
                        opacity: 0.5,
                        color: '#fff',
                      },
                    },
                  }}
                >
                  <IconButton
                    size="small"
                    disabled={slideIndex === 0}
                    onClick={() => setSlideIndex((i) => i - 1)}
                  >
                    <KeyboardArrowLeftRounded fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={slideIndex === TESTIMONIALS.length - 1}
                    sx={{ ml: 2 }}
                    onClick={() => setSlideIndex((i) => i + 1)}
                  >
                    <KeyboardArrowRightRounded fontSize="small" />
                  </IconButton>
                </Box>
                <Box alignSelf="center">
                  {TESTIMONIALS.map((item, index) => (
                    <Box
                      key={index}
                      role="button"
                      onClick={() => setSlideIndex(index)}
                      sx={{
                        cursor: 'pointer',
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        p: '4px',
                        ml: index !== 0 ? '2px' : 0,
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 1,
                          bgcolor: index === slideIndex ? 'primaryDark.300' : 'primaryDark.500',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <SwipeableViews index={slideIndex} onChangeIndex={(index) => setSlideIndex(index)}>
                {TESTIMONIALS.map((item) => (
                  <UserFeedback key={item.profile.name} {...item} />
                ))}
              </SwipeableViews>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2}>
            {data.map((item) => (
              <Grid key={item.title} item xs={6}>
                <Box
                  sx={{
                    height: '100%',
                    p: 1,
                    pl: 2,
                    borderLeft: '4px solid',
                    borderColor: 'primaryDark.600',
                  }}
                >
                  <Typography variant="h3" color="primary.200" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography color="grey.300">{item.metadata}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
