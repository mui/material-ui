import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box, { BoxProps } from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

const Image = styled('img')({
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Banner = React.forwardRef(
  ({ src, alt, ...props }: { src: string; alt: string } & BoxProps, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={{
        height: '0px',
        pb: '57.8%',
        position: 'relative',
        filter: 'drop-shadow(0px 3.57436px 44.6795px rgba(90, 105, 120, 0.25))',
        ...props.sx,
      }}
    >
      <Image src={src} alt={alt} loading="lazy" />
    </Box>
  ),
);

export default function StoreTemplatesBanner() {
  const [appearIndexes, setAppearIndexes] = React.useState<Array<number>>([0]);
  React.useEffect(() => {
    const time = setTimeout(() => {
      if (appearIndexes.length < 5) {
        setAppearIndexes((current) => [...current, current.length]);
      }
    }, 50);
    return () => {
      clearTimeout(time);
    };
  }, [appearIndexes]);
  return (
    <Box
      sx={{
        ml: { md: 4, lg: 0 },
        width: { md: '72vw' },
        height: '100%',
        maxWidth: 780,
      }}
    >
      <Grid
        container
        columnSpacing={{ sm: 4, md: 8 }}
        rowSpacing={4}
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Fade in={appearIndexes.includes(0)}>
            <Banner
              src="/static/branding/store-templates/store-template1.png"
              alt="Store template 1"
            />
          </Fade>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Fade in={appearIndexes.includes(3)}>
            <Banner
              src="/static/branding/store-templates/store-template2.png"
              alt="Store template 2"
            />
          </Fade>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Box sx={{ width: { xs: '100%', md: '50%' }, mx: 'auto' }}>
            <Fade in={appearIndexes.includes(2)}>
              <Banner
                src="/static/branding/store-templates/store-template3.png"
                alt="Store template 3"
              />
            </Fade>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Fade in={appearIndexes.includes(1)}>
            <Banner
              src="/static/branding/store-templates/store-template4.png"
              alt="Store template 4"
            />
          </Fade>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Fade in={appearIndexes.includes(4)}>
            <Banner
              src="/static/branding/store-templates/store-template5.png"
              alt="Store template 5"
            />
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
