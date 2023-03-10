import * as React from 'react';
import dynamic from 'next/dynamic';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconImage from 'docs/src/components/icon/IconImage';
import Highlighter from 'docs/src/components/action/Highlighter';
import Link from 'docs/src/modules/components/Link';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';

const SwipeableViews = dynamic(() => import('react-swipeable-views'), { ssr: false });

function ProductItem({
  'aria-label': label,
  icon,
  name,
  description,
  href,
}: {
  'aria-label': string;
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  href: string;
}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        p: 2,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
      }}
    >
      <Box component="span" sx={{ mr: 2, mb: { xs: 1, md: 0 } }}>
        {icon}
      </Box>
      <span>
        <Typography
          component="span"
          color="text.primary"
          variant="body2"
          fontWeight="bold"
          display="block"
        >
          {name}
        </Typography>
        <Typography
          component="span"
          color="text.secondary"
          variant="body2"
          fontWeight="regular"
          display="block"
          sx={{ my: 0.5 }}
        >
          {description}
        </Typography>
        <Link
          href={href}
          color="primary"
          variant="body2"
          fontWeight="bold"
          aria-label={label}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 24,
            '& > svg': { transition: '0.2s' },
            '&:hover > svg': { transform: 'translateX(2px)' },
          }}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.stopPropagation();
          }}
        >
          <span>Learn more</span>{' '}
          <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
        </Link>
      </span>
    </Box>
  );
}

function ProductsSwitcher({
  inView = false,
  productIndex,
  setProductIndex,
}: {
  inView?: boolean;
  productIndex: number;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isBelowMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const productElements = [
    <ProductItem
      aria-label="Go to core components page"
      icon={<IconImage name="product-core" />}
      name="MUI Core"
      description="Foundational components for shipping features faster. Includes Material UI."
      href={ROUTES.productCore}
    />,
    <ProductItem
      aria-label="Go to advanced components page"
      icon={<IconImage name="product-advanced" />}
      name={
        <Box component="span" display="inline-flex" alignItems="center">
          MUI X
        </Box>
      }
      description="Advanced components for complex use cases."
      href={ROUTES.productAdvanced}
    />,
    <ProductItem
      aria-label="Go to templates page"
      icon={<IconImage name="product-templates" />}
      name="Templates"
      description="Professionally designed UI layouts to jumpstart your next project."
      href={ROUTES.productTemplates}
    />,
    <ProductItem
      aria-label="Go to design-kits page"
      icon={<IconImage name="product-designkits" />}
      name="Design kits"
      description="Bring our components to your favorite design tool."
      href={ROUTES.productDesignKits}
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

export default ProductsSwitcher;
