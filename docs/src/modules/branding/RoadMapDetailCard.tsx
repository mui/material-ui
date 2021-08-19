import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'docs/src/modules/components/Link';
import MaterialUixImage from 'docs/src/modules/branding/MaterialUixImage';

interface RoadMapDetailCardProps {
  src: string;
  imageWidth: number;
  imageHeight: number;
  label: string;
  buttonLabel: string;
  startIcon: any;
  buttonColor?: 'primary' | 'ternary' | 'neutral';
}

export default function RoadMapDetailCard(props: RoadMapDetailCardProps) {
  const { src, imageWidth, imageHeight, label, buttonLabel, startIcon, buttonColor } = props;
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2.5,
        borderRadius: 1,
      }}
    >
      <MaterialUixImage
        src={src}
        width={imageWidth}
        height={imageHeight}
        sx={{
          position: 'relative',
          '& img': {
            m: 0,
          },
          p: 0,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <Button
        href="/company/jobs/"
        component={Link}
        noLinkStyle
        color={buttonColor}
        size="small"
        variant="contained"
        startIcon={startIcon}
        sx={{
          minWidth: 0,
          ml: 'auto',
          '& .MuiButton-label': {
            fontSize: { xs: 0, sm: 'inherit' },
          },
          '& .MuiButton-startIcon': {
            mr: { xs: 0, sm: 1 },
          },
        }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
}
