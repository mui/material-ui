import * as React from 'react';

import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import AddIcon from '@mui/icons-material/Add';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

export default function ColorInversionHeader() {
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
        borderRadius: { xs: 0, sm: 'sm' },
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
          const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

          const nextColor = colors.indexOf(color);
          setColor(colors[nextColor + 1] ?? colors[0]);
        }}
        sx={{ borderRadius: '50%' }}
      >
        <ColorLensRoundedIcon fontSize="small" />
      </IconButton>
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        <Dropdown>
          <MenuButton
            slots={{ root: Chip }}
            slotProps={{
              root: { variant: 'outlined', endDecorator: <KeyboardArrowDownIcon /> },
            }}
          >
            Main
          </MenuButton>
          <Menu
            variant="outlined"
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
            <MenuItem>
              <ListItemDecorator>
                <BubbleChartIcon />
              </ListItemDecorator>
              Products
            </MenuItem>
            <ListDivider />
            <MenuItem>Pricing</MenuItem>
            <MenuItem>
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
        </Dropdown>
      </Box>
      <Box sx={{ display: 'flex', flexShrink: 0, gap: 2 }}>
        <Button
          startDecorator={<AddIcon />}
          sx={{ borderRadius: 'xl', display: { xs: 'none', md: 'inline-flex' } }}
        >
          New invoice
        </Button>
        <Input
          placeholder="Search"
          variant="soft"
          size="sm"
          endDecorator={
            <Typography
              component="span"
              variant="outlined"
              level="body-xs"
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
      </Box>
    </Sheet>
  );
}
