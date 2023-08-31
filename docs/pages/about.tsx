import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import Link from 'docs/src/modules/components/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import TeamPhotoMasonry from 'docs/src/components/about/TeamPhotoMasonry';
import TeamStatistics from 'docs/src/components/about/TeamStatistics';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';
import teamMembers from 'docs/data/about/teamMembers.json';
/**
 * Import data from: https://tools-public.mui.com/prod/pages/nSwYn51

curl 'https://tools-public.mui.com/prod/api/data/muicomabout/queryAbout' \
  -H 'content-type: application/json' \
  --data-raw '{}' \
  --compressed
*/

interface Profile {
  name: string;
  /**
   * Role, what are you working on?
   */
  title: string;
  /**
   * Country where you live in, ISO 3166-1.
   */
  locationCountry: string; // https://flagpedia.net/download/api
  /**
   * Image URL.
   */
  src?: string;
  /**
   * Lives in.
   */
  location?: string;
  /**
   * Short summary about you.
   */
  about?: string;
  github?: string;
  twitter?: string;
}

function Person(props: Profile & { sx?: PaperProps['sx'] }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%', ...props.sx }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          '& > div': { minWidth: 'clamp(0px, (150px - 100%) * 999 ,100%)' },
        }}
      >
        <Tooltip
          title={props.location || false}
          placement="right-end"
          PopperProps={{
            popperOptions: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [3, 2],
                  },
                },
              ],
            },
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              variant="rounded"
              imgProps={{
                width: '70',
                height: '70',
                loading: 'lazy',
              }}
              src={props.src}
              alt={props.name}
              {...(props.src?.startsWith('https://avatars.githubusercontent.com') && {
                src: `${props.src}?s=70`,
                srcSet: `${props.src}?s=140 2x`,
              })}
              sx={(theme) => ({
                width: 70,
                height: 70,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.100',
                backgroundColor: 'primary.50',
                ...theme.applyDarkStyles({
                  backgroundColor: 'primary.900',
                  borderColor: 'primaryDark.500',
                }),
              })}
            />
            <Box
              sx={(theme) => ({
                width: 24,
                height: 24,
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#FFF',
                borderRadius: 40,
                border: '2px solid',
                borderColor: 'primary.50',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                transform: 'translateX(50%)',
                overflow: 'hidden',
                ...theme.applyDarkStyles({
                  borderColor: 'primary.200',
                }),
              })}
            >
              <img
                loading="lazy"
                height="20"
                src={`https://flagcdn.com/${props.locationCountry}.svg`}
                alt=""
              />
            </Box>
          </Box>
        </Tooltip>
        <Box sx={{ mt: -0.5, mr: -0.5, ml: 'auto' }}>
          {props.github && (
            <IconButton
              aria-label={`${props.name} github`}
              component="a"
              href={`https://github.com/${props.github}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon fontSize="small" sx={{ color: 'grey.500' }} />
            </IconButton>
          )}
          {props.twitter && (
            <IconButton
              aria-label={`${props.name} twitter`}
              component="a"
              href={`https://twitter.com/${props.twitter}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <TwitterIcon fontSize="small" sx={{ color: 'grey.500' }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant="body2" fontWeight="bold" sx={{ mt: 2, mb: 0.5 }}>
        {props.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.title}
      </Typography>
      {props.about && <Divider sx={{ my: 1.5 }} />}
      {props.about && (
        <Typography variant="body2" color="grey.600">
          {props.about}
        </Typography>
      )}
    </Paper>
  );
}

function Widget({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactElement;
}) {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        p: 4,
        height: '100%',
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'grey.100',
        background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,

        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.900',
          borderColor: 'primaryDark.700',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        }),
      })}
    >
      <Box
        sx={(theme) => ({
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'primary.200',
          bgcolor: 'primary.50',
          boxShadow:
            '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
          ...theme.applyDarkStyles({
            borderColor: 'primary.400',
            bgcolor: 'primary.900',
            boxShadow:
              '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
          }),
        })}
      >
        {icon}
      </Box>
      <Typography
        fontWeight="bold"
        component="h3"
        color="text.primary"
        variant="body2"
        mt={2}
        mb={0.5}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

const contributors = [
  {
    name: 'Sebastian Silbermann',
    github: 'eps1lon',
    title: 'MUI Core, everything Open Source',
    location: 'Berlin, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/12292047',
    twitter: 'sebsilbermann',
  },
  {
    name: 'Ryan Cogswell',
    github: 'ryancogswell',
    title: 'Stack Overflow top contributor',
    location: 'Minnesota, United States',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/287804',
  },
  {
    name: 'Yan Lee',
    github: 'AGDholo',
    title: 'Chinese docs',
    location: 'China',
    locationCountry: 'cn',
    src: 'https://avatars.githubusercontent.com/u/13300332',
  },
  {
    name: 'Jairon Alves Lima',
    github: 'jaironalves',
    title: 'Brazilian Portuguese docs',
    location: 'São Paulo, Brazil',
    locationCountry: 'br',
    src: 'https://avatars.githubusercontent.com/u/29267813',
  },
  {
    name: 'Danica Shen',
    github: 'DDDDDanica',
    title: 'Chinese docs',
    location: 'Ireland',
    locationCountry: 'ie',
    src: 'https://avatars.githubusercontent.com/u/12678455',
  },
];

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    title: 'MUI Core, v0.x creator',
    location: 'Dallas, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/2007468',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    title: 'MUI Core, v1.x co-creator',
    location: 'Toronto, CA',
    locationCountry: 'ca',
    src: 'https://avatars.githubusercontent.com/u/4420103',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    title: 'MUI Core, flow',
    location: 'Franklin, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/136564',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    title: 'MUI Core',
    location: 'Freiburg, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/985701',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    title: 'MUI Core',
    location: 'New Jersey, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/3155127',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    title: 'MUI Core',
    location: 'Los Angeles, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/128019',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    title: 'MUI Core',
    location: 'Hannover, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/5544859',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    title: 'MUI Core, JSS',
    location: 'Berlin, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/52824',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'goose_plus_plus',
    title: 'MUI X, date pickers',
    location: 'Kharkiv, Ukraine',
    locationCountry: 'ua',
    src: 'https://avatars.githubusercontent.com/u/16926049',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    title: 'MUI Core, J.P. Morgan',
    location: 'London, UK',
    locationCountry: 'gb',
    src: 'https://avatars.githubusercontent.com/u/12938082',
  },
];

const values = [
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Put community first 💙',
    description: 'We never lose sight of who we’re serving and why.',
    link: '/base-ui/getting-started/',
  },
  {
    icon: <PhishingRoundedIcon color="primary" />,
    title: 'Avoid bureaucracy 🚫',
    description: 'We’re so not corporate — and we like it that way.',
    link: '/base-ui/getting-started/usage/#components-vs-hooks',
  },
  {
    icon: <AccessibilityNewRounded color="primary" />,
    title: 'Chase “better” 🌱',
    description: 'We’re driven by an unending desire to improve.',
    link: '/base-ui/getting-started/quickstart/#components-and-hooks',
  },
  {
    icon: <AccessibilityNewRounded color="primary" />,
    title: 'Trust and deliver together 🚀',
    description: 'We choose to cultivate unity as the core of achievement.',
    link: '/base-ui/getting-started/quickstart/#components-and-hooks',
  },
];

export default function About() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="About us - MUI"
        description="MUI is a 100% remote globally distributed team, supported by a community of thousands
        of developers all across the world."
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <Section cozy bg="gradient">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" color="primary.600" fontWeight="bold">
              About us
            </Typography>
            <Typography component="h1" variant="h2" sx={{ my: 1, textAlign: 'center' }}>
              We&apos;re on a mission to make <br />{' '}
              <GradientText> building better UIs easier</GradientText>
            </Typography>
            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{
                maxWidth: { md: 500 },
              }}
            >
              We aim high at enabling developers & designers to bring stunning UIs to life with
              unrivalled speed and ease.
            </Typography>
            <TeamPhotoMasonry />
            <TeamStatistics />
          </Box>
        </Section>
        <Divider />
        {/* Our values */}
        <Section cozy>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SectionHeadline
              overline="Our values"
              title={
                <Typography variant="h2">
                  The MUI <GradientText>team pact</GradientText>
                </Typography>
              }
              description="They explain the behaviors and mindsets we actively encourage, discourage, and why. They serve as a guide toward better decision-making, results, and experiences at work."
            />
            <Button
              component={Link}
              noLinkStyle
              href={ROUTES.careers}
              endIcon={<KeyboardArrowRightRounded fontSize="small" />}
              variant="contained"
              size="medium"
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              View the handbook
            </Button>
          </Box>
          <Grid container spacing={3} sx={{ mt: { xs: 1, sm: 2 } }}>
            {values.map(({ icon, title, description, link }) => (
              <Grid key={title} item xs={12} md={3}>
                <Paper
                  component={Link}
                  href={link}
                  noLinkStyle
                  variant="outlined"
                  sx={(theme) => ({
                    p: 4,
                    height: '100%',
                    background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                    ...theme.applyDarkStyles({
                      bgcolor: 'primaryDark.900',
                      background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                      borderColor: 'primaryDark.700',
                    }),
                  })}
                >
                  <Box
                    sx={(theme) => ({
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.200',
                      bgcolor: 'primary.50',
                      boxShadow:
                        '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                      ...theme.applyDarkStyles({
                        borderColor: 'primary.400',
                        bgcolor: 'primary.900',
                        boxShadow:
                          '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                      }),
                    })}
                  >
                    {icon}
                  </Box>
                  <Typography
                    fontWeight="bold"
                    component="h3"
                    color="text.primary"
                    variant="body2"
                    mt={2}
                    mb={0.5}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Section>
        <Divider />
        {/* Team grid */}
        <Section cozy>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h2" mb={1}>
              Meet the MUIers
            </Typography>
            <Typography color="text.secondary" mb={2}>
              Contributing from all corners of the world, MUI is a global team & community.
            </Typography>
            <Button
              component={Link}
              noLinkStyle
              href={ROUTES.careers}
              endIcon={<KeyboardArrowRightRounded fontSize="small" />}
              variant="contained"
              size="medium"
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              See open roles
            </Button>
          </Box>
          <Box mt={4}>
            <Grid container spacing={2}>
              {(teamMembers as Array<Profile>).map((profileJson) => {
                const profile = {
                  src: `/static/branding/about/${profileJson.name
                    .split(' ')
                    .map((x) => x.toLowerCase())
                    .join('-')}.png`,
                  ...profileJson,
                };
                return (
                  <Grid key={profile.name} item xs={12} sm={6} md={3}>
                    <Person {...profile} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Section>
        <Divider />
        {/* Community contributors */}
        <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'primaryDark.900' }}>
          <Container sx={{ py: { xs: 4, sm: 8 } }}>
            <Typography component="h3" variant="h4" color="primary.200" fontWeight="semiBold">
              Community contributors
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 500 } }}>
              Some members of the community have so enriched it, that they deserve special mention.
            </Typography>
            <Grid container spacing={2} mt={2}>
              {contributors.map((profile) => (
                <Grid key={profile.name} item xs={12} sm={6} md={3}>
                  <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: { xs: 2, sm: 6 } }} />
            <Typography component="h3" variant="h4" color="warning.300" fontWeight="semiBold">
              Community emeriti
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 500 } }}>
              We honor some no-longer-active core team members who have made valuable contributions
              in the past. They advise us from time to time.
            </Typography>
            <Grid container spacing={2} mt={2}>
              {emeriti.map((profile) => (
                <Grid key={profile.name} item xs={12} sm={6} md={3}>
                  <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Divider />
        {/* How to support  */}
        <Section cozy>
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 } }}>
            How can you support us?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Widget
                icon={<ForumRoundedIcon fontSize="small" color="primary" />}
                title="Give feedback"
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Tell us what and where we can improve or share your happy moments with us! You can
                  also up or downvote any page on our documentation. <br />
                  <br /> And lastly, from time to time, we send our community a survey for more
                  structured feedback, you&apos;re always invited to participate to share your
                  thoughts.
                </Typography>
                <Button
                  component="a"
                  // @ts-expect-error
                  variant="link"
                  size="small"
                  href="https://github.com/mui/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc"
                  endIcon={<KeyboardArrowRightRounded />}
                  sx={{ ml: -1 }}
                >
                  Leave your feedback{' '}
                </Button>
              </Widget>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Widget
                icon={<PeopleRoundedIcon fontSize="small" color="primary" />}
                title="Join the community"
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Become a member of a huge community of developers supporting MUI. You can:
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    typography: 'body2',
                    color: 'text.secondary',
                    pl: 2,
                    mb: 2,
                  }}
                >
                  <li>
                    Add new features by{' '}
                    <Link href="https://github.com/mui/material-ui/blob/HEAD/CONTRIBUTING.md#your-first-pull-request">
                      submitting a pull request
                    </Link>
                    .
                  </li>
                  <li>
                    Fix bugs or{' '}
                    <Link href="https://github.com/mui/material-ui/tree/HEAD/docs">
                      improve our documentation
                    </Link>
                    .
                  </li>
                  <li>
                    Help others by reviewing and commenting on existing{' '}
                    <Link href="https://github.com/mui/material-ui/pulls">PRs</Link> and{' '}
                    <Link href="https://github.com/mui/material-ui/issues">issues</Link>.
                  </li>
                  <li>
                    Help <Link href="https://crowdin.com/project/material-ui-docs">translate</Link>{' '}
                    the documentation.
                  </li>
                  <li>
                    Answer questions on{' '}
                    <Link href="https://stackoverflow.com/questions/tagged/material-ui">
                      Stack Overflow
                    </Link>
                    .
                  </li>
                </Box>
                <Button
                  component="a"
                  // @ts-expect-error
                  variant="link"
                  size="small"
                  href="https://github.com/mui/material-ui"
                  endIcon={<KeyboardArrowRightRounded />}
                  sx={{ ml: -1 }}
                >
                  See the repository
                </Button>
              </Widget>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Widget
                icon={<LocalAtmRoundedIcon fontSize="small" color="primary" />}
                title="Support us financially"
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  If you use MUI in a commercial project and would like to support its continued
                  development by becoming a Sponsor, or in a side or hobby project and would like to
                  become a Backer, you can do so through {'Open Collective'}.
                  <br />
                  <br />
                  All funds donated are managed transparently, and Sponsors receive recognition in
                  the README and on the MUI home page.
                </Typography>
                <Button
                  component="a"
                  // @ts-expect-error
                  variant="link"
                  size="small"
                  href="https://opencollective.com/mui"
                  endIcon={<KeyboardArrowRightRounded />}
                  sx={{ ml: -1 }}
                >
                  {'See Open Collective'}
                </Button>
              </Widget>
            </Grid>
          </Grid>
        </Section>
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
