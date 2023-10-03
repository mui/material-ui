import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Section from 'docs/src/layouts/Section';
import Link from 'docs/src/modules/components/Link';

const additionalTestimonials = [
  {
    testimonial: `“Joy UI played a pivotal role in shaping the success of big-AGI. It turns heads with its stunning looks and makes other devs envious with its responsiveness, lightweight footprint, comprehensive documentation, and polished API. Using Joy UI is a delight, and the optimal React frontend choice.”`,
    author: 'Enrico Ros',
    workTitle: 'Director of Product Management',
    avatar: '/static/branding/joy-ui/enricoros.png',
    companyLogo: undefined,
  },
  {
    testimonial: `“Joy UI is a game-changer for our large-scale internal tool. It lets us focus on our complex system, not UI components. Even in alpha, it became our go-to library, thanks to the trust and expertise we have in the MUI team. They respond quickly and pay attention to detail in UI/UX and DX. It's a must-have for developers and companies looking to boost productivity.”`,
    author: 'Marc Pacheco',
    workTitle: 'Lead Frontend Developer',
    avatar: '/static/branding/joy-ui/marcpacheco.jpeg',
    companyLogo: undefined,
  },
  {
    testimonial: `“Joy UI brings the best bits from Material UI, with a cleaner and fresher look out of the box. The variants approach covers almost all of your UI edge cases, while the flexible theme configuration provides plenty of room for customization. I think that with the right approach, Joy UI should cater to all your front-end development needs.”`,
    author: 'Badal Saibo',
    workTitle: 'Frontend Engineer ',
    avatar: '/static/branding/joy-ui/badalsaibo.jpeg',
    companyLogo: undefined,
  },
  {
    testimonial: `“Migrating my website from Material UI to Joy UI was a breeze. The transition was seamless, and the library's intuitive nature made it easy to pick up. The customizable default theme system is a plus, allowing me to introduce custom design tokens with type-safe support. Joy UI has transformed my development process, making it enjoyable and efficient. I highly recommend it for React projects.”`,
    author: 'Matthew Kwong',
    workTitle: 'Frontend Engineer',
    avatar: '/static/branding/joy-ui/mwskwong.png',
    companyLogo: undefined,
  },
];

interface TestimonialAuthorProps {
  avatar: string;
  author: string;
  workTitle: string;
  companyLogo?: string;
}

export function TestimonialAuthor({
  avatar,
  author,
  workTitle,
  companyLogo,
}: TestimonialAuthorProps) {
  return (
    <React.Fragment>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Avatar alt="" src={avatar} />
        <div>
          <Typography variant="body2" fontWeight="semiBold" color="text.primary">
            {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {workTitle}
          </Typography>
        </div>
        {companyLogo && <Box component="img" src={companyLogo} alt="" sx={{ ml: 'auto' }} />}
      </Box>
    </React.Fragment>
  );
}

export default function BaseUITestimonial() {
  return (
    <Section cozy>
      {/* <Grid container alignItems="center" spacing={{ xs: 6, sm: 10 }} mb={3}>
        <Grid xs={12} sm={6}>
          <Box
            sx={(theme) => ({
              pt: 3,
              pl: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              background: 'linear-gradient(49deg, #F3F6F9 0%, #F0F7FF 92.71%)',
              backgroundClip: 'padding-box',
              overflow: 'hidden',
              '& img': {
                borderTop: '1px solid',
                borderLeft: '1px solid',
                borderColor: 'divider',
                width: '100%',
                borderTopLeftRadius: '12px',
                display: 'block',
              },
              ...theme.applyDarkStyles({
                borderColor: 'divider',
                background: 'linear-gradient(49deg, #101418 0%, #001933 92.71%)',
              }),
            })}
          >
            <img
              src="/static/branding/joy-ui/big-agi-cover.jpg"
              srcSet="/static/branding/joy-ui/big-agi-cover.jpg 1x, /static/branding/joy-ui/big-agi-cover-2x.jpg 2x "
              alt="Screenshot displaying part of the Big-AGI home page that's built with Joy UI."
              loading="lazy"
              width="570px"
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            big-AGI&apos;s AI web interface, powered by Joy UI &nbsp;&nbsp;
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            &nbsp;&nbsp;
            <Link href="https://big-agi.com/" target="_blank">
              View it live <ArrowForward fontSize="small" />
            </Link>
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography>
            “Joy UI played a pivotal role in shaping the success of big-AGI. It turns heads with its
            stunning looks and makes other devs envious with its responsiveness, lightweight
            footprint, comprehensive documentation, and polished API. Using Joy UI is a delight, and
            the optimal React frontend choice.”
          </Typography>
          <TestimonialAuthor
            author="Enrico Ros"
            workTitle="Director of Product Management"
            avatar="/static/branding/joy-ui/enricoros.png"
            companyLogo="/static/branding/joy-ui/big-agi-logo.svg"
          />
        </Grid>
      </Grid> */}
      {/* Will add something here soon */}
      <Masonry columns={{ xs: 1, sm: 2 }} spacing={3} sx={{ m: 0 }}>
        {additionalTestimonials.map(({ testimonial, author, workTitle, avatar, companyLogo }) => (
          <div key={author}>
            <Paper
              variant="outlined"
              sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              <Typography color="text.secondary" variant="body2" sx={{ flexGrow: 1 }}>
                {testimonial}
              </Typography>
              <TestimonialAuthor
                author={author}
                workTitle={workTitle}
                avatar={avatar}
                companyLogo={companyLogo}
              />
            </Paper>
          </div>
        ))}
      </Masonry>
    </Section>
  );
}
