import * as React from 'react';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';

function Demo() {
  return (
    <div>
      <SelectUnstyled listboxOpen slotProps={{ popper: { placement: 'bottom' } }}>
        <li role="none">
          <ul role="group" aria-label="input components">
            <li role="presentation">Input components</li>
            <OptionUnstyled value="1">Button</OptionUnstyled>
            <OptionUnstyled value="2">Input</OptionUnstyled>
            <OptionUnstyled value="3">Select</OptionUnstyled>
            <OptionUnstyled value="4">Switch</OptionUnstyled>
            <OptionUnstyled value="5">Slider</OptionUnstyled>
          </ul>
        </li>
        <li role="none">
          <ul role="group" aria-label="Utils">
            <li role="presentation">Utils</li>
            <OptionUnstyled value="6">Click-away listener</OptionUnstyled>
            <OptionUnstyled value="7">Form control</OptionUnstyled>
            <OptionUnstyled value="8">Modal</OptionUnstyled>
            <OptionUnstyled value="9">No SSR</OptionUnstyled>
            <OptionUnstyled value="10">Textarea autosize</OptionUnstyled>
          </ul>
        </li>
      </SelectUnstyled>
    </div>
  );
}

export default function BaseUIHero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { xl: '-40px' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" /> MUI Core{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'text.tertiary' }}>
              &nbsp;&nbsp;
              <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
                /
              </Typography>
              &nbsp;&nbsp;Base UI
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              my: 2,
              maxWidth: { xs: 500, md: 'unset' },
              minWidth: { lg: 650 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            Ship <GradientText>accessible & sleek</GradientText> components
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            MUI Base gives you a set of foundational &quot;headless&quot; components that you can
            build with using any styling solution you choose—no need to override any default style
            engine or theme.
          </Typography>
          <GetStartedButtons to={ROUTES.baseDocs} installation="npm install @mui/base" />
        </Box>
      }
      right={
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pb: '288px',
            maxWidth: 570,
            height: '100%',
          }}
        >
          <Demo />
          <Box
            sx={{
              inset: 0,
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pb: '288px',
              '--Select-width': '240px',
              '--Select-radius': '12px',
              '& .MuiSelect-root': {
                width: 'var(--Select-width)',
                maxWidth: '100%',
                border: '1px solid',
                borderColor: 'var(--muidocs-palette-grey-300)',
                borderRadius: 'var(--Select-radius)',
                height: '45px',
              },
            }}
          >
            <Demo />
          </Box>
        </Box>
      }
    />
  );
}
