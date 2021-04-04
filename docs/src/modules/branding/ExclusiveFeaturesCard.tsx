import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import Image from './MaterialUixImage';

interface ExclusiveFeaturesCardProps {
  id?: number;
  src: string;
  label: string;
  topImagesrc?: string;
}
export default function ExclusiveFeaturesCard(props: ExclusiveFeaturesCardProps) {
  const { src, label, id = 0, topImagesrc } = props;
  return (
    <Box
      sx={{
        bgcolor: 'rgb(19 47 78 / 40%)',
        color: 'secondary.contrastText',
        position: 'relative',
        p: 4,
        mt: id === 1 ? 3.3 : 0,
        borderRadius: '4px',
      }}
    >
      <Box sx={{ mb: 6, display: 'inline-block', position: 'relative' }}>
        <Image
          src={src}
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'primary.main',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
              m: 0,
            },
          }}
        />
        {topImagesrc && (
          <Image
            src={topImagesrc}
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'vividBlue',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '-8px',
              border: '4px solid rgb(19, 47, 76)',
              left: '46px',
              '& img': {
                m: 0,
              },
            }}
          />
        )}
      </Box>
      <Typography variant="h4" sx={{ color: 'white' }}>
        {label}
      </Typography>
    </Box>
  );
}
