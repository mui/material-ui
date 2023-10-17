/* eslint-disable material-ui/straight-quotes */
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

const testimonials = [
  {
    testimonial: `“Joy UI played a pivotal role in shaping the success of big-AGI. It turns heads with its stunning looks and makes other devs envious with its responsiveness, lightweight footprint, comprehensive documentation, and polished API. Using Joy UI is a delight, and the optimal React frontend choice.”`,
    author: 'Enrico Ros',
    workTitle: 'Director of Product Management',
    avatar: '/static/branding/joy-ui/enricoros.png',
    github: 'enricoros',
    projectLogo: '/static/branding/joy-ui/big-agi-logo.png',
    projectLink: 'https://big-agi.com/',
    logoWidth: 80,
  },
  {
    testimonial: `“Migrating my website from Material UI to Joy UI was a breeze. The transition was seamless, and the library's intuitive nature made it easy to pick up. The customizable default theme system is a plus, allowing me to introduce custom design tokens with type-safe support. Joy UI has transformed my development process, making it enjoyable and efficient.”`,
    author: 'Matthew Kwong',
    workTitle: 'Senior Web Engineer',
    avatar: '/static/branding/joy-ui/matthew-kwong.jpeg',
    github: 'mwskwong',
    projectLogo: '/static/branding/joy-ui/matthew-kong-logo.svg',
    projectLink: 'https://mwskwong.com/',
    logoWidth: 25,
  },
  {
    testimonial: `“Joy UI is a game-changer for our large-scale internal tool. It lets us focus on our complex system, not UI components. Even in alpha, it became our go-to library, thanks to the trust and expertise we have in the MUI team. They respond quickly and pay attention to detail in UI/UX and DX. It's a must-have for developers and companies looking to boost productivity.”`,
    author: 'Marc Pacheco',
    workTitle: 'Lead Frontend Developer',
    avatar: '/static/branding/joy-ui/marcpacheco.jpeg',
    github: 'marc97',
  },
  {
    testimonial: `“Joy UI brings the best bits from Material UI, with a cleaner and fresher look out of the box. The variants approach covers almost all of your UI edge cases, while the flexible theme configuration provides plenty of room for customization. I think that with the right approach, Joy UI should cater to all your front-end development needs.”`,
    author: 'Badal Saibo',
    workTitle: 'Frontend Engineer',
    avatar: '/static/branding/joy-ui/badalsaibo.jpeg',
    github: 'badalsaibo',
  },
];

interface TestimonialAuthorProps {
  avatar: string;
  author: string;
  workTitle: string;
  github?: string;
  projectLogo?: string;
  projectLink?: string;
  logoWidth?: number;
}

export function TestimonialAuthor({
  avatar,
  author,
  github,
  workTitle,
  projectLogo,
  projectLink,
  logoWidth,
}: TestimonialAuthorProps) {
  return (
    <React.Fragment>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={(theme) => ({
            p: 0.5,
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.200',
            borderRadius: 99,
            ...theme.applyDarkStyles({
              borderColor: 'primary.800',
              bgcolor: alpha(theme.palette.primary[900], 0.5),
            }),
          })}
        >
          <Avatar alt={`${author}'s profile picture`} src={avatar} />
        </Box>
        <div>
          <Typography variant="body2" fontWeight="semiBold" color="text.primary">
            {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {workTitle}
          </Typography>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
          {projectLogo && (
            <Box component="a" href={projectLink} sx={{ display: 'flex' }}>
              <Box
                width={`${logoWidth}px`}
                component="img"
                src={projectLogo}
                alt={`${author}'s project using Joy UI`}
              />
            </Box>
          )}
          {github && (
            <IconButton
              aria-label={`${author} GitHub profile`}
              component="a"
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noreferrer noopener"
              color="info"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default function BaseUITestimonial() {
  return (
    <Section cozy>
      <SectionHeadline
        alwaysCenter
        overline="Early adopters"
        title={
          <Typography variant="h2" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
            Friends that <GradientText>found joy</GradientText>
          </Typography>
        }
        description="Join a joyful community of developers and designers that are using Joy UI in projects of all shapes and forms."
      />
      {/* The copy above will be refined! */}
      <Masonry columns={{ xs: 1, sm: 2 }} spacing={3} sx={{ m: 0, mt: 4 }}>
        {testimonials.map(
          ({
            testimonial,
            author,
            workTitle,
            avatar,
            github,
            projectLogo,
            projectLink,
            logoWidth,
          }) => (
            <div key={author}>
              <Paper
                variant="outlined"
                sx={(theme) => ({
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                  ...theme.applyDarkStyles({
                    bgcolor: 'primaryDark.900',
                    background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                    borderColor: 'primaryDark.700',
                  }),
                })}
              >
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                  {testimonial}
                </Typography>
                <TestimonialAuthor
                  author={author}
                  workTitle={workTitle}
                  avatar={avatar}
                  github={github}
                  projectLogo={projectLogo}
                  projectLink={projectLink}
                  logoWidth={logoWidth}
                />
              </Paper>
            </div>
          ),
        )}
      </Masonry>
    </Section>
  );
}
