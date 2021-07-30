import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box, { BoxProps } from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AddRounded from '@material-ui/icons/AddRounded';

const DIAMONDs = [
  {
    logo: 'https://avatars3.githubusercontent.com/u/1287123?s=256',
    name: 'Octopus Deploy',
    description: 'Repetable relayable deployments.',
  },
  {
    logo: 'https://avatars3.githubusercontent.com/u/8424863?s=256',
    name: 'Doit International',
    description: 'Management platform for Google Clound and AWS.',
  },
];
const GOLDs = [
  {
    logo: 'https://github.com/tidelift.png?size=96',
    name: 'Tidelift',
    description: 'Enterprise-ready open source software.',
  },
  {
    logo: 'https://github.com/teambit.png?size=96',
    name: 'Bit',
    description: 'The fastest way to share code.',
  },
  {
    logo: 'https://images.opencollective.com/callemall/a6946da/logo/96.png',
    name: 'Text-em-all',
    description: 'The easy way to message your group.',
  },
  {
    logo: 'https://images.opencollective.com/canadacasino/5b19004/logo/96.png',
    name: 'Canada Casino',
    description: 'Safe and rewarding online casino experience',
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
            <Paper
              variant="outlined"
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ p: 2, display: 'flex', mb: 'auto' }}>
                <Avatar src={item.logo} alt={`${item.name} logo`} sx={{ borderRadius: '4px' }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              <Label color="primary">Diamond sponsor</Label>
            </Paper>
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
            <IconButton sx={{ mr: 2, border: '1px solid', borderColor: 'divider' }}>
              <AddRounded />
            </IconButton>
            <Box>
              <Typography variant="body2" color="text.primary">
                Become our sponsor!
              </Typography>
              <Typography variant="body2" color="text.primary">
                To join us, contact us at{' '}
                <Link href="mailto:diamond@material-ui.com">diamond@material-ui.com</Link> for
                pre-approval.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container columnSpacing={{ xs: 2, md: 4 }} rowSpacing={2}>
        {GOLDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <Paper
              variant="outlined"
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ p: 2, display: 'flex', mb: 'auto' }}>
                <Avatar src={item.logo} alt={`${item.name} logo`} sx={{ borderRadius: '4px' }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              <Label color="warning" darker>
                Gold sponsor
              </Label>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Sponsors;
