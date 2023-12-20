import * as React from 'react';
import { alpha } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowButton from 'docs/src/components/action/ArrowButton';

function Feedback({
  quote,
  profile,
}: {
  quote: string;
  profile: {
    avatarSrc: string;
    avatarSrcSet: string;
    name: string;
    role: string;
    company?: React.ReactElement;
  };
}) {
  return (
    <Box sx={{ color: '#fff' }}>
      <Typography variant="body1" fontWeight="medium" component="div" sx={{ mb: 2.5 }}>
        {quote}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={(theme) => ({
            p: 0.5,
            border: '1px solid',
            borderColor: 'primary.800',
            bgcolor: alpha(theme.palette.primary[900], 0.5),
            borderRadius: 99,
          })}
        >
          <Avatar
            srcSet={profile.avatarSrcSet}
            src={profile.avatarSrc}
            alt={`${profile.name}'s profile picture`}
            imgProps={{ loading: 'lazy' }}
            sx={{
              width: 52,
              height: 52,
            }}
          />
        </Box>
        <div>
          <Typography fontWeight="semiBold" color="text.primary">
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.role}
          </Typography>
        </div>
        <Box sx={{ ml: 'auto' }}>{profile.company}</Box>
      </Box>
    </Box>
  );
}

const TESTIMONIALS = [
  {
    quote:
      '"Material UI looks great and lets us deliver fast, thanks to their solid API design and documentation - it\'s refreshing to use a component library where you get everything you need from their site rather than Stack Overflow. We think the upcoming version, with extra themes and customizability, will make Material UI even more of a game changer. We\'re extremely grateful to the team for the time and effort spent maintaining the project."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/197016?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/197016?s=116 2x',
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
      '"Material UI offers a wide variety of high quality components that have allowed us to ship features faster. It has been used by more than a hundred engineers in our organization. What\'s more, Material UI\'s well architected customization system has allowed us to differentiate ourselves in the marketplace."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/28296253?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/28296253?s=116 2x',
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
      '"After much research on React component libraries, we decided to ditch our in-house library for Material UI, using its powerful customization system to implement our Design System. This simple move did a rare thing in engineering: it lowered our maintenance costs while enhancing both developer and customer experience. All of this was done without sacrificing the organization\'s branding and visual identity."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/732422?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/732422?s=116 2x',
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

export default function UserFeedbacks() {
  const [slideIndex, setSlideIndex] = React.useState(0);
  return (
    <Box sx={{ maxWidth: { md: 500 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <ArrowButton
          direction="left"
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex((i) => i - 1)}
        />
        <ArrowButton
          direction="right"
          disabled={slideIndex === TESTIMONIALS.length - 1}
          onClick={() => setSlideIndex((i) => i + 1)}
          sx={{ mr: 'auto' }}
        />
        <Box sx={{ alignSelf: 'center' }}>
          {TESTIMONIALS.map((item, index) => (
            <ButtonBase
              key={index}
              aria-label={`Testimonial from ${item.profile.name}`}
              onClick={() => setSlideIndex(index)}
              sx={{
                display: 'inline-block',
                width: 16,
                height: 16,
                borderRadius: '50%',
                p: '4px',
                ml: index !== 0 ? '2px' : 0,
                '&:focus': {
                  boxShadow: (theme) => `0px 0px 0px 2px ${theme.palette.primaryDark[400]}`,
                },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  borderRadius: 1,
                  bgcolor: 'primaryDark.500',
                  ...(index === slideIndex && {
                    bgcolor: 'primaryDark.300',
                  }),
                }}
              />
            </ButtonBase>
          ))}
        </Box>
      </Box>
      <SwipeableViews index={slideIndex} onChangeIndex={(index) => setSlideIndex(index)}>
        {TESTIMONIALS.map((item) => (
          <Feedback key={item.profile.name} {...item} />
        ))}
      </SwipeableViews>
    </Box>
  );
}
