import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
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
import Add from '@mui/icons-material/Add';
import BubbleChart from '@mui/icons-material/BubbleChart';
import Notifications from '@mui/icons-material/Notifications';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function ColorInversionHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Sheet
      variant="solid"
      color="primary"
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
        background: (theme) =>
          `linear-gradient(to top, ${theme.vars.palette.primary[600]}, ${theme.vars.palette.primary[500]})`,
      }}
    >
      <AspectRatio
        ratio="1"
        variant="soft"
        objectFit="none"
        sx={{ borderRadius: 'xl', minWidth: 32, '--AspectRatio-radius': '24px' }}
      >
        <img alt="" src="/static/branding/pricing/block-gold.svg" />
      </AspectRatio>
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        <Chip
          variant="outlined"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          endDecorator={<KeyboardArrowDown />}
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
            '--List-decorator-size': '24px',
            '--List-item-minHeight': '40px',
            '--List-divider-gap': '4px',
            minWidth: 200,
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemDecorator>
              <BubbleChart />
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
            startDecorator={<Add />}
            sx={{ borderRadius: 'xl', display: { xs: 'none', md: 'inline-flex' } }}
          >
            New Invoice
          </Button>
          <Input
            placeholder="Search anything"
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
              <Notifications />
            </IconButton>
          </Badge>
          <IconButton sx={{ borderRadius: 'xl' }}>
            <Avatar src="/static/images/avatar/1.jpg" size="sm" />
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      </Box>
    </Sheet>
  );
}
