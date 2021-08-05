import * as React from 'react';
import NextLink from 'next/link';
import SwipeableViews from 'react-swipeable-views';
import Box, { BoxProps } from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';
import SvgProductTemplates from 'docs/src/icons/SvgProductTemplates';
import SvgProductDesign from 'docs/src/icons/SvgProductDesign';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ROUTES from 'docs/src/route';

function ProductItem({
  icon,
  name,
  description,
  href,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  href: string;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { md: 'center' },
        p: 2,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Box>
        <Typography color="text.primary" variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2" fontWeight="regular" sx={{ my: 0.5 }}>
          {description}
        </Typography>
        <NextLink href={href} passHref>
          <Link
            href={href}
            color="primary"
            variant="body2"
            fontWeight="bold"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 24,
              '& > svg': { transition: '0.2s' },
              '&:hover > svg': { transform: 'translateX(4px)' },
            }}
            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
              event.stopPropagation();
            }}
          >
            <span>Learn more</span>{' '}
            <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
}

function Highlight({
  children,
  selected = false,
  onClick,
  sx,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: BoxProps['onClick'];
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      role="button"
      onClick={onClick}
      sx={{
        borderRadius: 1,
        transition: '0.3s',
        height: '100%',
        border: '1px solid',
        ...(selected && {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : 'background.paper',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.200'),
        }),
        ...(!selected && {
          '&:hover': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
          borderColor: 'transparent',
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

const ProductsSwitcher = ({
  productIndex,
  setProductIndex,
}: {
  productIndex: number;
  setProductIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const productElements = [
    <ProductItem
      icon={<SvgProductCore />}
      name="Core"
      description="Ready to use, forever free, foundational components."
      href={ROUTES.productCore}
    />,
    <ProductItem
      icon={<SvgProductAdvanced />}
      name={
        <Box component="span" display="inline-flex" alignItems="center">
          Advanced&nbsp; <SvgMuiX />
        </Box>
      }
      description="Powerful and robust components for your complex apps."
      href={ROUTES.productAdvanced}
    />,
    <ProductItem
      icon={<SvgProductTemplates />}
      name="Templates"
      description="Fully built, out-of-the-box, templates for your application."
      href={ROUTES.productTemplates}
    />,
    <ProductItem
      icon={<SvgProductDesign />}
      name="Design Kits"
      description="Our components available in your favorite design tool."
      href={ROUTES.productDesignKits}
    />,
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: { md: 'none' },
          mt: 2,
          maxWidth: 'calc(100vw - 40px)',
          minHeight: { xs: 192, sm: 150 },
          '& > div': { pr: '32%' },
        }}
      >
        <SwipeableViews
          index={productIndex}
          resistance
          onChangeIndex={(index) => setProductIndex(index)}
        >
          {productElements.map((elm, index) => (
            <Highlight
              key={index}
              onClick={() => setProductIndex(index)}
              selected={productIndex === index}
              sx={{ transform: productIndex !== index ? 'scale(0.9)' : 'scale(1)' }}
            >
              {elm}
            </Highlight>
          ))}
        </SwipeableViews>
      </Box>
      <Tabs
        orientation="vertical"
        value={productIndex}
        onChange={(event, value) => setProductIndex(value)}
        sx={{
          display: { xs: 'none', md: 'flex' },
          mt: 4,
          maxWidth: 470,
          overflow: 'initial',
          '& .MuiTabs-scroller': { overflow: 'initial !important' },
          '& .MuiTabs-flexContainer': { position: 'relative', zIndex: 1 },
          '& .MuiTab-root': {
            maxWidth: 'initial',
            textAlign: 'left',
            padding: 0,
            alignItems: 'flex-start',
            borderRadius: 1,
            transition: '0.3s',
            '&.Mui-selected:hover': {
              boxShadow: 'inset 0 0 0 1px, 1px 1px 20px 0 rgb(90 105 120 / 20%)',
            },
            '&:hover:not(.Mui-selected)': {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.100'),
              '@media (hover: none)': {
                bgcolor: 'transparent',
              },
            },
            '&:not(:first-of-type)': {
              mt: 1,
            },
          },
          '& .MuiTabs-indicator': {
            width: '100%',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.700' : 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.200',
          },
          '& svg > circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {productElements.map((elm, index) => (
          <Tab key={index} component="div" label={elm} />
        ))}
      </Tabs>
    </React.Fragment>
  );
};

export default ProductsSwitcher;
