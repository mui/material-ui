import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ListDivider from '@mui/joy/ListDivider';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';

import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import BluetoothRoundedIcon from '@mui/icons-material/BluetoothRounded';
import TapAndPlayRoundedIcon from '@mui/icons-material/TapAndPlayRounded';
import EditNotificationsRoundedIcon from '@mui/icons-material/EditNotificationsRounded';
import AdUnitsRoundedIcon from '@mui/icons-material/AdUnitsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import SpatialTrackingRoundedIcon from '@mui/icons-material/SpatialTrackingRounded';
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';

export default function AccordionStylingExpansion() {
  return (
    <AccordionGroup
      variant="plain"
      transition="0.2s"
      sx={{
        maxWidth: 400,
        borderRadius: 'md',
        [`& .${accordionDetailsClasses.root}`]: {
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlock: '1rem',
          },
        },
      }}
    >
      <Accordion>
        <AccordionSummary>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar color="primary">
              <TapAndPlayRoundedIcon />
            </Avatar>
            <Stack sx={{ py: '8px' }}>
              <Typography level="title-lg">Connections</Typography>
              <Typography level="body-sm">
                Activate or deactivate your connections
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <AirplanemodeActiveRoundedIcon />
              <Typography level="title-md">Airplane Mode</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <WifiRoundedIcon />
              <Typography level="title-md">Wi-Fi</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <BluetoothRoundedIcon />
              <Typography level="title-md">Bluetooth</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar color="primary">
              <EditNotificationsRoundedIcon />
            </Avatar>
            <Stack sx={{ py: '8px' }}>
              <Typography level="title-lg">Notifications</Typography>
              <Typography level="body-sm">
                Enable or disable your notifications
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <EmailRoundedIcon />
              <Typography level="title-md">E-mal</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <MessageRoundedIcon />
              <Typography level="title-md">Messages</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <AdUnitsRoundedIcon />
              <Typography level="title-md">Push</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar color="primary">
              <AccessibilityNewRoundedIcon />
            </Avatar>
            <Stack sx={{ py: '8px' }}>
              <Typography level="title-lg">Accessibility</Typography>
              <Typography level="body-sm">
                Toggle your accessibility settings
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <ZoomInRoundedIcon />
              <Typography level="title-md">Zoom</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <SpatialTrackingRoundedIcon />
              <Typography level="title-md">Audio Descriptions</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
        <AccordionDetails>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" spacing={1}>
              <SettingsVoiceRoundedIcon />
              <Typography level="title-md">Voice Control</Typography>
            </Stack>
            <Switch size="sm" />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
