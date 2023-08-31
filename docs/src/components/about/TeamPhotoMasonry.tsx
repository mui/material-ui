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
    img: '/static/blog/2022-tenerife-retreat/whale-watching-danail.jpeg',
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
];

export default function TeamPhotoMasonry() {
  return (
    <Masonry columns={3} spacing={2} sx={{ my: 2 }}>
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
              objectFit: 'cover',
              borderRadius: 0.5,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </div>
      ))}
    </Masonry>
  );
}
