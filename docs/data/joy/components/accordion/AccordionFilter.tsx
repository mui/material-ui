import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListItemContent from '@mui/joy/ListItemContent';

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

export default function AccordionFilter() {
  return (
    <AccordionGroup
      variant="plain"
      transition="0.2s"
      sx={{
        maxWidth: 400,
        borderRadius: 'md',
        [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
          {
            paddingBlock: '1rem',
          },
        [`& .${accordionSummaryClasses.button}`]: {
          paddingBlock: '1rem',
        },
      }}
    >
      <Accordion>
        <AccordionSummary>
          <Avatar color="primary">
            <TapAndPlayRoundedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Connections</Typography>
            <Typography level="body-sm">
              Activate or deactivate your connections
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AirplanemodeActiveRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Airplane Mode</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <WifiRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Wi-Fi</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <BluetoothRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Bluetooth</FormLabel>
              <Switch size="sm" />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="success">
            <EditNotificationsRoundedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Notifications</Typography>
            <Typography level="body-sm">
              Enable or disable your notifications
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <EmailRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>E-mail</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <MessageRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Messages</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <AdUnitsRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Push</FormLabel>
              <Switch size="sm" />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Avatar color="danger">
            <AccessibilityNewRoundedIcon />
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Accessibility</Typography>
            <Typography level="body-sm">
              Toggle your accessibility settings
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1.5}>
            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <ZoomInRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Zoom</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SpatialTrackingRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Audio Descriptions</FormLabel>
              <Switch size="sm" />
            </FormControl>

            <FormControl orientation="horizontal" sx={{ gap: 1 }}>
              <SettingsVoiceRoundedIcon fontSize="xl2" sx={{ mx: 1 }} />
              <FormLabel>Voice Control</FormLabel>
              <Switch size="sm" />
            </FormControl>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
