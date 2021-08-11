import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box, { BoxProps } from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from 'docs/src/modules/components/Link';
import IconButton from '@material-ui/core/IconButton';
import AddRounded from '@material-ui/icons/AddRounded';
import LaunchRounded from '@material-ui/icons/LaunchRounded';

const DIAMONDs = [
  {
    src: 'https://avatars3.githubusercontent.com/u/1287123?s=40',
    srcSet: 'https://avatars3.githubusercontent.com/u/1287123?s=80 2x',
    name: 'Octopus Deploy',
    description: 'Repetable relayable deployments.',
    href: 'https://octopus.com/',
  },
  {
    src: 'https://avatars3.githubusercontent.com/u/8424863?s=40',
    srcSet: 'https://avatars3.githubusercontent.com/u/8424863?s=80 2x',
    name: 'Doit International',
    description: 'Management platform for Google Clound and AWS.',
    href: 'https://www.doit-intl.com/',
  },
];
const GOLDs = [
  {
    src: 'https://avatars.githubusercontent.com/u/30204434?s=40',
    srcSet: 'https://avatars.githubusercontent.com/u/30204434?s=80 2x',
    name: 'Tidelift',
    description: 'Enterprise-ready open source software.',
    href: 'https://tidelift.com/',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/24789812?size=40',
    srcSet: 'https://avatars.githubusercontent.com/u/24789812?size=80 2x',
    name: 'Bit',
    description: 'The fastest way to share code.',
    href: 'https://bit.dev/',
  },
  {
    src: 'https://images.opencollective.com/callemall/a6946da/logo/40.png',
    srcSet: 'https://images.opencollective.com/callemall/a6946da/logo/80.png 2x',
    name: 'Text-em-all',
    description: 'The easy way to message your group.',
    href: 'https://www.text-em-all.com/',
  },
  {
    src: 'https://images.opencollective.com/canadacasino/5b19004/logo/40.png',
    srcSet: 'https://images.opencollective.com/canadacasino/5b19004/logo/80.png 2x',
    name: 'Canada Casino',
    description: 'Safe and rewarding online casino experience',
    href: 'https://casinocanada.com/',
  },
  {
    src: '/static/sponsors/spice-factory.png',
    srcSet: '/static/sponsors/spice-factory-2x.png',
    name: 'Spice Factory',
    description: 'Next gen digital product studio.',
    href: 'https://spicefactory.co/',
  },
  {
    src: '/static/sponsors/elevator-logo.png',
    srcSet: '/static/sponsors/elevator-logo-2x.png',
    name: 'Elevator',
    description: 'The dopest new hip hop, upcoming artsits, music.',
    href: 'https://www.elevatormag.com/',
  },
  {
    src: '/static/sponsors/movavi.png',
    srcSet: '/static/sponsors/movavi-2x.png',
    name: 'Movavi',
    description: 'Screen recorder for Mac.',
    href: 'https://www.movavi.com/',
  },
  {
    src: '/static/sponsors/hoodie-bees.png',
    srcSet: '/static/sponsors/hoodie-bees-2x.png',
    name: 'Hoodie Bees',
    description: 'Horse community.',
    href: 'https://www.hoodiebees.com/',
  },
];

function Label({
  color,
  children,
  sx,
  darker = false,
}: {
  color: 'primary' | 'warning';
  children: React.ReactNode;
  sx?: BoxProps['sx'];
  darker?: boolean;
}) {
  return (
    <Box
      sx={{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? `${color}.${darker ? '900' : '800'}` : `${color}.50`,
        color: (theme) =>
          theme.palette.mode === 'dark' ? `${color}.100` : `${color}.${darker ? '800' : '500'}`,
        display: 'flex',
        alignItems: 'center',
        typography: 'body2',
        fontWeight: 600,
        p: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          mr: 1,
          borderRadius: 1,
          width: 12,
          height: 12,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? `${color}.${darker ? '800' : '300'}`
              : `${color}.${darker ? '800' : '500'}`,
          border: '3px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? `${color}.${darker ? '300' : '500'}`
              : `${color}.${darker ? '300' : '100'}`,
        }}
      />
      {children}
    </Box>
  );
}

const SponsorCard = ({
  item,
  bottom,
}: {
  item: typeof DIAMONDs[number];
  bottom: React.ReactElement;
}) => {
  return (
    <Paper
      component={Link}
      noLinkStyle
      href={item.href}
      target="_blank"
      rel="sponsored noopener"
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
          transition: '0.2s',
        },
        '&:hover': {
          '& svg': {
            transform: 'translateY(-3px)',
          },
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', mb: 'auto' }}>
        <Avatar
          src={item.src}
          srcSet={item.srcSet}
          alt={`${item.name} logo`}
          imgProps={{ loading: 'lazy' }}
          sx={{ borderRadius: '4px' }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2" fontWeight="bold">
            {item.name}{' '}
            <LaunchRounded color="primary" sx={{ fontSize: 16, verticalAlign: 'sub' }} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Box>
      </Box>
      {bottom}
    </Paper>
  );
};

const Sponsors = () => {
  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h2" sx={{ my: 1 }}>
        Our sponsors
      </Typography>
      <Typography color="text.secondary" sx={{ mb: { xs: 2, md: 4 }, maxWidth: 450 }}>
        The continued development and maintenance of Material-UI is greatly helped by our generous
        sponsors.
      </Typography>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: 5 }}>
        {DIAMONDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4}>
            <SponsorCard item={item} bottom={<Label color="primary">Diamond sponsor</Label>} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderStyle: 'dashed',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
            }}
          >
            <IconButton
              aria-label="Become MUI sponsor"
              component="a"
              href="mailto:diamond@mui.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mr: 2, border: '1px solid', borderColor: 'divider' }}
            >
              <AddRounded />
            </IconButton>
            <Box>
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                Become our sponsor!
              </Typography>
              <Typography variant="body2" color="text.primary">
                To join us, contact us at{' '}
                <Link href="mailto:diamond@mui.com" target="_blank" rel="noopener noreferrer">
                  diamond@mui.com
                </Link>{' '}
                for pre-approval.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container columnSpacing={{ xs: 2, md: 4 }} rowSpacing={2}>
        {GOLDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <SponsorCard
              item={item}
              bottom={
                <Label color="warning" darker>
                  Gold sponsor
                </Label>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Sponsors;
