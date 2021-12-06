import * as React from 'react';
import NextLink from 'next/link';
import CONFIG from 'docs/src/config';
import ROUTES from 'docs/src/route';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { CSSObject } from '@mui/system';
import Box from '@mui/joy/Box';
import { CssVarsProvider, JoyTheme, styled } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/styled-engine';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import SvgStackOverflow from 'docs/src/icons/SvgStackOverflow';
import {
  Button,
  Typography,
  Input,
  GradientText,
  Header,
  Widget,
  ColorSchemePicker,
  IconWrapper,
  Anchor,
} from 'docs/src/joy/components';
import {
  Github,
  Twitter,
  LinkedIn,
  Flask,
  Sparkles,
  Hammer,
  CheckCircleOutline,
} from 'docs/src/joy/icons';
import JoyDemo from 'docs/src/joy/demo';
import useEmailSubscribe from 'docs/src/modules/utils/useEmailSubscribe';

declare module '@mui/joy/styles' {
  interface TypographySystem {
    overline: CSSObject;
  }

  interface Palette {
    gradient: {
      text: string;
      bg: string;
    };
  }

  interface PaletteBackground {
    translucent1: string;
  }
}

const blue = {
  50: '#F7F9FF',
  100: '#E8EEFE',
  200: '#CAD6FC',
  300: '#A5BAFB',
  400: '#6085F7',
  500: '#3D62D5',
  600: '#2B4697',
  700: '#23397C',
  800: '#121D40',
  900: '#0B1228',
};

const EmailSubscribe = () => {
  const { form, setForm, onSubmit } = useEmailSubscribe(CONFIG.JOY_SUBSCRIBE_URL);
  if (form.status === 'sent') {
    return (
      <Box
        sx={(theme) => ({
          ...theme.variants.outlined.success,
          bgcolor: 'success.lightBg',
          p: 2,
          borderRadius: 1,
          maxWidth: 400,
          display: 'flex',
          gap: 1,
        })}
      >
        <CheckCircleOutline fontSize="lg" />
        <div>
          <Typography
            level="body2"
            sx={{ mb: '0.25rem', color: 'inherit', fontWeight: 'var(--joy-fontWeight-md)' }}
          >
            Thanks for subscribing!
          </Typography>
          <Typography level="body2" sx={{ lineHeight: 'var(--joy-lineHeight-default)' }}>
            We&apos;re working hard to make Joy available to you. Expect to hear from us with
            updates as soon as possible.
          </Typography>
        </div>
      </Box>
    );
  }
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', gap: 1, maxWidth: 400 }}>
      <Input
        id="email-subscribe"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        onChange={(event) => setForm({ email: event.target.value, status: 'initial' })}
        sx={{ flexGrow: 1 }}
      />
      <Button disabled={form.status === 'loading'} type="submit">
        Subscribe
      </Button>
    </Box>
  );
};

const ButtonLink = styled(Button)<Omit<JSX.IntrinsicElements['a'], 'ref'>>({});

export default function Joy() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                ...blue,
                textColor: 'var(--joy-palette-primary-500)',
                outlinedColor: 'var(--joy-palette-primary-500)',
                outlinedHoverColor: 'var(--joy-palette-primary-500)',
                outlinedBorder: 'var(--joy-palette-primary-500)',
                outlinedHoverBorder: 'var(--joy-palette-primary-500)',
                outlinedHoverBg: 'var(--joy-palette-primary-50)',
              },
              neutral: {
                outlinedBorder: 'var(--joy-palette-neutral-200)',
              },
              gradient: {
                bg: 'conic-gradient(from 225.22deg at 50.39% 50%, #D7021E -69.37deg, #3D62D5 56.21deg, #6C96FF 56.25deg, #FCEEB5 136.88deg, #FDCBD1 217.5deg, #D7021E 290.63deg, #3D62D5 416.21deg)',
                text: 'var(--joy-palette-warning-700), var(--joy-palette-danger-700), var(--joy-palette-primary-700), var(--joy-palette-primary-500)',
              },
              background: {
                translucent1: 'rgba(255, 255, 255, 0.6)',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                ...blue,
                outlinedBorder: 'var(--joy-palette-primary-300)',
                outlinedHoverColor: 'var(--joy-palette-primary-100)',
                outlinedHoverBorder: 'var(--joy-palette-primary-300)',
                outlinedHoverBg: 'var(--joy-palette-primary-900)',
              },
              neutral: {
                textHoverColor: '#fff',
                outlinedBorder: 'var(--joy-palette-neutral-600)',
              },
              gradient: {
                bg: 'conic-gradient(from 225.22deg at 50.39% 50%, #121D40 -69.37deg, #3D62D5 56.25deg, #574B19 136.88deg, #48010A 217.5deg, #121D40 290.63deg, #3D62D5 416.25deg)',
                text: 'var(--joy-palette-primary-300), var(--joy-palette-danger-200)',
              },
              background: {
                translucent1: 'rgba(0, 0, 0, 0.6)',
              },
            },
          },
        },
        fontFamily: {
          display: '"PlusJakartaSans-ExtraBold", var(--joy-fontFamily-fallback)',
        },
        typography: {
          body2: {
            lineHeight: 'var(--joy-lineHeight-sm)',
          },
          h5: {
            fontWeight: 'normal',
          },
          overline: {
            fontFamily: 'var(--joy-fontFamily-default)',
            fontWeight: 'var(--joy-fontWeight-xl)',
            fontSize: 'var(--joy-fontSize-default)',
            lineHeight: 'var(--joy-lineHeight-default)',
            textTransform: 'uppercase',
            color: 'var(--joy-palette-primary-textColor)',
          },
        },
      }}
    >
      <GlobalStyles
        // @ts-ignore
        styles={(theme: JoyTheme) => ({
          html: {
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
            // Change from `box-sizing: content-box` so that `width`
            // is not affected by `padding` or `border`.
            boxSizing: 'border-box',
            // Fix font resize problem in iOS
            WebkitTextSizeAdjust: '100%',
          },
          ul: {
            listStyle: 'none',
            paddingInlineStart: 0,
            '& > li': {
              marginBottom: '0.25rem',
            },
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },
          body: {
            margin: 0, // Remove the margin in all browsers.
            backgroundColor: theme.vars.palette.background.default,
            ...theme.typography.body1,
            // Add support for document.body.requestFullScreen().
            // Other elements, if background transparent, are not supported.
            '&::backdrop': {
              backgroundColor: theme.vars.palette.background.default,
            },
          },
        })}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          height: 'min(100vh, 700px)',
          width: '100%',
          background: 'var(--joy-palette-gradient-bg)',
          filter: 'blur(20px)', // Careful! too much blur px causes performance issue in Safari.
          transform: 'rotate(180deg)',
          mixBlendMode: 'normal',
          zIndex: -1,
          opacity: 0.2,
        }}
      />
      <Header translucent={trigger}>
        <Container sx={{ display: 'flex', alignItems: 'center', maxWidth: { xl: 1536 } }}>
          <SvgMuiLogo />
          <ButtonLink
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href={ROUTES.githubOrg}
            aria-label="github"
            title="GitHub"
            square
            variant="outlined"
            sx={{ ml: 'auto', mr: 1 }}
          >
            <Github />
          </ButtonLink>
          <ColorSchemePicker />
        </Container>
      </Header>
      <Container sx={{ mt: 14, maxWidth: { xl: 1536 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 4, md: 8, lg: 2 },
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
        >
          <Box sx={{ maxWidth: 620, flexShrink: { md: 0 } }}>
            <Typography level="overline">MUI Presents</Typography>
            <Typography level="h1" sx={{ my: 2 }}>
              A design system for you to <br />
              <GradientText>start quick and look great</GradientText>
            </Typography>
            <Typography sx={{ mb: 4 }} level="h5">
              Joy is a new design system being built on top of MUI&apos;s unstyled components. With
              a beautiful and opinionated default theme, you&apos;ll be able to develop React UIs
              faster while looking great.
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Development still in early stage. Subscribe to the newsletter for updates
            </Typography>
            <EmailSubscribe />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', lg: 'repeat(2, 1fr)' },
              gap: 2,
              mx: { xs: -2, sm: -3, lg: 'auto' },
              px: { xs: 2, sm: 3, lg: 0 },
              overflowX: { xs: 'auto', lg: 'initial' },
              py: 3,
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Widget label="Tabs" />
            <Widget label="Menu" />
            <Widget label="Switch" />
            <Widget label="Button" />
          </Box>
        </Box>
      </Container>

      {/* Demo API consistency */}
      <Container maxWidth="md" sx={{ mt: 24 }}>
        <JoyDemo />
      </Container>

      <Container sx={{ my: 24, maxWidth: { xl: 1536 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography level="h2">
              The next step for{' '}
              <Box component="br" sx={{ display: { xs: 'none', md: 'inline' } }} />{' '}
              <GradientText>design systems</GradientText>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 4, maxWidth: 700 }}>
              Every year, we run a survey to touch base and see how our developer community is
              feeling about MUI. Last year, we noticed a strong pull for a different design
              direction and also a lot of requests for upgrading the customization experience.
              <br />
              <br />
              This year, we launched MUI Core v5, which already brings a bunch of updates that make
              customization easier. And now, we&apos;ll be exploring them further in a brand new,
              open-source, design system.
            </Typography>
            <Button variant="outlined" size="large">
              Check the available RFCs
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ my: 24, maxWidth: { xl: 1536 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography level="h2" sx={{ mb: 3 }}>
              <GradientText>What you can expect</GradientText>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'min-content auto',
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <IconWrapper>
                <Sparkles />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  A new and great design out of the box
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Up until now, we focused on implementing Material Design. Developers have grown
                  tired of having their apps looking like just another Google product. With Joy,
                  you&apos;ll have access to the quality of development we strive to have in the
                  Material components but now, with a beautiful, different and opinionated, default
                  theme.
                </Typography>
              </Box>

              <IconWrapper>
                <Hammer />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  Customization tools to make it look your own
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Along with the newly introduced `sx prop` and migration to emotion on the
                  `@mui/material` package, we&apos;ll be introducing CSS variables to Joy, to add
                  even more to how easy will be to customize the default theme and make the
                  components follow your brand indentity.
                </Typography>
              </Box>

              <IconWrapper>
                <Flask />
              </IconWrapper>
              <Box sx={{ mb: 4 }}>
                <Typography level="h4" sx={{ mb: 1 }}>
                  A laboratory for experimenting
                </Typography>
                <Typography sx={{ maxWidth: 700 }}>
                  Many teams and companies rely on `@mui/material` for their design systems, which
                  adds risk to experimenting with new stuff. Joy, will be the lab to experiment
                  different approaches and test bold ideas. As they get mature, they&apos;ll be
                  available for the Material package as well.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ maxWidth: { xl: 1536 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm>
            <SvgMuiLogo />
            <Typography sx={{ mb: 3, mt: 8 }}>
              Development still in early stage. Subscribe to the newsletter for updates
            </Typography>
            <EmailSubscribe />
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box sx={{ minWidth: 144 }}>
              <Typography sx={{ color: 'text.tertiary', mb: 1 }} level="body2">
                Product
              </Typography>
              <Box component="ul">
                <li>
                  <NextLink passHref href={ROUTES.productCore}>
                    <Anchor>MUI Core</Anchor>
                  </NextLink>
                </li>
                <li>
                  <NextLink passHref href={ROUTES.productTemplates}>
                    <Anchor>Templates</Anchor>
                  </NextLink>
                </li>
                <li>
                  <NextLink passHref href={ROUTES.productDesignKits}>
                    <Anchor>Design Kits</Anchor>
                  </NextLink>
                </li>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box sx={{ minWidth: 120 }}>
              <Typography sx={{ color: 'text.tertiary', mb: 1 }} level="body2">
                Company
              </Typography>
              <Box component="ul">
                <li>
                  <NextLink passHref href={ROUTES.about}>
                    <Anchor>About</Anchor>
                  </NextLink>
                </li>
                <li>
                  <NextLink passHref href={ROUTES.vision}>
                    <Anchor>Vision</Anchor>
                  </NextLink>
                </li>
                <li>
                  <NextLink passHref href={ROUTES.careers}>
                    <Anchor>Careers</Anchor>
                  </NextLink>
                </li>
                <li>
                  <Anchor href={ROUTES.blog} target="_blank" rel="noopener noreferrer">
                    Blog
                  </Anchor>
                </li>
                <li>
                  <NextLink passHref href={ROUTES.support}>
                    <Anchor>Support</Anchor>
                  </NextLink>
                </li>
                <li>
                  <Anchor target="_blank" rel="noopener noreferrer" href="mailto:contact@mui.com">
                    Contact us
                  </Anchor>
                </li>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          component="hr"
          sx={{
            mt: 8,
            mb: 3,
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            borderStyle: 'solid',
            borderBottom: 0,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 8,
            flexWrap: 'wrap',
          }}
        >
          <Typography level="body3" sx={{ color: 'text.tertiary' }}>
            Copyright 2021 Material-UI SAS.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <ButtonLink
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={ROUTES.githubOrg}
              aria-label="github"
              title="GitHub"
              square
              variant="text"
              color="neutral"
              sx={{ ml: 'auto' }}
            >
              <Github />
            </ButtonLink>
            <ButtonLink
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={ROUTES.stackOverflowMuiTag}
              aria-label="Stack Overflow"
              title="Stack Overflow"
              square
              variant="text"
              color="neutral"
            >
              <SvgStackOverflow />
            </ButtonLink>
            <ButtonLink
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={ROUTES.twitterMui}
              aria-label="twitter"
              title="Twitter"
              square
              variant="text"
              color="neutral"
            >
              <Twitter />
            </ButtonLink>
            <ButtonLink
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={ROUTES.linkedInMui}
              aria-label="linkedin"
              title="LinkedIn"
              square
              variant="text"
              color="neutral"
            >
              <LinkedIn />
            </ButtonLink>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
