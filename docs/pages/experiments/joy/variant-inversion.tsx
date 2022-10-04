/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Chip from '@mui/joy/Chip';
import FilterDrama from '@mui/icons-material/FilterDrama';
import Add from '@mui/icons-material/Add';
import PieChart from '@mui/icons-material/PieChart';
import Sms from '@mui/icons-material/Sms';
import Person from '@mui/icons-material/Person';
import BubbleChart from '@mui/icons-material/BubbleChart';
import Notifications from '@mui/icons-material/Notifications';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import MoreVert from '@mui/icons-material/MoreVert';

const customTheme = extendTheme({
  components: {
    JoyIconButton: {
      defaultProps: {
        variant: 'plain',
        color: 'neutral',
      },
    },
    JoyChip: {
      defaultProps: {
        color: 'neutral',
      },
    },
  },
});

const HeaderContent = () => (
  <React.Fragment>
    <Box sx={{ width: 0 }}>
      <Box sx={{ px: 2 }}>
        <FilterDrama />
      </Box>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Chip variant="plain">Main</Chip>
      <Chip variant="plain">Taxes</Chip>
      <Chip variant="outlined">IDA Journal</Chip>
      <Chip variant="plain">Clients</Chip>
    </Box>
    <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
      <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
        <Button startDecorator={<Add />} sx={{ borderRadius: 'xl' }}>
          New Invoice
        </Button>
        <Badge badgeContent={2} color="danger">
          <IconButton sx={{ borderRadius: 'xl' }}>
            <Notifications />
          </IconButton>
        </Badge>
        <IconButton sx={{ borderRadius: 'xl', pl: 0 }}>
          <Avatar src="/static/images/avatar/1.jpg" />
          <KeyboardArrowDown />
        </IconButton>
      </Box>
    </Box>
  </React.Fragment>
);

const FooterContent = () => (
  <React.Fragment>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Sheet variant="solid" sx={{ p: 1.25, borderRadius: '50%', lineHeight: 0 }}>
        <FilterDrama />
      </Sheet>
      <Divider orientation="vertical" />
      <Box>
        <Button disabled variant="plain">
          Systems
        </Button>
        <Button variant="plain">Illustrations</Button>
        <Button variant="plain">Templates</Button>
        <Button variant="plain">Mockups</Button>
      </Box>
      <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
        <Input variant="soft" placeholder="Your Email" />
        <Button variant="outlined">Subscribe</Button>
      </Box>
    </Box>
    <Divider sx={{ my: 2 }} />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        '& > a': { fontSize: 'sm' },
      }}
    >
      <Typography
        level="body2"
        startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        sx={{ mr: 'auto' }}
      >
        Craftwork
      </Typography>
      <Link href="#" variant="plain" underline="none">
        About Us
      </Link>
      <Link href="#" variant="plain" underline="none">
        Terms & Conditions
      </Link>
      <Link href="#" variant="plain" underline="none">
        Contact Us
      </Link>
      <Typography level="body3" sx={{ ml: 'auto' }}>
        Copyright 2022
      </Typography>
    </Box>
  </React.Fragment>
);

const NavigationContent = () => (
  <React.Fragment>
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FilterDrama />
      <Typography level="h5">Integration</Typography>
    </Box>
    <Divider sx={{ my: 2.5 }} />
    <Select
      variant="soft"
      placeholder={
        <Box>
          <Typography level="inherit">Saleshouse</Typography>
          <Typography level="body2">general team</Typography>
        </Box>
      }
      startDecorator={
        <Sheet
          variant="solid"
          sx={{ p: 0.75, borderRadius: '50%', lineHeight: 0, alignSelf: 'center' }}
        >
          <BubbleChart sx={{ m: 0 }} />
        </Sheet>
      }
      sx={{ py: 1 }}
    >
      <Option value="1">General team</Option>
      <Option value="2">Engineering team</Option>
    </Select>
    <List sx={{ '--List-item-radius': '8px', '--List-gap': '4px' }}>
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
      <ListItemButton selected variant="solid">
        <ListItemDecorator>
          <Sms />
        </ListItemDecorator>
        Chat
        <Chip size="sm" variant="solid" color="danger" sx={{ ml: 'auto' }}>
          5
        </Chip>
      </ListItemButton>
      <ListItemButton>
        <ListItemDecorator>
          <Person />
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
    <Sheet variant="soft" sx={{ p: 2, mt: 3, borderRadius: 'sm' }}>
      <Typography sx={{ mb: 0.5 }}>Used space</Typography>
      <Typography level="body2">Admin updated 09:12 am</Typography>
      <Typography level="body2">November 08, 2020</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
        <CircularProgress determinate value={71} size="lg" thickness={4}>
          71%
        </CircularProgress>
        <Divider orientation="vertical" />
        <Box>
          <Chip variant="outlined" size="sm" sx={{ mb: 1 }}>
            Scheduled
          </Chip>
          <Typography level="body2" textAlign="right">
            Next clean up: Monday
          </Typography>
        </Box>
      </Box>
    </Sheet>
    <Divider sx={{ my: 2 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar src="/static/images/avatar/2.jpg" size="lg" />
      <Typography sx={{ flex: 1 }}>Jerry Wilson</Typography>
      <IconButton>
        <MoreVert />
      </IconButton>
    </Box>
  </React.Fragment>
);

const WidgetContent = () => (
  <React.Fragment>
    <Typography
      startDecorator={
        <Sheet variant="soft" sx={{ borderRadius: 'sm', lineHeight: 0, px: 1, py: 0.5 }}>
          <FilterDrama />
        </Sheet>
      }
      fontWeight="md"
    >
      Sales
    </Typography>
    <Typography
      level="h3"
      endDecorator={
        <Chip variant="outlined" size="sm">
          High 311 <KeyboardArrowDown />
        </Chip>
      }
      sx={{ my: 0.5 }}
    >
      59,476
    </Typography>
    <Typography level="body2">Total for this month</Typography>
  </React.Fragment>
);

export default function VariantInversion() {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <CssVarsProvider theme={customTheme}>
      <Box
        sx={{ my: '10vh', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}
      >
        <Chip size="sm" variant="soft" color="danger">
          Introducing
        </Chip>
        <Typography level="h2">Variant Inversion</Typography>
        <Typography textAlign="center" textColor="text.secondary">
          An opt-in feature that inverts the color of the children to match the parent&apos;s
          variant.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          maxWidth: 'xl',
          px: 2,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            width: { lg: 400 },
            flexShrink: 0,
            position: 'sticky',
            top: 40,
            zIndex: 9999,
            alignSelf: 'flex-start',
            pr: { lg: 5 },
            pb: 5,
          }}
        >
          <Card variant="soft" sx={{ flexDirection: { xs: 'row', lg: 'column' } }}>
            <Typography level="body2">
              Joy UI provides an elegant way to make the components adaptable to its parent. All you
              need to do is setting{' '}
              <Typography variant="solid" color="primary">
                enableVariantInversion
              </Typography>{' '}
              flag on the surface components.
            </Typography>
            <br />
            <Switch
              startDecorator="Off"
              endDecorator="On"
              size="lg"
              componentsProps={{ input: { 'aria-label': 'variant inversion' } }}
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
            />
          </Card>
        </Box>
        <Box sx={{ p: 2, borderRadius: 'sm', bgcolor: 'background.level2', flex: 1 }}>
          <Box sx={{ '& > div': { display: 'flex', alignItems: 'center', minHeight: 64 } }}>
            {/* <Sheet>
              <HeaderContent />
            </Sheet> */}
            <Sheet enableVariantInversion={enabled} variant="solid" color="primary">
              <HeaderContent />
            </Sheet>
            {/* <Sheet enableVariantInversion={enabled} variant="soft" color="primary">
              <HeaderContent />
            </Sheet> */}
          </Box>
          <br />
          <br />
          <br />
          <Box>
            {/* <Sheet sx={{ p: 2, borderRadius: 'sm' }}>
              <FooterContent />
            </Sheet> */}
            {/* <Sheet
              enableVariantInversion={enabled}
              variant="solid"
              color="primary"
              sx={{ p: 2, borderRadius: 'sm' }}
            >
              <FooterContent />
            </Sheet> */}
            <Sheet
              enableVariantInversion={enabled}
              variant="solid"
              color="neutral"
              sx={{ p: 2, borderRadius: 'sm', bgcolor: 'neutral.800' }}
            >
              <FooterContent />
            </Sheet>
          </Box>
          <br />
          <br />
          <br />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              '& > div': { borderRadius: 'sm', boxShadow: 'md', p: 2.5, minWidth: 256 },
            }}
          >
            {/* <Sheet>
              <NavigationContent />
            </Sheet> */}
            <Sheet enableVariantInversion={enabled} variant="solid" color="primary">
              <NavigationContent />
            </Sheet>
            <Sheet enableVariantInversion={enabled} variant="solid" color="neutral">
              <NavigationContent />
            </Sheet>
          </Box>
          <br />
          <br />
          <br />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
              '& > div': { borderRadius: 'sm', boxShadow: 'md', p: 2.5, minWidth: 256 },
              '--Typography-gap': '16px',
            }}
          >
            {/* <Card>
              <WidgetContent />
            </Card> */}
            <Card enableVariantInversion={enabled} variant="solid" color="primary">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="solid" color="info">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="solid" color="neutral">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="soft" color="neutral">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="soft" color="success">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="soft" color="danger">
              <WidgetContent />
            </Card>
            <Card enableVariantInversion={enabled} variant="soft" color="primary">
              <WidgetContent />
            </Card>
          </Box>
          <br />
          <br />
          <br />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
