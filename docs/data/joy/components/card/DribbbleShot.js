/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Visibility from '@mui/icons-material/Visibility';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';

export default function DribbbleShot() {
  return (
    <Card
      sx={{
        minWidth: 300,
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
                  href="#dribbble-shot"
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
        <Chip
          variant="soft"
          color="neutral"
          size="sm"
          sx={{
            borderRadius: 'xs',
            py: 0.25,
            px: 0.5,
          }}
        >
          TEAM
        </Chip>
        <Link
          level="body2"
          underline="none"
          startDecorator={<Favorite />}
          sx={{
            ml: 'auto',
            color: 'text.secondary',
            '&:hover': { color: 'danger.plainColor' },
          }}
        >
          117
        </Link>
        <Link
          level="body2"
          underline="none"
          startDecorator={<Visibility />}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.plainColor' },
          }}
        >
          10.4k
        </Link>
      </Box>
    </Card>
  );
}
