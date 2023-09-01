import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

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

export default function TeamPhotoMasonry() {
  return (
    <Masonry columns={3} spacing={2} sx={{ mt: 4, mb: 1, minHeight: 780 }}>
      {teamPhotos.map((item, index) => (
        <div key={index}>
          <Box
            component="img"
            src={`${item.img}?w=162&auto=format`}
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            sx={{
              width: '100%',
              borderRadius: 0.5,
              border: '2px solid',
              borderColor: 'divider',
            }}
          />
        </div>
      ))}
    </Masonry>
  );
}
