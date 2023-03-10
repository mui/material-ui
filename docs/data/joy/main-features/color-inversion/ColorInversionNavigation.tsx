import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import PieChart from '@mui/icons-material/PieChart';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ColorInversionNavigation() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sheet
        variant="solid"
        color="info"
        invertedColors
        sx={(theme) => ({
          p: 2,
          ml: -3,
          my: -3,
          background: `linear-gradient(to top, ${theme.vars.palette.info[700]}, ${theme.vars.palette.info[600]} 25%, ${theme.vars.palette.info[500]} 75%)`,
        })}
      >
        <Select
          variant="outlined"
          defaultValue="1"
          placeholder={
            <Box>
              <Typography level="inherit">Saleshouse</Typography>
              <Typography level="body2">general team</Typography>
            </Box>
          }
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
              <BubbleChartIcon sx={{ m: 0 }} />
            </Sheet>
          }
          sx={{ py: 1 }}
        >
          <Option value="1">General team</Option>
          <Option value="2">Engineering team</Option>
        </Select>
        <List
          sx={{
            '--ListItem-radius': '8px',
            '--List-gap': '4px',
            flexGrow: 0,
            minWidth: 256,
          }}
        >
          <ListItemButton>
            <ListItemDecorator>
              <PieChart />
            </ListItemDecorator>
            Dashboard
          </ListItemButton>
          <ListItemButton>
            <ListItemDecorator />
            Overview
          </ListItemButton>
          <ListItemButton selected variant="soft">
            <ListItemDecorator>
              <SmsIcon />
            </ListItemDecorator>
            Chat
            <Chip size="sm" color="danger" sx={{ ml: 'auto' }}>
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
              <ListItemButton>Settings</ListItemButton>
            </List>
          </ListItem>
        </List>
        <Card variant="soft" orientation="horizontal" sx={{ mt: 1, mb: 2 }}>
          <CircularProgress value={35} determinate thickness={2} size="lg">
            35%
          </CircularProgress>
          <CardContent sx={{ ml: 2 }}>
            <Typography fontSize="sm">Last update: 22/12/22</Typography>
            <Chip
              size="sm"
              variant="outlined"
              sx={{ alignSelf: 'flex-start', mt: 1 }}
            >
              Active
            </Chip>
          </CardContent>
        </Card>
        <Divider sx={{ mt: 'auto', mb: 2, mx: -2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src="/static/images/avatar/2.jpg" size="lg" />
          <Typography sx={{ flex: 1 }}>Jerry Wilson</Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Sheet>
      <Sheet
        variant="soft"
        color="info"
        invertedColors
        sx={(theme) => ({
          p: 2,
          mr: -3,
          my: -3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '& button': {
            borderRadius: '50%',
            padding: 0,
            '&:hover': {
              boxShadow: theme.shadow.md,
            },
          },
        })}
      >
        <Badge badgeContent="7">
          <IconButton>
            <Avatar src="/static/images/avatar/3.jpg" />
          </IconButton>
        </Badge>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeInset="14%"
          sx={{ [`& .${badgeClasses.badge}`]: { bgcolor: 'success.300' } }}
        >
          <IconButton>
            <Avatar src="/static/images/avatar/4.jpg" />
          </IconButton>
        </Badge>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeInset="14%"
          sx={{ [`& .${badgeClasses.badge}`]: { bgcolor: 'success.300' } }}
        >
          <IconButton>
            <Avatar src="/static/images/avatar/5.jpg" />
          </IconButton>
        </Badge>
        <IconButton variant="soft" aria-label="Add another chat">
          <AddIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          aria-label="Add another chat"
          sx={{ mt: 'auto' }}
        >
          <SettingsIcon />
        </IconButton>
      </Sheet>
    </Box>
  );
}
