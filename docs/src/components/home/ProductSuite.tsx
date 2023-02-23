import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';
import { PrefetchStoreTemplateImages } from 'docs/src/components/home/StoreTemplatesBanner';
import { PrefetchDesignKitImages } from 'docs/src/components/home/DesignKits';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

function createLoading(sx: BoxProps['sx']) {
  return function Loading() {
    return (
      <Box
        sx={[
          (theme) => ({
            borderRadius: 1,
            bgcolor: 'grey.100',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    );
  };
}

const CoreShowcase = dynamic(() => import('./CoreShowcase'), {
  loading: createLoading({ height: 723, mt: { md: 2 } }),
});
const AdvancedShowcase = dynamic(() => import('./AdvancedShowcase'), {
  loading: createLoading({ height: 750, mt: { md: 2 } }),
});
const StoreTemplatesBanner = dynamic(() => import('./StoreTemplatesBanner'));
const DesignKits = dynamic(() => import('./DesignKits'));

function ProductSuite() {
  const [productIndex, setProductIndex] = React.useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '200px',
  });
  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        bgcolor: 'grey.50',
        py: { xs: 4, sm: 6, md: 8 },
        overflow: 'hidden',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.900',
        }),
      })}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box maxWidth={500}>
              <SectionHeadline
                overline="Products"
                title={
                  <Typography variant="h2" sx={{ my: 1 }}>
                    Every component you need is <GradientText>ready for production</GradientText>
                  </Typography>
                }
                description="Build at an accelerated pace without sacrificing flexibility or control."
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
                {productIndex === 0 && <CoreShowcase />}
                {productIndex === 1 && <AdvancedShowcase />}
                {productIndex === 2 && <StoreTemplatesBanner />}
                {productIndex === 3 && <DesignKits />}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductSuite;
