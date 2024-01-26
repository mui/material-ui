import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiChip from '@mui/material/Chip';
import MuiDivider from '@mui/material/Divider';
import MuiIconButton from '@mui/material/IconButton';
import MuiCard, { CardProps } from '@mui/material/Card';
import MuiSwitch from '@mui/material/Switch';
import MuiTypography from '@mui/material/Typography';
import MuiStack from '@mui/material/Stack';
import MuiEdit from '@mui/icons-material/Edit';
import { withPointer } from 'docs/src/components/home/ElementPointer';

export const componentCode = `<Card>
  <Stack alignItems="center" direction="row" sx={{ p: 2 }}> 
    <Avatar variant="rounded" src="avatar.jpg" />
    <Stack sx={{ mx: 2, flexGrow: 1 }}>
      <Typography fontWeight="bold">Lucas Smith</Typography>
      <Typography variant="body2" color="text.secondary">
        Scranton, PA, United States
      </Typography>
    </Stack>
    <IconButton>
      <Edit fontSize="small" />
    </IconButton>
  </Stack>
  <Divider />
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Chip
      size="small"
      label={active ? 'Active account' : 'Inactive account'}
      color={active ? 'success' : 'default'}
      />
    <Switch />
  </Stack>
</Card>
`;

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

export default function MaterialDesignDemo(props: CardProps) {
  const [active, setActive] = React.useState(false);
  return (
    <Card {...props}>
      <Stack alignItems="center" direction="row" sx={{ p: 2 }}>
        <Avatar
          variant="rounded"
          src="/static/images/avatar/2.jpg"
          imgProps={{ 'aria-labelledby': 'demo-task-card-assignee-name' }}
        />
        <Stack
          sx={{
            mx: 2,
            flexGrow: 1,
          }}
        >
          <Typography fontWeight="semiBold">Lucas Smith</Typography>
          <Typography2 variant="body2" color="text.secondary">
            Scranton, PA, United States
          </Typography2>
        </Stack>
        <IconButton aria-label="Edit" sx={{ alignSelf: 'flex-start' }}>
          <Edit fontSize="small" />
        </IconButton>
      </Stack>
      <Divider sx={{ my: -1, py: 1, position: 'relative', zIndex: 1 }}>
        <MuiDivider />
      </Divider>
      <Stack2
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.5, py: 1.5, bgcolor: 'background.default' }}
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
