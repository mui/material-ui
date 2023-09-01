import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TeamStatistics from 'docs/src/components/about/TeamStatistics';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';

const teamPhotos = [
  {
    img: '/static/blog/2023-chamonix-retreat/skiers.jpeg',
    title: 'Snacks',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/group-photo.jpeg',
    title: 'Fern',
  },
  {
    img: '/static/blog/2023-chamonix-retreat/team-dinner.jpeg',
    title: 'Mushrooms',
  },
  {
    img: '/static/about/working-table-tenerife.jpeg',
    title: 'Tower',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/scuba-gear.jpeg',
    title: 'Tower',
  },
  {
    img: '/static/blog/2022-tenerife-retreat/outdoor-focus-group.jpeg',
    title: 'Tower',
  },
  {
    img: '/static/about/working-table-portugal.jpeg',
    title: 'Tower',
  },
  {
    img: '/static/about/snow-tea.jpeg',
    title: 'Tower',
  },
  {
    img: '/static/about/portugal-sight-seeing.jpeg',
    title: 'Tower',
  },
];

function PhotoGallery() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        my: 4,
        animation: 'bannermove 28s linear infinite',
        '@keyframes bannermove': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        '&:hover': {
          animationPlayState: 'paused',
        },
      }}
    >
      {teamPhotos.map((item, index) => (
        <div key={index}>
          <Box
            component="img"
            src={`${item.img}?w=162&auto=format`}
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            sx={(theme) => ({
              width: '100%',
              minWidth: { xs: 200, sm: 400 },
              minHeight: { xs: 100, sm: 200 },
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.grey[200]}`,
              transition: 'all 150ms ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.grey[200]}`,
              },
              ...theme.applyDarkStyles({
                borderColor: 'primaryDark.600',
                boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.common.black}`,
                '&:hover': {
                  boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.common.black}`,
                },
              }),
            })}
          />
        </div>
      ))}
    </Box>
  );
}

export default function AboutHero() {
  return (
    <Section cozy bg="gradient">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2" color="primary.600" fontWeight="bold">
          About us
        </Typography>
        <Typography component="h1" variant="h2" sx={{ my: 1, textAlign: 'center' }}>
          We&apos;re on a mission to make <br />{' '}
          <GradientText>building better UIs effortless</GradientText>
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{
            maxWidth: { md: 500 },
          }}
        >
          We aim high at enabling developers & designers to bring stunning UIs to life with
          unrivalled speed and ease.
        </Typography>
        <PhotoGallery />
        <TeamStatistics />
      </Box>
    </Section>
  );
}
