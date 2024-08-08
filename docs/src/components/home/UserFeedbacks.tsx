import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';

const TESTIMONIALS = [
  {
    quote:
      '"We\'ve relied on Material UI really heavily. I override a lot of default styles to try and make things our own, but the time we save with complex components like the Autocomplete and the Data Grid are so worth it. Every other library I try has 80% of what I\'m looking for when it comes to complex use cases, Material UI has it all under one roof which is a huge help for our small team."',
    profile: {
      avatarSrc: 'https://avatars.githubusercontent.com/u/21114044?s=58',
      avatarSrcSet: 'https://avatars.githubusercontent.com/u/21114044?s=116 2x',
      name: 'Kyle Gill',
      role: 'Engineer & Designer',
      company: (
        <img
          src="/static/branding/companies/particl-dark.svg"
          width="90"
          height="16"
          alt="Particl logo"
          loading="lazy"
        />
      ),
    },
  },
  {
    quote:
      '"Material UI looks great and lets us deliver fast, thanks to their solid API design and documentation - it\'s refreshing to use a component library where you get everything you need from their site rather than Stack Overflow. We think the upcoming version, with extra themes and customizability, will make Material UI even more of a game changer. We\'re extremely grateful to the team for the time and effort spent maintaining the project."',
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
    company?: React.ReactElement<any>;
  };
}) {
  return (
    <Box
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#FFF',
      }}
    >
      <Typography
        sx={{
          mb: 2.5,
          lineHeight: 1.6,
          color: 'grey.200',
          fontSize: (theme) => theme.typography.pxToRem(15),
        }}
      >
        {quote}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
            slotProps={{ img: { loading: 'lazy' } }}
            sx={{ width: 36, height: 36 }}
          />
        </Box>
        <div>
          <Typography variant="body2" sx={{ fontWeight: 'semiBold', color: 'text.primary' }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {profile.role}
          </Typography>
        </div>
        <Box sx={{ ml: 'auto' }}>{profile.company}</Box>
      </Box>
    </Box>
  );
}

export default function UserFeedbacks() {
  return (
    <Grid
      container
      sx={(theme) => ({
        mt: 4,
        backgroundColor: 'rgba(255,255,255,0.01)',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'clip',
        '> :nth-of-type(1)': { borderBottom: `1px solid ${theme.palette.primaryDark[700]}` },
        '> :nth-of-type(2)': {
          borderBottom: `1px solid ${theme.palette.primaryDark[700]}`,
          borderRight: { xs: 0, sm: `1px solid ${theme.palette.primaryDark[700]}` },
        },
        '> :nth-of-type(3)': { borderBottom: `1px solid ${theme.palette.primaryDark[700]}` },
        '> :nth-of-type(4)': {
          borderRight: { xs: 0, sm: `1px solid ${theme.palette.primaryDark[700]}` },
          borderBottom: { xs: `1px solid ${theme.palette.primaryDark[700]}`, sm: 0 },
        },
      })}
    >
      <MuiStatistics />
      {TESTIMONIALS.map((item) => (
        <Grid key={item.profile.name} size={{ xs: 12, sm: 6 }}>
          <Feedback {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
