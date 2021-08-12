import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';
import CoreShowcase from 'docs/src/components/home/CoreShowcase';
import AdvancedShowcase from 'docs/src/components/home/AdvancedShowcase';
import StoreTemplatesBanner, {
  PrefetchStoreTemplateImages,
} from 'docs/src/components/home/StoreTemplatesBanner';
import DesignKits, { PrefetchDesignKitImages } from 'docs/src/components/home/DesignKits';

const ProductSuite = () => {
  const [productIndex, setProductIndex] = React.useState(0);
  return (
    <Box
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
              <Typography variant="body2" color="primary" fontWeight="bold">
                Products
              </Typography>
              <Typography variant="h2" sx={{ my: 1 }}>
                Extensive library of components, ready for <GradientText>production</GradientText>.
              </Typography>
              <Typography color="text.secondary">
                We bring together a suite of products integrated to make your life easier when it
                comes to setting up design systems.
              </Typography>
            </Box>
            <ProductsSwitcher productIndex={productIndex} setProductIndex={setProductIndex} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PrefetchStoreTemplateImages />
            <PrefetchDesignKitImages />
            {productIndex === 0 && <CoreShowcase />}
            {productIndex === 1 && <AdvancedShowcase />}
            {productIndex === 2 && <StoreTemplatesBanner />}
            {productIndex === 3 && <DesignKits />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSuite;
