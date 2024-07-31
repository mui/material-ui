import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import teamMembers from 'docs/data/about/teamMembers.json';
/**
 * The teamMembers data can be imported from: https://tools-public.mui.com/prod/pages/nSwYn51

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
  linkedin?: string;
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
          describeChild
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
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
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
                width="40"
                src={`https://flagcdn.com/${props.locationCountry}.svg`}
                alt=""
              />
            </Box>
          </Box>
        </Tooltip>
        <Box sx={{ mt: -0.5, mr: -0.5, ml: 'auto' }}>
          {props.github && (
            <IconButton
              aria-label={`${props.name} GitHub profile`}
              component="a"
              href={`https://github.com/${props.github}`}
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon fontSize="small" sx={{ color: 'grey.500' }} />
            </IconButton>
          )}
          {props.twitter && (
            <IconButton
              aria-label={`${props.name} X profile`}
              component="a"
              href={`https://x.com/${props.twitter}`}
              target="_blank"
              rel="noopener"
            >
              <XIcon fontSize="small" sx={{ color: 'grey.500' }} />
            </IconButton>
          )}
          {props.linkedin && (
            <IconButton
              aria-label={`${props.name} LinkedIn profile`}
              component="a"
              href={`https://www.linkedin.com/${props.linkedin}`}
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon fontSize="small" sx={{ color: 'grey.500' }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 0.5 }}>
        {props.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {props.title}
      </Typography>
      {props.about && <Divider sx={{ my: 1.5 }} />}
      {props.about && (
        <Typography variant="body2" sx={{ color: 'text.tertiary' }}>
          {props.about}
        </Typography>
      )}
    </Paper>
  );
}

const contributors = [
  {
    name: 'Sebastian Silbermann',
    github: 'eps1lon',
    title: 'Material UI, everything Open Source',
    location: 'Berlin, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/12292047',
    twitter: 'sebsilbermann',
  },
  {
    name: 'Ryan Cogswell',
    github: 'ryancogswell',
    title: 'Stack Overflow top contributor',
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
    title: 'Material UI, v0.x creator',
    location: 'Dallas, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/2007468',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    title: 'Material UI, v1.x co-creator',
    location: 'Toronto, CA',
    locationCountry: 'ca',
    src: 'https://avatars.githubusercontent.com/u/4420103',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    title: 'Material UI, flow',
    location: 'Franklin, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/136564',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    title: 'Material UI',
    location: 'Freiburg, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/985701',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    title: 'Material UI',
    location: 'New Jersey, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/3155127',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    title: 'Material UI',
    location: 'Los Angeles, US',
    locationCountry: 'us',
    src: 'https://avatars.githubusercontent.com/u/128019',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    title: 'Material UI',
    location: 'Hannover, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/5544859',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    title: 'Material UI, JSS',
    location: 'Berlin, Germany',
    locationCountry: 'de',
    src: 'https://avatars.githubusercontent.com/u/52824',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'goose_plus_plus',
    title: 'MUI X Date Pickers',
    location: 'Kharkiv, Ukraine',
    locationCountry: 'ua',
    src: 'https://avatars.githubusercontent.com/u/16926049',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    title: 'Material UI, J.P. Morgan',
    location: 'London, UK',
    locationCountry: 'gb',
    src: 'https://avatars.githubusercontent.com/u/12938082',
  },
];

export default function Team() {
  return (
    <React.Fragment>
      <Section cozy>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column' }}>
          <SectionHeadline
            overline="Team"
            title={
              <Typography variant="h2" id="muiers">
                Meet the <GradientText>MUIers</GradientText>
              </Typography>
            }
            description="Contributing from all corners of the world, MUI is a global, fully-remote team & community."
          />
          <Button
            component={Link}
            noLinkStyle
            href={ROUTES.careers}
            endIcon={<KeyboardArrowRightRounded fontSize="small" />}
            variant="contained"
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            View careers
          </Button>
        </Box>
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
              <Grid key={profile.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Person {...profile} />
              </Grid>
            );
          })}
        </Grid>
      </Section>
      <Divider />
      {/* Community contributors */}
      <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'common.black' }}>
        <Container sx={{ py: { xs: 4, sm: 8 } }}>
          <Typography
            component="h3"
            variant="h4"
            sx={{ color: 'primary.200', fontWeight: 'semiBold' }}
          >
            Community contributors
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 500 } }}>
            Special members of the community deserve a shout-out for their ever-lasting impact on
            MUI&apos;s products.
          </Typography>
          <Grid container spacing={2} mt={2}>
            {contributors.map((profile) => (
              <Grid key={profile.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: { xs: 2, sm: 6 } }} />
          <Typography
            component="h3"
            variant="h4"
            sx={{ color: 'warning.300', fontWeight: 'semiBold' }}
          >
            Community emeriti
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 500 } }}>
            We honor some no-longer-active core team members who have made valuable contributions in
            the past. They advise us from time to time.
          </Typography>
          <Grid container spacing={2} mt={2}>
            {emeriti.map((profile) => (
              <Grid key={profile.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Person {...profile} sx={{ bgcolor: 'primaryDark.600' }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
