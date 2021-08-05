import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import LocationOn from '@material-ui/icons/LocationOn';
import BusinessRounded from '@material-ui/icons/BusinessRounded';

export const demoCode = {
  imports: (themed = false) => `import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import LocationOn from '@material-ui/icons/LocationOn';
import BusinessRounded from '@material-ui/icons/BusinessRounded';
${themed ? `import { ThemeProvider, createTheme } from '@material-ui/core/styles';\n` : ``}`,
  component: (themed = false) => {
    const jsx = `<Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Avatar variant="rounded" src="/static/images/avatar/1.jpg" />
        <Box
          sx={{
            mx: 2,
            flexGrow: 1,
            '& svg': { fontSize: 20, verticalAlign: 'bottom', mr: 1 },
          }}
        >
          <Typography fontWeight="bold">Michael Scott</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <LocationOn />
            Scranton, PA
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <BusinessRounded />
            Michael Scott
          </Typography>
        </Box>
        <IconButton size="small" sx={{ alignSelf: 'flex-start' }}>
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: 10,
            bgcolor: active ? 'success.main' : 'grey.500',
            border: '2px solid',
            borderColor: active ? 'success.light' : 'grey.300',
            mr: 1.5,
          }}
        />
        <Typography color={active ? 'success.main' : 'grey.700'}>
          {active ? 'Active' : 'Inactive'} account
        </Typography>
        <Switch
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Box>
    </Card>`;
    return `export default function MaterialDesignDemo() {
  const [active, setActive] = React.useState(true);
  return (
    ${
      themed
        ? `<ThemeProvider theme={theme}>
    ${jsx
      .split('\n')
      .map((line) => line.padStart(line.length + 2, ' '))
      .join('\n')}
    </ThemeProvider>`
        : jsx
    }
  );
}`;
  },
};

export default function MaterialDesignDemo() {
  const [active, setActive] = React.useState(true);
  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Avatar variant="rounded" src="/static/images/avatar/1.jpg" />
        <Box
          sx={{
            mx: 2,
            flexGrow: 1,
            '& svg': { fontSize: 20, verticalAlign: 'bottom', mr: 1 },
          }}
        >
          <Typography fontWeight={600}>Michael Scott</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <LocationOn />
            Scranton, PA
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <BusinessRounded />
            Michael Scott
          </Typography>
        </Box>
        <IconButton size="small" sx={{ alignSelf: 'flex-start' }}>
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: 10,
            bgcolor: active ? 'success.main' : 'grey.500',
            border: '2px solid',
            borderColor: active ? 'success.light' : 'grey.300',
            mr: 1.5,
          }}
        />
        <Typography variant="body2" fontWeight={500} color={active ? 'success.main' : 'grey.700'}>
          {active ? 'Active' : 'Inactive'} account
        </Typography>
        <Switch
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Box>
    </Card>
  );
}
