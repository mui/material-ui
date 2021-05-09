import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MaterialUixImage from 'docs/src/modules/branding/MaterialUixImage';

interface ExclusiveFeaturesCardProps {
  index: number;
  src: string;
  label: string;
  topImagesrc?: string;
}
export default function ExclusiveFeaturesCard(props: ExclusiveFeaturesCardProps) {
  const { src, label, topImagesrc, index } = props;

  return (
    <Box
      sx={{
        bgcolor: '#132F4C',
        color: 'secondary.contrastText',
        position: 'relative',
        p: 4,
        mt: index === 1 ? 3.5 : 0,
        borderRadius: 1,
      }}
    >
      <Box sx={{ mb: 6, display: 'inline-block', position: 'relative' }}>
        <MaterialUixImage
          src={src}
          width={30}
          height={30}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
              m: 0,
            },
          }}
        />
        {topImagesrc && (
          <MaterialUixImage
            src={topImagesrc}
            width={20}
            height={20}
            sx={{
              bgcolor: 'vividBlue',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -8,
              border: '4px solid rgb(19, 47, 76)',
              left: 46,
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
