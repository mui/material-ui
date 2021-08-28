import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';
import { PrefetchStoreTemplateImages } from 'docs/src/components/home/StoreTemplatesBanner';
import { PrefetchDesignKitImages } from 'docs/src/components/home/DesignKits';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

const CoreShowcase = dynamic(() => import('./CoreShowcase'));
const AdvancedShowcase = dynamic(() => import('./AdvancedShowcase'));
const StoreTemplatesBanner = dynamic(() => import('./StoreTemplatesBanner'));
const DesignKits = dynamic(() => import('./DesignKits'));

const ProductSuite = () => {
  const [productIndex, setProductIndex] = React.useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '200px',
  });
  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
        py: { xs: 4, sm: 6, md: 8 },
        overflow: 'hidden',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box maxWidth={500}>
              <SectionHeadline
                overline="Products"
                title={
                  <Typography variant="h2" sx={{ my: 1 }}>
                    Extensive library of components, ready for{' '}
                    <GradientText>production</GradientText>
                  </Typography>
                }
                description="We bring together a suite of products integrated to make your life easier when it comes to setting up design systems."
              />
            </Box>
            <Box sx={{ mt: 4 }} />
            <ProductsSwitcher
              inView={inView}
              productIndex={productIndex}
              setProductIndex={setProductIndex}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={productIndex === 0 ? { minHeight: { xs: 777, sm: 757, md: 'unset' } } : {}}
          >
            {inView && (
              <React.Fragment>
                <PrefetchStoreTemplateImages />
                <PrefetchDesignKitImages />
                {productIndex === 0 && (
                  <Fade in timeout={700}>
                    <div>
                      <CoreShowcase />
                    </div>
                  </Fade>
                )}
                {productIndex === 1 && (
                  <Fade in timeout={700}>
                    <div>
                      <AdvancedShowcase />
                    </div>
                  </Fade>
                )}
                {productIndex === 2 && <StoreTemplatesBanner />}
                {productIndex === 3 && <DesignKits />}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSuite;
