import * as React from 'react';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiBox from '@material-ui/core/Box';
import MuiChip from '@material-ui/core/Chip';
import MuiDivider from '@material-ui/core/Divider';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiCard, { CardProps } from '@material-ui/core/Card';
import MuiSwitch from '@material-ui/core/Switch';
import MuiTypography from '@material-ui/core/Typography';
import MuiStack from '@material-ui/core/Stack';
import MuiEdit from '@material-ui/icons/Edit';
import MuiLocationOn from '@material-ui/icons/LocationOn';
import { withPointer } from 'docs/src/components/home/ElementPointer';

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

export const componentCode = `<Card>
  <Box sx={{ p: 2, display: 'flex' }}>
    <Avatar variant="rounded" src="avatar1.jpg" />
    <Stack spacing={0.5}>
      <Typography fontWeight={600}>Michael Scott</Typography>
      <Typography variant="body2" color="text.secondary">
        <LocationOn /> Scranton, PA
      </Typography>
    </Stack>
    <IconButton>
      <Edit fontSize="small" />
    </IconButton>
  </Box>
  <Divider />
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Chip>Active account</Chip>
    <Switch />
  </Stack>
</Card>
`;

const Box = MuiBox;
const Avatar = withPointer(MuiAvatar, { id: 'avatar', name: 'Avatar' });
const Divider = withPointer(MuiBox, { id: 'divider', name: 'Divider' });
const Chip = withPointer(MuiChip, { id: 'chip', name: 'Chip' });
const IconButton = withPointer(MuiIconButton, { id: 'iconButton', name: 'IconButton' });
const Card = withPointer(MuiCard, { id: 'card', name: 'Card' });
const Switch = withPointer(MuiSwitch, { id: 'switch', name: 'Switch' });
const Typography = withPointer(MuiTypography, { id: 'typography', name: 'Typography' });
const Typography2 = withPointer(MuiTypography, { id: 'typography2', name: 'Typography' });
const Stack = withPointer(MuiStack, { id: 'stack', name: 'Stack' });
const Stack2 = withPointer(MuiStack, { id: 'stack2', name: 'Stack' });
const Edit = withPointer(MuiEdit, { id: 'editIcon', name: 'EditIcon' });
const LocationOn = withPointer(MuiLocationOn, { id: 'locationOnIcon', name: 'LocationOnIcon' });

export default function MaterialDesignDemo(props: CardProps) {
  const [active, setActive] = React.useState(false);
  return (
    <Card {...props}>
      <Box sx={{ p: 2, display: 'flex' }}>
        <Avatar variant="rounded" src="/static/images/avatar/1.jpg" alt="" />
        <Stack
          spacing={0.5}
          alignItems="flex-start"
          sx={{
            mx: 2,
            flexGrow: 1,
            '& svg': { fontSize: 20, verticalAlign: 'bottom', mr: 0.5 },
          }}
        >
          <Typography fontWeight={600}>Michael Scott</Typography>
          <Typography2 variant="body2" color="text.secondary">
            <LocationOn />
            Scranton, PA
          </Typography2>
        </Stack>
        <IconButton aria-label="Edit" sx={{ alignSelf: 'flex-start' }}>
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ my: -1, py: 1, position: 'relative', zIndex: 1 }}>
        <MuiDivider />
      </Divider>
      <Stack2
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
      >
        <Chip
          label={active ? 'Active account' : 'Inactive account'}
          color={active ? 'success' : 'default'}
          size="small"
        />
        <Switch
          inputProps={{
            'aria-label': active ? 'disable account' : 'activate account',
          }}
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Stack2>
    </Card>
  );
}
