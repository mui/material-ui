import * as React from 'react';
import dynamic from 'next/dynamic';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconImage from 'docs/src/components/icon/IconImage';
import Highlighter from 'docs/src/components/action/Highlighter';

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ProductItem({
  label,
  icon,
  name,
  description,
  chip,
}: {
  label: string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
}) {
  return (
    <Box
      component="span"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 2.5,
        }}
      >
        <span>{icon}</span>
        <span>
          <Typography color="text.primary" variant="body2" fontWeight="bold">
            {name}
          </Typography>
          <Typography color="text.secondary" variant="body2" fontWeight="regular" sx={{ my: 0.5 }}>
            {description}
          </Typography>
        </span>
      </Box>
      <Box sx={{ p: 2 }}>{chip}</Box>
    </Box>
  );
}

export default function ProductsSwitcher(props: {
  inView?: boolean;
  productIndex: number;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { inView = false, productIndex, setProductIndex } = props;
  const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const productElements = [
    <ProductItem
      label="by going to the Core components page"
      icon={<IconImage name="product-core" />}
      name="MUI Core"
      description="Foundational components for shipping features faster."
      // href={ROUTES.productCore}
    />,
    <ProductItem
      label="by going to the Advanced components page"
      icon={<IconImage name="product-advanced" />}
      name={
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          MUI X
        </Box>
      }
      description="Advanced components for complex use cases."
    />,
    <ProductItem
      label="by going to the Toolpad page"
      icon={<IconImage name="product-toolpad" />}
      name="Toolpad"
      chip={<Chip size="small" label="Beta" color="primary" variant="outlined" />}
      description="A low-code tool for building internal applications."
    />,
    <ProductItem
      label="by going to the templates page"
      icon={<IconImage name="product-templates" />}
      name="Templates"
      description="Professionally built UIs to jumpstart your next project."
    />,
    <ProductItem
      label="by going to the design-kits page"
      icon={<IconImage name="product-designkits" />}
      name="Design kits"
      description="The core components available on your favorite design tool."
    />,
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: { md: 'none' },
          maxWidth: 'calc(100vw - 40px)',
          minHeight: { xs: 200, sm: 166 },
          '& > div': { pr: '32%' },
        }}
      >
        {isBelowMd && inView && (
          <SwipeableViews
            index={productIndex}
            resistance
            enableMouseEvents
            onChangeIndex={(index) => setProductIndex(index)}
          >
            {productElements.map((elm, index) => (
              <Highlighter
                key={index}
                disableBorder
                onClick={() => setProductIndex(index)}
                selected={productIndex === index}
                sx={{
                  width: '100%',
                  transition: '0.3s',
                  transform: productIndex !== index ? 'scale(0.9)' : 'scale(1)',
                }}
              >
                {elm}
              </Highlighter>
            ))}
          </SwipeableViews>
        )}
      </Box>
      <Stack spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}>
        {productElements.map((elm, index) => (
          <Highlighter
            key={index}
            disableBorder
            onClick={() => setProductIndex(index)}
            selected={productIndex === index}
          >
            {elm}
          </Highlighter>
        ))}
      </Stack>
    </React.Fragment>
  );
}
