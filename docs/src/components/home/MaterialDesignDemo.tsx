import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiChip from '@mui/material/Chip';
import MuiCard, { CardProps } from '@mui/material/Card';
import MuiSwitch from '@mui/material/Switch';
import MuiTypography from '@mui/material/Typography';
import MuiStack from '@mui/material/Stack';
import { withPointer } from 'docs/src/components/home/ElementPointer';

export const componentCode = `<Card sx={{ p: 2.5 }}>
  <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
    <Avatar variant="rounded" src="avatar.jpg" />
    <div>
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
        <Typography fontWeight="semiBold">Lucas Smith</Typography>
        <Chip
          size="small"
          color={active ? 'success' : 'default'}
          label={active ? 'Active' : 'Inactive'}
        />
      </Stack>
      <Typography2 variant="body2" color="text.secondary">
        Scranton, PA, United States
      </Typography2>
    </div>
    <Switch sx={{ ml: 'auto' }} />
  </Stack>
</Card>
`;

const Avatar = withPointer(MuiAvatar, { id: 'avatar', name: 'Avatar' });
const Chip = withPointer(MuiChip, { id: 'chip', name: 'Chip' });
const Card = withPointer(MuiCard, { id: 'card', name: 'Card' });
const Switch = withPointer(MuiSwitch, { id: 'switch', name: 'Switch' });
const Typography = withPointer(MuiTypography, { id: 'typography', name: 'Typography' });
const Typography2 = withPointer(MuiTypography, { id: 'typography2', name: 'Typography' });
const Stack = withPointer(MuiStack, { id: 'stack', name: 'Stack' });
const Stack2 = withPointer(MuiStack, { id: 'stack2', name: 'Stack' });

export default function MaterialDesignDemo(props: CardProps) {
  const [active, setActive] = React.useState(false);
  return (
    <Card {...props} sx={{ p: 2.5 }}>
      <Stack alignItems="center" direction="row" spacing={2} useFlexGap>
        <Avatar
          variant="rounded"
          sizes="small"
          src="/static/images/avatar/2.jpg"
          imgProps={{ 'aria-labelledby': 'demo-task-card-assignee-name' }}
        />
        <div>
          <Stack2 direction="row" alignItems="center" spacing={1} useFlexGap>
            <Typography fontWeight="semiBold">Lucas Smith</Typography>
            <Chip
              label={active ? 'Active' : 'Inactive'}
              color={active ? 'success' : 'default'}
              size="small"
              sx={{
                width: 'fit-content',
                fontSize: 12,
                height: 20,
                px: '2px',
                '& .MuiChip-label': { px: 0.5 },
              }}
            />
          </Stack2>
          <Typography2 variant="body2" color="text.secondary">
            Scranton, PA, United States
          </Typography2>
        </div>
        <Switch
          inputProps={{ 'aria-label': active ? 'Active' : 'Inactive' }}
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Stack>
    </Card>
  );
}
