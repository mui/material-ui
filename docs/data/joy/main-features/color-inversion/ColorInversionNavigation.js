import * as React from 'react';

import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Tooltip from '@mui/joy/Tooltip';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import PieChart from '@mui/icons-material/PieChart';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AddIcon from '@mui/icons-material/Add';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

export default function ColorInversionNavigation() {
  const [color, setColor] = React.useState('neutral');
  return (
    <Box sx={{ display: 'flex', borderRadius: 'sm', overflow: 'auto' }}>
      <Sheet
        variant="solid"
        invertedColors
        sx={[
          { p: 2 },
          color !== 'neutral' && {
            bgcolor: `${color}.700`,
          },
        ]}
      >
        <Select
          variant="soft"
          defaultValue="1"
          size="sm"
          color={color}
          startDecorator={
            <Sheet
              variant="solid"
              sx={{
                p: 0.75,
                borderRadius: '50%',
                lineHeight: 0,
                alignSelf: 'center',
              }}
            >
              <BubbleChartIcon fontSize="small" sx={{ m: 0 }} />
            </Sheet>
          }
          sx={{
            py: 1,
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Option value="1">General team</Option>
          <Option value="2">Engineering team</Option>
        </Select>
        <List
          sx={{
            '--ListItem-radius': '8px',
            '--List-gap': '4px',
            flexGrow: 0,
            minWidth: 200,
          }}
        >
          <ListItemButton>
            <ListItemDecorator>
              <PieChart />
            </ListItemDecorator>
            Dashboard
          </ListItemButton>
          <ListItemButton selected variant="soft">
            <ListItemDecorator>
              <SmsIcon />
            </ListItemDecorator>
            Chat
            <Chip
              data-skip-inverted-colors
              size="sm"
              variant="soft"
              color={color}
              sx={{ ml: 'auto' }}
            >
              5
            </Chip>
          </ListItemButton>
          <ListItemButton>
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Team
          </ListItemButton>
          <ListItem nested>
            <ListSubheader>Shortcuts</ListSubheader>
            <List>
              <ListItemButton>Tasks</ListItemButton>
              <ListItemButton>Reports</ListItemButton>
            </List>
          </ListItem>
        </List>
        <Card
          variant="soft"
          orientation="horizontal"
          sx={{ mt: 2, display: 'flex', alignItems: 'center', borderRadius: 'sm' }}
        >
          <CircularProgress value={35} determinate thickness={8} size="lg">
            35%
          </CircularProgress>
          <CardContent sx={{ ml: 2 }}>
            <Chip
              size="sm"
              variant="outlined"
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
              Active
            </Chip>
            <Typography sx={{ fontSize: 'xs' }}>Last update: 22/12/22</Typography>
          </CardContent>
        </Card>
      </Sheet>
      <Sheet
        variant="solid"
        invertedColors
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          bgcolor: `${color}.800`,
          '& .MuiBadge-root': { '--Badge-ringColor': '#FFF' },
          '& .MuiBadge-colorSuccess': { bgcolor: 'success.400' },
          '& button': {
            borderRadius: '50%',
            padding: 0,
            '--IconButton-size': '3rem',
          },
        }}
      >
        <Badge badgeContent="7" badgeInset="10%" size="sm">
          <IconButton>
            <Avatar src="/static/images/avatar/3.jpg" />
          </IconButton>
        </Badge>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeInset="15%"
          color="success"
        >
          <IconButton>
            <Avatar src="/static/images/avatar/4.jpg" />
          </IconButton>
        </Badge>
        <Tooltip title="Add another chat" variant="soft">
          <IconButton sx={{ color: 'text.tertiary' }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          onClick={() => {
            const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
          sx={{ mt: 'auto', color: 'text.tertiary' }}
        >
          <ColorLensRoundedIcon />
        </IconButton>
      </Sheet>
    </Box>
  );
}
