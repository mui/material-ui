import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'docs/src/modules/components/Link';
import AppHeader from 'docs/src/layouts/AppHeader';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import { MuiStats } from 'docs/src/components/home/Testimonials';
import GradientText from 'docs/src/components/typography/GradientText';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';
import ROUTES from 'docs/src/route';
import IconImage from 'docs/src/components/icon/IconImage';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import BrandingProvider from 'docs/src/BrandingProvider';

let darkTheme = createTheme(getDesignTokens('dark'));

darkTheme = createTheme(darkTheme, getThemedComponents(darkTheme));

interface Profile {
  /**
   * image url
   */
  src: string;
  name: string;
  /**
   * Role, what are you workin on?
   */
  title: string;
  /**
   * Where are you from?
   */
  country: string; // https://www.countryflags.io/
  /**
   * Lives in
   */
  location?: string;
  /**
   * Short summary about you
   */
  about?: string;
  github?: string;
  twitter?: string;
}

const Person = (props: Profile & { sx?: PaperProps['sx'] }) => {
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
          // @ts-expect-error
          PopperProps={{ sx: { '& .MuiTooltip-tooltip': { p: 0.5 } } }}
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
              {...(props.src.startsWith('https://avatars.githubusercontent.com') && {
                src: `${props.src}?s=70`,
                srcSet: `${props.src}?s=140 2x`,
              })}
              sx={{ width: 70, height: 70, bgcolor: 'primaryDark.800', borderRadius: 1 }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translateX(50%)',
                boxShadow: '0px 4px 20px rgba(61, 71, 82, 0.25)',
                width: 24,
                height: 24,
                border: '2px solid #fff',
                borderRadius: 40,
                overflow: 'hidden',
                '& > img': {
                  width: 32,
                  height: 32,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'translate(-6px, -6px)',
                },
              }}
            >
              <img
                loading="lazy"
                width="32"
                height="32"
                src={`https://www.countryflags.io/${props.country}/flat/32.png`}
                srcSet={`https://www.countryflags.io/${props.country}/flat/64.png 2x`}
                alt=""
              />
            </Box>
          </Box>
        </Tooltip>
        <Box mx="auto" height={15} />
        <Box sx={{ mt: -0.5, mr: -0.5 }}>
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
      {props.about && (
        <Divider
          sx={{
            my: 1,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.100',
          }}
        />
      )}
      {props.about && (
        <Typography variant="body2" color="text.secondary">
          {props.about}
        </Typography>
      )}
    </Paper>
  );
};

const Widget = ({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactElement;
}) => {
  return (
    <Paper variant="outlined" sx={{ height: '100%', p: 2 }}>
      <Typography component="div" variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
        <Box sx={{ display: 'inline-block', lineHeight: 0, verticalAlign: 'bottom', mr: 1 }}>
          {icon}
        </Box>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

const teamMembers: Array<Profile> = [
  {
    src: '/static/branding/about/olivier.jpg',
    name: 'Olivier Tassinari',
    title: 'Co-founder',
    location: 'Paris, France',
    country: 'fr',
    about: 'Exercise addict and lifelong learner',
    twitter: 'olivtassinari',
    github: 'oliviertassinari',
  },
  {
    name: 'Matt Brookes',
    src: '/static/branding/about/matt.jpg',
    title: 'Co-founder',
    location: 'London, UK',
    country: 'gb',
    about: "When I'm not 👨🏻‍💻, I'm 🧗🏼‍♂️",
    twitter: 'randomtechdude',
    github: 'mbrookes',
  },
  {
    name: 'Sebastian Silbermann',
    src: '/static/branding/about/sebastian.jpg',
    title: 'Core components team',
    location: 'Dresden, Germany',
    country: 'de',
    about: 'Everything Open Source',
    twitter: 'sebsilbermann',
    github: 'eps1lon',
  },
  {
    name: 'Marija Najdova',
    src: '/static/branding/about/marija.jpg',
    title: 'Core components team',
    location: 'Skopje, North Macedonia',
    country: 'mk',
    about: 'I do karate 🥋 and read 📚. A lot!',
    twitter: 'marijanajdova',
    github: 'mnajdova',
  },
  {
    name: 'Danail Hadjiatanasov',
    src: '/static/branding/about/danail.jpg',
    title: 'Advanced components team',
    location: 'Amsterdam, Netherlands',
    country: 'nl',
    about: 'Boringly normal, geek deep down. I like 🚗  and 🏂',
    twitter: 'danail_h',
    github: 'DanailH',
  },
  {
    name: 'Matheus Wichman',
    src: '/static/branding/about/matheus.jpg',
    title: 'Advanced components team',
    location: 'Esteio, Brazil',
    country: 'br',
    about: 'I like road cycling 🚲, DIY 🛠 and aviation ✈!',
    github: 'm4theushw',
  },
  {
    name: 'Michał Dudak',
    src: '/static/branding/about/michal.jpg',
    title: 'Core components team',
    location: 'Silesia, Poland',
    country: 'pl',
    about: 'Motorcyclist, gamer and coder (UI and more!)',
    twitter: 'michaldudak',
    github: 'michaldudak',
  },
  {
    name: 'Siriwat Kunaporn',
    src: '/static/branding/about/siriwat.jpg',
    title: 'Core components team',
    location: 'Bangkok, Thailand',
    country: 'th',
    about: 'UI Lover and ⛷ skiing newbie.',
    twitter: 'siriwatknp',
    github: 'siriwatknp',
  },
  {
    name: 'Danilo Leal',
    src: '/static/branding/about/danilo.jpg',
    title: 'Design Lead',
    location: 'São Paulo, Brazil',
    country: 'br',
    about: 'Music production and hiking!',
    github: 'danilo-leal',
    twitter: 'danilobleal',
  },
  {
    name: 'Flavien Delangle',
    src: '/static/branding/about/flavien.jpg',
    title: 'Advanced components team',
    location: 'Lille, France',
    about: 'Love cycling 🚴‍♂️ and reading 📚',
    country: 'fr',
    github: 'flaviendelangle',
  },
  {
    name: 'Benny Joo',
    src: 'https://avatars.githubusercontent.com/u/32841130',
    title: 'Intern',
    location: 'London, UK',
    country: 'kr',
    about: 'I do keto diet and love reading 📚',
    github: 'hbjORbj',
  },
];

const contributors = [
  {
    name: 'Danica Shen',
    github: 'DDDDDanica',
    title: 'Chinese docs',
    location: 'Ireland',
    country: 'ie',
    src: 'https://avatars.githubusercontent.com/u/12678455',
  },
  {
    name: 'Yan Lee',
    github: 'AGDholo',
    title: 'Chinese docs',
    location: 'China',
    country: 'cn',
    src: 'https://avatars.githubusercontent.com/u/13300332',
  },
  {
    name: 'Jairon Alves Lima',
    github: 'jaironalves',
    title: 'Brazilian docs',
    location: 'São Paulo, Brazil',
    country: 'br',
    src: 'https://avatars.githubusercontent.com/u/29267813',
  },
  {
    name: 'Ryan Cogswell',
    github: 'ryancogswell',
    title: 'Stack Overflow top contributor',
    location: 'Minnesota, United States',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/287804',
  },
];

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    title: 'v0.x creator',
    location: 'Dallas, Texas, US',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/2007468',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    title: 'v1.x co-creator',
    location: 'Toronto, ON',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/4420103',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    title: 'Core focus, flow',
    location: 'Franklin, Tennessee, US',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/136564',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    title: 'Core focus',
    location: 'Freiburg, Germany',
    country: 'de',
    src: 'https://avatars.githubusercontent.com/u/985701',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    title: 'Core focus',
    location: 'New Jersey, US',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/3155127',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    title: 'Core focus',
    location: 'Los Angeles, California, US',
    country: 'us',
    src: 'https://avatars.githubusercontent.com/u/128019',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    title: 'Core focus',
    location: 'Hannover, Germany',
    country: 'de',
    src: 'https://avatars.githubusercontent.com/u/5544859',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    title: 'JSS',
    location: 'Berlin, Germany',
    country: 'de',
    src: 'https://avatars.githubusercontent.com/u/52824',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'dmtrKovalenko',
    title: 'Date pickers',
    location: 'Kharkiv, Ukraine',
    country: 'ua',
    src: 'https://avatars.githubusercontent.com/u/16926049',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    title: 'Core focus, J.P. Morgan',
    location: 'London, UK',
    country: 'gb',
    src: 'https://avatars.githubusercontent.com/u/12938082',
  },
];

function AboutContent() {
  return (
    <React.Fragment>
      <Container>
        <Box
          sx={{
            height: '40vh',
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="primary.600" fontWeight="bold">
            About us
          </Typography>
          <Typography component="h1" variant="h2" sx={{ my: 1 }}>
            We&apos;re on a mission to make <br /> building UIs more{' '}
            <GradientText>accessible</GradientText>
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{
              maxWidth: { md: 500 },
              minHeight: 48, // a hack to reduce CLS (layout shift)
            }}
          >
            Our mission is to empower anyone to build UIs, faster. We&apos;re reducing the entry
            barrier, making design skills accessible.
          </Typography>
        </Box>
        <References companies={CORE_CUSTOMERS} />
      </Container>
      <Box
        sx={{ bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50') }}
      >
        <Container sx={{ py: { xs: 4, md: 8 } }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ my: 1 }}>
                Our ultimate goal
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1, maxWidth: 450 }}>
                We aim high trying to design the most effective and efficient tool for building UIs,
                for developers and designers. MUI started back in 2014, to unify React and Material
                Design. Since then, we&apos;ve become a community of over 2M developers from every
                corner of the world.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                We plan on doing all that cultivating our values:
              </Typography>
              {[
                'Customer obsessession. We put our customers front & center.',
                'Transparency. Most of our work is public.',
                'Freedom. We work from anywhere in the world.',
                'Autonomy. We want to create a safe, high-trust team.',
                "Excellence. We're aiming high, and we know it.",
              ].map((text) => (
                <Box key={text} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                  <IconImage name="yes" />
                  <Typography variant="body2" color="text.primary" fontWeight={600} sx={{ ml: 1 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <MuiStats />
          </Grid>
        </Container>
      </Box>
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography variant="h2" sx={{ my: 1 }}>
              Team
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
              MUI is maintained by a group of invaluable core contributors, with the massive support
              and involvement of the community.
            </Typography>
            <Button
              component={Link}
              noLinkStyle
              href={ROUTES.careers}
              endIcon={<KeyboardArrowRightRounded fontSize="small" />}
              variant="contained"
              size="large"
            >
              See open roles
            </Button>
          </div>
        </Box>
        <Divider sx={{ my: { xs: 2, sm: 4 } }} />
        <Typography
          component="h3"
          variant="h5"
          color="primary"
          fontWeight="extraBold"
          sx={{ mb: 1 }}
        >
          Company
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: { md: 500 } }}>
          The development of the project and its ecosystem is guided by an international team.
        </Typography>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {teamMembers.map((profile) => (
              <Grid key={profile.name} item xs={12} sm={6} md={3}>
                <Person {...profile} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <MuiThemeProvider theme={darkTheme}>
        <Box sx={{ bgcolor: 'primaryDark.700' }}>
          <Container sx={{ py: { xs: 4, sm: 8 } }}>
            <Typography
              component="h3"
              variant="h5"
              color="primary.400"
              fontWeight="extraBold"
              sx={{ mb: 1 }}
            >
              Community contributors
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 500 } }}>
              Some members of the community have so enriched it, that they deserve special mention.
            </Typography>
            <Box sx={{ pt: 2, pb: { xs: 4, sm: 8 } }}>
              <Grid container spacing={2}>
                {contributors.map((profile) => (
                  <Grid key={profile.name} item xs={12} sm={6} md={3}>
                    <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Typography
              component="h3"
              variant="h5"
              color="warning.500"
              fontWeight="extraBold"
              sx={{ mb: 1 }}
            >
              Community emeriti
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: { md: 500 } }}>
              We honor some no-longer-active core team members who have made valuable contributions
              in the past. They advise us from time-to-time.
            </Typography>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                {emeriti.map((profile) => (
                  <Grid key={profile.name} item xs={12} sm={6} md={3}>
                    <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </MuiThemeProvider>
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 } }}>
          How can you support us?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Widget
              icon={<ForumRoundedIcon fontSize="small" color="primary" />}
              title="Give feedback"
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Tell us what and where we can improve or share your happy moments with us! You can
                also up or downvote any page on our documentation. <br />
                <br /> And lastly, from time to time, we send our community a survey for a more
                structured feedback, you&apos;re always invinted to participate to share you
                thoughts.
              </Typography>
              <Link
                href="https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc"
                variant="body2"
              >
                Leave your feedback{' '}
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
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
                }}
              >
                <li>
                  Add new features by{' '}
                  <Link href="https://github.com/mui-org/material-ui/blob/HEAD/CONTRIBUTING.md#your-first-pull-request">
                    submitting a pull request
                  </Link>
                  .
                </li>
                <li>
                  Fix bugs or{' '}
                  <Link href="https://github.com/mui-org/material-ui/tree/HEAD/docs">
                    improve our documentation
                  </Link>
                  .
                </li>
                <li>
                  Help others by reviewing and commenting on existing{' '}
                  <Link href="https://github.com/mui-org/material-ui/pulls">PRs</Link> and{' '}
                  <Link href="https://github.com/mui-org/material-ui/issues">issues</Link>.
                </li>
                <li>
                  Help <Link href="https://translate.material-ui.com/">translate</Link> the
                  documentation.
                </li>
                <li>
                  Answer questions on{' '}
                  <Link href="https://stackoverflow.com/questions/tagged/material-ui">
                    StackOverflow
                  </Link>
                  .
                </li>
              </Box>
              <Link href="https://github.com/mui-org/material-ui" variant="body2">
                See the repository <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Widget>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Widget
              icon={<LocalAtmRoundedIcon fontSize="small" color="primary" />}
              title="Suport us financially"
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                If you use MUI in a commercial project and would like to support its continued
                development by becoming a Sponsor, or in a side or hobby project and would like to
                become a Backer, you can do so through OpenCollective.
                <br />
                <br />
                All funds donated are managed transparently, and Sponsors receive recognition in the
                README and on the MUI home page.
              </Typography>
              <Link href="https://opencollective.com/material-ui" variant="body2">
                See Open Collective{' '}
                <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '1px' }} />
              </Link>
            </Widget>
          </Grid>
        </Grid>
      </Container>
      <HeroEnd />
      <Divider />
    </React.Fragment>
  );
}

export default function About() {
  return (
    <BrandingProvider>
      <Head
        title="About Us - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <AboutContent />
      </main>
      <AppFooter />
    </BrandingProvider>
  );
}
