import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

const Image = styled('img')({
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top left',
  opacity: 0.32,
});

export default function DesignKits() {
  return (
    <Box
      sx={{
        position: 'relative',
        ml: { md: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Fade in>
        <Box
          sx={{
            top: 0,
            left: 0,
            position: 'absolute',
            height: { xs: '50vh', sm: '80vh' },
            maxHeight: 780,
            width: { xs: '100vw', md: '50vw' },
            maxWidth: 780,
          }}
        >
          <Image src="/static/branding/design-kits/designkits-bg.png" />
        </Box>
      </Fade>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 6 },
          py: 4,
          gridTemplateColumns: '1fr 1fr 1fr',
          '& .MuiAvatar-root': {
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            filter: 'drop-shadow(0px 3.57436px 44.6795px rgba(90, 105, 120, 0.25))',
          },
        }}
      >
        <Fade in>
          <Avatar src="/static/branding/design-kits/designkits-figma.png" />
        </Fade>
        <Fade in>
          <Avatar src="/static/branding/design-kits/designkits-sketch.png" />
        </Fade>
        <Fade in>
          <Avatar src="/static/branding/design-kits/designkits-xd.png" />
        </Fade>
      </Box>
    </Box>
  );
}
