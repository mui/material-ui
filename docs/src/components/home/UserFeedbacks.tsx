import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

const Feedback = ({
  quote,
  profile,
  mode,
}: {
  mode: 'light' | 'dark';
  quote: string;
  profile: {
    avatarSrc: string;
    avatarSrcSet: string;
    name: string;
    role: string;
    company?: React.ReactElement;
  };
}) => {
  return (
    <div>
      <Typography
        variant="subtitle1"
        component="div"
        color={mode === 'dark' ? '#fff' : 'grey.900'}
        fontSize={{ xs: '1rem', sm: '1.125rem' }}
        sx={{ mb: 2 }}
      >
        {quote}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Avatar
          src={profile.avatarSrc}
          srcSet={profile.avatarSrcSet}
          alt={`Picture of ${profile.name}`}
          imgProps={{ loading: 'lazy' }}
          sx={{
            width: 60,
            height: 60,
            border: '1px solid',
            borderColor: '#fff',
            bgcolor: 'grey.800',
          }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography
            color={mode === 'dark' ? '#fff' : 'grey.900'}
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            {profile.name},{' '}
            <Box component="span" sx={{ color: 'grey.700', fontWeight: 'regular' }}>
              {profile.role}
            </Box>
          </Typography>
          {profile.company}
        </Box>
      </Box>
    </div>
  );
};

const TESTIMONIALS = [
  {
    quote:
      "“MUI offers a wide variety of high quality components that have allowed us to ship features faster. MUI has been used by more than a hundred engineers in our organization. What’s more, MUI's well architected customization system has allowed us to differentiate ourselves in the marketplace.”",
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
      "“MUI looks great and lets us deliver fast, thanks to their solid API design and documentation - it's refreshing to use a component library where you get everything you need from their site rather than Stack Overflow. We think the upcoming version, with extra themes and customizability, will make MUI even more of a game changer. We're extremely grateful to the team for the time and effort spent maintaining the project.”",
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
      '“After much research on React component libraries, we decided to ditch our in-house library for MUI, using its powerful customization system to implement our Design System. This simple move did a rare thing in engineering: it lowered our maintenance costs while enhancing both developer and customer experience. All of this was done without sacrificing the organization’s branding and visual identity.”',
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

export default function UserFeedbacks({ mode: modeProp }: { mode?: 'light' | 'dark' }) {
  const globalTheme = useTheme();
  const mode = modeProp || globalTheme.palette.mode;
  const [slideIndex, setSlideIndex] = React.useState(0);
  return (
    <Box sx={{ maxWidth: { md: 500 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box
          sx={{
            '& .MuiIconButton-root': {
              color: mode === 'dark' ? '#fff' : 'primary.main',
              border: '1px solid',
              borderColor: mode === 'dark' ? 'primaryDark.300' : 'primary.main',
              '&.Mui-disabled': {
                opacity: 0.5,
                color: mode === 'dark' ? '#fff' : 'grey.500',
                borderColor: mode === 'dark' ? 'primary.700' : 'grey.500',
              },
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="Previous testimonial"
            disabled={slideIndex === 0}
            onClick={() => setSlideIndex((i) => i - 1)}
          >
            <KeyboardArrowLeftRounded fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Next testimonial"
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
              aria-label={`Testimonial from ${item.profile.name}`}
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
                  bgcolor: mode === 'dark' ? 'primaryDark.500' : 'grey.300',
                  ...(index === slideIndex && {
                    bgcolor: mode === 'dark' ? 'primaryDark.300' : 'primary.main',
                  }),
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <SwipeableViews index={slideIndex} onChangeIndex={(index) => setSlideIndex(index)}>
        {TESTIMONIALS.map((item) => (
          <Feedback key={item.profile.name} mode={mode} {...item} />
        ))}
      </SwipeableViews>
    </Box>
  );
}
