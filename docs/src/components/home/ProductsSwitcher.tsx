import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Box, { BoxProps } from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';
import SvgProductTemplates from 'docs/src/icons/SvgProductTemplates';
import SvgProductDesign from 'docs/src/icons/SvgProductDesign';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';

function ProductItem({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
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
        <Typography color="text.secondary" variant="body2" fontWeight="regular">
          {description}
        </Typography>
        <Typography
          color="primary"
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', minHeight: 24 }}
        >
          <span>Learn more</span> <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '2px' }} />
        </Typography>
      </Box>
    </Box>
  );
}

function Highlight({
  children,
  selected = false,
  sx,
}: {
  children: React.ReactNode;
  selected?: boolean;
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        transition: '0.3s',
        height: '100%',
        ...(selected && {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : 'background.paper',
          border: '1px solid',
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

const ProductsSwitcher = () => {
  const [productIndex, setProductIndex] = React.useState(0);
  const productElements = [
    <ProductItem
      icon={<SvgProductCore />}
      name="Core"
      description="Ready to use, forever free, foundational components."
    />,
    <ProductItem
      icon={<SvgProductAdvanced />}
      name={
        <Box component="span" display="inline-flex" alignItems="center">
          Advanced&nbsp; <SvgMuiX />
        </Box>
      }
      description="Powerful and robust components for your complex apps."
    />,
    <ProductItem
      icon={<SvgProductTemplates />}
      name="Templates"
      description="Fully built, out-of-the-box, templates for your application."
    />,
    <ProductItem
      icon={<SvgProductDesign />}
      name="Design Kits"
      description="Our components available in your favorite design tool."
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
        <SwipeableViews onChangeIndex={(index) => setProductIndex(index)}>
          {productElements.map((elm, index) => (
            <Highlight
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
          <Tab key={index} label={elm} />
        ))}
      </Tabs>
    </React.Fragment>
  );
};

export default ProductsSwitcher;
