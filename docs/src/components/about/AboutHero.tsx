import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';
import TeamStatistics from 'docs/src/components/about/TeamStatistics';

const teamPhotos = [
  {
    img: '/static/branding/about/group-photo/teide-group.png',
    title:
      'A group photo of the MUI crew posing near the base of Mount Teide at the start of the hike.',
  },
  {
    img: '/static/branding/about/group-photo/skiers.png',
    title: 'MUI team members standing lined-up in the snow with their skigear.',
  },
  {
    img: '/static/branding/about/group-photo/group-photo.png',
    title: 'Photo of the MUI team in front of the pool at our accommodations in Tenerife',
  },
  {
    img: '/static/branding/about/group-photo/team-dinner.png',
    title: 'Members of the MUI team sitting around a large wooden dining table.',
  },
  {
    img: '/static/branding/about/group-photo/working-table-tenerife.png',
    title: 'The Toolpad team working together on a heads-down moment in Tenerife.',
  },
  {
    img: '/static/branding/about/group-photo/scuba-gear.png',
    title:
      'MUI team members and their diving instructors pose in scuba gear before a successful scuba diving lesson.',
  },
  {
    img: '/static/branding/about/group-photo/outdoor-focus-group.png',
    title:
      'An impromptu focus group gathered next to the pool with laptops to discuss cross-team marketing strategies.',
  },
  {
    img: '/static/branding/about/group-photo/working-table-portugal.png',
    title: 'MUI team members working together on a heads-down moment in Portugal.',
  },
  {
    img: '/static/branding/about/group-photo/snow-tea.png',
    title: 'The team shares a cup of tea up in the mountains of Chamonix, France.',
  },
  {
    img: '/static/branding/about/group-photo/portugal-sight-seeing.png',
    title: 'MUI team selfie while sightseeing in Lisbon, Portugal.',
  },
];

const ImageContainer = styled('div')(() => ({
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
}));

const Image = styled('img')(({ theme }) => ({
  width: 400,
  height: 300,
  boxSizing: 'content-box',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.grey[200]}`,
  transition: 'all 100ms ease',
  ...theme.applyDarkStyles({
    borderColor: (theme.vars || theme).palette.primaryDark[600],
    boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.common.black}`,
  }),
}));

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%)
  }
`;

function PhotoGallery() {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        minWidth: '100%',
        display: 'flex',
        gap: 2,
        my: 5,
        '& > div': {
          animation: `${scroll} 120s linear infinite`,
        },
        '&::before, &::after': {
          background: `linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0) 100%)`,
          content: "''",
          height: '100%',
          position: 'absolute',
          width: 200,
          zIndex: 2,
        },
        '&::before': {
          right: { xs: -64, sm: -20 },
          top: 0,
          transform: 'rotateZ(180deg)',
        },
        '&::after': {
          left: { xs: -64, sm: -20 },
          top: 0,
        },
        ...theme.applyDarkStyles({
          '&::before, &::after': {
            background: `linear-gradient(to right, ${
              (theme.vars || theme).palette.primaryDark[900]
            } 0%, rgba(0, 0, 0, 0) 100%)`,
          },
        }),
      })}
    >
      <ImageContainer>
        {teamPhotos.map((item, index) => (
          <Image
            key={index}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        ))}
      </ImageContainer>
      <ImageContainer aria-hidden="true">
        {/* aria-hidden is used here because this element is a copy from the above, meaning we want to hide it from screen readers. */}
        {teamPhotos.map((item, index) => (
          <Image
            key={index}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        ))}
      </ImageContainer>
    </Box>
  );
}

export default function AboutHero() {
  return (
    <Section cozy bg="gradient">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="primary.main" variant="body2" fontWeight="bold">
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
            maxWidth: { md: 450 },
          }}
        >
          We aim high at enabling developers & designers to bring stunning UIs to life with
          unrivalled speed and ease.
        </Typography>
      </Box>
      <PhotoGallery />
      <TeamStatistics />
    </Section>
  );
}
