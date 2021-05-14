import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import Box from '@material-ui/core/Box';
import Image from 'docs/src/modules/branding/MaterialUixImage';
import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';

interface DesignResourcesCardProps {
  label: string;
  src: string;
  href: string;
}

export default function DesignResourcesCard(props: DesignResourcesCardProps) {
  const { label, src, href } = props;
  return (
    <Box
      sx={{
        minWidth: { xs: '130px', sm: '146px' },
        textAlign: 'center',
        mb: { xs: 5, sm: 0 },
      }}
    >
      <Image
        src={src}
        sx={{
          width: '100px',
          height: '100px',
          bgcolor: 'greyF3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100px',
          mx: 'auto',
          mb: 2.5,
        }}
      />
      <Box
        component={Link}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'secondary.main',
          textDecoration: 'none !important',
          '& svg': {
            mt: '2px',
          },
        }}
        href={href}
      >
        <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
          {label}
        </Typography>
        <ArrowCirleIcon />
      </Box>
    </Box>
  );
}
