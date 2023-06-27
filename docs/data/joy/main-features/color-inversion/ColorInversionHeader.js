import * as React from 'react';

import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import AddIcon from '@mui/icons-material/Add';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ColorInversionHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [color, setColor] = React.useState('primary');
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        p: 2,
        mx: -3,
        my: -3,
        borderRadius: { xs: 0, sm: 'xs' },
        minWidth: 'min-content',
        ...(color !== 'warning' && {
          background: (theme) =>
            `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
        }),
      }}
    >
      <IconButton
        variant="soft"
        size="sm"
        onClick={() => {
          const colors = [
            'primary',
            'neutral',
            'danger',
            'info',
            'success',
            'warning',
          ];

          const nextColor = colors.indexOf(color);
          setColor(colors[nextColor + 1] ?? colors[0]);
        }}
        sx={{ borderRadius: '50%' }}
      >
        <img alt="" src="/static/branding/pricing/block-gold.svg" />
      </IconButton>
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        <Chip
          variant="outlined"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          endDecorator={<KeyboardArrowDownIcon />}
        >
          Main
        </Chip>
        <Menu
          variant="outlined"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          placement="bottom-start"
          disablePortal
          size="sm"
          sx={{
            '--ListItemDecorator-size': '24px',
            '--ListItem-minHeight': '40px',
            '--ListDivider-gap': '4px',
            minWidth: 200,
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemDecorator>
              <BubbleChartIcon />
            </ListItemDecorator>
            Products
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={() => setAnchorEl(null)}>Pricing</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            Case studies{' '}
            <Chip
              variant="outlined"
              size="sm"
              sx={{
                ml: 'auto',
                bgcolor: (theme) =>
                  `rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`,
              }}
            >
              Beta
            </Chip>
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startDecorator={<AddIcon />}
            sx={{ borderRadius: 'xl', display: { xs: 'none', md: 'inline-flex' } }}
          >
            New Invoice
          </Button>
          <Input
            placeholder="Search for anything..."
            variant="soft"
            size="sm"
            endDecorator={
              <Typography
                component="span"
                variant="outlined"
                level="body3"
                sx={{ bgcolor: 'background.surface', mx: 0 }}
              >
                ⌘K
              </Typography>
            }
            sx={{
              '--Input-radius': '40px',
              '--Input-paddingInline': '12px',
              width: 160,
              display: { xs: 'none', lg: 'flex' },
            }}
          />
          <Badge badgeContent={2} variant="solid" color="danger">
            <IconButton variant="soft" sx={{ borderRadius: 'xl' }}>
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <IconButton sx={{ borderRadius: 'xl' }}>
            <Avatar src="/static/images/avatar/1.jpg" size="sm" />
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Box>
    </Sheet>
  );
}
