import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box, { BoxProps } from '@material-ui/core/Box';

interface BrandingWhyEnterpriseProps {
  src: string;
  description: React.ReactNode;
  avatar: string;
  name: string;
  post: string;
  sx?: BoxProps['sx'];
  imgSx?: BoxProps['sx'];
  netflixSx?: BoxProps['sx'];
  descSx?: BoxProps['sx'];
}
export default function BrandingWhyEnterprise(props: BrandingWhyEnterpriseProps) {
  const { src, description, avatar, name, post, imgSx, netflixSx, descSx, sx } = props;

  return (
    <Grid container alignItems="center" sx={{ px: { xs: 0, sm: 4 }, ...sx }}>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            maxWidth: '470px',
            height: '470px',
            bgcolor: 'greyAA',
            display: { xs: 'none', sm: 'block' },
            ...imgSx,
          }}
        >
          <img alt="" src={src} loading="lazy" />
        </Box>
      </Grid>
      <Grid textAlign="left" item xs={12} sm={6} sx={{ pl: { sm: 3.5, lg: 6 } }}>
        <Box
          component="img"
          src="/static/branding/pricing/netflix-enterprise.svg"
          loading="lazy"
          alt=""
          sx={{ mb: 3, ...netflixSx }}
        />
        <Typography
          component="p"
          variant="h4"
          sx={{
            maxWidth: '470px',
            fontSize: { xs: '24px', sm: '28px', lg: '36px' },
            lineHeight: { xs: '32px', sm: '36px', lg: '44px' },
            ...descSx,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 3,
            '& img': {
              mr: 2,
              borderRadius: '50%',
            },
          }}
        >
          <img width="48" height="48" loading="lazy" src={avatar} alt="" />
          <Typography variant="body2" fontSize="16px" lineHeight="24px">
            <b>{name}</b>, {post}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
